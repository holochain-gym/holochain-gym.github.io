import { AppApi, AppInfoRequest, AppInfoResponse, CallZomeRequestGeneric, CallZomeResponseGeneric, AppSignalCb } from '../api/app';
import { WsClient } from './client';
import { Transformer, Requester } from '../api/common';
export declare class AppWebsocket implements AppApi {
    client: WsClient;
    constructor(client: WsClient);
    static connect(url: string, signalCb?: AppSignalCb): Promise<AppWebsocket>;
    _requester: <ReqO, ReqI, ResI, ResO>(tag: string, transformer?: Transformer<ReqO, ReqI, ResI, ResO> | undefined) => (req: ReqO) => Promise<ResO>;
    appInfo: Requester<AppInfoRequest, AppInfoResponse>;
    callZome: Requester<CallZomeRequestGeneric<any>, CallZomeResponseGeneric<any>>;
}
