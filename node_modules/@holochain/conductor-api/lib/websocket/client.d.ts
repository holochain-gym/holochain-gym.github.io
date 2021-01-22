/// <reference types="ws" />
import Websocket from 'isomorphic-ws';
import { AppSignalCb } from '../api/app';
/**
 * A Websocket client which can make requests and receive responses,
 * as well as send and receive signals
 *
 * Uses Holochain's websocket WireMessage for communication.
 */
export declare class WsClient {
    socket: Websocket;
    pendingRequests: Record<string, {
        fulfill: Function;
    }>;
    constructor(socket: any);
    emitSignal(data: any): void;
    request<Req, Res>(data: Req): Promise<Res>;
    close(): Promise<void>;
    awaitClose(): Promise<void>;
    static connect(url: string, signalCb?: AppSignalCb): Promise<WsClient>;
}
