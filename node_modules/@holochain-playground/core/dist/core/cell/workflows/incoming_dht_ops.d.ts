import { Hash, Dictionary, DHTOp, AgentPubKey } from '@holochain-open-dev/core-types';
import { Cell } from '../../cell';
export declare const incoming_dht_ops: (basis: Hash, dhtOps: Dictionary<DHTOp>, from_agent: AgentPubKey | undefined) => (cell: Cell) => Promise<void>;
