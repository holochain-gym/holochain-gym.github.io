import { h as hash } from '../../../hash-7578db5d.js';

const putElement = (element) => (state) => {
    // Put header in CAS
    const headerHash = hash(element.header);
    state.CAS[headerHash] = element.header;
    // Put entry in CAS if it exist
    if (element.maybe_entry) {
        const entryHash = hash(element.maybe_entry);
        state.CAS[entryHash] = element.maybe_entry;
    }
    state.sourceChain.unshift(headerHash);
};

export { putElement };
//# sourceMappingURL=put.js.map
