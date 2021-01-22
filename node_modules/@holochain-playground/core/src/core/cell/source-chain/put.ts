import { CellState } from '../state';
import { Element } from '@holochain-open-dev/core-types';
import { serializeHash } from '@holochain-open-dev/common';
import { hashEntry } from '../utils';

export const putElement = (element: Element) => (state: CellState): void => {
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
