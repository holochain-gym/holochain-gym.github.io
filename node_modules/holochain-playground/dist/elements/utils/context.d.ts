import { Conductor } from '../../core/conductor';
import { Hash } from '../../types/common';
import '../holochain-playground-provider';
declare const consumePlayground: (mapFn?: import("lit-context").MapFn<object>) => any;
export interface PlaygroundContext {
    activeDna: Hash;
    activeAgentPubKey: Hash | undefined;
    activeEntryHash: Hash | undefined;
    conductors: Conductor[];
    conductorsUrls: string[] | undefined;
}
export declare class UpdateContextEvent extends CustomEvent<Partial<PlaygroundContext>> {
    constructor(context: Partial<PlaygroundContext>);
}
export { consumePlayground };
