import { CapClaim, ZomeCallCapGrant } from './capabilities';
import { AgentPubKey } from './common';
export declare type EntryVisibility = 'Public' | 'Private';
export declare type AppEntryType = {
    id: number;
    zome_id: number;
    visibility: EntryVisibility;
};
export declare type EntryType = 'Agent' | {
    App: AppEntryType;
} | 'CapClaim' | 'CapGrant';
export interface EntryContent<E extends string, C> {
    entry_type: E;
    content: C;
}
export declare type Entry = EntryContent<'Agent', AgentPubKey> | EntryContent<'App', any> | EntryContent<'CapGrant', ZomeCallCapGrant> | EntryContent<'CapClaim', CapClaim>;
