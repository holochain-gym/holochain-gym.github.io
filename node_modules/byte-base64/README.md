### byte-base64

base64 utilities for TypeScript and JavaScript.

This library allows you to encode all the following data structures to a base64-encoded string and back:

* Uint8Array of bytes
* JS array of bytes - encoded as numbers from 0 to 255
* JS string - using any encoding supported by
[TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) and
[TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)

All other known solutions and approaches provide only a limited support for these features. In particular,
[atob](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) and
[btoa](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) only support ASCII strings.

byte-base64 is available as [npm package](https://www.npmjs.com/package/byte-base64).

    npm i byte-base64

Consumption:

    import * as base64 from "byte-base64";

Functions:

* `bytesToBase64(bytes: number[] | Uint8Array): string` - Encodes a Uint8Array or JS array of bytes to a base64-encoded
string.
* `base64ToBytes(str: string): Uint8Array` - Decodes a base64-encoded string to a Uint8Array of bytes. If `str` is not a
valid base64-encoded string, throws `new Error("Unable to parse base64 string.")`.
* `base64encode(str: string, encoder: { encode: (str: string) => Uint8Array | number[] } = new TextEncoder())` -
Encodes a JS string to a base64-encoded string using the specified character encoding. The encoding defaults
to `new TextEncoder()` which represents UTF-8 encoding.
* `base64decode(str: string, decoder: { decode: (bytes: Uint8Array) => string } = new TextDecoder())` - Decodes
a base64-encoded string to a JS string using the specified character encoding. The encoding defaults
to `new TextDecoder()` which represents UTF-8 encoding. If `str` is not a valid base64-encoded string,
throws `new Error("Unable to parse base64 string.")`.

[TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) supports only UTF-8 encoding in the majority
of browsers. For more encodings, consider using a [polyfill](https://github.com/inexorabletash/text-encoding).

Project license is [MIT](https://github.com/enepomnyaschih/byte-base64/blob/master/LICENSE).
