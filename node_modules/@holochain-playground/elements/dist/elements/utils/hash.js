import { serializeHash } from '@holochain-open-dev/common';

function serializeAndShortenHashesRec(object) {
    if (object instanceof Uint8Array) {
        const strHash = serializeHash(object);
        return `Hash(...${strHash.substring(strHash.length - 5)})`;
    }
    else if (Array.isArray(object)) {
        return object.map(serializeAndShortenHashesRec);
    }
    else if (typeof object === 'object') {
        for (const key of Object.keys(object)) {
            object[key] = serializeAndShortenHashesRec(object[key]);
        }
        return object;
    }
    else if (typeof object === 'string' && object.length > 23) {
        return `${object.substring(0, 20)}...`;
    }
    return object;
}
function serializeHashesRec(object) {
    if (object instanceof Uint8Array) {
        return serializeHash(object);
    }
    else if (Array.isArray(object)) {
        return object.map(serializeHashesRec);
    }
    else if (typeof object === 'object') {
        for (const key of Object.keys(object)) {
            object[key] = serializeHashesRec(object[key]);
        }
        return object;
    }
    return object;
}

export { serializeAndShortenHashesRec, serializeHashesRec };
//# sourceMappingURL=hash.js.map
