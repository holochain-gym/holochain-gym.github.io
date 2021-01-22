import { h as hash } from '../../../hash-7578db5d.js';
import { hashEntry } from '../../../types/entry.js';
import { HeaderType } from '../../../types/header.js';
import { getEntry, DHTOpType } from '../../../types/dht-op.js';
import { EntryDhtStatus, ChainStatus } from '../../../types/metadata.js';
import { g as getHeadersForEntry } from '../../../get-ecef9c10.js';

const putValidationLimboValue = (dhtOpHash, validationLimboValue) => (state) => {
    state.validationLimbo[dhtOpHash] = validationLimboValue;
};
const deleteValidationLimboValue = (dhtOpHash) => (state) => {
    state.validationLimbo[dhtOpHash] = undefined;
    delete state.validationLimbo[dhtOpHash];
};
const putIntegrationLimboValue = (dhtOpHash, integrationLimboValue) => (state) => {
    state.integrationLimbo[dhtOpHash] = integrationLimboValue;
};
const putDhtOpData = (dhtOp) => async (state) => {
    const headerHash = hash(dhtOp.header);
    state.CAS[headerHash] = dhtOp.header;
    const entry = getEntry(dhtOp);
    if (entry) {
        const entryHash = hashEntry(entry);
        state.CAS[entryHash] = entry;
    }
};
const putDhtOpMetadata = (dhtOp) => async (state) => {
    const headerHash = hash(dhtOp.header);
    if (dhtOp.type === DHTOpType.StoreElement) {
        state.metadata.misc_meta[headerHash] = 'StoreElement';
    }
    else if (dhtOp.type === DHTOpType.StoreEntry) {
        const entryHash = dhtOp.header.entry_hash;
        if (dhtOp.header.type === HeaderType.Update) {
            await register_header_on_basis(headerHash, dhtOp.header)(state);
            await register_header_on_basis(entryHash, dhtOp.header)(state);
        }
        await register_header_on_basis(entryHash, dhtOp.header)(state);
        update_entry_dht_status(entryHash)(state);
    }
    else if (dhtOp.type === DHTOpType.RegisterAgentActivity) {
        state.metadata.misc_meta[headerHash] = {
            ChainItem: dhtOp.header.timestamp,
        };
        state.metadata.misc_meta[dhtOp.header.author] = {
            ChainStatus: ChainStatus.Valid,
        };
    }
    else if (dhtOp.type === DHTOpType.RegisterUpdatedContent ||
        dhtOp.type === DHTOpType.RegisterUpdatedElement) {
        await register_header_on_basis(dhtOp.header.original_header_address, dhtOp.header)(state);
        await register_header_on_basis(dhtOp.header.original_entry_address, dhtOp.header)(state);
        update_entry_dht_status(dhtOp.header.original_entry_address)(state);
    }
    else if (dhtOp.type === DHTOpType.RegisterDeletedBy ||
        dhtOp.type === DHTOpType.RegisterDeletedEntryHeader) {
        await register_header_on_basis(dhtOp.header.deletes_address, dhtOp.header)(state);
        await register_header_on_basis(dhtOp.header.deletes_entry_address, dhtOp.header)(state);
        update_entry_dht_status(dhtOp.header.deletes_entry_address)(state);
    }
    else if (dhtOp.type === DHTOpType.RegisterAddLink) {
        const key = {
            base: dhtOp.header.base_address,
            header_hash: headerHash,
            tag: dhtOp.header.tag,
            zome_id: dhtOp.header.zome_id,
        };
        const value = {
            link_add_hash: headerHash,
            tag: dhtOp.header.tag,
            target: dhtOp.header.target_address,
            timestamp: dhtOp.header.timestamp,
            zome_id: dhtOp.header.zome_id,
        };
        state.metadata.link_meta.push({ key, value });
    }
    else if (dhtOp.type === DHTOpType.RegisterRemoveLink) {
        const val = {
            DeleteLink: headerHash,
        };
        putSystemMetadata(dhtOp.header.link_add_address, val)(state);
    }
};
const update_entry_dht_status = (entryHash) => (state) => {
    const headers = getHeadersForEntry(state, entryHash);
    const entryIsAlive = headers.some((header) => {
        const dhtHeaders = state.metadata.system_meta[hash(header)];
        return dhtHeaders
            ? dhtHeaders.find((metaVal) => metaVal.Delete)
            : true;
    });
    state.metadata.misc_meta[entryHash] = {
        EntryStatus: entryIsAlive ? EntryDhtStatus.Live : EntryDhtStatus.Dead,
    };
};
const register_header_on_basis = (basis, header) => async (state) => {
    const headerHash = await hash(header);
    let value = undefined;
    if (header.type === HeaderType.Create) {
        value = { NewEntry: headerHash };
    }
    else if (header.type === HeaderType.Update) {
        value = { Update: headerHash };
    }
    else if (header.type === HeaderType.Delete) {
        value = { Delete: headerHash };
    }
    putSystemMetadata(basis, value)(state);
};
const putSystemMetadata = (basis, value) => (state) => {
    if (!state.metadata.system_meta[basis]) {
        state.metadata.system_meta[basis] = [];
    }
    state.metadata.system_meta[basis].push(value);
};
const putDhtOpToIntegrated = (dhtOpHash, integratedValue) => (state) => {
    state.integratedDHTOps[dhtOpHash] = integratedValue;
};

export { deleteValidationLimboValue, putDhtOpData, putDhtOpMetadata, putDhtOpToIntegrated, putIntegrationLimboValue, putSystemMetadata, putValidationLimboValue, register_header_on_basis };
//# sourceMappingURL=put.js.map
