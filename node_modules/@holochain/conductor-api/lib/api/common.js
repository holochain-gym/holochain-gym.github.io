"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requesterTransformer = void 0;
/**
 * Take a Requester function which deals with tagged requests and responses,
 * and return a Requester which deals only with the inner data types, also
 * with the optional Transformer applied to further modify the input and output.
 */
exports.requesterTransformer = (requester, tag, transform = identityTransformer) => ((req) => __awaiter(void 0, void 0, void 0, function* () {
    const input = { type: tag, data: transform.input(req) };
    const response = yield requester(input);
    const output = transform.output(response.data);
    return output;
}));
const identity = x => x;
const identityTransformer = {
    input: identity,
    output: identity,
};
//# sourceMappingURL=common.js.map