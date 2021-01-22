import '../../../hash-7578db5d.js';
import '../../../types/entry.js';
import '../../../types/header.js';
import '../../../types/timestamp.js';
import '../source-chain/utils.js';
import { buildDna, buildAgentValidationPkg, buildCreate } from '../source-chain/builder-headers.js';
import { putElement } from '../source-chain/put.js';
import '../../../types/dht-op.js';
import '../source-chain/get.js';
import './publish_dht_ops.js';
import { produce_dht_ops_task } from './produce_dht_ops.js';

const genesis = (agentId, dnaHash, membrane_proof) => async (cell) => {
    const dna = buildDna(dnaHash, agentId);
    putElement({ header: dna, maybe_entry: null })(cell.state);
    const pkg = buildAgentValidationPkg(cell.state, membrane_proof);
    putElement({ header: pkg, maybe_entry: null })(cell.state);
    const entry = {
        content: agentId,
        entry_type: 'Agent',
    };
    const create_agent_pub_key_entry = buildCreate(cell.state, entry, 'Agent');
    putElement({ header: create_agent_pub_key_entry, maybe_entry: entry })(cell.state);
    cell.triggerWorkflow(produce_dht_ops_task(cell));
};

export { genesis };
//# sourceMappingURL=genesis.js.map
