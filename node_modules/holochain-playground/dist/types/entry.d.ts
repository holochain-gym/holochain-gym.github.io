import { CapClaim, ZomeCallCapGrant } from './capabilities';
export declare type EntryVisibility = 'Public' | 'Private';
export declare type AppEntryType = {
    id: string;
    zome_id: number;
    visibility: EntryVisibility;
};
export declare type EntryType = 'Agent' | {
    App: AppEntryType;
} | 'CapClaim' | 'CapGrant';
export declare function getAppEntryType(entryType: EntryType): AppEntryType | undefined;
export declare function getEntryTypeString(entryType: EntryType): string;
export interface EntryContent<E extends string, C> {
    entry_type: E;
    content: C;
}
export declare type Entry = EntryContent<'Agent', string> | EntryContent<'App', any> | EntryContent<'CapGrant', ZomeCallCapGrant> | EntryContent<'CapClaim', CapClaim>;
export declare function hashEntry(entry: Entry): string;
