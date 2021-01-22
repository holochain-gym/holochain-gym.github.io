import '../types/common.js';
import { h as hash } from '../hash-7578db5d.js';
import '../types/entry.js';
import '../types/header.js';
import '../types/timestamp.js';
import './cell/source-chain/utils.js';
import './cell/source-chain/builder-headers.js';
import './cell/source-chain/put.js';
import '../types/dht-op.js';
import './cell/source-chain/get.js';
import './cell/workflows/publish_dht_ops.js';
import './cell/workflows/produce_dht_ops.js';
import './cell/workflows/genesis.js';
import '../executor/immediate-executor.js';
import './cell/workflows/call_zome_fn.js';
import '../types/cell-state.js';
import '../types/metadata.js';
import '../get-ecef9c10.js';
import './cell/dht/put.js';
import './cell/workflows/integrate_dht_ops.js';
import './cell/workflows/app_validation.js';
import './cell/workflows/sys_validation.js';
import './cell/workflows/incoming_dht_ops.js';
import { C as Cell } from '../cell-19f9d2f9.js';
import './network/p2p-cell.js';
import { Network } from './network.js';

class Conductor {
    constructor(state) {
        this.network = new Network(state.networkState);
        this.cells = state.cellsState.map(({ id, state, dna }) => ({
            id,
            cell: new Cell(state, this.network.createP2pCell(id), dna),
        }));
    }
    static async create() {
        const state = {
            cellsState: [],
            networkState: {
                p2pCellsState: [],
            },
        };
        return new Conductor(state);
    }
    getState() {
        return {
            networkState: this.network.getState(),
            cellsState: this.cells.map((c) => ({
                id: c.id,
                state: c.cell.getState(),
            })),
        };
    }
    getCells(dnaHash) {
        return this.cells
            .filter((cell) => cell.id[1] === dnaHash)
            .map((c) => c.cell);
    }
    async installDna(dna, membrane_proof) {
        const rand = Math.random().toString();
        const agentId = hash(rand);
        const cell = await Cell.create(this, dna, agentId, membrane_proof);
        this.cells.push({ id: cell.cellId, cell });
        return cell;
    }
    callZomeFn(args) {
        const cell = this.cells.find((cell) => cell.id[0] === args.cellId[0] && cell.id[1] === args.cellId[1]);
        if (!cell)
            throw new Error(`No cells existst with cellId ${args.cellId[0]}:${args.cellId[1]}`);
        return cell.cell.callZomeFn({
            zome: args.zome,
            cap: args.cap,
            fnName: args.fnName,
            payload: args.payload,
        });
    }
}

export { Conductor };
//# sourceMappingURL=conductor.js.map
