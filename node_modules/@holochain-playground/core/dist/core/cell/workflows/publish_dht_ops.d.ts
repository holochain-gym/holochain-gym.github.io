import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
export declare function publish_dht_ops_task(cell: Cell): Task<void>;
export declare const publish_dht_ops: (cell: Cell) => Promise<void>;
