/// <reference types="node" />
export declare type HoloHash = Buffer;
export declare type AgentPubKey = HoloHash;
export declare type InstalledAppId = string;
export declare type CapSecret = Buffer;
export declare type CellId = [HoloHash, AgentPubKey];
export declare type CellNick = string;
export declare type DnaProperties = any;
export declare type InstalledApp = {
    installed_app_id: InstalledAppId;
    cell_data: Array<InstalledCell>;
};
export declare type InstalledCell = [CellId, CellNick];
export declare type MembraneProof = Buffer;
export declare const fakeAgentPubKey: (x: any) => Buffer;
