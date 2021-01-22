import { Conductor } from '@holochain-playground/core';
import { Hash } from '@holochain-open-dev/core-types';
export interface PlaygroundContext {
    activeDna: Hash;
    activeAgentPubKey: Hash | undefined;
    activeEntryHash: Hash | undefined;
    conductors: Conductor[];
    conductorsUrls: string[] | undefined;
}
