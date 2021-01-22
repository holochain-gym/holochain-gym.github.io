import { CellId, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { serializeHash } from '@holochain-open-dev/common';
import { Cell } from '../core/cell';
import { hash } from '../processors/hash';
import { Network, NetworkState } from './network/network';

import { SimulatedDna, SimulatedDnaTemplate } from '../dnas/simulated-dna';
import { CellState } from './cell/state';

export interface ConductorState {
  cellsState: Array<{ id: CellId; state: CellState }>;
  networkState: NetworkState;
  registeredTemplates: Dictionary<SimulatedDnaTemplate>;
  registeredDnas: Dictionary<SimulatedDna>;
}

export class Conductor {
  readonly cells: Array<{ id: CellId; cell: Cell }>;
  registeredTemplates!: Dictionary<SimulatedDnaTemplate>;
  registeredDnas!: Dictionary<SimulatedDna>;

  network: Network;

  constructor(state: ConductorState) {
    this.network = new Network(state.networkState, this);
    this.cells = state.cellsState.map(({ id, state }) => ({
      id,
      cell: new Cell(state, this, this.network.createP2pCell(id)),
    }));
    this.registeredDnas = state.registeredDnas;
    this.registeredTemplates = state.registeredTemplates;
  }

  static async create(): Promise<Conductor> {
    const state: ConductorState = {
      cellsState: [],
      networkState: {
        p2pCellsState: [],
      },
      registeredDnas: {},
      registeredTemplates: {},
    };

    return new Conductor(state);
  }

  getState(): ConductorState {
    return {
      networkState: this.network.getState(),
      cellsState: this.cells.map(c => ({
        id: c.id,
        state: c.cell.getState(),
      })),
      registeredDnas: this.registeredDnas,
      registeredTemplates: this.registeredTemplates,
    };
  }

  getCells(dnaHash: Hash): Cell[] {
    const dnaHashStr = serializeHash(dnaHash);
    return this.cells
      .filter(cell => serializeHash(cell.id[1]) === dnaHashStr)
      .map(c => c.cell);
  }

  async registerDna(dna_template: SimulatedDnaTemplate): Promise<Hash> {
    const templateHash = hash(dna_template);

    this.registeredTemplates[serializeHash(templateHash)] = dna_template;
    return templateHash;
  }

  async installApp(
    dna_hash: Hash,
    membrane_proof: any,
    properties: any,
    uuid: string
  ): Promise<Cell> {
    const rand = `${Math.random().toString()}/${Date.now()}`;
    const agentId = hash(rand);

    const template = this.registeredTemplates[serializeHash(dna_hash)];
    if (!template) {
      throw new Error(`The given dna is not registered on this conductor`);
    }

    const dna: SimulatedDna = {
      ...template,
      properties,
      uuid,
    };
    const dnaHash = hash(dna);
    this.registeredDnas[serializeHash(dnaHash)] = dna;

    const cellId: CellId = [dnaHash, agentId];
    const cell = await Cell.create(this, cellId, membrane_proof);

    this.cells.push({ id: cell.cellId, cell });

    return cell;
  }

  callZomeFn(args: {
    cellId: CellId;
    zome: string;
    fnName: string;
    payload: any;
    cap: string;
  }): Promise<any> {
    const dnaHashStr = serializeHash(args.cellId[0]);
    const agentPubKeyStr = serializeHash(args.cellId[1]);
    const cell = this.cells.find(
      cell =>
        serializeHash(cell.id[0]) === dnaHashStr &&
        serializeHash(cell.id[1]) === agentPubKeyStr
    );

    if (!cell)
      throw new Error(
        `No cells existst with cellId ${dnaHashStr}:${agentPubKeyStr}`
      );

    return cell.cell.callZomeFn({
      zome: args.zome,
      cap: args.cap,
      fnName: args.fnName,
      payload: args.payload,
    });
  }
}
