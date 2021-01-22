import { Hash, AgentPubKey, Dna, AgentValidationPkg, Entry, EntryType, Create, Update, SignedHeaderHashed, Header, CreateLink } from '@holochain-open-dev/core-types';
import { CellState } from '../state';
export declare function buildShh(header: Header): SignedHeaderHashed;
export declare function buildDna(dnaHash: Hash, agentId: AgentPubKey): Dna;
export declare function buildAgentValidationPkg(state: CellState, membrane_proof: any): AgentValidationPkg;
export declare function buildCreate(state: CellState, entry: Entry, entry_type: EntryType): Create;
export declare function buildCreateLink(state: CellState, zome_id: number, base: Hash, target: Hash, tag: any): CreateLink;
export declare function buildUpdate(state: CellState, entry: Entry, entry_type: EntryType, original_entry_address: Hash, original_header_address: Hash): Update;
