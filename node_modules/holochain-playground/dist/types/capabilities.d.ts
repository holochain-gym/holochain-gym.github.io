import { AgentPubKey } from './common';
export declare type CapSecret = string;
export interface CapClaim {
    tag: string;
    grantor: AgentPubKey;
    secret: CapSecret;
}
export interface ZomeCallCapGrant {
    tag: string;
    access: string;
    functions: string[];
}
export declare type CapGrant = {
    ChainAuthor: AgentPubKey;
} | {
    RemoteAgent: ZomeCallCapGrant;
};
