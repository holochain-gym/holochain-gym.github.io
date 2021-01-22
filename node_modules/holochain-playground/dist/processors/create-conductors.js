import '../types/common.js';
import '../hash-7578db5d.js';
import '../types/entry.js';
import '../types/header.js';
import '../types/timestamp.js';
import '../core/cell/source-chain/utils.js';
import '../core/cell/source-chain/builder-headers.js';
import '../core/cell/source-chain/put.js';
import '../types/dht-op.js';
import '../core/cell/source-chain/get.js';
import '../core/cell/workflows/publish_dht_ops.js';
import '../core/cell/workflows/produce_dht_ops.js';
import '../core/cell/workflows/genesis.js';
import '../executor/immediate-executor.js';
import '../core/cell/workflows/call_zome_fn.js';
import '../types/cell-state.js';
import '../types/metadata.js';
import '../get-ecef9c10.js';
import '../core/cell/dht/put.js';
import '../core/cell/workflows/integrate_dht_ops.js';
import '../core/cell/workflows/app_validation.js';
import '../core/cell/workflows/sys_validation.js';
import '../core/cell/workflows/incoming_dht_ops.js';
import '../cell-19f9d2f9.js';
import '../core/network/p2p-cell.js';
import '../core/network.js';
import { Conductor } from '../core/conductor.js';
import { hookUpConductors } from './message.js';

async function createConductors(conductorsToCreate, currentConductors, dna) {
    const newConductors = [];
    for (let i = 0; i < conductorsToCreate; i++) {
        const conductor = await Conductor.create();
        newConductors.push(conductor);
    }
    const allConductors = [...currentConductors, ...newConductors];
    for (const conductor of newConductors) {
        await conductor.installDna(dna, null);
    }
    hookUpConductors(allConductors);
    return allConductors;
}

export { createConductors };
//# sourceMappingURL=create-conductors.js.map
