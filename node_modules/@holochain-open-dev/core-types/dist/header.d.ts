import { AgentPubKey, Hash, Signature } from "./common";
import { EntryType } from "./entry";
import { HoloHashed } from "./hashed";
import { Timestamp } from "./timestamp";
export interface SignedHeaderHashed<H extends Header = Header> {
    header: HoloHashed<H>;
    signature: Signature;
}
export declare type HeaderHashed = HoloHashed<Header>;
export declare enum HeaderType {
    Dna = "Dna",
    AgentValidationPkg = "AgentValidationPkg",
    InitZomesComplete = "InitZomesComplete",
    CreateLink = "CreateLink",
    DeleteLink = "DeleteLink",
    OpenChain = "OpenChain",
    CloseChain = "CloseChain",
    Create = "Create",
    Update = "Update",
    Delete = "Delete"
}
export declare type HeaderContent<T extends HeaderType, H> = H & {
    type: T;
};
export declare type Header = Dna | AgentValidationPkg | InitZomesComplete | CreateLink | DeleteLink | OpenChain | CloseChain | Delete | NewEntryHeader;
export declare type NewEntryHeader = Create | Update;
export interface Dna {
    type: HeaderType.Dna;
    author: AgentPubKey;
    timestamp: Timestamp;
    hash: Hash;
}
export interface AgentValidationPkg {
    type: HeaderType.AgentValidationPkg;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    membrane_proof: any;
}
export interface InitZomesComplete {
    type: HeaderType.InitZomesComplete;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
}
export interface CreateLink {
    type: HeaderType.CreateLink;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    base_address: Hash;
    target_address: Hash;
    zome_id: number;
    tag: any;
}
export interface DeleteLink {
    type: HeaderType.DeleteLink;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    base_address: Hash;
    link_add_address: Hash;
}
export interface OpenChain {
    type: HeaderType.OpenChain;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    prev_dna_hash: Hash;
}
export interface CloseChain {
    type: HeaderType.CloseChain;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    new_dna_hash: Hash;
}
export interface Update {
    type: HeaderType.Update;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    original_header_address: Hash;
    original_entry_address: Hash;
    entry_type: EntryType;
    entry_hash: Hash;
}
export interface Delete {
    type: HeaderType.Delete;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    deletes_address: Hash;
    deletes_entry_address: Hash;
}
export interface Create {
    type: HeaderType.Create;
    author: AgentPubKey;
    timestamp: Timestamp;
    header_seq: number;
    prev_header: Hash;
    entry_type: EntryType;
    entry_hash: Hash;
}
