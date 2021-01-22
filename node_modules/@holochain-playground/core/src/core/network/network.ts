import { deserializeHash, serializeHash } from '@holochain-open-dev/common';
import { CellId, Dictionary, Hash } from '@holochain-open-dev/core-types';
import { isEqual } from 'lodash-es';
import { Cell } from '../cell';
import { Conductor } from '../conductor';
import { P2pCell, P2pCellState } from '../network/p2p-cell';

export interface NetworkState {
  p2pCellsState: Array<{ id: CellId; state: P2pCellState }>; // P2pCellState by dna hash
}

export class Network {
  // P2pCells contained in this conductor
  p2pCells: Array<{ id: CellId; p2pCell: P2pCell }>;

  // Cell connection segmentated by [dna][agent_pub_key]
  peerCells: Dictionary<Dictionary<Cell>>;

  constructor(state: NetworkState, public conductor: Conductor) {
    this.p2pCells = state.p2pCellsState.map(s => ({
      id: s.id,
      p2pCell: new P2pCell(s.state, s.id, this),
    }));
    this.peerCells = {};
  }

  getState(): NetworkState {
    return {
      p2pCellsState: this.p2pCells.map(c => ({
        id: c.id,
        state: c.p2pCell.getState(),
      })),
    };
  }

  // TODO: change this to simulate networking if necessary
  connectWith(conductor: Conductor) {
    for (const myCell of this.p2pCells) {
      const cellDna = serializeHash(myCell.id[0]);
      for (const cell of conductor.cells) {
        if (serializeHash(cell.id[0]) === cellDna) {
          if (!this.peerCells[cellDna]) this.peerCells[cellDna] = {};
          this.peerCells[cellDna][serializeHash(cell.id[1])] = cell.cell;

          myCell.p2pCell.peers.push(cell.id[1]);
        }
      }
    }
  }

  createP2pCell(cellId: CellId): P2pCell {
    const peersOfTheSameDna = this.peerCells[serializeHash(cellId[0])];
    const peersAlreadyKnown = peersOfTheSameDna
      ? Object.keys(peersOfTheSameDna).map(deserializeHash)
      : [];

    const state: P2pCellState = {
      peers: peersAlreadyKnown,
      redundancyFactor: 3,
    };

    const p2pCell = new P2pCell(state, cellId, this);

    this.p2pCells.push({ id: cellId, p2pCell });

    return p2pCell;
  }

  public sendMessage<T>(
    dna: Hash,
    fromAgent: Hash,
    toAgent: Hash,
    message: NetworkMessage<T>
  ): Promise<T> {
    const localCell = this.conductor.cells.find(
      cell => isEqual(cell.id[0], dna) && isEqual(cell.id[1], toAgent)
    );

    if (localCell) return message(localCell.cell);

    return message(this.peerCells[serializeHash(dna)][serializeHash(toAgent)]);
  }
}

export type NetworkMessage<T> = (cell: Cell) => Promise<T>;
