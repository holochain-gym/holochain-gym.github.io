import { Cell } from '../cell';
import { CreateEntry } from './host-fn/actions/create-entry';
import { CreateLink } from './host-fn/actions/create-link';
import { HashEntry } from './host-fn/hash-entry';
import { Path } from './path';
export interface SimulatedZomeFunctionContext {
    create_entry: CreateEntry;
    hash_entry: HashEntry;
    create_link: CreateLink;
    path: Path;
}
export declare function buildZomeFunctionContext(zome_index: number, cell: Cell): SimulatedZomeFunctionContext;
