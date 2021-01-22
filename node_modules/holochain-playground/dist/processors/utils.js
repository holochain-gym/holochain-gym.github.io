function vectorsEqual(v1, v2) {
    if (v1.length !== v2.length)
        return false;
    v1 = v1.sort();
    v2 = v2.sort();
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] !== v2[i])
            return false;
    }
    return true;
}

export { vectorsEqual };
//# sourceMappingURL=utils.js.map
