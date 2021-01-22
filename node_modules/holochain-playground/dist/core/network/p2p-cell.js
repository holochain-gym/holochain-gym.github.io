import { d as distance, c as compareBigInts } from '../../hash-7578db5d.js';

// From: https://github.com/holochain/holochain/blob/develop/crates/holochain_p2p/src/types/actor.rs
class P2pCell {
    constructor(state, cellId, network) {
        this.cellId = cellId;
        this.network = network;
        this.peers = state.peers;
    }
    getState() {
        return {
            peers: this.peers,
            redundancyFactor: this.redundancyFactor,
        };
    }
    async join(dnaHash, agent_pub_key) { }
    async leave(dnaHash, agent_pub_key) { }
    async publish(dht_hash, ops) {
        const neighbors = this._getClosestNeighbors(dht_hash, this.redundancyFactor);
        const promises = neighbors.map((neighbor) => this._sendMessage(neighbor, (cell) => cell.handle_publish(this.cellId[0], dht_hash, ops)));
        await Promise.all(promises);
    }
    async get(dna_hash, from_agent, dht_hash, _options // TODO: complete?
    ) {
        return undefined;
    }
    getNeighbors() {
        return this.peers;
    }
    _getClosestNeighbors(basisHash, neighborCount) {
        const sortedPeers = this.peers.sort((agentA, agentB) => {
            const distanceA = distance(basisHash, agentA);
            const distanceB = distance(basisHash, agentB);
            return compareBigInts(distanceA, distanceB);
        });
        return sortedPeers.slice(0, neighborCount);
    }
    _sendMessage(toAgent, message) {
        const agentId = this.peers.find((agent) => agent === toAgent);
        if (!agentId) {
            debugger;
            throw new Error('Agent was not found');
        }
        return this.network.sendMessage(this.cellId[1], this.cellId[0], agentId, message);
    }
}

export { P2pCell };
//# sourceMappingURL=p2p-cell.js.map
