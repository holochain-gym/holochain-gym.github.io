import { CellState } from '../../../types/cell-state';
/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
export declare function getNewHeaders(state: CellState): Array<string>;
