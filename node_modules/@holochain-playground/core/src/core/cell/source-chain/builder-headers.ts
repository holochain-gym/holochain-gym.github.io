import { now } from '@holochain-open-dev/common';
import {
  Hash,
  AgentPubKey,
  Dna,
  HeaderType,
  AgentValidationPkg,
  Entry,
  EntryType,
  Create,
  Update,
  SignedHeaderHashed,
  Header,
  CreateLink,
} from '@holochain-open-dev/core-types';
import { hash } from '../../../processors/hash';
import { CellState } from '../state';
import { hashEntry } from '../utils';
import { getAuthor, getNextHeaderSeq, getTipOfChain } from './utils';

export function buildShh(header: Header): SignedHeaderHashed {
  return {
    header: {
      content: header,
      hash: hash(header),
    },
    signature: Uint8Array.from([]),
  };
}

export function buildDna(dnaHash: Hash, agentId: AgentPubKey): Dna {
  const dna: Dna = {
    author: agentId,
    hash: dnaHash,
    timestamp: now(),
    type: HeaderType.Dna,
  };

  return dna;
}

export function buildAgentValidationPkg(
  state: CellState,
  membrane_proof: any
): AgentValidationPkg {
  const pkg: AgentValidationPkg = {
    ...buildCommon(state),
    membrane_proof,
    type: HeaderType.AgentValidationPkg,
  };
  return pkg;
}

export function buildCreate(
  state: CellState,
  entry: Entry,
  entry_type: EntryType
): Create {
  const entry_hash = hashEntry(entry);

  const create: Create = {
    ...buildCommon(state),
    entry_hash,
    entry_type,
    type: HeaderType.Create,
  };
  return create;
}

export function buildCreateLink(
  state: CellState,
  zome_id: number,
  base: Hash,
  target: Hash,
  tag: any
): CreateLink {
  const create_link: CreateLink = {
    ...buildCommon(state),
    base_address: base,
    target_address: target,
    tag,
    zome_id,
    type: HeaderType.CreateLink,
  };
  return create_link;
}

export function buildUpdate(
  state: CellState,
  entry: Entry,
  entry_type: EntryType,
  original_entry_address: Hash,
  original_header_address: Hash
): Update {
  const entry_hash = hashEntry(entry);

  const update: Update = {
    ...buildCommon(state),
    entry_hash,
    entry_type,
    original_entry_address,
    original_header_address,

    type: HeaderType.Update,
  };
  return update;
}

/** Helpers */

function buildCommon(state: CellState) {
  const author = getAuthor(state);
  const header_seq = getNextHeaderSeq(state);
  const prev_header = getTipOfChain(state);
  const timestamp = now();

  return {
    author,
    header_seq,
    prev_header,
    timestamp,
  };
}
