export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type Hash = Uint8Array;
export declare type AgentPubKey = Uint8Array;
export declare type Signature = Uint8Array;
export declare type CellId = [Hash, AgentPubKey];
