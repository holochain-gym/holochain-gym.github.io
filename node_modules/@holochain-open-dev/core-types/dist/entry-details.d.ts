import { Entry } from './entry';
import { SignedHeaderHashed } from './header';
import { EntryDhtStatus } from './metadata';
export interface EntryDetails {
    entry: Entry;
    headers: Array<SignedHeaderHashed>;
    entry_dht_status: EntryDhtStatus;
}
