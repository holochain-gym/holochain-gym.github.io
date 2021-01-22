import { CellState } from '../../../types/cell-state';
import { Entry, EntryType } from '../../../types/entry';
import { Element } from '../../../types/element';
export declare type HdkAction = (state: CellState) => Promise<Element>;
export declare const create: (entry: Entry, entry_type: EntryType) => HdkAction;
