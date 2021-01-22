import { AgentPubKey, CellId, Dictionary, Hash } from '../../types/common';
import { DHTOp } from '../../types/dht-op';
import { Network } from '../network';
export declare type P2pCellState = {
    peers: string[];
    redundancyFactor: number;
};
export declare class P2pCell {
    protected cellId: CellId;
    protected network: Network;
    peers: string[];
    redundancyFactor: number;
    constructor(state: P2pCellState, cellId: CellId, network: Network);
    getState(): P2pCellState;
    join(dnaHash: Hash, agent_pub_key: AgentPubKey): Promise<void>;
    leave(dnaHash: Hash, agent_pub_key: AgentPubKey): Promise<void>;
    publish(dht_hash: Hash, ops: Dictionary<DHTOp>): Promise<void>;
    get(dna_hash: Hash, from_agent: AgentPubKey, dht_hash: Hash, _options: any): Promise<Element | undefined>;
    getNeighbors(): Array<AgentPubKey>;
    private _getClosestNeighbors;
    private _sendMessage;
}
