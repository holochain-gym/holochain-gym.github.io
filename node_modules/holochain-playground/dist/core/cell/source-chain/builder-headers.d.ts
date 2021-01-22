import { CellState } from '../../../types/cell-state';
import { AgentPubKey, Hash } from '../../../types/common';
import { Entry, EntryType } from '../../../types/entry';
import { AgentValidationPkg, Create, Dna, Update } from '../../../types/header';
export declare function buildDna(dnaHash: Hash, agentId: AgentPubKey): Dna;
export declare function buildAgentValidationPkg(state: CellState, membrane_proof: any): AgentValidationPkg;
export declare function buildCreate(state: CellState, entry: Entry, entry_type: EntryType): Create;
export declare function buildUpdate(state: CellState, entry: Entry, entry_type: EntryType, original_entry_address: Hash, original_header_address: Hash): Update;
