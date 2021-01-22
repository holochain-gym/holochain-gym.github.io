import { serializeHash } from '@holochain-open-dev/common';
import { Hash } from '@holochain-open-dev/core-types';
import { CellState } from '../state';

/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
export function getNewHeaders(state: CellState): Array<Hash> {
  return state.sourceChain.filter(
    headerHash =>
      !Object.keys(state.authoredDHTOps).includes(serializeHash(headerHash))
  );
}
