import { Cell } from '../core/cell';
export declare function dnaNodes(cells: Cell[]): any[];
export declare function sourceChainNodes(cell: Cell): any[];
export declare function allEntries(cells: Cell[], showAgentIds: boolean): any[];
export declare function getImplicitLinks(allEntryIds: string[], value: any): Array<{
    label: string;
    target: string;
}>;
