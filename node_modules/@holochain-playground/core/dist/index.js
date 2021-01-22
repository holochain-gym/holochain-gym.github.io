import { serializeHash, now, deserializeHash } from '@holochain-open-dev/common';
import { getSysMetaValHeaderHash, DHTOpType, getEntry, HeaderType, EntryDhtStatus, ChainStatus, elementToDHTOps } from '@holochain-open-dev/core-types';
import { isEqual, uniq } from 'lodash-es';
import { Subject } from 'rxjs';

function getValidationLimboDhtOps(state, status) {
    const pendingDhtOps = {};
    for (const dhtOpHash of Object.keys(state.validationLimbo)) {
        const limboValue = state.validationLimbo[dhtOpHash];
        if (limboValue.status === status) {
            pendingDhtOps[dhtOpHash] = limboValue;
        }
    }
    return pendingDhtOps;
}
function pullAllIntegrationLimboDhtOps(state) {
    const dhtOps = state.integrationLimbo;
    state.integrationLimbo = {};
    return dhtOps;
}
function getHeadersForEntry(state, entryHash) {
    return state.metadata.system_meta[serializeHash(entryHash)]
        .map(h => {
        const hash = getSysMetaValHeaderHash(h);
        if (hash) {
            return state.CAS[serializeHash(hash)];
        }
        return undefined;
    })
        .filter(header => !!header);
}
function getLinksForEntry(state, entryHash) {
    return state.metadata.link_meta
        .filter(({ key, value }) => isEqual(key.base, entryHash))
        .map(({ key, value }) => value);
}
function getEntryDhtStatus(state, entryHash) {
    const meta = state.metadata.misc_meta[serializeHash(entryHash)];
    return meta
        ? meta.EntryStatus
        : undefined;
}
function getEntryDetails(state, entryHash) {
    const entry = state.CAS[serializeHash(entryHash)];
    const headers = getHeadersForEntry(state, entryHash);
    const dhtStatus = getEntryDhtStatus(state, entryHash);
    return {
        entry,
        headers: headers,
        entry_dht_status: dhtStatus,
    };
}
function getAllHeldEntries(state) {
    const newEntryHeaders = Object.values(state.integratedDHTOps)
        .filter(dhtOpValue => dhtOpValue.op.type === DHTOpType.StoreEntry)
        .map(dhtOpValue => dhtOpValue.op.header);
    const allEntryHashes = newEntryHeaders.map(h => h.header.content.entry_hash);
    return uniq(allEntryHashes);
}
function getAllAuthoredEntries(state) {
    const allHeaders = Object.values(state.authoredDHTOps).map(dhtOpValue => dhtOpValue.op.header);
    const newEntryHeaders = allHeaders.filter(h => h.header.content.entry_hash);
    return newEntryHeaders.map(h => h.header.content.entry_hash);
}
function isHoldingEntry(state, entryHash) {
    return state.metadata.system_meta[serializeHash(entryHash)] !== undefined;
}
function getDhtShard(state) {
    const heldEntries = getAllHeldEntries(state);
    const dhtShard = {};
    for (const entryHash of heldEntries) {
        dhtShard[serializeHash(entryHash)] = {
            details: getEntryDetails(state, entryHash),
            links: getLinksForEntry(state, entryHash),
        };
    }
    return dhtShard;
}

var ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array';

// For convenience, let people hash a string, not just a Uint8Array
function normalizeInput (input) {
  var ret;
  if (input instanceof Uint8Array) {
    ret = input;
  } else if (input instanceof Buffer) {
    ret = new Uint8Array(input);
  } else if (typeof (input) === 'string') {
    ret = new Uint8Array(Buffer.from(input, 'utf8'));
  } else {
    throw new Error(ERROR_MSG_INPUT)
  }
  return ret
}

// Converts a Uint8Array to a hexadecimal string
// For example, toHex([255, 0, 255]) returns "ff00ff"
function toHex (bytes) {
  return Array.prototype.map.call(bytes, function (n) {
    return (n < 16 ? '0' : '') + n.toString(16)
  }).join('')
}

// Converts any value in [0...2^32-1] to an 8-character hex string
function uint32ToHex (val) {
  return (0x100000000 + val).toString(16).substring(1)
}

// For debugging: prints out hash state in the same format as the RFC
// sample computation exactly, so that you can diff
function debugPrint (label, arr, size) {
  var msg = '\n' + label + ' = ';
  for (var i = 0; i < arr.length; i += 2) {
    if (size === 32) {
      msg += uint32ToHex(arr[i]).toUpperCase();
      msg += ' ';
      msg += uint32ToHex(arr[i + 1]).toUpperCase();
    } else if (size === 64) {
      msg += uint32ToHex(arr[i + 1]).toUpperCase();
      msg += uint32ToHex(arr[i]).toUpperCase();
    } else throw new Error('Invalid size ' + size)
    if (i % 6 === 4) {
      msg += '\n' + new Array(label.length + 4).join(' ');
    } else if (i < arr.length - 2) {
      msg += ' ';
    }
  }
  console.log(msg);
}

// For performance testing: generates N bytes of input, hashes M times
// Measures and prints MB/second hash performance each time
function testSpeed (hashFn, N, M) {
  var startMs = new Date().getTime();

  var input = new Uint8Array(N);
  for (var i = 0; i < N; i++) {
    input[i] = i % 256;
  }
  var genMs = new Date().getTime();
  console.log('Generated random input in ' + (genMs - startMs) + 'ms');
  startMs = genMs;

  for (i = 0; i < M; i++) {
    var hashHex = hashFn(input);
    var hashMs = new Date().getTime();
    var ms = hashMs - startMs;
    startMs = hashMs;
    console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...');
    console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND');
  }
}

var util = {
  normalizeInput: normalizeInput,
  toHex: toHex,
  debugPrint: debugPrint,
  testSpeed: testSpeed
};

// Blake2B in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch



// 64-bit unsigned addition
// Sets v[a,a+1] += v[b,b+1]
// v should be a Uint32Array
function ADD64AA (v, a, b) {
  var o0 = v[a] + v[b];
  var o1 = v[a + 1] + v[b + 1];
  if (o0 >= 0x100000000) {
    o1++;
  }
  v[a] = o0;
  v[a + 1] = o1;
}

// 64-bit unsigned addition
// Sets v[a,a+1] += b
// b0 is the low 32 bits of b, b1 represents the high 32 bits
function ADD64AC (v, a, b0, b1) {
  var o0 = v[a] + b0;
  if (b0 < 0) {
    o0 += 0x100000000;
  }
  var o1 = v[a + 1] + b1;
  if (o0 >= 0x100000000) {
    o1++;
  }
  v[a] = o0;
  v[a + 1] = o1;
}

// Little-endian byte access
function B2B_GET32 (arr, i) {
  return (arr[i] ^
  (arr[i + 1] << 8) ^
  (arr[i + 2] << 16) ^
  (arr[i + 3] << 24))
}

// G Mixing function
// The ROTRs are inlined for speed
function B2B_G (a, b, c, d, ix, iy) {
  var x0 = m[ix];
  var x1 = m[ix + 1];
  var y0 = m[iy];
  var y1 = m[iy + 1];

  ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
  ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
  var xor0 = v[d] ^ v[a];
  var xor1 = v[d + 1] ^ v[a + 1];
  v[d] = xor1;
  v[d + 1] = xor0;

  ADD64AA(v, c, d);

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
  xor0 = v[b] ^ v[c];
  xor1 = v[b + 1] ^ v[c + 1];
  v[b] = (xor0 >>> 24) ^ (xor1 << 8);
  v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

  ADD64AA(v, a, b);
  ADD64AC(v, a, y0, y1);

  // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
  xor0 = v[d] ^ v[a];
  xor1 = v[d + 1] ^ v[a + 1];
  v[d] = (xor0 >>> 16) ^ (xor1 << 16);
  v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

  ADD64AA(v, c, d);

  // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
  xor0 = v[b] ^ v[c];
  xor1 = v[b + 1] ^ v[c + 1];
  v[b] = (xor1 >>> 31) ^ (xor0 << 1);
  v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
}

// Initialization Vector
var BLAKE2B_IV32 = new Uint32Array([
  0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
  0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
  0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
  0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19
]);

var SIGMA8 = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3
];

// These are offsets into a uint64 buffer.
// Multiply them all by 2 to make them offsets into a uint32 buffer,
// because this is Javascript and we don't have uint64s
var SIGMA82 = new Uint8Array(SIGMA8.map(function (x) { return x * 2 }));

// Compression function. 'last' flag indicates last block.
// Note we're representing 16 uint64s as 32 uint32s
var v = new Uint32Array(32);
var m = new Uint32Array(32);
function blake2bCompress (ctx, last) {
  var i = 0;

  // init work variables
  for (i = 0; i < 16; i++) {
    v[i] = ctx.h[i];
    v[i + 16] = BLAKE2B_IV32[i];
  }

  // low 64 bits of offset
  v[24] = v[24] ^ ctx.t;
  v[25] = v[25] ^ (ctx.t / 0x100000000);
  // high 64 bits not supported, offset may not be higher than 2**53-1

  // last block flag set ?
  if (last) {
    v[28] = ~v[28];
    v[29] = ~v[29];
  }

  // get little-endian words
  for (i = 0; i < 32; i++) {
    m[i] = B2B_GET32(ctx.b, 4 * i);
  }

  // twelve rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 64)
  for (i = 0; i < 12; i++) {
    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
    B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
    B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
    B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
    B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
    B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
    B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
    B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
    B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
  }
  // util.debugPrint('   (i=12) v[16]', v, 64)

  for (i = 0; i < 16; i++) {
    ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
  }
  // util.debugPrint('h[8]', ctx.h, 64)
}

// Creates a BLAKE2b hashing context
// Requires an output length between 1 and 64 bytes
// Takes an optional Uint8Array key
function blake2bInit (outlen, key) {
  if (outlen === 0 || outlen > 64) {
    throw new Error('Illegal output length, expected 0 < length <= 64')
  }
  if (key && key.length > 64) {
    throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64')
  }

  // state, 'param block'
  var ctx = {
    b: new Uint8Array(128),
    h: new Uint32Array(16),
    t: 0, // input count
    c: 0, // pointer within buffer
    outlen: outlen // output length in bytes
  };

  // initialize hash state
  for (var i = 0; i < 16; i++) {
    ctx.h[i] = BLAKE2B_IV32[i];
  }
  var keylen = key ? key.length : 0;
  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

  // key the hash, if applicable
  if (key) {
    blake2bUpdate(ctx, key);
    // at the end
    ctx.c = 128;
  }

  return ctx
}

// Updates a BLAKE2b streaming hash
// Requires hash context and Uint8Array (byte array)
function blake2bUpdate (ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 128) { // buffer full ?
      ctx.t += ctx.c; // add counters
      blake2bCompress(ctx, false); // compress (not last)
      ctx.c = 0; // counter to zero
    }
    ctx.b[ctx.c++] = input[i];
  }
}

// Completes a BLAKE2b streaming hash
// Returns a Uint8Array containing the message digest
function blake2bFinal (ctx) {
  ctx.t += ctx.c; // mark last block offset

  while (ctx.c < 128) { // fill up with zeros
    ctx.b[ctx.c++] = 0;
  }
  blake2bCompress(ctx, true); // final block flag = 1

  // little endian convert and store
  var out = new Uint8Array(ctx.outlen);
  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
  }
  return out
}

// Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2b (input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 64;
  input = util.normalizeInput(input);

  // do the math
  var ctx = blake2bInit(outlen, key);
  blake2bUpdate(ctx, input);
  return blake2bFinal(ctx)
}

// Computes the BLAKE2B hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 64 bytes
// - outlen - optional output length in bytes, default 64
function blake2bHex (input, key, outlen) {
  var output = blake2b(input, key, outlen);
  return util.toHex(output)
}

var blake2b_1 = {
  blake2b: blake2b,
  blake2bHex: blake2bHex,
  blake2bInit: blake2bInit,
  blake2bUpdate: blake2bUpdate,
  blake2bFinal: blake2bFinal
};

// BLAKE2s hash function in pure Javascript
// Adapted from the reference implementation in RFC7693
// Ported to Javascript by DC - https://github.com/dcposch



// Little-endian byte access.
// Expects a Uint8Array and an index
// Returns the little-endian uint32 at v[i..i+3]
function B2S_GET32 (v, i) {
  return v[i] ^ (v[i + 1] << 8) ^ (v[i + 2] << 16) ^ (v[i + 3] << 24)
}

// Mixing function G.
function B2S_G (a, b, c, d, x, y) {
  v$1[a] = v$1[a] + v$1[b] + x;
  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 16);
  v$1[c] = v$1[c] + v$1[d];
  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 12);
  v$1[a] = v$1[a] + v$1[b] + y;
  v$1[d] = ROTR32(v$1[d] ^ v$1[a], 8);
  v$1[c] = v$1[c] + v$1[d];
  v$1[b] = ROTR32(v$1[b] ^ v$1[c], 7);
}

// 32-bit right rotation
// x should be a uint32
// y must be between 1 and 31, inclusive
function ROTR32 (x, y) {
  return (x >>> y) ^ (x << (32 - y))
}

// Initialization Vector.
var BLAKE2S_IV = new Uint32Array([
  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]);

var SIGMA = new Uint8Array([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
  7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
  9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
  2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
  12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
  13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
  6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
  10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]);

// Compression function. "last" flag indicates last block
var v$1 = new Uint32Array(16);
var m$1 = new Uint32Array(16);
function blake2sCompress (ctx, last) {
  var i = 0;
  for (i = 0; i < 8; i++) { // init work variables
    v$1[i] = ctx.h[i];
    v$1[i + 8] = BLAKE2S_IV[i];
  }

  v$1[12] ^= ctx.t; // low 32 bits of offset
  v$1[13] ^= (ctx.t / 0x100000000); // high 32 bits
  if (last) { // last block flag set ?
    v$1[14] = ~v$1[14];
  }

  for (i = 0; i < 16; i++) { // get little-endian words
    m$1[i] = B2S_GET32(ctx.b, 4 * i);
  }

  // ten rounds of mixing
  // uncomment the DebugPrint calls to log the computation
  // and match the RFC sample documentation
  // util.debugPrint('          m[16]', m, 32)
  for (i = 0; i < 10; i++) {
    // util.debugPrint('   (i=' + i + ')  v[16]', v, 32)
    B2S_G(0, 4, 8, 12, m$1[SIGMA[i * 16 + 0]], m$1[SIGMA[i * 16 + 1]]);
    B2S_G(1, 5, 9, 13, m$1[SIGMA[i * 16 + 2]], m$1[SIGMA[i * 16 + 3]]);
    B2S_G(2, 6, 10, 14, m$1[SIGMA[i * 16 + 4]], m$1[SIGMA[i * 16 + 5]]);
    B2S_G(3, 7, 11, 15, m$1[SIGMA[i * 16 + 6]], m$1[SIGMA[i * 16 + 7]]);
    B2S_G(0, 5, 10, 15, m$1[SIGMA[i * 16 + 8]], m$1[SIGMA[i * 16 + 9]]);
    B2S_G(1, 6, 11, 12, m$1[SIGMA[i * 16 + 10]], m$1[SIGMA[i * 16 + 11]]);
    B2S_G(2, 7, 8, 13, m$1[SIGMA[i * 16 + 12]], m$1[SIGMA[i * 16 + 13]]);
    B2S_G(3, 4, 9, 14, m$1[SIGMA[i * 16 + 14]], m$1[SIGMA[i * 16 + 15]]);
  }
  // util.debugPrint('   (i=10) v[16]', v, 32)

  for (i = 0; i < 8; i++) {
    ctx.h[i] ^= v$1[i] ^ v$1[i + 8];
  }
  // util.debugPrint('h[8]', ctx.h, 32)
}

// Creates a BLAKE2s hashing context
// Requires an output length between 1 and 32 bytes
// Takes an optional Uint8Array key
function blake2sInit (outlen, key) {
  if (!(outlen > 0 && outlen <= 32)) {
    throw new Error('Incorrect output length, should be in [1, 32]')
  }
  var keylen = key ? key.length : 0;
  if (key && !(keylen > 0 && keylen <= 32)) {
    throw new Error('Incorrect key length, should be in [1, 32]')
  }

  var ctx = {
    h: new Uint32Array(BLAKE2S_IV), // hash state
    b: new Uint32Array(64), // input block
    c: 0, // pointer within block
    t: 0, // input count
    outlen: outlen // output length in bytes
  };
  ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

  if (keylen > 0) {
    blake2sUpdate(ctx, key);
    ctx.c = 64; // at the end
  }

  return ctx
}

// Updates a BLAKE2s streaming hash
// Requires hash context and Uint8Array (byte array)
function blake2sUpdate (ctx, input) {
  for (var i = 0; i < input.length; i++) {
    if (ctx.c === 64) { // buffer full ?
      ctx.t += ctx.c; // add counters
      blake2sCompress(ctx, false); // compress (not last)
      ctx.c = 0; // counter to zero
    }
    ctx.b[ctx.c++] = input[i];
  }
}

// Completes a BLAKE2s streaming hash
// Returns a Uint8Array containing the message digest
function blake2sFinal (ctx) {
  ctx.t += ctx.c; // mark last block offset
  while (ctx.c < 64) { // fill up with zeros
    ctx.b[ctx.c++] = 0;
  }
  blake2sCompress(ctx, true); // final block flag = 1

  // little endian convert and store
  var out = new Uint8Array(ctx.outlen);
  for (var i = 0; i < ctx.outlen; i++) {
    out[i] = (ctx.h[i >> 2] >> (8 * (i & 3))) & 0xFF;
  }
  return out
}

// Computes the BLAKE2S hash of a string or byte array, and returns a Uint8Array
//
// Returns a n-byte Uint8Array
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64
function blake2s (input, key, outlen) {
  // preprocess inputs
  outlen = outlen || 32;
  input = util.normalizeInput(input);

  // do the math
  var ctx = blake2sInit(outlen, key);
  blake2sUpdate(ctx, input);
  return blake2sFinal(ctx)
}

// Computes the BLAKE2S hash of a string or byte array
//
// Returns an n-byte hash in hex, all lowercase
//
// Parameters:
// - input - the input bytes, as a string, Buffer, or Uint8Array
// - key - optional key Uint8Array, up to 32 bytes
// - outlen - optional output length in bytes, default 64
function blake2sHex (input, key, outlen) {
  var output = blake2s(input, key, outlen);
  return util.toHex(output)
}

var blake2s_1 = {
  blake2s: blake2s,
  blake2sHex: blake2sHex,
  blake2sInit: blake2sInit,
  blake2sUpdate: blake2sUpdate,
  blake2sFinal: blake2sFinal
};

var blakejs = {
  blake2b: blake2b_1.blake2b,
  blake2bHex: blake2b_1.blake2bHex,
  blake2bInit: blake2b_1.blake2bInit,
  blake2bUpdate: blake2b_1.blake2bUpdate,
  blake2bFinal: blake2b_1.blake2bFinal,
  blake2s: blake2s_1.blake2s,
  blake2sHex: blake2s_1.blake2sHex,
  blake2sInit: blake2s_1.blake2sInit,
  blake2sUpdate: blake2s_1.blake2sUpdate,
  blake2sFinal: blake2s_1.blake2sFinal
};

function str2ab(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
// From https://github.com/holochain/holochain/blob/dc0cb61d0603fa410ac5f024ed6ccfdfc29715b3/crates/holo_hash/src/encode.rs
function hash(content) {
    const contentString = typeof content === 'string' ? content : JSON.stringify(content);
    const hashable = new Uint8Array(str2ab(contentString));
    return blakejs.blake2b(hashable, null, 32);
}
const hashLocation = {};
function location(hash) {
    if (hashLocation[hash])
        return hashLocation[hash];
    const hash128 = blakejs.blake2b(hash, null, 16);
    const out = [hash128[0], hash128[1], hash128[2], hash128[3]];
    for (let i = 4; i < 16; i += 4) {
        out[0] ^= hash128[i];
        out[1] ^= hash128[i + 1];
        out[2] ^= hash128[i + 2];
        out[3] ^= hash128[i + 3];
    }
    const view = new DataView(new Uint8Array(out).buffer, 0);
    return view.getUint32(0, false);
}
// We return the distance as the shortest distance between two hashes in the circle
function distance(hash1, hash2) {
    const location1 = location(serializeHash(hash1));
    const location2 = location(serializeHash(hash2));
    return Math.min(location1 - location2, location2 - location1);
}
function compareBigInts(a, b) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}

function hashEntry(entry) {
    if (entry.entry_type === 'Agent')
        return entry.content;
    return hash(entry.content);
}
function getAppEntryType(entryType) {
    if (entryType.App)
        return entryType.App;
    return undefined;
}
function getEntryTypeString(cell, entryType) {
    const appEntryType = getAppEntryType(entryType);
    if (appEntryType) {
        const dna = cell.getSimulatedDna();
        return dna.zomes[appEntryType.zome_id].entry_defs[appEntryType.id].id;
    }
    return entryType;
}
function getDHTOpBasis(dhtOp) {
    switch (dhtOp.type) {
        case DHTOpType.StoreElement:
            return hash(dhtOp.header);
        case DHTOpType.StoreEntry:
            return dhtOp.header.header.content.entry_hash;
        case DHTOpType.RegisterUpdatedContent:
            return dhtOp.header.header.content.original_entry_address;
        case DHTOpType.RegisterAgentActivity:
            return dhtOp.header.header.content.author;
        case DHTOpType.RegisterAddLink:
            return dhtOp.header.header.content.base_address;
        case DHTOpType.RegisterRemoveLink:
            return dhtOp.header.header.content.base_address;
        case DHTOpType.RegisterDeletedBy:
            return dhtOp.header.header.content.deletes_address;
        case DHTOpType.RegisterDeletedEntryHeader:
            return dhtOp.header.header.content.deletes_entry_address;
        default:
            return undefined;
    }
}

const putValidationLimboValue = (dhtOpHash, validationLimboValue) => (state) => {
    state.validationLimbo[serializeHash(dhtOpHash)] = validationLimboValue;
};
const deleteValidationLimboValue = (dhtOpHash) => (state) => {
    const hash = serializeHash(dhtOpHash);
    delete state.validationLimbo[hash];
};
const putIntegrationLimboValue = (dhtOpHash, integrationLimboValue) => (state) => {
    state.integrationLimbo[serializeHash(dhtOpHash)] = integrationLimboValue;
};
const putDhtOpData = (dhtOp) => async (state) => {
    const headerHash = hash(dhtOp.header);
    state.CAS[serializeHash(headerHash)] = dhtOp.header;
    const entry = getEntry(dhtOp);
    if (entry) {
        const entryHash = hashEntry(entry);
        state.CAS[serializeHash(entryHash)] = entry;
    }
};
const putDhtOpMetadata = (dhtOp) => (state) => {
    const headerHash = hash(dhtOp.header);
    if (dhtOp.type === DHTOpType.StoreElement) {
        state.metadata.misc_meta[serializeHash(headerHash)] = 'StoreElement';
    }
    else if (dhtOp.type === DHTOpType.StoreEntry) {
        const entryHash = dhtOp.header.header.content.entry_hash;
        if (dhtOp.header.header.content.type === HeaderType.Update) {
            register_header_on_basis(headerHash, dhtOp.header.header.content)(state);
            register_header_on_basis(entryHash, dhtOp.header.header.content)(state);
        }
        register_header_on_basis(entryHash, dhtOp.header.header.content)(state);
        update_entry_dht_status(entryHash)(state);
    }
    else if (dhtOp.type === DHTOpType.RegisterAgentActivity) {
        state.metadata.misc_meta[serializeHash(headerHash)] = {
            ChainItem: dhtOp.header.header.content.timestamp,
        };
        state.metadata.misc_meta[serializeHash(dhtOp.header.header.content.author)] = {
            ChainStatus: ChainStatus.Valid,
        };
    }
    else if (dhtOp.type === DHTOpType.RegisterUpdatedContent ||
        dhtOp.type === DHTOpType.RegisterUpdatedElement) {
        register_header_on_basis(dhtOp.header.header.content.original_header_address, dhtOp.header.header.content)(state);
        register_header_on_basis(dhtOp.header.header.content.original_entry_address, dhtOp.header.header.content)(state);
        update_entry_dht_status(dhtOp.header.header.content.original_entry_address)(state);
    }
    else if (dhtOp.type === DHTOpType.RegisterDeletedBy ||
        dhtOp.type === DHTOpType.RegisterDeletedEntryHeader) {
        register_header_on_basis(dhtOp.header.header.content.deletes_address, dhtOp.header.header.content)(state);
        register_header_on_basis(dhtOp.header.header.content.deletes_entry_address, dhtOp.header.header.content)(state);
        update_entry_dht_status(dhtOp.header.header.content.deletes_entry_address)(state);
    }
    else if (dhtOp.type === DHTOpType.RegisterAddLink) {
        const key = {
            base: dhtOp.header.header.content.base_address,
            header_hash: headerHash,
            tag: dhtOp.header.header.content.tag,
            zome_id: dhtOp.header.header.content.zome_id,
        };
        const value = {
            link_add_hash: headerHash,
            tag: dhtOp.header.header.content.tag,
            target: dhtOp.header.header.content.target_address,
            timestamp: dhtOp.header.header.content.timestamp,
            zome_id: dhtOp.header.header.content.zome_id,
        };
        state.metadata.link_meta.push({ key, value });
    }
    else if (dhtOp.type === DHTOpType.RegisterRemoveLink) {
        const val = {
            DeleteLink: headerHash,
        };
        putSystemMetadata(dhtOp.header.header.content.link_add_address, val)(state);
    }
};
const update_entry_dht_status = (entryHash) => (state) => {
    const headers = getHeadersForEntry(state, entryHash);
    const entryIsAlive = headers.some(header => {
        const dhtHeaders = state.metadata.system_meta[serializeHash(hash(header))];
        return dhtHeaders
            ? dhtHeaders.find(metaVal => metaVal.Delete)
            : true;
    });
    state.metadata.misc_meta[serializeHash(entryHash)] = {
        EntryStatus: entryIsAlive ? EntryDhtStatus.Live : EntryDhtStatus.Dead,
    };
};
const register_header_on_basis = (basis, header) => (state) => {
    const headerHash = hash(header);
    let value;
    if (header.type === HeaderType.Create) {
        value = { NewEntry: headerHash };
    }
    else if (header.type === HeaderType.Update) {
        value = { Update: headerHash };
    }
    else if (header.type === HeaderType.Delete) {
        value = { Delete: headerHash };
    }
    if (value) {
        putSystemMetadata(basis, value)(state);
    }
};
const putSystemMetadata = (basis, value) => (state) => {
    const basisStr = serializeHash(basis);
    if (!state.metadata.system_meta[basisStr]) {
        state.metadata.system_meta[basisStr] = [];
    }
    state.metadata.system_meta[basisStr].push(value);
};
const putDhtOpToIntegrated = (dhtOpHash, integratedValue) => (state) => {
    state.integratedDHTOps[serializeHash(dhtOpHash)] = integratedValue;
};

/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
function getNewHeaders(state) {
    return state.sourceChain.filter(headerHash => !Object.keys(state.authoredDHTOps).includes(serializeHash(headerHash)));
}

const putElement = (element) => (state) => {
    // Put header in CAS
    const headerHash = element.signed_header.header.hash;
    state.CAS[serializeHash(headerHash)] = element.signed_header;
    // Put entry in CAS if it exist
    if (element.entry) {
        const entryHash = hashEntry(element.entry);
        state.CAS[serializeHash(entryHash)] = element.entry;
    }
    state.sourceChain.unshift(headerHash);
};

function getTipOfChain(cellState) {
    return cellState.sourceChain[0];
}
function getAuthor(cellState) {
    return getHeaderAt(cellState, 0).header.content.author;
}
function getDnaHash(state) {
    const firstHeaderHash = state.sourceChain[state.sourceChain.length - 1];
    const dna = state.CAS[serializeHash(firstHeaderHash)];
    return dna.header.content.hash;
}
function getHeaderAt(cellState, index) {
    const headerHash = cellState.sourceChain[index];
    return cellState.CAS[serializeHash(headerHash)];
}
function getNextHeaderSeq(cellState) {
    return cellState.sourceChain.length;
}
function getElement(state, headerHash) {
    const signed_header = state.CAS[serializeHash(headerHash)];
    let entry;
    if (signed_header.header.content.type == HeaderType.Create ||
        signed_header.header.content.type == HeaderType.Update) {
        entry = state.CAS[serializeHash(signed_header.header.content.entry_hash)];
    }
    return { signed_header, entry };
}
function getCellId(state) {
    const author = getAuthor(state);
    const dna = getDnaHash(state);
    return [dna, author];
}
function getNonPublishedDhtOps(state) {
    const nonPublishedDhtOps = {};
    for (const dhtOpHash of Object.keys(state.authoredDHTOps)) {
        const authoredValue = state.authoredDHTOps[dhtOpHash];
        if (authoredValue.last_publish_time === undefined) {
            nonPublishedDhtOps[dhtOpHash] = authoredValue.op;
        }
    }
    return nonPublishedDhtOps;
}

function buildShh(header) {
    return {
        header: {
            content: header,
            hash: hash(header),
        },
        signature: Uint8Array.from([]),
    };
}
function buildDna(dnaHash, agentId) {
    const dna = {
        author: agentId,
        hash: dnaHash,
        timestamp: now(),
        type: HeaderType.Dna,
    };
    return dna;
}
function buildAgentValidationPkg(state, membrane_proof) {
    const pkg = {
        ...buildCommon(state),
        membrane_proof,
        type: HeaderType.AgentValidationPkg,
    };
    return pkg;
}
function buildCreate(state, entry, entry_type) {
    const entry_hash = hashEntry(entry);
    const create = {
        ...buildCommon(state),
        entry_hash,
        entry_type,
        type: HeaderType.Create,
    };
    return create;
}
function buildCreateLink(state, zome_id, base, target, tag) {
    const create_link = {
        ...buildCommon(state),
        base_address: base,
        target_address: target,
        tag,
        zome_id,
        type: HeaderType.CreateLink,
    };
    return create_link;
}
function buildUpdate(state, entry, entry_type, original_entry_address, original_header_address) {
    const entry_hash = hashEntry(entry);
    const update = {
        ...buildCommon(state),
        entry_hash,
        entry_type,
        original_entry_address,
        original_header_address,
        type: HeaderType.Update,
    };
    return update;
}
/** Helpers */
function buildCommon(state) {
    const author = getAuthor(state);
    const header_seq = getNextHeaderSeq(state);
    const prev_header = getTipOfChain(state);
    const timestamp = now();
    return {
        author,
        header_seq,
        prev_header,
        timestamp,
    };
}

var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus[ValidationStatus["Valid"] = 0] = "Valid";
    ValidationStatus[ValidationStatus["Rejected"] = 1] = "Rejected";
    ValidationStatus[ValidationStatus["Abandoned"] = 2] = "Abandoned";
})(ValidationStatus || (ValidationStatus = {}));
var ValidationLimboStatus;
(function (ValidationLimboStatus) {
    ValidationLimboStatus[ValidationLimboStatus["Pending"] = 0] = "Pending";
    ValidationLimboStatus[ValidationLimboStatus["AwaitingSysDeps"] = 1] = "AwaitingSysDeps";
    ValidationLimboStatus[ValidationLimboStatus["SysValidated"] = 2] = "SysValidated";
    ValidationLimboStatus[ValidationLimboStatus["AwaitingAppDeps"] = 3] = "AwaitingAppDeps";
})(ValidationLimboStatus || (ValidationLimboStatus = {}));

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/integrate_dht_ops_workflow.rs
const integrate_dht_ops = async (cell) => {
    const opsToIntegrate = pullAllIntegrationLimboDhtOps(cell.state);
    for (const dhtOpHash of Object.keys(opsToIntegrate)) {
        const integrationLimboValue = opsToIntegrate[dhtOpHash];
        const dhtOp = integrationLimboValue.op;
        await putDhtOpData(dhtOp)(cell.state);
        putDhtOpMetadata(dhtOp)(cell.state);
        const value = {
            op: dhtOp,
            validation_status: integrationLimboValue.validation_status,
            when_integrated: Date.now(),
        };
        putDhtOpToIntegrated(deserializeHash(dhtOpHash), value)(cell.state);
    }
};
function integrate_dht_ops_task(cell) {
    return {
        name: 'Integrate DHT Ops',
        description: 'Integration of the validated DHTOp in our DHT shard',
        task: () => integrate_dht_ops(cell),
    };
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/app_validation_workflow.rs
const app_validation = async (cell) => {
    const pendingDhtOps = getValidationLimboDhtOps(cell.state, ValidationLimboStatus.SysValidated);
    // TODO: actually validate
    for (const dhtOpHashStr of Object.keys(pendingDhtOps)) {
        const dhtOpHash = deserializeHash(dhtOpHashStr);
        deleteValidationLimboValue(dhtOpHash)(cell.state);
        const validationLimboValue = pendingDhtOps[dhtOpHashStr];
        const value = {
            op: validationLimboValue.op,
            validation_status: ValidationStatus.Valid,
        };
        putIntegrationLimboValue(dhtOpHash, value)(cell.state);
    }
    cell.triggerWorkflow(integrate_dht_ops_task(cell));
};
function app_validation_task(cell) {
    return {
        name: 'App Validation of the DHT Op',
        description: 'Running of the zome appropriate zome hook',
        task: () => app_validation(cell),
    };
}

// Creates a new Create header and its entry in the source chain
const create_entry = (zome_index, cell) => async (args) => {
    const entry = { entry_type: 'App', content: args.content };
    const dna = cell.getSimulatedDna();
    const entryDefIndex = dna.zomes[zome_index].entry_defs.findIndex(entry_def => entry_def.id === args.entry_def_id);
    if (entryDefIndex < 0) {
        throw new Error(`Given entry def id ${args.entry_def_id} does not exist in this zome`);
    }
    const entry_type = {
        App: {
            id: entryDefIndex,
            zome_id: zome_index,
            visibility: dna.zomes[zome_index].entry_defs[entryDefIndex].visibility,
        },
    };
    const create = buildCreate(cell.state, entry, entry_type);
    const element = {
        signed_header: buildShh(create),
        entry,
    };
    putElement(element)(cell.state);
    return element.signed_header.header.hash;
};

// Creates a new CreateLink header in the source chain
const create_link = (zome_id, cell) => async (args) => {
    const createLink = buildCreateLink(cell.state, zome_id, args.base, args.target, args.tag);
    const element = {
        signed_header: buildShh(createLink),
        entry: undefined,
    };
    putElement(element)(cell.state);
    return element.signed_header.header.hash;
};

// Creates a new Create header and its entry in the source chain
const hash_entry = (zome_index, cell) => async (args) => {
    const entry = { entry_type: 'App', content: args.content };
    return hashEntry(entry);
};

async function ensure(path, hdk) {
    const headerHash = await hdk.create_entry({
        content: path,
        entry_def_id: 'path',
    });
    const components = path.split('.');
    if (components.length > 1) {
        components.splice(components.length - 1, 1);
        const parent = components.join('.');
        await ensure(parent, hdk);
        const pathHash = await hdk.hash_entry({ content: path });
        const parentHash = await hdk.hash_entry({ content: parent });
        await hdk.create_link({ base: parentHash, target: pathHash, tag: path });
    }
}
const path = {
    ensure,
};

function buildZomeFunctionContext(zome_index, cell) {
    return {
        create_entry: create_entry(zome_index, cell),
        hash_entry: hash_entry(),
        create_link: create_link(zome_index, cell),
        path,
    };
}

function publish_dht_ops_task(cell) {
    return {
        name: 'Publish DHT Ops',
        description: 'Read the elements in the authored DHT Ops that have not been published and publish them',
        task: () => publish_dht_ops(cell),
    };
}
// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/publish_dht_ops_workflow.rs
const publish_dht_ops = async (cell) => {
    const dhtOps = getNonPublishedDhtOps(cell.state);
    const dhtOpsByBasis = {};
    for (const dhtOpHash of Object.keys(dhtOps)) {
        const dhtOp = dhtOps[dhtOpHash];
        const basis = serializeHash(getDHTOpBasis(dhtOp));
        if (!dhtOpsByBasis[basis])
            dhtOpsByBasis[basis] = {};
        dhtOpsByBasis[basis][dhtOpHash] = dhtOp;
    }
    const promises = Object.entries(dhtOpsByBasis).map(async ([basis, dhtOps]) => {
        // Publish the operations
        await cell.p2p.publish(deserializeHash(basis), dhtOps);
        for (const dhtOpHash of Object.keys(dhtOps)) {
            cell.state.authoredDHTOps[dhtOpHash].last_publish_time = Date.now();
        }
    });
    await Promise.all(promises);
};

function produce_dht_ops_task(cell) {
    return {
        name: 'Produce DHT Ops',
        description: 'Read the new elements in the source chain and produce their appropriate DHT Ops',
        task: () => produce_dht_ops(cell),
    };
}
// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/produce_dht_ops_workflow.rs
const produce_dht_ops = async (cell) => {
    const newHeaderHashes = getNewHeaders(cell.state);
    for (const newHeaderHash of newHeaderHashes) {
        const element = getElement(cell.state, newHeaderHash);
        const dhtOps = elementToDHTOps(element);
        for (const dhtOp of dhtOps) {
            const dhtOpHash = hash(dhtOp);
            const dhtOpValue = {
                op: dhtOp,
                last_publish_time: undefined,
                receipt_count: 0,
            };
            cell.state.authoredDHTOps[serializeHash(dhtOpHash)] = dhtOpValue;
        }
    }
    cell.triggerWorkflow(publish_dht_ops_task(cell));
};

/**
 * Calls the zome function of the cell DNA
 * This can only be called in the simulated mode: we can assume that cell.simulatedDna exists
 */
const callZomeFn = (zomeName, fnName, payload, cap) => async (cell) => {
    const currentHeader = getTipOfChain(cell.state);
    const dna = cell.getSimulatedDna();
    if (!dna)
        throw new Error(`Trying to do a simulated call to a cell that is not simulated`);
    const zomeIndex = dna.zomes.findIndex(zome => zome.name === zomeName);
    if (zomeIndex < 0)
        throw new Error(`There is no zome with the name ${zomeName} in this DNA`);
    if (!dna.zomes[zomeIndex].zome_functions[fnName])
        throw new Error(`There is function with the name ${fnName} in this zome with the name ${zomeName}`);
    const context = buildZomeFunctionContext(zomeIndex, cell);
    const result = dna.zomes[zomeIndex].zome_functions[fnName].call(context)(payload);
    if (getTipOfChain(cell.state) != currentHeader) {
        // Do validation
        // Trigger production of DHT Ops
        cell.triggerWorkflow(produce_dht_ops_task(cell));
    }
    return result;
};

const genesis = (agentId, dnaHash, membrane_proof) => async (cell) => {
    const dna = buildDna(dnaHash, agentId);
    putElement({ signed_header: buildShh(dna), entry: undefined })(cell.state);
    const pkg = buildAgentValidationPkg(cell.state, membrane_proof);
    putElement({ signed_header: buildShh(pkg), entry: undefined })(cell.state);
    const entry = {
        content: agentId,
        entry_type: 'Agent',
    };
    const create_agent_pub_key_entry = buildCreate(cell.state, entry, 'Agent');
    putElement({
        signed_header: buildShh(create_agent_pub_key_entry),
        entry: entry,
    })(cell.state);
    cell.triggerWorkflow(produce_dht_ops_task(cell));
};

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/sys_validation_workflow.rs
const sys_validation = async (cell) => {
    const pendingDhtOps = getValidationLimboDhtOps(cell.state, ValidationLimboStatus.Pending);
    // TODO: actually validate
    for (const dhtOpHash of Object.keys(pendingDhtOps)) {
        const limboValue = pendingDhtOps[dhtOpHash];
        limboValue.status = ValidationLimboStatus.SysValidated;
        putValidationLimboValue(deserializeHash(dhtOpHash), limboValue);
    }
    cell.triggerWorkflow(app_validation_task(cell));
};
function sys_validation_task(cell) {
    return {
        name: 'System Validation of the DHT Op',
        description: 'Subconscious checks of data integrity',
        task: () => sys_validation(cell),
    };
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/incoming_dht_ops_workflow.rs
const incoming_dht_ops = (basis, dhtOps, from_agent) => async (cell) => {
    for (const dhtOpHash of Object.keys(dhtOps)) {
        const dhtOp = dhtOps[dhtOpHash];
        const validationLimboValue = {
            basis,
            from_agent,
            last_try: undefined,
            num_tries: 0,
            op: dhtOp,
            status: ValidationLimboStatus.Pending,
            time_added: Date.now(),
        };
        putValidationLimboValue(deserializeHash(dhtOpHash), validationLimboValue)(cell.state);
    }
    cell.triggerWorkflow(sys_validation_task(cell));
};

class ImmediateExecutor {
    async execute(task) {
        const result = await task.task();
        return result;
    }
}

class Cell {
    constructor(state, conductor, p2p) {
        this.state = state;
        this.conductor = conductor;
        this.p2p = p2p;
        this.executor = new ImmediateExecutor();
        this.#pendingWorkflows = [];
        this.#signals = {
            'after-workflow-executed': new Subject(),
            'before-workflow-executed': new Subject(),
        };
    }
    #pendingWorkflows;
    #signals;
    get cellId() {
        return getCellId(this.state);
    }
    get agentPubKey() {
        return this.cellId[1];
    }
    get dnaHash() {
        return this.cellId[0];
    }
    get signals() {
        return this.#signals;
    }
    getSimulatedDna() {
        return this.conductor.registeredDnas[serializeHash(this.dnaHash)];
    }
    static async create(conductor, cellId, membrane_proof) {
        const newCellState = {
            CAS: {},
            integrationLimbo: {},
            metadata: {
                link_meta: [],
                misc_meta: {},
                system_meta: {},
            },
            validationLimbo: {},
            integratedDHTOps: {},
            authoredDHTOps: {},
            sourceChain: [],
        };
        const p2p = conductor.network.createP2pCell(cellId);
        const cell = new Cell(newCellState, conductor, p2p);
        await cell.executor.execute({
            name: 'Genesis Workflow',
            description: 'Initialize the cell with all the needed databases',
            task: () => genesis(cellId[1], cellId[0], membrane_proof)(cell),
        });
        return cell;
    }
    getState() {
        return this.state;
    }
    triggerWorkflow(workflow) {
        this.#pendingWorkflows.push(workflow);
        setTimeout(() => this._runPendingWorkflows());
    }
    async _runPendingWorkflows() {
        const workflowsToRun = this.#pendingWorkflows;
        this.#pendingWorkflows = [];
        const promises = workflowsToRun.map(w => {
            this.#signals['before-workflow-executed'].next(w);
            this.executor
                .execute(w)
                .then(() => this.#signals['after-workflow-executed'].next(w));
        });
        await Promise.all(promises);
    }
    /** Workflows */
    callZomeFn(args) {
        return this.executor.execute({
            name: 'Call Zome Function Workflow',
            description: `Zome: ${args.zome}, Function name: ${args.fnName}`,
            task: () => callZomeFn(args.zome, args.fnName, args.payload, args.cap)(this),
        });
    }
    /** Network handlers */
    // https://github.com/holochain/holochain/blob/develop/crates/holochain/src/conductor/cell.rs#L429
    handle_publish(from_agent, dht_hash, // The basis for the DHTOps
    ops) {
        return incoming_dht_ops(dht_hash, ops, from_agent)(this);
    }
}

// From: https://github.com/holochain/holochain/blob/develop/crates/holochain_p2p/src/types/actor.rs
class P2pCell {
    constructor(state, cellId, network) {
        this.cellId = cellId;
        this.network = network;
        this.peers = state.peers;
    }
    getState() {
        return {
            peers: this.peers,
            redundancyFactor: this.redundancyFactor,
        };
    }
    async join(dnaHash, agent_pub_key) { }
    async leave(dnaHash, agent_pub_key) { }
    async publish(dht_hash, ops) {
        const neighbors = this._getClosestNeighbors(dht_hash, this.redundancyFactor);
        const promises = neighbors.map(neighbor => this._sendMessage(neighbor, cell => cell.handle_publish(this.cellId[1], dht_hash, ops)));
        await Promise.all(promises);
    }
    async get(dna_hash, from_agent, dht_hash, _options // TODO: complete?
    ) {
        return undefined;
    }
    getNeighbors() {
        return this.peers;
    }
    _getClosestNeighbors(basisHash, neighborCount) {
        const sortedPeers = [...this.peers, this.cellId[1]].sort((agentA, agentB) => {
            const distanceA = distance(basisHash, agentA);
            const distanceB = distance(basisHash, agentB);
            return compareBigInts(distanceA, distanceB);
        });
        return sortedPeers.slice(0, neighborCount);
    }
    _sendMessage(toAgent, message) {
        return this.network.sendMessage(this.cellId[0], this.cellId[1], toAgent, message);
    }
}

class Network {
    constructor(state, conductor) {
        this.conductor = conductor;
        this.p2pCells = state.p2pCellsState.map(s => ({
            id: s.id,
            p2pCell: new P2pCell(s.state, s.id, this),
        }));
        this.peerCells = {};
    }
    getState() {
        return {
            p2pCellsState: this.p2pCells.map(c => ({
                id: c.id,
                state: c.p2pCell.getState(),
            })),
        };
    }
    // TODO: change this to simulate networking if necessary
    connectWith(conductor) {
        for (const myCell of this.p2pCells) {
            const cellDna = serializeHash(myCell.id[0]);
            for (const cell of conductor.cells) {
                if (serializeHash(cell.id[0]) === cellDna) {
                    if (!this.peerCells[cellDna])
                        this.peerCells[cellDna] = {};
                    this.peerCells[cellDna][serializeHash(cell.id[1])] = cell.cell;
                    myCell.p2pCell.peers.push(cell.id[1]);
                }
            }
        }
    }
    createP2pCell(cellId) {
        const peersOfTheSameDna = this.peerCells[serializeHash(cellId[0])];
        const peersAlreadyKnown = peersOfTheSameDna
            ? Object.keys(peersOfTheSameDna).map(deserializeHash)
            : [];
        const state = {
            peers: peersAlreadyKnown,
            redundancyFactor: 3,
        };
        const p2pCell = new P2pCell(state, cellId, this);
        this.p2pCells.push({ id: cellId, p2pCell });
        return p2pCell;
    }
    sendMessage(dna, fromAgent, toAgent, message) {
        const localCell = this.conductor.cells.find(cell => isEqual(cell.id[0], dna) && isEqual(cell.id[1], toAgent));
        if (localCell)
            return message(localCell.cell);
        return message(this.peerCells[serializeHash(dna)][serializeHash(toAgent)]);
    }
}

class Conductor {
    constructor(state) {
        this.network = new Network(state.networkState, this);
        this.cells = state.cellsState.map(({ id, state }) => ({
            id,
            cell: new Cell(state, this, this.network.createP2pCell(id)),
        }));
        this.registeredDnas = state.registeredDnas;
        this.registeredTemplates = state.registeredTemplates;
    }
    static async create() {
        const state = {
            cellsState: [],
            networkState: {
                p2pCellsState: [],
            },
            registeredDnas: {},
            registeredTemplates: {},
        };
        return new Conductor(state);
    }
    getState() {
        return {
            networkState: this.network.getState(),
            cellsState: this.cells.map(c => ({
                id: c.id,
                state: c.cell.getState(),
            })),
            registeredDnas: this.registeredDnas,
            registeredTemplates: this.registeredTemplates,
        };
    }
    getCells(dnaHash) {
        const dnaHashStr = serializeHash(dnaHash);
        return this.cells
            .filter(cell => serializeHash(cell.id[1]) === dnaHashStr)
            .map(c => c.cell);
    }
    async registerDna(dna_template) {
        const templateHash = hash(dna_template);
        this.registeredTemplates[serializeHash(templateHash)] = dna_template;
        return templateHash;
    }
    async installApp(dna_hash, membrane_proof, properties, uuid) {
        const rand = `${Math.random().toString()}/${Date.now()}`;
        const agentId = hash(rand);
        const template = this.registeredTemplates[serializeHash(dna_hash)];
        if (!template) {
            throw new Error(`The given dna is not registered on this conductor`);
        }
        const dna = {
            ...template,
            properties,
            uuid,
        };
        const dnaHash = hash(dna);
        this.registeredDnas[serializeHash(dnaHash)] = dna;
        const cellId = [dnaHash, agentId];
        const cell = await Cell.create(this, cellId, membrane_proof);
        this.cells.push({ id: cell.cellId, cell });
        return cell;
    }
    callZomeFn(args) {
        const dnaHashStr = serializeHash(args.cellId[0]);
        const agentPubKeyStr = serializeHash(args.cellId[1]);
        const cell = this.cells.find(cell => serializeHash(cell.id[0]) === dnaHashStr &&
            serializeHash(cell.id[1]) === agentPubKeyStr);
        if (!cell)
            throw new Error(`No cells existst with cellId ${dnaHashStr}:${agentPubKeyStr}`);
        return cell.cell.callZomeFn({
            zome: args.zome,
            cap: args.cap,
            fnName: args.fnName,
            payload: args.payload,
        });
    }
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create_entry: create_entry,
    buildZomeFunctionContext: buildZomeFunctionContext
});

const sampleZome = {
    name: 'sample',
    entry_defs: [
        {
            id: 'sample_entry',
            visibility: 'Public',
        },
        {
            id: 'path',
            visibility: 'Public',
        },
    ],
    zome_functions: {
        create_entry: {
            call: ({ create_entry }) => ({ content }) => {
                return create_entry({ content, entry_def_id: 'sample_entry' });
            },
            arguments: [{ name: 'content', type: 'any' }],
        },
        create_link: {
            call: ({ create_link }) => ({ base, target, tag }) => {
                return create_link({ base, target, tag });
            },
            arguments: [
                { name: 'base', type: 'EntryHash' },
                { name: 'target', type: 'EntryHash' },
                { name: 'any', type: 'EntryHash' },
            ],
        },
        create_path: {
            call: hdk => ({ pathContent }) => {
                return hdk.path.ensure(pathContent, hdk);
            },
            arguments: [{ name: 'pathContent', type: 'String' }],
        },
    },
};
function sampleDnaTemplate() {
    const zomes = [sampleZome];
    return {
        zomes,
    };
}

function hookUpConductors(conductors) {
    for (let i = 0; i < conductors.length; i += 1) {
        for (let j = 0; j < conductors.length; j += 1) {
            if (i !== j) {
                conductors[i].network.connectWith(conductors[j]);
            }
        }
    }
}

async function createConductors(conductorsToCreate, currentConductors, dnaTemplate) {
    const newConductorsPromises = [];
    for (let i = 0; i < conductorsToCreate; i++) {
        const conductor = Conductor.create();
        newConductorsPromises.push(conductor);
    }
    const newConductors = await Promise.all(newConductorsPromises);
    const allConductors = [...currentConductors, ...newConductors];
    await Promise.all(allConductors.map(async (c) => {
        const dnaHash = await c.registerDna(dnaTemplate);
        await c.installApp(dnaHash, null, null, '');
    }));
    hookUpConductors(allConductors);
    return allConductors;
}

export { Cell, Conductor, index as Hdk, ImmediateExecutor, Network, P2pCell, ValidationLimboStatus, ValidationStatus, app_validation, app_validation_task, buildAgentValidationPkg, buildCreate, buildCreateLink, buildDna, buildShh, buildUpdate, callZomeFn, compareBigInts, createConductors, deleteValidationLimboValue, distance, genesis, getAllAuthoredEntries, getAllHeldEntries, getAppEntryType, getAuthor, getCellId, getDHTOpBasis, getDhtShard, getDnaHash, getElement, getEntryDetails, getEntryDhtStatus, getEntryTypeString, getHeaderAt, getHeadersForEntry, getLinksForEntry, getNewHeaders, getNextHeaderSeq, getNonPublishedDhtOps, getTipOfChain, getValidationLimboDhtOps, hash, hashEntry, hashLocation, incoming_dht_ops, integrate_dht_ops, integrate_dht_ops_task, isHoldingEntry, location, produce_dht_ops, produce_dht_ops_task, publish_dht_ops, publish_dht_ops_task, pullAllIntegrationLimboDhtOps, putDhtOpData, putDhtOpMetadata, putDhtOpToIntegrated, putElement, putIntegrationLimboValue, putSystemMetadata, putValidationLimboValue, register_header_on_basis, sampleDnaTemplate, sampleZome, sys_validation, sys_validation_task };
//# sourceMappingURL=index.js.map
