import { ScheduledFunction, Scheduler as SchedulerInterface } from './types';
export declare class Scheduler implements SchedulerInterface {
    tasks: ScheduledFunction[];
    private running;
    private process;
    private start;
    defer(fn: ScheduledFunction): () => void;
}
declare const _default: Scheduler;
export default _default;
