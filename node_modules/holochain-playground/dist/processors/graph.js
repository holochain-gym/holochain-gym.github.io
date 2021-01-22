import { c as compareBigInts, l as location } from '../hash-7578db5d.js';
import { getEntryTypeString, getAppEntryType } from '../types/entry.js';
import { timestampToMillis } from '../types/timestamp.js';
import { EntryDhtStatus } from '../types/metadata.js';
import { k as getAllHeldEntries, h as getEntryDetails } from '../get-ecef9c10.js';

function dnaNodes(cells) {
    // const images = ['smartphone', 'desktop', 'laptop'];
    const sortedCells = cells.sort((a, b) => compareBigInts(location(a.agentPubKey), location(b.agentPubKey)));
    const cellNodes = sortedCells.map((cell) => ({
        data: {
            id: cell.agentPubKey,
            label: `${cell.agentPubKey.substr(0, 6)}...`,
        },
    }));
    const edges = sortedCells.map((cell) => cell.p2p.getNeighbors().map((neighbor) => ({
        data: {
            id: `${cell.agentPubKey}->${neighbor}`,
            source: cell.agentPubKey,
            target: neighbor,
        },
    })));
    return [...cellNodes, ...[].concat(...edges)];
}
function sourceChainNodes(cell) {
    if (!cell)
        return [];
    const nodes = [];
    const headersHashes = cell.state.sourceChain;
    for (const headerHash of headersHashes) {
        const header = cell.state.CAS[headerHash];
        nodes.push({
            data: { id: headerHash, data: header, label: header.type },
            classes: ['header', header.type],
        });
        if (header.prev_header) {
            nodes.push({
                data: {
                    id: `${headerHash}->${header.prev_header}`,
                    source: headerHash,
                    target: header.prev_header,
                },
            });
        }
    }
    for (const headerHash of headersHashes) {
        const header = cell.state.CAS[headerHash];
        if (header.entry_hash) {
            const newEntryHeader = header;
            const entry = cell.state.CAS[newEntryHeader.entry_hash];
            const entryType = getEntryTypeString(newEntryHeader.entry_type);
            nodes.push({
                data: {
                    id: newEntryHeader.entry_hash,
                    data: entry,
                    label: `${entryType}`,
                },
                classes: [entryType],
            });
            nodes.push({
                data: {
                    id: `${headerHash}->${newEntryHeader.entry_hash}`,
                    source: headerHash,
                    target: newEntryHeader.entry_hash,
                },
            });
        }
    }
    return nodes;
}
function allEntries(cells, showAgentIds) {
    const entries = {};
    const details = {};
    for (const cell of cells) {
        for (const entryHash of getAllHeldEntries(cell.state)) {
            entries[entryHash] = cell.state.CAS[entryHash];
            details[entryHash] = getEntryDetails(cell.state, entryHash);
        }
    }
    //  const agentPubKeys = Object.keys(entries).filter(entryHash => details[entryHash].headers.includes(h=> (h as Agent)));
    const sortedEntries = sortEntries(Object.keys(entries), details);
    const linksEdges = [];
    const entryNodes = [];
    const entryTypeCount = {};
    for (const entryHash of sortedEntries) {
        const entry = entries[entryHash];
        const detail = details[entryHash];
        // Get base nodes and edges
        const newEntryHeader = detail.headers[0];
        const entryType = getEntryTypeString(newEntryHeader.entry_type);
        if (!entryTypeCount[entryType])
            entryTypeCount[entryType] = 0;
        entryNodes.push({
            data: {
                id: entryHash,
                data: entry,
                label: `${entryType}${entryTypeCount[entryType]}`,
            },
            classes: [entryType],
        });
        entryTypeCount[entryType] += 1;
        // Get implicit links from the entry
        if (getAppEntryType(newEntryHeader.entry_type)) {
            const implicitLinks = getImplicitLinks(Object.keys(entries), entry.content);
            for (const implicitLink of implicitLinks) {
                linksEdges.push({
                    data: {
                        id: `${entryHash}->${implicitLink.target}`,
                        source: entryHash,
                        target: implicitLink.target,
                        label: implicitLink.label,
                    },
                    classes: ['implicit'],
                });
            }
        }
        // Get the explicit links from the entry
        const linksDetails = detail.links;
        for (const linkVal of linksDetails) {
            linksEdges.push({
                data: {
                    id: `${entryHash}->${linkVal.target}`,
                    source: entryHash,
                    target: linkVal.target,
                    label: `Tag: ${linkVal.tag}`,
                },
                classes: ['explicit'],
            });
        }
        // Get the updates edges for the entry
        const updateHeaders = detail.headers.filter((h) => h.original_header_address &&
            h.original_entry_address === entryHash);
        for (const update of updateHeaders) {
            linksEdges.push({
                data: {
                    id: `${entryHash}-replaced-by-${update.entry_hash}`,
                    source: entryHash,
                    target: update.entry_hash,
                    label: 'replaced by',
                },
                classes: ['update-link'],
            });
        }
        // Add deleted class if is deleted
        if (detail.dhtStatus === EntryDhtStatus.Dead)
            entryNodes
                .find((node) => node.data.id === entryHash)
                .classes.push('deleted');
    }
    /*
    if (!showAgentIds) {
      for (const [key, entry] of Object.entries(entries)) {
        if (entry.type === EntryType.AgentId) {
          const links = linksEdges.filter(
            (edge) => edge.data.source === key || edge.data.target === key
          );
          if (links.length === 0) {
            const index = entryNodes.findIndex((node) => node.data.id === key);
            entryNodes.splice(index, 1);
          }
        }
      }
    }
   */
    return [...entryNodes, ...linksEdges];
}
function getImplicitLinks(allEntryIds, value) {
    if (!value)
        return [];
    if (typeof value === 'string') {
        return allEntryIds.includes(value)
            ? [{ label: undefined, target: value }]
            : [];
    }
    if (Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === 'string') {
        return value
            .filter((v) => allEntryIds.includes(v))
            .map((v) => ({ target: v, label: undefined }));
    }
    if (typeof value === 'object') {
        const values = Object.entries(value).map(([key, v]) => {
            const implicitLinks = getImplicitLinks(allEntryIds, v);
            for (const implicitLink of implicitLinks) {
                if (!implicitLink.label) {
                    implicitLink.label = key;
                }
            }
            return implicitLinks;
        });
        return [].concat(...values);
    }
    return [];
}
/** Helper functions  */
function sortEntries(entryHashes, details) {
    return entryHashes.sort((keyA, keyB) => compareEntries(details, keyA, keyB));
}
function compareHeader(headerA, headerB) {
    return (timestampToMillis(headerA.timestamp) - timestampToMillis(headerB.timestamp));
}
function compareEntries(details, hashA, hashB) {
    const headersA = Object.values(details[hashA].headers).sort(compareHeader);
    const headersB = Object.values(details[hashB].headers).sort(compareHeader);
    return headersA.length > 0
        ? timestampToMillis(headersA[0].timestamp)
        : 0 - headersB.length > 0
            ? timestampToMillis(headersB[0].timestamp)
            : 0;
}

export { allEntries, dnaNodes, getImplicitLinks, sourceChainNodes };
//# sourceMappingURL=graph.js.map
