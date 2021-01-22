import { serializeHash } from '@holochain-open-dev/common';
import {
  Hash,
  AgentPubKey,
  Dna,
  Header,
  HeaderType,
  CellId,
  Element,
  Dictionary,
  DHTOp,
  SignedHeaderHashed,
} from '@holochain-open-dev/core-types';
import { CellState } from '../state';

export function getTipOfChain(cellState: CellState): Hash {
  return cellState.sourceChain[0];
}

export function getAuthor(cellState: CellState): AgentPubKey {
  return getHeaderAt(cellState, 0).header.content.author;
}

export function getDnaHash(state: CellState): Hash {
  const firstHeaderHash = state.sourceChain[state.sourceChain.length - 1];

  const dna: SignedHeaderHashed<Dna> =
    state.CAS[serializeHash(firstHeaderHash)];
  return dna.header.content.hash;
}

export function getHeaderAt(
  cellState: CellState,
  index: number
): SignedHeaderHashed {
  const headerHash = cellState.sourceChain[index];
  return cellState.CAS[serializeHash(headerHash)];
}

export function getNextHeaderSeq(cellState: CellState): number {
  return cellState.sourceChain.length;
}

export function getElement(state: CellState, headerHash: Hash): Element {
  const signed_header: SignedHeaderHashed =
    state.CAS[serializeHash(headerHash)];

  let entry;
  if (
    signed_header.header.content.type == HeaderType.Create ||
    signed_header.header.content.type == HeaderType.Update
  ) {
    entry = state.CAS[serializeHash(signed_header.header.content.entry_hash)];
  }
  return { signed_header, entry };
}

export function getCellId(state: CellState): CellId {
  const author = getAuthor(state);
  const dna = getDnaHash(state);
  return [dna, author];
}

export function getNonPublishedDhtOps(state: CellState): Dictionary<DHTOp> {
  const nonPublishedDhtOps: Dictionary<DHTOp> = {};
  for (const dhtOpHash of Object.keys(state.authoredDHTOps)) {
    const authoredValue = state.authoredDHTOps[dhtOpHash];
    if (authoredValue.last_publish_time === undefined) {
      nonPublishedDhtOps[dhtOpHash] = authoredValue.op;
    }
  }

  return nonPublishedDhtOps;
}
