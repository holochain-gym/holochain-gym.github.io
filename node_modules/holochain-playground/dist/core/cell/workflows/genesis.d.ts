import { AgentPubKey, Hash } from '../../../types/common';
import { Cell } from '../../cell';
export declare const genesis: (agentId: AgentPubKey, dnaHash: Hash, membrane_proof: any) => (cell: Cell) => Promise<void>;
