import { CellId, Dictionary, Hash } from '../types/common';
import { Cell } from './cell';
import { Conductor } from './conductor';
import { P2pCell, P2pCellState } from './network/p2p-cell';
export interface NetworkState {
    p2pCellsState: Array<{
        id: CellId;
        state: P2pCellState;
    }>;
}
export declare class Network {
    p2pCells: Array<{
        id: CellId;
        p2pCell: P2pCell;
    }>;
    peerCells: Dictionary<Dictionary<Cell>>;
    constructor(state: NetworkState);
    getState(): NetworkState;
    connectWith(conductor: Conductor): void;
    createP2pCell(cellId: CellId): P2pCell;
    sendMessage<T>(dna: Hash, fromAgent: Hash, toAgent: Hash, message: NetworkMessage<T>): Promise<T>;
}
export declare type NetworkMessage<T> = (cell: Cell) => Promise<T>;
