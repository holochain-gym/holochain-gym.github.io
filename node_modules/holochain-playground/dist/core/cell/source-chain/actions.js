import '../../../hash-7578db5d.js';
import '../../../types/entry.js';
import '../../../types/header.js';
import '../../../types/timestamp.js';
import './utils.js';
import { buildCreate } from './builder-headers.js';

// Creates a new Create header and its entry in the source chain
const create = (entry, entry_type) => async (state) => {
    const create = buildCreate(state, entry, entry_type);
    const element = {
        header: create,
        maybe_entry: entry,
    };
    return element;
};
// Creates a new Create header and its entry in the source chain
/* export const update = (entry: Entry, entry_type: EntryType, original_header_hash: Hash): HdkAction => (
  state: CellState
): Element => {
  const create = buildUpdate(state, entry, entry_type, null, original_header_hash);

  const element: Element = {
    header: create,
    maybe_entry: entry,
  };

  return element;
};
 */

export { create };
//# sourceMappingURL=actions.js.map
