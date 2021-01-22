import { HdkAction } from '../core/cell/source-chain/actions';
import { Hash } from '../types/common';
export declare type SimulatedZome = {
    [fnName: string]: (payload: any) => Array<HdkAction>;
};
export declare type SimulatedDna = {
    hash: Hash;
    zomes: {
        [zome: string]: SimulatedZome;
    };
};
