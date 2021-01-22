import { MapLikeObject } from '../../types.js';
import '../../_version.js';
interface MessageMap {
    [messageID: string]: (param: MapLikeObject) => string;
}
export declare const messages: MessageMap;
export {};
