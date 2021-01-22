export interface Task<T> {
  name: string;
  description: string;
  task: () => Promise<T>;
}

export interface Executor {
  execute<T>(task: Task<T>): Promise<T>;
}
