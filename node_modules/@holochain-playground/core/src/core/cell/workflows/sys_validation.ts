import { deserializeHash } from '@holochain-open-dev/common';
import { Task } from '../../../executor/executor';
import { Cell } from '../../cell';
import { ValidationLimboStatus } from '../state';
import { getValidationLimboDhtOps } from '../dht/get';
import { putValidationLimboValue } from '../dht/put';
import { app_validation_task } from './app_validation';

// From https://github.com/holochain/holochain/blob/develop/crates/holochain/src/core/workflow/sys_validation_workflow.rs
export const sys_validation = async (cell: Cell): Promise<void> => {
  const pendingDhtOps = getValidationLimboDhtOps(
    cell.state,
    ValidationLimboStatus.Pending
  );

  // TODO: actually validate
  for (const dhtOpHash of Object.keys(pendingDhtOps)) {
    const limboValue = pendingDhtOps[dhtOpHash];

    limboValue.status = ValidationLimboStatus.SysValidated;

    putValidationLimboValue(deserializeHash(dhtOpHash), limboValue);
  }

  cell.triggerWorkflow(app_validation_task(cell));
};

export function sys_validation_task(cell: Cell): Task<void> {
  return {
    name: 'System Validation of the DHT Op',
    description: 'Subconscious checks of data integrity',
    task: () => sys_validation(cell),
  };
}
