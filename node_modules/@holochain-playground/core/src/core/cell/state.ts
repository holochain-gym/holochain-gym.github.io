import {
  AgentPubKey,
  DHTOp,
  Dictionary,
  Hash,
  Metadata,
} from '@holochain-open-dev/core-types';

export interface CellState {
  sourceChain: Array<Hash>;
  CAS: Dictionary<any>;
  metadata: Metadata; // For the moment only DHT shard
  integratedDHTOps: Dictionary<IntegratedDhtOpsValue>; // Key is the hash of the DHT op
  authoredDHTOps: Dictionary<AuthoredDhtOpsValue>; // Key is the hash of the DHT op
  integrationLimbo: Dictionary<IntegrationLimboValue>; // Key is the hash of the DHT op
  validationLimbo: Dictionary<ValidationLimboValue>; // Key is the hash of the DHT op
}

export interface IntegratedDhtOpsValue {
  op: DHTOp;
  validation_status: ValidationStatus;
  when_integrated: number;
}

export interface IntegrationLimboValue {
  op: DHTOp;
  validation_status: ValidationStatus;
}

export enum ValidationStatus {
  Valid,
  Rejected,
  Abandoned,
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/state/dht_op_integration.rs
export interface AuthoredDhtOpsValue {
  op: DHTOp;
  receipt_count: number;
  last_publish_time: number | undefined;
}

export enum ValidationLimboStatus {
  Pending,
  AwaitingSysDeps,
  SysValidated,
  AwaitingAppDeps,
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/state/validation_db.rs#L24
export interface ValidationLimboValue {
  status: ValidationLimboStatus;
  op: DHTOp;
  basis: Hash;
  time_added: number;
  last_try: number | undefined;
  num_tries: number;
  from_agent: AgentPubKey | undefined;
}
