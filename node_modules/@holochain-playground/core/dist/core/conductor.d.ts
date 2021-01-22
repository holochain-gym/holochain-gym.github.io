import { CellId, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { Cell } from '../core/cell';
import { Network, NetworkState } from './network/network';
import { SimulatedDna, SimulatedDnaTemplate } from '../dnas/simulated-dna';
import { CellState } from './cell/state';
export interface ConductorState {
    cellsState: Array<{
        id: CellId;
        state: CellState;
    }>;
    networkState: NetworkState;
    registeredTemplates: Dictionary<SimulatedDnaTemplate>;
    registeredDnas: Dictionary<SimulatedDna>;
}
export declare class Conductor {
    readonly cells: Array<{
        id: CellId;
        cell: Cell;
    }>;
    registeredTemplates: Dictionary<SimulatedDnaTemplate>;
    registeredDnas: Dictionary<SimulatedDna>;
    network: Network;
    constructor(state: ConductorState);
    static create(): Promise<Conductor>;
    getState(): ConductorState;
    getCells(dnaHash: Hash): Cell[];
    registerDna(dna_template: SimulatedDnaTemplate): Promise<Hash>;
    installApp(dna_hash: Hash, membrane_proof: any, properties: any, uuid: string): Promise<Cell>;
    callZomeFn(args: {
        cellId: CellId;
        zome: string;
        fnName: string;
        payload: any;
        cap: string;
    }): Promise<any>;
}
