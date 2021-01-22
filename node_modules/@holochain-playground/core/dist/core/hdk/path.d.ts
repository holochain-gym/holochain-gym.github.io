import { SimulatedZomeFunctionContext } from './context';
declare function ensure(path: string, hdk: SimulatedZomeFunctionContext): Promise<void>;
export interface Path {
    ensure: (path: string, hdk: SimulatedZomeFunctionContext) => Promise<void>;
}
export declare const path: {
    ensure: typeof ensure;
};
export {};
