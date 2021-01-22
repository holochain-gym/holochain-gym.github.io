import { CreateLink, Delete, DeleteLink, Header, NewEntryHeader, Update } from './header';
import { Element } from './element';
import { Entry } from './entry';
export declare enum DHTOpType {
    StoreElement = "StoreElement",
    StoreEntry = "StoreEntry",
    RegisterAgentActivity = "RegisterAgentActivity",
    RegisterUpdatedContent = "RegisterUpdatedContent",
    RegisterUpdatedElement = "RegisterUpdatedElement",
    RegisterDeletedBy = "RegisterDeletedBy",
    RegisterDeletedEntryHeader = "RegisterDeletedEntryHeader",
    RegisterAddLink = "RegisterAddLink",
    RegisterRemoveLink = "RegisterRemoveLink"
}
export declare const DHT_SORT_PRIORITY: DHTOpType[];
export interface DHTOpContent<T, H> {
    type: T;
    header: H;
}
export declare type DHTOp = (DHTOpContent<DHTOpType.StoreElement, Header> & {
    maybe_entry: Entry | undefined;
}) | (DHTOpContent<DHTOpType.StoreEntry, NewEntryHeader> & {
    entry: Entry;
}) | DHTOpContent<DHTOpType.RegisterAgentActivity, Header> | DHTOpContent<DHTOpType.RegisterUpdatedContent, Update> | DHTOpContent<DHTOpType.RegisterUpdatedElement, Update> | DHTOpContent<DHTOpType.RegisterDeletedBy, Delete> | DHTOpContent<DHTOpType.RegisterDeletedEntryHeader, Delete> | DHTOpContent<DHTOpType.RegisterAddLink, CreateLink> | DHTOpContent<DHTOpType.RegisterRemoveLink, DeleteLink>;
export declare function elementToDHTOps(element: Element): DHTOp[];
export declare function getDHTOpBasis(dhtOp: DHTOp): string;
export declare function sortDHTOps(dhtOps: DHTOp[]): DHTOp[];
export declare function getEntry(dhtOp: DHTOp): Entry | undefined;
