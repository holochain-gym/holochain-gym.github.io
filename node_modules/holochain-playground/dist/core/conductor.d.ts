import { Cell } from '../core/cell';
import { Network, NetworkState } from './network';
import { CellState } from '../types/cell-state';
import { SimulatedDna } from '../dnas/simulated-dna';
import { CellId } from '../types/common';
export interface ConductorState {
    cellsState: Array<{
        id: CellId;
        state: CellState;
        dna?: SimulatedDna;
    }>;
    networkState: NetworkState;
}
export declare class Conductor {
    readonly cells: Array<{
        id: CellId;
        cell: Cell;
    }>;
    network: Network;
    constructor(state: ConductorState);
    static create(): Promise<Conductor>;
    getState(): ConductorState;
    getCells(dnaHash: string): Cell[];
    installDna(dna: SimulatedDna, membrane_proof: any): Promise<Cell>;
    callZomeFn(args: {
        cellId: CellId;
        zome: string;
        fnName: string;
        payload: any;
        cap: string;
    }): Promise<any>;
}
