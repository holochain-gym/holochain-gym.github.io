import '../../../hash-7578db5d.js';
import '../../../types/header.js';
import { getNonPublishedDhtOps } from '../source-chain/utils.js';
import { getDHTOpBasis } from '../../../types/dht-op.js';

function publish_dht_ops_task(cell) {
    return {
        name: 'Publish DHT Ops',
        description: 'Read the elements in the authored DHT Ops that have not been published and publish them',
        task: () => publish_dht_ops(cell),
    };
}
// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/publish_dht_ops_workflow.rs
const publish_dht_ops = async (cell) => {
    const dhtOps = getNonPublishedDhtOps(cell.state);
    const dhtOpsByBasis = {};
    for (const dhtOpHash of Object.keys(dhtOps)) {
        const dhtOp = dhtOps[dhtOpHash];
        const basis = getDHTOpBasis(dhtOp);
        if (!dhtOpsByBasis[basis])
            dhtOpsByBasis[basis] = {};
        dhtOpsByBasis[basis][dhtOpHash] = dhtOp;
    }
    const promises = Object.entries(dhtOpsByBasis).map(async ([basis, dhtOps]) => {
        // Publish the operations
        await cell.p2p.publish(basis, dhtOps);
        for (const dhtOpHash of Object.keys(dhtOps)) {
            cell.state.authoredDHTOps[dhtOpHash].last_publish_time = Date.now();
        }
    });
    await Promise.all(promises);
};

export { publish_dht_ops, publish_dht_ops_task };
//# sourceMappingURL=publish_dht_ops.js.map
