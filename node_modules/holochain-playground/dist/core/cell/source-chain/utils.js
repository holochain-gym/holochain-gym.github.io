import { HeaderType } from '../../../types/header.js';

function getTipOfChain(cellState) {
    return cellState.sourceChain[0];
}
function getAuthor(cellState) {
    return getHeaderAt(cellState, 0).author;
}
function getDnaHash(state) {
    const firstHeaderHash = state.sourceChain[state.sourceChain.length - 1];
    const dna = state.CAS[firstHeaderHash];
    return dna.hash;
}
function getHeaderAt(cellState, index) {
    const headerHash = cellState.sourceChain[index];
    return cellState.CAS[headerHash];
}
function getNextHeaderSeq(cellState) {
    return cellState.sourceChain.length;
}
function getElement(state, headerHash) {
    const header = state.CAS[headerHash];
    let maybe_entry = undefined;
    if (header.type == HeaderType.Create || header.type == HeaderType.Update) {
        maybe_entry = state.CAS[header.entry_hash];
    }
    return { header, maybe_entry };
}
function getCellId(state) {
    const author = getAuthor(state);
    const dna = getDnaHash(state);
    return [author, dna];
}
function getNonPublishedDhtOps(state) {
    const nonPublishedDhtOps = {};
    for (const dhtOpHash of Object.keys(state.authoredDHTOps)) {
        const authoredValue = state.authoredDHTOps[dhtOpHash];
        if (authoredValue.last_publish_time === undefined) {
            nonPublishedDhtOps[dhtOpHash] = authoredValue.op;
        }
    }
    return nonPublishedDhtOps;
}

export { getAuthor, getCellId, getDnaHash, getElement, getHeaderAt, getNextHeaderSeq, getNonPublishedDhtOps, getTipOfChain };
//# sourceMappingURL=utils.js.map
