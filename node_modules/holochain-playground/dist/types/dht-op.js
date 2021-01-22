import { h as hash } from '../hash-7578db5d.js';
import { HeaderType } from './header.js';

// https://github.com/holochain/holochain/blob/develop/crates/types/src/dht_op.rs
var DHTOpType;
(function (DHTOpType) {
    DHTOpType["StoreElement"] = "StoreElement";
    DHTOpType["StoreEntry"] = "StoreEntry";
    DHTOpType["RegisterAgentActivity"] = "RegisterAgentActivity";
    DHTOpType["RegisterUpdatedContent"] = "RegisterUpdatedContent";
    DHTOpType["RegisterUpdatedElement"] = "RegisterUpdatedElement";
    DHTOpType["RegisterDeletedBy"] = "RegisterDeletedBy";
    DHTOpType["RegisterDeletedEntryHeader"] = "RegisterDeletedEntryHeader";
    DHTOpType["RegisterAddLink"] = "RegisterAddLink";
    DHTOpType["RegisterRemoveLink"] = "RegisterRemoveLink";
})(DHTOpType || (DHTOpType = {}));
const DHT_SORT_PRIORITY = [
    DHTOpType.RegisterAgentActivity,
    DHTOpType.StoreEntry,
    DHTOpType.StoreElement,
    DHTOpType.RegisterUpdatedContent,
    DHTOpType.RegisterUpdatedElement,
    DHTOpType.RegisterDeletedEntryHeader,
    DHTOpType.RegisterDeletedBy,
    DHTOpType.RegisterAddLink,
    DHTOpType.RegisterRemoveLink,
];
function elementToDHTOps(element) {
    let allDhtOps = [];
    // All hdk commands have these two DHT Ops
    allDhtOps.push({
        type: DHTOpType.RegisterAgentActivity,
        header: element.header,
    });
    allDhtOps.push({
        type: DHTOpType.StoreElement,
        header: element.header,
        maybe_entry: element.maybe_entry,
    });
    // Each header derives into different DHTOps
    if (element.header.type == HeaderType.Update) {
        allDhtOps.push({
            type: DHTOpType.RegisterUpdatedContent,
            header: element.header,
        });
        allDhtOps.push({
            type: DHTOpType.RegisterUpdatedElement,
            header: element.header,
        });
        allDhtOps.push({
            type: DHTOpType.StoreEntry,
            header: element.header,
            entry: element.maybe_entry,
        });
    }
    else if (element.header.type == HeaderType.Create) {
        allDhtOps.push({
            type: DHTOpType.StoreEntry,
            header: element.header,
            entry: element.maybe_entry,
        });
    }
    else if (element.header.type == HeaderType.Delete) {
        allDhtOps.push({
            type: DHTOpType.RegisterDeletedBy,
            header: element.header,
        });
        allDhtOps.push({
            type: DHTOpType.RegisterDeletedEntryHeader,
            header: element.header,
        });
    }
    else if (element.header.type == HeaderType.DeleteLink) {
        allDhtOps.push({
            type: DHTOpType.RegisterRemoveLink,
            header: element.header,
        });
    }
    else if (element.header.type == HeaderType.CreateLink) {
        allDhtOps.push({
            type: DHTOpType.RegisterAddLink,
            header: element.header,
        });
    }
    return allDhtOps;
}
function getDHTOpBasis(dhtOp) {
    switch (dhtOp.type) {
        case DHTOpType.StoreElement:
            return hash(dhtOp.header);
        case DHTOpType.StoreEntry:
            return dhtOp.header.entry_hash;
        case DHTOpType.RegisterUpdatedContent:
            return dhtOp.header.original_entry_address;
        case DHTOpType.RegisterAgentActivity:
            return dhtOp.header.author;
        case DHTOpType.RegisterAddLink:
            return dhtOp.header.base_address;
        case DHTOpType.RegisterRemoveLink:
            return dhtOp.header.base_address;
        case DHTOpType.RegisterDeletedBy:
            return dhtOp.header.deletes_address;
        case DHTOpType.RegisterDeletedEntryHeader:
            return dhtOp.header.deletes_entry_address;
    }
}
function sortDHTOps(dhtOps) {
    const prio = (dhtOp) => DHT_SORT_PRIORITY.findIndex((type) => type === dhtOp.type);
    return dhtOps.sort((dhtA, dhtB) => prio(dhtA) - prio(dhtB));
}
function getEntry(dhtOp) {
    if (dhtOp.type === DHTOpType.StoreEntry)
        return dhtOp.entry;
    else if (dhtOp.type === DHTOpType.StoreElement)
        return dhtOp.maybe_entry;
    return undefined;
}

export { DHTOpType, DHT_SORT_PRIORITY, elementToDHTOps, getDHTOpBasis, getEntry, sortDHTOps };
//# sourceMappingURL=dht-op.js.map
