import { deserializeHash } from '@holochain-open-dev/common';
import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
import { IntegratedDhtOpsValue } from '../state';
import { pullAllIntegrationLimboDhtOps } from '../dht/get';
import {
  putDhtOpData,
  putDhtOpMetadata,
  putDhtOpToIntegrated,
} from '../dht/put';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/integrate_dht_ops_workflow.rs
export const integrate_dht_ops = async (cell: Cell): Promise<void> => {
  const opsToIntegrate = pullAllIntegrationLimboDhtOps(cell.state);

  for (const dhtOpHash of Object.keys(opsToIntegrate)) {
    const integrationLimboValue = opsToIntegrate[dhtOpHash];

    const dhtOp = integrationLimboValue.op;

    await putDhtOpData(dhtOp)(cell.state);
    putDhtOpMetadata(dhtOp)(cell.state);

    const value: IntegratedDhtOpsValue = {
      op: dhtOp,
      validation_status: integrationLimboValue.validation_status,
      when_integrated: Date.now(),
    };

    putDhtOpToIntegrated(deserializeHash(dhtOpHash), value)(cell.state);
  }
};

export function integrate_dht_ops_task(cell: Cell): Task<void> {
  return {
    name: 'Integrate DHT Ops',
    description: 'Integration of the validated DHTOp in our DHT shard',
    task: () => integrate_dht_ops(cell),
  };
}
