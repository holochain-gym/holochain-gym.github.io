import { h as hash } from '../hash-7578db5d.js';
import '../types/entry.js';
import '../types/header.js';
import '../types/timestamp.js';
import '../core/cell/source-chain/utils.js';
import '../core/cell/source-chain/builder-headers.js';
import { create } from '../core/cell/source-chain/actions.js';

// TODO Actually code the Zome
const sampleZome = {
    create_entry: ({ content, entry_type }) => [
        create({ entry_type: 'App', content }, {
            App: {
                id: entry_type,
                zome_id: 0,
                visibility: 'Public',
            },
        }),
    ],
    update_entry: ({ content, type, original_header_hash }) => [],
    delete_entry: ({ deletes_address }) => [],
    create_link: ({ base, target, tag }) => [],
    delete_link: ({ link_add_address }) => [],
};
function sampleDna() {
    const zomes = {
        sample: sampleZome,
    };
    return {
        hash: hash(zomes),
        zomes,
    };
}

export { sampleDna, sampleZome };
//# sourceMappingURL=sample-dna.js.map
