import { Base64 } from 'js-base64';
export function deserializeHash(hash) {
    return Base64.toUint8Array(hash.slice(1));
}
export function serializeHash(hash) {
    return `u${Base64.fromUint8Array(hash, true)}`;
}
export function getCellIdForDnaHash(appInfo, dnaHash) {
    const cell = appInfo.cell_data.find(cellData => serializeHash(cellData[0][0]) === dnaHash);
    if (!cell)
        throw new Error(`Could not find cell for dna ${dnaHash}`);
    return cell[0];
}
export function millisToTimestamp(millis) {
    const secs = Math.floor(millis / 1000);
    const nanos = (millis % 1000) * 1000;
    return [secs, nanos];
}
export function timestampToMillis(timestamp) {
    return timestamp[0] * 1000 + Math.floor(timestamp[1] / 1000);
}
export function now() {
    return millisToTimestamp(Date.now());
}
//# sourceMappingURL=utils.js.map