import '../types/common.js';
import '../hash-7578db5d.js';
import '../types/entry.js';
import '../types/header.js';
import '../types/timestamp.js';
import '../core/cell/source-chain/utils.js';
import '../core/cell/source-chain/builder-headers.js';
import '../core/cell/source-chain/put.js';
import '../types/dht-op.js';
import '../core/cell/source-chain/get.js';
import '../core/cell/workflows/publish_dht_ops.js';
import '../core/cell/workflows/produce_dht_ops.js';
import '../core/cell/workflows/genesis.js';
import '../executor/immediate-executor.js';
import '../core/cell/workflows/call_zome_fn.js';
import '../types/cell-state.js';
import '../types/metadata.js';
import { f as getDhtShard } from '../get-ecef9c10.js';
import '../core/cell/dht/put.js';
import '../core/cell/workflows/integrate_dht_ops.js';
import '../core/cell/workflows/app_validation.js';
import '../core/cell/workflows/sys_validation.js';
import '../core/cell/workflows/incoming_dht_ops.js';
import { b as __decorate, d as __metadata } from '../cell-19f9d2f9.js';
import '../core/network/p2p-cell.js';
import '../core/network.js';
import '../core/conductor.js';
import '../core/cell/source-chain/actions.js';
import '../dnas/sample-dna.js';
import { LitElement, html, property } from 'lit-element';
import 'lit-html';
import { g as consumePlayground } from '../context-2cfc45e6.js';
import '../index-e11f3d79.js';
import { sharedStyles } from './utils/sharedStyles.js';
import '../processors/message.js';
import '../processors/create-conductors.js';
import '../processors/build-simulated-playground.js';
import { selectCell, selectAllCells } from './utils/selectors.js';

let DHTShard = class DHTShard extends LitElement {
    constructor() {
        super(...arguments);
        this.cell = undefined;
    }
    static style() {
        return sharedStyles;
    }
    get activeCell() {
        return (selectCell(this.activeDna, this.activeAgentPubKey, this.conductors) ||
            selectAllCells(this.activeDna, this.conductors)[0]);
    }
    render() {
        return html `
      <div class="column">
        ${this.activeCell
            ? html `
              <span>
                <strong>
                  Entries with associated metadata, and agent ids with all their
                  headers
                </strong>
              </span>
              <json-viewer id="dht-shard" style="margin-top: 16px;">
                ${JSON.stringify(getDhtShard(this.activeCell.state))}
              </json-viewer>
            `
            : html `
              <span class="placeholder">
                Select a cell to see its DHT Shard
              </span>
            `}
      </div>
    `;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DHTShard.prototype, "activeDna", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], DHTShard.prototype, "conductors", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DHTShard.prototype, "activeAgentPubKey", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], DHTShard.prototype, "cell", void 0);
DHTShard = __decorate([
    consumePlayground()
], DHTShard);
customElements.define('holochain-playground-dht-shard', DHTShard);

export { DHTShard };
//# sourceMappingURL=holochain-playground-dht-shard.js.map
