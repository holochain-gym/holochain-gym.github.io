import { serializeHash, deserializeHash } from '@holochain-open-dev/common';
import { isEqual } from 'lodash-es';

function selectCells(dna, conductor) {
    return conductor.cells
        .filter((cell) => isEqual(cell.cell.dnaHash, dna))
        .map((c) => c.cell);
}
function selectAllCells(dna, conductors) {
    const cells = conductors.map((c) => selectCells(dna, c));
    return [].concat(...cells);
}
function selectGlobalDHTOpsCount(cells) {
    let dhtOps = 0;
    for (const cell of cells) {
        dhtOps += Object.keys(cell.state.integratedDHTOps).length;
    }
    return dhtOps;
}
function selectHoldingCells(entryHash, cells) {
    return cells.filter((cell) => isHoldingEntry(cell.state, entryHash));
}
function isHoldingEntry(state, entryHash) {
    for (const integratedDhtOpValue of Object.values(state.integratedDHTOps)) {
        const holdedEntryHash = integratedDhtOpValue.op.header.header
            .content.entry_hash;
        if (holdedEntryHash && isEqual(holdedEntryHash, entryHash)) {
            return true;
        }
    }
    for (const authoredDhtOpsValue of Object.values(state.authoredDHTOps)) {
        const holdedEntryHash = authoredDhtOpsValue.op.header.header
            .content.entry_hash;
        if (holdedEntryHash && isEqual(holdedEntryHash, entryHash)) {
            return true;
        }
    }
    return false;
}
function selectConductorByAgent(agentPubKey, conductors) {
    return conductors.find((conductor) => conductor.cells.find((cell) => isEqual(cell.cell.agentPubKey, agentPubKey)));
}
function selectCell(dnaHash, agentPubKey, conductors) {
    for (const conductor of conductors) {
        for (const cell of conductor.cells) {
            if (isEqual(cell.cell.agentPubKey, agentPubKey) &&
                isEqual(cell.cell.dnaHash, dnaHash)) {
                return cell.cell;
            }
        }
    }
    return undefined;
}
function selectUniqueDHTOpsCount(cells) {
    const globalDHTOps = {};
    for (const cell of cells) {
        for (const hash of Object.keys(cell.state.integratedDHTOps)) {
            globalDHTOps[hash] = {};
        }
    }
    return Object.keys(globalDHTOps).length;
}
function selectFromCAS(hash, cells) {
    if (!hash)
        return undefined;
    for (const cell of cells) {
        const entry = cell.state.CAS[serializeHash(hash)];
        if (entry) {
            return entry;
        }
    }
    return undefined;
}
function selectHeaderEntry(headerHash, cells) {
    const header = selectFromCAS(headerHash, cells);
    return selectFromCAS(header.header.content.entry_hash, cells);
}
function selectMedianHoldingDHTOps(cells) {
    const holdingDHTOps = [];
    for (const cell of cells) {
        holdingDHTOps.push(Object.keys(cell.state.integratedDHTOps).length);
    }
    holdingDHTOps.sort();
    const medianIndex = Math.floor(holdingDHTOps.length / 2);
    return holdingDHTOps.sort((a, b) => a - b)[medianIndex];
}
function selectAllDNAs(conductors) {
    const dnas = {};
    for (const conductor of conductors) {
        for (const cell of Object.values(conductor.cells)) {
            dnas[serializeHash(cell.cell.dnaHash)] = true;
        }
    }
    return Object.keys(dnas).map(deserializeHash);
}
function selectRedundancyFactor(cell) {
    return cell.p2p.redundancyFactor;
}

export { isHoldingEntry, selectAllCells, selectAllDNAs, selectCell, selectCells, selectConductorByAgent, selectFromCAS, selectGlobalDHTOpsCount, selectHeaderEntry, selectHoldingCells, selectMedianHoldingDHTOps, selectRedundancyFactor, selectUniqueDHTOpsCount };
//# sourceMappingURL=selectors.js.map
