import '../../../hash-7578db5d.js';
import '../../../types/entry.js';
import '../../../types/header.js';
import '../../../types/dht-op.js';
import { ValidationLimboStatus, ValidationStatus } from '../../../types/cell-state.js';
import '../../../types/metadata.js';
import { a as getValidationLimboDhtOps } from '../../../get-ecef9c10.js';
import { deleteValidationLimboValue, putIntegrationLimboValue } from '../dht/put.js';
import { integrate_dht_ops_task } from './integrate_dht_ops.js';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/app_validation_workflow.rs
const app_validation = async (cell) => {
    const pendingDhtOps = getValidationLimboDhtOps(cell.state, ValidationLimboStatus.SysValidated);
    // TODO: actually validate
    for (const dhtOpHash of Object.keys(pendingDhtOps)) {
        deleteValidationLimboValue(dhtOpHash)(cell.state);
        const validationLimboValue = pendingDhtOps[dhtOpHash];
        const value = {
            op: validationLimboValue.op,
            validation_status: ValidationStatus.Valid,
        };
        putIntegrationLimboValue(dhtOpHash, value)(cell.state);
    }
    cell.triggerWorkflow(integrate_dht_ops_task(cell));
};
function app_validation_task(cell) {
    return {
        name: 'App Validation of the DHT Op',
        description: 'Running of the zome appropriate zome hook',
        task: () => app_validation(cell),
    };
}

export { app_validation, app_validation_task };
//# sourceMappingURL=app_validation.js.map
