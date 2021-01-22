import '../../../hash-7578db5d.js';
import '../../../types/entry.js';
import '../../../types/header.js';
import '../../../types/dht-op.js';
import '../../../types/metadata.js';
import { p as pullAllIntegrationLimboDhtOps } from '../../../get-ecef9c10.js';
import { putDhtOpData, putDhtOpMetadata, putDhtOpToIntegrated } from '../dht/put.js';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/integrate_dht_ops_workflow.rs
const integrate_dht_ops = async (cell) => {
    const opsToIntegrate = pullAllIntegrationLimboDhtOps(cell.state);
    for (const dhtOpHash of Object.keys(opsToIntegrate)) {
        const integrationLimboValue = opsToIntegrate[dhtOpHash];
        const dhtOp = integrationLimboValue.op;
        await putDhtOpData(dhtOp)(cell.state);
        putDhtOpMetadata(dhtOp)(cell.state);
        const value = {
            op: dhtOp,
            validation_status: integrationLimboValue.validation_status,
            when_integrated: Date.now(),
        };
        putDhtOpToIntegrated(dhtOpHash, value)(cell.state);
    }
};
function integrate_dht_ops_task(cell) {
    return {
        name: 'Integrate DHT Ops',
        description: 'Integration of the validated DHTOp in our DHT shard',
        task: () => integrate_dht_ops(cell),
    };
}

export { integrate_dht_ops, integrate_dht_ops_task };
//# sourceMappingURL=integrate_dht_ops.js.map
