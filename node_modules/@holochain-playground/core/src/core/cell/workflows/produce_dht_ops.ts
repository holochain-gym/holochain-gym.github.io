import { serializeHash } from '@holochain-open-dev/common';
import { elementToDHTOps } from '@holochain-open-dev/core-types';
import { Task } from '../../../executor/executor';
import { hash } from '../../../processors/hash';
import { Cell } from '../../cell';
import { getNewHeaders } from '../source-chain/get';
import { getElement } from '../source-chain/utils';
import { publish_dht_ops_task } from './publish_dht_ops';

export function produce_dht_ops_task(cell: Cell): Task<void> {
  return {
    name: 'Produce DHT Ops',
    description:
      'Read the new elements in the source chain and produce their appropriate DHT Ops',
    task: () => produce_dht_ops(cell),
  };
}

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/produce_dht_ops_workflow.rs
export const produce_dht_ops = async (cell: Cell): Promise<void> => {
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

      cell.state.authoredDHTOps[serializeHash(dhtOpHash)] = dhtOpValue;
    }
  }

  cell.triggerWorkflow(publish_dht_ops_task(cell));
};
