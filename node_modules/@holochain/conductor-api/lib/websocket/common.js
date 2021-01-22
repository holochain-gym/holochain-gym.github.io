"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const ERROR_TYPE = 'error';
exports.catchError = (res) => {
    return res.type === ERROR_TYPE
        ? Promise.reject(res)
        : Promise.resolve(res);
};
//# sourceMappingURL=common.js.map