import { AppEntryType, DHTOp, Entry, EntryType, Hash } from '@holochain-open-dev/core-types';
import { Cell } from './cell';
export declare function hashEntry(entry: Entry): Hash;
export declare function getAppEntryType(entryType: EntryType): AppEntryType | undefined;
export declare function getEntryTypeString(cell: Cell, entryType: EntryType): string;
export declare function getDHTOpBasis(dhtOp: DHTOp): Hash;
