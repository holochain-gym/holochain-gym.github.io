import { Cell } from '@holochain-playground/core';
export declare function dnaNodes(cells: Cell[]): any[];
export declare function sourceChainNodes(cell: Cell): any[];
export declare function allEntries(cells: Cell[], showEntryContents: boolean, excludedEntryTypes: string[]): {
    entries: any[];
    entryTypes: string[];
};
export declare function getImplicitLinks(allEntryIds: string[], value: any): Array<{
    label: string;
    target: string;
}>;
