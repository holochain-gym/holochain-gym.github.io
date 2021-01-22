import '../../../hash-7578db5d.js';
import '../../../types/entry.js';
import '../../../types/header.js';
import '../../../types/dht-op.js';
import { ValidationLimboStatus } from '../../../types/cell-state.js';
import '../../../types/metadata.js';
import '../../../get-ecef9c10.js';
import { putValidationLimboValue } from '../dht/put.js';
import './integrate_dht_ops.js';
import './app_validation.js';
import { sys_validation_task } from './sys_validation.js';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/incoming_dht_ops_workflow.rs
const incoming_dht_ops = (basis, dhtOps, from_agent) => async (cell) => {
    for (const dhtOpHash of Object.keys(dhtOps)) {
        const dhtOp = dhtOps[dhtOpHash];
        const validationLimboValue = {
            basis,
            from_agent,
            last_try: undefined,
            num_tries: 0,
            op: dhtOp,
            status: ValidationLimboStatus.Pending,
            time_added: Date.now(),
        };
        putValidationLimboValue(dhtOpHash, validationLimboValue)(cell.state);
    }
    cell.triggerWorkflow(sys_validation_task(cell));
};

export { incoming_dht_ops };
//# sourceMappingURL=incoming_dht_ops.js.map
