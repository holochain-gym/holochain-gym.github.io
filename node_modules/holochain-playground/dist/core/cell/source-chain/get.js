/**
 * Returns the header hashes which don't have their DHTOps in the authoredDHTOps DB
 */
function getNewHeaders(state) {
    return state.sourceChain.filter((headerHash) => !Object.keys(state.authoredDHTOps).includes(headerHash));
}

export { getNewHeaders };
//# sourceMappingURL=get.js.map
