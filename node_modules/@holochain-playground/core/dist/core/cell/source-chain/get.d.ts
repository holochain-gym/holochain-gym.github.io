import { Hash } from '@holochain-open-dev/core-types';
import { CellState } from '../state';
/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
export declare function getNewHeaders(state: CellState): Array<Hash>;
