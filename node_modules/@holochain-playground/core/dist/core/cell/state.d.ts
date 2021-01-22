import { AgentPubKey, DHTOp, Dictionary, Hash, Metadata } from '@holochain-open-dev/core-types';
export interface CellState {
    sourceChain: Array<Hash>;
    CAS: Dictionary<any>;
    metadata: Metadata;
    integratedDHTOps: Dictionary<IntegratedDhtOpsValue>;
    authoredDHTOps: Dictionary<AuthoredDhtOpsValue>;
    integrationLimbo: Dictionary<IntegrationLimboValue>;
    validationLimbo: Dictionary<ValidationLimboValue>;
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
export declare enum ValidationStatus {
    Valid = 0,
    Rejected = 1,
    Abandoned = 2
}
export interface AuthoredDhtOpsValue {
    op: DHTOp;
    receipt_count: number;
    last_publish_time: number | undefined;
}
export declare enum ValidationLimboStatus {
    Pending = 0,
    AwaitingSysDeps = 1,
    SysValidated = 2,
    AwaitingAppDeps = 3
}
export interface ValidationLimboValue {
    status: ValidationLimboStatus;
    op: DHTOp;
    basis: Hash;
    time_added: number;
    last_try: number | undefined;
    num_tries: number;
    from_agent: AgentPubKey | undefined;
}
