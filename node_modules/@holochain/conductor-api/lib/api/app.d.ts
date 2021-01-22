import { Requester } from "./common";
import { CellId, CapSecret, AgentPubKey, InstalledAppId, InstalledApp } from "./types";
export declare type CallZomeRequestGeneric<Payload> = {
    cap: CapSecret | null;
    cell_id: CellId;
    zome_name: string;
    fn_name: string;
    payload: Payload;
    provenance: AgentPubKey;
};
export declare type CallZomeResponseGeneric<Payload> = Payload;
export declare type CallZomeRequest = CallZomeRequestGeneric<any>;
export declare type CallZomeResponse = CallZomeResponseGeneric<any>;
export declare type AppInfoRequest = {
    installed_app_id: InstalledAppId;
};
export declare type AppInfoResponse = InstalledApp;
export declare type AppSignal = {
    type: string;
    data: {
        cellId: CellId;
        payload: any;
    };
};
export declare type AppSignalCb = (signal: AppSignal) => void;
export declare type SignalResponseGeneric<Payload> = Payload;
export interface AppApi {
    appInfo: Requester<AppInfoRequest, AppInfoResponse>;
    callZome: Requester<CallZomeRequest, CallZomeResponse>;
}
