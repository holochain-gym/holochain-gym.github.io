import '../../../hash-7578db5d.js';
import { hashEntry } from '../../../types/entry.js';
import { HeaderType } from '../../../types/header.js';
import { now } from '../../../types/timestamp.js';
import { getAuthor, getNextHeaderSeq, getTipOfChain } from './utils.js';

function buildDna(dnaHash, agentId) {
    const dna = {
        author: agentId,
        hash: dnaHash,
        timestamp: now(),
        type: HeaderType.Dna,
    };
    return dna;
}
function buildAgentValidationPkg(state, membrane_proof) {
    const pkg = {
        ...buildCommon(state),
        membrane_proof,
        type: HeaderType.AgentValidationPkg,
    };
    return pkg;
}
function buildCreate(state, entry, entry_type) {
    const entry_hash = hashEntry(entry);
    const create = {
        ...buildCommon(state),
        entry_hash,
        entry_type,
        type: HeaderType.Create,
    };
    return create;
}
function buildUpdate(state, entry, entry_type, original_entry_address, original_header_address) {
    const entry_hash = hashEntry(entry);
    const update = {
        ...buildCommon(state),
        entry_hash,
        entry_type,
        original_entry_address,
        original_header_address,
        type: HeaderType.Update,
    };
    return update;
}
/** Helpers */
function buildCommon(state) {
    const author = getAuthor(state);
    const header_seq = getNextHeaderSeq(state);
    const prev_header = getTipOfChain(state);
    const timestamp = now();
    return {
        author,
        header_seq,
        prev_header,
        timestamp,
    };
}

export { buildAgentValidationPkg, buildCreate, buildDna, buildUpdate };
//# sourceMappingURL=builder-headers.js.map
