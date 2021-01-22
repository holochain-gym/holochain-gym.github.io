import { AppInfoResponse, CellId } from '@holochain/conductor-api';
import { Timestamp } from '@holochain-open-dev/core-types';
export declare function deserializeHash(hash: string): Uint8Array;
export declare function serializeHash(hash: Uint8Array): string;
export declare function getCellIdForDnaHash(appInfo: AppInfoResponse, dnaHash: string): CellId;
export declare function millisToTimestamp(millis: number): Timestamp;
export declare function timestampToMillis(timestamp: Timestamp): number;
export declare function now(): Timestamp;
