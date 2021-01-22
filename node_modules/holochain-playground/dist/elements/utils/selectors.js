import '../../types/metadata.js';
import { j as isHoldingEntry } from '../../get-ecef9c10.js';

function selectCells(dna, conductor) {
    return conductor.cells
        .filter((cell) => cell.cell.dnaHash === dna)
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
function selectConductorByAgent(agentPubKey, conductors) {
    return conductors.find((conductor) => conductor.cells.find((cell) => cell.cell.agentPubKey === agentPubKey));
}
function selectCell(dnaHash, agentPubKey, conductors) {
    const conductor = selectConductorByAgent(agentPubKey, conductors);
    if (!conductor)
        return undefined;
    const cell = conductor.cells.find((cell) => cell.cell.agentPubKey === agentPubKey && cell.cell.dnaHash == dnaHash);
    return cell ? cell.cell : undefined;
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
    for (const cell of cells) {
        const entry = cell.state.CAS[hash];
        if (entry) {
            return entry;
        }
    }
    return undefined;
}
function selectHeaderEntry(headerHash, cells) {
    const header = selectFromCAS(headerHash, cells);
    return selectFromCAS(header.entry_hash, cells);
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
            dnas[cell.cell.dnaHash] = true;
        }
    }
    return Object.keys(dnas);
}
function selectRedundancyFactor(cell) {
    return cell.p2p.redundancyFactor;
}

export { selectAllCells, selectAllDNAs, selectCell, selectCells, selectConductorByAgent, selectFromCAS, selectGlobalDHTOpsCount, selectHeaderEntry, selectHoldingCells, selectMedianHoldingDHTOps, selectRedundancyFactor, selectUniqueDHTOpsCount };
//# sourceMappingURL=selectors.js.map
