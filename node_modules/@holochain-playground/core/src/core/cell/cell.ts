import { Observable, Subject } from 'rxjs';
import {
  CellId,
  AgentPubKey,
  Hash,
  Dictionary,
  DHTOp,
} from '@holochain-open-dev/core-types';
import { Conductor } from '../conductor';
import { genesis } from './workflows/genesis';
import { Executor, Task } from '../../executor/executor';
import { ImmediateExecutor } from '../../executor/immediate-executor';
import { callZomeFn } from './workflows/call_zome_fn';
import { getCellId, getDnaHash } from './source-chain/utils';
import { P2pCell } from '../network/p2p-cell';
import { incoming_dht_ops } from './workflows/incoming_dht_ops';
import { CellState } from './state';
import { serializeHash } from '@holochain-open-dev/common';

export type CellSignal = 'after-workflow-executed' | 'before-workflow-executed';
export type CellSignalListener = (payload: any) => void;

export class Cell {
  executor: Executor = new ImmediateExecutor();

  #pendingWorkflows: Array<Task<any>> = [];

  #signals = {
    'after-workflow-executed': new Subject<Task<any>>(),
    'before-workflow-executed': new Subject<Task<any>>(),
  };

  constructor(
    public state: CellState,
    public conductor: Conductor,
    public p2p: P2pCell
  ) {}

  get cellId(): CellId {
    return getCellId(this.state);
  }

  get agentPubKey(): AgentPubKey {
    return this.cellId[1];
  }

  get dnaHash(): Hash {
    return this.cellId[0];
  }

  get signals() {
    return this.#signals;
  }

  getSimulatedDna() {
    return this.conductor.registeredDnas[serializeHash(this.dnaHash)];
  }

  static async create(
    conductor: Conductor,
    cellId: CellId,
    membrane_proof: any
  ): Promise<Cell> {
    const newCellState: CellState = {
      CAS: {},
      integrationLimbo: {},
      metadata: {
        link_meta: [],
        misc_meta: {},
        system_meta: {},
      },
      validationLimbo: {},
      integratedDHTOps: {},
      authoredDHTOps: {},
      sourceChain: [],
    };

    const p2p = conductor.network.createP2pCell(cellId);

    const cell = new Cell(newCellState, conductor, p2p);

    await cell.executor.execute({
      name: 'Genesis Workflow',
      description: 'Initialize the cell with all the needed databases',
      task: () => genesis(cellId[1], cellId[0], membrane_proof)(cell),
    });

    return cell;
  }

  getState(): CellState {
    return this.state;
  }

  triggerWorkflow(workflow: Task<any>) {
    this.#pendingWorkflows.push(workflow);

    setTimeout(() => this._runPendingWorkflows());
  }

  async _runPendingWorkflows() {
    const workflowsToRun = this.#pendingWorkflows;
    this.#pendingWorkflows = [];

    const promises = workflowsToRun.map(w => {
      this.#signals['before-workflow-executed'].next(w);
      this.executor
        .execute(w)
        .then(() => this.#signals['after-workflow-executed'].next(w));
    });

    await Promise.all(promises);
  }

  /** Workflows */

  callZomeFn(args: {
    zome: string;
    fnName: string;
    payload: any;
    cap: string;
  }): Promise<any> {
    return this.executor.execute({
      name: 'Call Zome Function Workflow',
      description: `Zome: ${args.zome}, Function name: ${args.fnName}`,
      task: () =>
        callZomeFn(args.zome, args.fnName, args.payload, args.cap)(this),
    });
  }

  /** Network handlers */
  // https://github.com/holochain/holochain/blob/develop/crates/holochain/src/conductor/cell.rs#L429
  public handle_publish(
    from_agent: AgentPubKey,
    dht_hash: Hash, // The basis for the DHTOps
    ops: Dictionary<DHTOp>
  ): Promise<void> {
    return incoming_dht_ops(dht_hash, ops, from_agent)(this);
  }
}
