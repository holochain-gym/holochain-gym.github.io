"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeAgentPubKey = void 0;
exports.fakeAgentPubKey = (x) => Buffer.from([0x84, 0x20, 0x24].concat('000000000000000000000000000000000000'
    .split('')
    .map((x) => parseInt(x, 10))));
//# sourceMappingURL=types.js.map