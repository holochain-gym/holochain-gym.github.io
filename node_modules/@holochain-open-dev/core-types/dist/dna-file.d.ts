import { HoloHashed } from './hashed';
export interface DnaFile {
    dna: HoloHashed<DnaDef>;
    code: Array<WasmCode>;
}
export interface DnaDef {
    name: String;
    uuid: String;
    properties: Uint8Array;
    zomes: Zomes;
}
export declare type Zomes = Array<[string, {
    wasm_hash: Array<Uint8Array>;
}]>;
export declare type WasmCode = [Uint8Array, {
    code: Array<number>;
}];
