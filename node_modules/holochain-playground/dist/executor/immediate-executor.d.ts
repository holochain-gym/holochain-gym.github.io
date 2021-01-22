import { Executor, Task } from './executor';
export declare class ImmediateExecutor implements Executor {
    execute<T>(task: Task<T>): Promise<T>;
}
