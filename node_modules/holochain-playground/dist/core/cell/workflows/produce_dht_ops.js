import { h as hash } from '../../../hash-7578db5d.js';
import '../../../types/header.js';
import { getElement } from '../source-chain/utils.js';
import { elementToDHTOps } from '../../../types/dht-op.js';
import { getNewHeaders } from '../source-chain/get.js';
import { publish_dht_ops_task } from './publish_dht_ops.js';

function produce_dht_ops_task(cell) {
    return {
        name: 'Produce DHT Ops',
        description: 'Read the new elements in the source chain and produce their appropriate DHT Ops',
        task: () => produce_dht_ops(cell),
    };
}
// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/produce_dht_ops_workflow.rs
const produce_dht_ops = async (cell) => {
    const newHeaderHashes = getNewHeaders(cell.state);
    for (const newHeaderHash of newHeaderHashes) {
        const element = getElement(cell.state, newHeaderHash);
        const dhtOps = elementToDHTOps(element);
        for (const dhtOp of dhtOps) {
            const dhtOpHash = hash(dhtOp);
            const dhtOpValue = {
                op: dhtOp,
                last_publish_time: undefined,
                receipt_count: 0,
            };
            cell.state.authoredDHTOps[dhtOpHash] = dhtOpValue;
        }
    }
    cell.triggerWorkflow(publish_dht_ops_task(cell));
};

export { produce_dht_ops, produce_dht_ops_task };
//# sourceMappingURL=produce_dht_ops.js.map
