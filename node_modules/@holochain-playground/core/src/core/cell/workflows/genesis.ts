import { AgentPubKey, Hash, Entry } from '@holochain-open-dev/core-types';
import { Cell } from '../../cell';
import {
  buildAgentValidationPkg,
  buildCreate,
  buildDna,
  buildShh,
} from '../source-chain/builder-headers';
import { putElement } from '../source-chain/put';
import { produce_dht_ops_task } from './produce_dht_ops';

export const genesis = (
  agentId: AgentPubKey,
  dnaHash: Hash,
  membrane_proof: any
) => async (cell: Cell): Promise<void> => {
  const dna = buildDna(dnaHash, agentId);
  putElement({ signed_header: buildShh(dna), entry: undefined })(cell.state);

  const pkg = buildAgentValidationPkg(cell.state, membrane_proof);
  putElement({ signed_header: buildShh(pkg), entry: undefined })(cell.state);

  const entry: Entry = {
    content: agentId,
    entry_type: 'Agent',
  };
  const create_agent_pub_key_entry = buildCreate(cell.state, entry, 'Agent');
  putElement({
    signed_header: buildShh(create_agent_pub_key_entry),
    entry: entry,
  })(cell.state);

  cell.triggerWorkflow(produce_dht_ops_task(cell));
};
