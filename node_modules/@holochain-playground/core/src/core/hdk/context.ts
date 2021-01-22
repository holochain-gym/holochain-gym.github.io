import { Cell } from '../cell';
import { CreateEntry, create_entry } from './host-fn/actions/create-entry';
import { CreateLink, create_link } from './host-fn/actions/create-link';
import { HashEntry, hash_entry } from './host-fn/hash-entry';
import { path, Path } from './path';

export interface SimulatedZomeFunctionContext {
  create_entry: CreateEntry;
  hash_entry: HashEntry;
  create_link: CreateLink;
  path: Path;
}

export function buildZomeFunctionContext(
  zome_index: number,
  cell: Cell
): SimulatedZomeFunctionContext {
  return {
    create_entry: create_entry(zome_index, cell),
    hash_entry: hash_entry(zome_index, cell),
    create_link: create_link(zome_index, cell),
    path,
  };
}
