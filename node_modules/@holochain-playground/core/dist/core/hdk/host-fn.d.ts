import { Cell } from '../cell';
export declare type HostFn<Fn extends Function> = (zome_index: number, cell: Cell) => Fn;
