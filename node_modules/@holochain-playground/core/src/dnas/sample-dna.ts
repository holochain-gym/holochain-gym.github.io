import { SimulatedDnaTemplate, SimulatedZome } from './simulated-dna';

export const sampleZome: SimulatedZome = {
  name: 'sample',
  entry_defs: [
    {
      id: 'sample_entry',
      visibility: 'Public',
    },
    {
      id: 'path',
      visibility: 'Public',
    },
  ],
  zome_functions: {
    create_entry: {
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: 'sample_entry' });
      },
      arguments: [{ name: 'content', type: 'any' }],
    },
    create_link: {
      call: ({ create_link }) => ({ base, target, tag }) => {
        return create_link({ base, target, tag });
      },
      arguments: [
        { name: 'base', type: 'EntryHash' },
        { name: 'target', type: 'EntryHash' },
        { name: 'any', type: 'EntryHash' },
      ],
    },
    create_path: {
      call: hdk => ({ pathContent }) => {
        return hdk.path.ensure(pathContent, hdk);
      },
      arguments: [{ name: 'pathContent', type: 'String' }],
    },
    /*     update_entry: ({ content, type, original_header_hash }) => [],
    delete_entry: ({ deletes_address }) => [],
    create_link: ({ base, target, tag }) => [],
    delete_link: ({ link_add_address }) => [],
 */
  },
};

export function sampleDnaTemplate(): SimulatedDnaTemplate {
  const zomes = [sampleZome];
  return {
    zomes,
  };
}
