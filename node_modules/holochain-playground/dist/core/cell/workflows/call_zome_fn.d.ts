import { Cell } from '../../cell';
/**
 * Calls the zome function of the cell DNA
 * This can only be called in the simulated mode: we can assume that cell.simulatedDna exists
 */
export declare const callZomeFn: (zome: string, fnName: string, payload: any, cap: string) => (cell: Cell) => Promise<any>;
