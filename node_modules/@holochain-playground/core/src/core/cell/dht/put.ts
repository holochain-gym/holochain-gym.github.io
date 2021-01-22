import { serializeHash } from '@holochain-open-dev/common';
import {
  Hash,
  DHTOp,
  getEntry,
  DHTOpType,
  HeaderType,
  ChainStatus,
  LinkMetaKey,
  LinkMetaVal,
  SysMetaVal,
  EntryDhtStatus,
  Header,
} from '@holochain-open-dev/core-types';
import { hash } from '../../../processors/hash';
import {
  ValidationLimboValue,
  CellState,
  IntegrationLimboValue,
  IntegratedDhtOpsValue,
} from '../state';
import { hashEntry } from '../utils';

import { getHeadersForEntry } from './get';

export const putValidationLimboValue = (
  dhtOpHash: Hash,
  validationLimboValue: ValidationLimboValue
) => (state: CellState) => {
  state.validationLimbo[serializeHash(dhtOpHash)] = validationLimboValue;
};

export const deleteValidationLimboValue = (dhtOpHash: Hash) => (
  state: CellState
) => {
  const hash = serializeHash(dhtOpHash);
  delete state.validationLimbo[hash];
};

export const putIntegrationLimboValue = (
  dhtOpHash: Hash,
  integrationLimboValue: IntegrationLimboValue
) => (state: CellState) => {
  state.integrationLimbo[serializeHash(dhtOpHash)] = integrationLimboValue;
};

export const putDhtOpData = (dhtOp: DHTOp) => async (state: CellState) => {
  const headerHash = hash(dhtOp.header);
  state.CAS[serializeHash(headerHash)] = dhtOp.header;

  const entry = getEntry(dhtOp);

  if (entry) {
    const entryHash = hashEntry(entry);
    state.CAS[serializeHash(entryHash)] = entry;
  }
};

export const putDhtOpMetadata = (dhtOp: DHTOp) => (state: CellState) => {
  const headerHash = hash(dhtOp.header);

  if (dhtOp.type === DHTOpType.StoreElement) {
    state.metadata.misc_meta[serializeHash(headerHash)] = 'StoreElement';
  } else if (dhtOp.type === DHTOpType.StoreEntry) {
    const entryHash = dhtOp.header.header.content.entry_hash;

    if (dhtOp.header.header.content.type === HeaderType.Update) {
      register_header_on_basis(headerHash, dhtOp.header.header.content)(state);
      register_header_on_basis(entryHash, dhtOp.header.header.content)(state);
    }

    register_header_on_basis(entryHash, dhtOp.header.header.content)(state);
    update_entry_dht_status(entryHash)(state);
  } else if (dhtOp.type === DHTOpType.RegisterAgentActivity) {
    state.metadata.misc_meta[serializeHash(headerHash)] = {
      ChainItem: dhtOp.header.header.content.timestamp,
    };

    state.metadata.misc_meta[
      serializeHash(dhtOp.header.header.content.author)
    ] = {
      ChainStatus: ChainStatus.Valid,
    };
  } else if (
    dhtOp.type === DHTOpType.RegisterUpdatedContent ||
    dhtOp.type === DHTOpType.RegisterUpdatedElement
  ) {
    register_header_on_basis(
      dhtOp.header.header.content.original_header_address,
      dhtOp.header.header.content
    )(state);
    register_header_on_basis(
      dhtOp.header.header.content.original_entry_address,
      dhtOp.header.header.content
    )(state);
    update_entry_dht_status(dhtOp.header.header.content.original_entry_address)(
      state
    );
  } else if (
    dhtOp.type === DHTOpType.RegisterDeletedBy ||
    dhtOp.type === DHTOpType.RegisterDeletedEntryHeader
  ) {
    register_header_on_basis(
      dhtOp.header.header.content.deletes_address,
      dhtOp.header.header.content
    )(state);
    register_header_on_basis(
      dhtOp.header.header.content.deletes_entry_address,
      dhtOp.header.header.content
    )(state);

    update_entry_dht_status(dhtOp.header.header.content.deletes_entry_address)(
      state
    );
  } else if (dhtOp.type === DHTOpType.RegisterAddLink) {
    const key: LinkMetaKey = {
      base: dhtOp.header.header.content.base_address,
      header_hash: headerHash,
      tag: dhtOp.header.header.content.tag,
      zome_id: dhtOp.header.header.content.zome_id,
    };
    const value: LinkMetaVal = {
      link_add_hash: headerHash,
      tag: dhtOp.header.header.content.tag,
      target: dhtOp.header.header.content.target_address,
      timestamp: dhtOp.header.header.content.timestamp,
      zome_id: dhtOp.header.header.content.zome_id,
    };
    state.metadata.link_meta.push({ key, value });
  } else if (dhtOp.type === DHTOpType.RegisterRemoveLink) {
    const val: SysMetaVal = {
      DeleteLink: headerHash,
    };

    putSystemMetadata(dhtOp.header.header.content.link_add_address, val)(state);
  }
};

const update_entry_dht_status = (entryHash: Hash) => (state: CellState) => {
  const headers = getHeadersForEntry(state, entryHash);

  const entryIsAlive = headers.some(header => {
    const dhtHeaders = state.metadata.system_meta[serializeHash(hash(header))];
    return dhtHeaders
      ? dhtHeaders.find(
          metaVal =>
            (metaVal as {
              Delete: Hash;
            }).Delete
        )
      : true;
  });

  state.metadata.misc_meta[serializeHash(entryHash)] = {
    EntryStatus: entryIsAlive ? EntryDhtStatus.Live : EntryDhtStatus.Dead,
  };
};

export const register_header_on_basis = (basis: Hash, header: Header) => (
  state: CellState
) => {
  const headerHash = hash(header);
  let value: SysMetaVal | undefined;
  if (header.type === HeaderType.Create) {
    value = { NewEntry: headerHash };
  } else if (header.type === HeaderType.Update) {
    value = { Update: headerHash };
  } else if (header.type === HeaderType.Delete) {
    value = { Delete: headerHash };
  }

  if (value) {
    putSystemMetadata(basis, value)(state);
  }
};

export const putSystemMetadata = (basis: Hash, value: SysMetaVal) => (
  state: CellState
) => {
  const basisStr = serializeHash(basis);
  if (!state.metadata.system_meta[basisStr]) {
    state.metadata.system_meta[basisStr] = [];
  }

  state.metadata.system_meta[basisStr].push(value);
};

export const putDhtOpToIntegrated = (
  dhtOpHash: Hash,
  integratedValue: IntegratedDhtOpsValue
) => (state: CellState) => {
  state.integratedDHTOps[serializeHash(dhtOpHash)] = integratedValue;
};
