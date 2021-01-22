import '../hash-7578db5d.js';
import { P2pCell } from './network/p2p-cell.js';

class Network {
    constructor(state) {
        this.p2pCells = state.p2pCellsState.map((s) => ({
            id: s.id,
            p2pCell: new P2pCell(s.state, s.id, this),
        }));
        this.peerCells = {};
    }
    getState() {
        return {
            p2pCellsState: this.p2pCells.map((c) => ({
                id: c.id,
                state: c.p2pCell.getState(),
            })),
        };
    }
    // TODO: change this to simulate networking if necessary
    connectWith(conductor) {
        for (const myCell of this.p2pCells) {
            const cellDna = myCell.id[1];
            for (const cell of conductor.cells) {
                if (cell.id[1] === cellDna) {
                    if (!this.peerCells[cellDna])
                        this.peerCells[cellDna] = {};
                    this.peerCells[cellDna][cell.id[0]] = cell.cell;
                    myCell.p2pCell.peers.push(cell.id[0]);
                }
            }
        }
    }
    createP2pCell(cellId) {
        const peersOfTheSameDna = this.peerCells[cellId[1]];
        const peersAlreadyKnown = peersOfTheSameDna
            ? Object.keys(peersOfTheSameDna)
            : [];
        const state = {
            peers: peersAlreadyKnown,
            redundancyFactor: 3,
        };
        const p2pCell = new P2pCell(state, cellId, this);
        this.p2pCells.push({ id: cellId, p2pCell });
        return p2pCell;
    }
    sendMessage(dna, fromAgent, toAgent, message) {
        return message(this.peerCells[dna][toAgent]);
    }
}

export { Network };
//# sourceMappingURL=network.js.map
