import { Dictionary, Hash } from '@holochain-open-dev/core-types';
export declare function hash(content: any): Hash;
export declare const hashLocation: Dictionary<number>;
export declare function location(hash: string): number;
export declare function distance(hash1: Hash, hash2: Hash): number;
export declare function compareBigInts(a: number, b: number): number;
