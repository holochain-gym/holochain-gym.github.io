import { Cell } from '../cell';

export type HostFn<Fn extends Function> = (
  zome_index: number,
  cell: Cell
) => Fn;
