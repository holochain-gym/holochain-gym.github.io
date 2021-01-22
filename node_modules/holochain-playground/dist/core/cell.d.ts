import { AgentPubKey, CellId, Dictionary, Hash } from '../types/common';
import { DHTOp } from '../types/dht-op';
import { Conductor } from './conductor';
import { CellState } from '../types/cell-state';
import { Executor, Task } from '../executor/executor';
import { SimulatedDna } from '../dnas/simulated-dna';
import { P2pCell } from './network/p2p-cell';
import { Subject } from 'rxjs';
export declare type CellSignal = 'after-workflow-executed' | 'before-workflow-executed';
export declare type CellSignalListener = (payload: any) => void;
export declare class Cell {
    #private;
    state: CellState;
    p2p: P2pCell;
    simulatedDna?: SimulatedDna | undefined;
    executor: Executor;
    constructor(state: CellState, p2p: P2pCell, simulatedDna?: SimulatedDna | undefined);
    get cellId(): CellId;
    get agentPubKey(): AgentPubKey;
    get dnaHash(): Hash;
    get signals(): {
        'after-workflow-executed': Subject<Task<any>>;
        'before-workflow-executed': Subject<Task<any>>;
    };
    static create(conductor: Conductor, simulatedDna: SimulatedDna, agentId: AgentPubKey, membrane_proof: any): Promise<Cell>;
    getState(): CellState;
    triggerWorkflow(workflow: Task<any>): void;
    _runPendingWorkflows(): Promise<void>;
    /** Workflows */
    callZomeFn(args: {
        zome: string;
        fnName: string;
        payload: any;
        cap: string;
    }): Promise<any>;
    /** Network handlers */
    handle_publish(from_agent: AgentPubKey, dht_hash: Hash, // The basis for the DHTOps
    ops: Dictionary<DHTOp>): Promise<void>;
}
