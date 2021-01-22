import { Hash } from "./common";
export interface HoloHashed<T> {
    hash: Hash;
    content: T;
}
