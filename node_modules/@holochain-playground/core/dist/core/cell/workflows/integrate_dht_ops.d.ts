import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
export declare const integrate_dht_ops: (cell: Cell) => Promise<void>;
export declare function integrate_dht_ops_task(cell: Cell): Task<void>;
