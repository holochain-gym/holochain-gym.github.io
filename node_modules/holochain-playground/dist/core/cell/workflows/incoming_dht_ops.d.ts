import { AgentPubKey, Dictionary, Hash } from '../../../types/common';
import { DHTOp } from '../../../types/dht-op';
import { Cell } from '../../cell';
export declare const incoming_dht_ops: (basis: Hash, dhtOps: Dictionary<DHTOp>, from_agent: AgentPubKey | undefined) => (cell: Cell) => Promise<void>;
