function now() {
    return millisToTimestamp(Date.now());
}
function millisToTimestamp(millis) {
    const secs = Math.floor(millis / 1000);
    const nanos = (millis % 1000) * 1000;
    return [secs, nanos];
}
function timestampToMillis(timestamp) {
    return timestamp[0] * 1000 + Math.floor(timestamp[1] / 1000);
}

export { millisToTimestamp, now, timestampToMillis };
//# sourceMappingURL=timestamp.js.map
