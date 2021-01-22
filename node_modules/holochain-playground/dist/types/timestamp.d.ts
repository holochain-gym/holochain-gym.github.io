export declare type Timestamp = [number, number];
export declare function now(): Timestamp;
export declare function millisToTimestamp(millis: number): Timestamp;
export declare function timestampToMillis(timestamp: Timestamp): number;
