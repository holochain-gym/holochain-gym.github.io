import { Cell } from '../../cell';
import { buildZomeFunctionContext } from '../../hdk/context';
import { getTipOfChain } from '../source-chain/utils';
import { produce_dht_ops_task } from './produce_dht_ops';

/**
 * Calls the zome function of the cell DNA
 * This can only be called in the simulated mode: we can assume that cell.simulatedDna exists
 */
export const callZomeFn = (
  zomeName: string,
  fnName: string,
  payload: any,
  cap: string
) => async (cell: Cell): Promise<any> => {
  const currentHeader = getTipOfChain(cell.state);

  const dna = cell.getSimulatedDna();
  if (!dna)
    throw new Error(
      `Trying to do a simulated call to a cell that is not simulated`
    );

  const zomeIndex = dna.zomes.findIndex(zome => zome.name === zomeName);
  if (zomeIndex < 0)
    throw new Error(`There is no zome with the name ${zomeName} in this DNA`);

  if (!dna.zomes[zomeIndex].zome_functions[fnName])
    throw new Error(
      `There is function with the name ${fnName} in this zome with the name ${zomeName}`
    );

  const context = buildZomeFunctionContext(zomeIndex, cell);

  const result = dna.zomes[zomeIndex].zome_functions[fnName].call(context)(payload);

  if (getTipOfChain(cell.state) != currentHeader) {
    // Do validation

    // Trigger production of DHT Ops
    cell.triggerWorkflow(produce_dht_ops_task(cell));
  }

  return result;
};
