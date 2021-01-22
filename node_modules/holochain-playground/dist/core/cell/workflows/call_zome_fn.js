import '../../../hash-7578db5d.js';
import '../../../types/header.js';
import { getTipOfChain } from '../source-chain/utils.js';
import { putElement } from '../source-chain/put.js';
import '../../../types/dht-op.js';
import '../source-chain/get.js';
import './publish_dht_ops.js';
import { produce_dht_ops_task } from './produce_dht_ops.js';

/**
 * Calls the zome function of the cell DNA
 * This can only be called in the simulated mode: we can assume that cell.simulatedDna exists
 */
const callZomeFn = (zome, fnName, payload, cap) => async (cell) => {
    const currentHeader = getTipOfChain(cell.state);
    if (!cell.simulatedDna.zomes[zome])
        throw new Error(`There is no zome with the name ${zome} in this DNA`);
    if (!cell.simulatedDna.zomes[zome][fnName])
        throw new Error(`There is function with the name ${fnName} in this zome with the name ${zome}`);
    const actions = cell.simulatedDna.zomes[zome][fnName](payload);
    let result = undefined;
    for (const action of actions) {
        const element = await action(cell.state);
        putElement(element)(cell.state);
        result = element;
    }
    if (getTipOfChain(cell.state) != currentHeader) {
        // Do validation
        // Trigger production of DHT Ops
        cell.triggerWorkflow(produce_dht_ops_task(cell));
    }
    return result;
};

export { callZomeFn };
//# sourceMappingURL=call_zome_fn.js.map
