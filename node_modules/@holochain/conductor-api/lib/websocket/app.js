"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AppWebsocket = void 0;
/**
 * Defines AppWebsocket, an easy-to-use websocket implementation of the
 * Conductor API for apps
 *
 *    const client = AppWebsocket.connect(
 *      'ws://localhost:9000',
 *      signal => console.log('got a signal:', signal)
 *    )
 *
 *    client.callZome({...})  // TODO: show what's in here
 *      .then(() => {
 *        console.log('DNA successfully installed')
 *      })
 *      .catch(err => {
 *        console.error('problem installing DNA:', err)
 *      })
 */
const msgpack = __importStar(require("@msgpack/msgpack"));
const client_1 = require("./client");
const common_1 = require("./common");
const common_2 = require("../api/common");
class AppWebsocket {
    constructor(client) {
        this._requester = (tag, transformer) => common_2.requesterTransformer(req => this.client.request(req).then(common_1.catchError), tag, transformer);
        this.appInfo = this._requester('app_info');
        this.callZome = this._requester('zome_call_invocation', callZomeTransform);
        this.client = client;
    }
    static connect(url, signalCb) {
        return __awaiter(this, void 0, void 0, function* () {
            const wsClient = yield client_1.WsClient.connect(url, signalCb);
            return new AppWebsocket(wsClient);
        });
    }
}
exports.AppWebsocket = AppWebsocket;
const callZomeTransform = {
    input: (req) => {
        req.payload = msgpack.encode(req.payload);
        return req;
    },
    output: (res) => {
        return msgpack.decode(res);
    }
};
//# sourceMappingURL=app.js.map