import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
export declare const app_validation: (cell: Cell) => Promise<void>;
export declare function app_validation_task(cell: Cell): Task<void>;
