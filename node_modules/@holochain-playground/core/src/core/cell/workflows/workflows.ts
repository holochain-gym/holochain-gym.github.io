import { Cell } from '../../cell';

export type WorkFlow = (cell: Cell) => Promise<void>;
