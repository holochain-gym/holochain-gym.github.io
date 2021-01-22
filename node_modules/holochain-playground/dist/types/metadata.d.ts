import { Dictionary, Hash } from './common';
import { NewEntryHeader } from './header';
import { Timestamp } from './timestamp';
export interface Metadata {
    system_meta: Dictionary<SysMetaVal[]>;
    link_meta: Array<{
        key: LinkMetaKey;
        value: LinkMetaVal;
    }>;
    misc_meta: Dictionary<MiscMetaVal>;
}
export declare type SysMetaVal = {
    NewEntry: Hash;
} | {
    Update: Hash;
} | {
    Delete: Hash;
} | {
    Activity: Hash;
} | {
    DeleteLink: Hash;
} | {
    CustomPackage: Hash;
};
export declare function getSysMetaValHeaderHash(sys_meta_val: SysMetaVal): Hash | undefined;
export interface LinkMetaKey {
    base: Hash;
    zome_id: number;
    tag: any;
    header_hash: Hash;
}
export interface LinkMetaVal {
    link_add_hash: Hash;
    target: Hash;
    timestamp: Timestamp;
    zome_id: number;
    tag: any;
}
export declare type MiscMetaVal = {
    EntryStatus: EntryDhtStatus;
} | 'StoreElement' | {
    ChainItem: Timestamp;
} | {
    ChainObserved: HighestObserved;
} | {
    ChainStatus: ChainStatus;
};
export declare enum ChainStatus {
    Empty = 0,
    Valid = 1,
    Forked = 2,
    Invalid = 3
}
export interface HighestObserved {
    header_seq: number;
    hash: Hash[];
}
export declare enum EntryDhtStatus {
    Live = 0,
    Dead = 1,
    Pending = 2,
    Rejected = 3,
    Abandoned = 4,
    Conflict = 5,
    Withdrawn = 6,
    Purged = 7
}
export interface EntryDetails {
    headers: NewEntryHeader[];
    links: LinkMetaVal[];
    dhtStatus: EntryDhtStatus;
}
