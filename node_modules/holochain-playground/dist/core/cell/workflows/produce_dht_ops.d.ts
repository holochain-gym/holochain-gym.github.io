import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
export declare function produce_dht_ops_task(cell: Cell): Task<void>;
export declare const produce_dht_ops: (cell: Cell) => Promise<void>;
