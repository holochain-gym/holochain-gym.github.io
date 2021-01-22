function hookUpConductors(conductors) {
    for (let i = 0; i < conductors.length; i++) {
        for (let j = 0; j < conductors.length; j++) {
            if (i != j) {
                conductors[i].network.connectWith(conductors[j]);
            }
        }
    }
}

export { hookUpConductors };
//# sourceMappingURL=message.js.map
