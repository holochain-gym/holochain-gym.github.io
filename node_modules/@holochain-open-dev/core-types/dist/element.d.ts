import { Entry } from "./entry";
import { SignedHeaderHashed } from "./header";
export declare type Element = {
    signed_header: SignedHeaderHashed;
    entry: Entry | undefined;
};
