import { Dictionary } from '../types/common';
export declare function hash(content: any): string;
export declare const hashLocation: Dictionary<number>;
export declare function location(hash: string): number;
export declare function distance(hash1: string, hash2: string): number;
export declare function compareBigInts(a: number, b: number): number;
