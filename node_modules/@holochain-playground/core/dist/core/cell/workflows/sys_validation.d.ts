import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
export declare const sys_validation: (cell: Cell) => Promise<void>;
export declare function sys_validation_task(cell: Cell): Task<void>;
