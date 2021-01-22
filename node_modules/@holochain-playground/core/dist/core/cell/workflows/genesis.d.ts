import { AgentPubKey, Hash } from '@holochain-open-dev/core-types';
import { Cell } from '../../cell';
export declare const genesis: (agentId: AgentPubKey, dnaHash: Hash, membrane_proof: any) => (cell: Cell) => Promise<void>;
