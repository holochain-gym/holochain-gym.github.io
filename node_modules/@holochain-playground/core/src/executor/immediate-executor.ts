import { Executor, Task } from './executor';

export class ImmediateExecutor implements Executor {
  async execute<T>(task: Task<T>): Promise<T> {
    const result = await task.task();
    
    return result;
  }
}
