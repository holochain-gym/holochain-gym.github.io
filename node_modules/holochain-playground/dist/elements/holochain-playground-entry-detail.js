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
import { h as getEntryDetails } from '../get-ecef9c10.js';
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
import { LitElement, css, html, property } from 'lit-element';
import 'lit-html';
import { g as consumePlayground } from '../context-2cfc45e6.js';
import '../index-e11f3d79.js';
import { sharedStyles } from './utils/sharedStyles.js';
import '../processors/message.js';
import '../processors/create-conductors.js';
import '../processors/build-simulated-playground.js';
import { selectAllCells, selectFromCAS } from './utils/selectors.js';

let EntryDetail = class EntryDetail extends LitElement {
    constructor() {
        super(...arguments);
        this.withMetadata = false;
    }
    static get styles() {
        return [
            sharedStyles,
            css `
        :host {
          display: flex;
        }
      `,
        ];
    }
    get activeEntry() {
        const allCells = selectAllCells(this.activeDna, this.conductors);
        return selectFromCAS(this.activeEntryHash, allCells);
    }
    get activeEntryDetails() {
        const allCells = selectAllCells(this.activeDna, this.conductors);
        for (const cell of allCells) {
            const details = getEntryDetails(cell.state, this.activeEntryHash);
            if (details)
                return details;
        }
        return undefined;
    }
    shorten(object, length) {
        if (object && typeof object === 'object') {
            object = { ...object };
            for (const key of Object.keys(object)) {
                object[key] = this.shorten(object[key], length);
            }
        }
        else if (typeof object === 'string' && object.length > length + 3) {
            return object.substring(0, length) + '...';
        }
        return object;
    }
    render() {
        return html `
      <div class="column fill">
        <h3 class="title">Entry Detail</h3>
        ${this.activeEntry
            ? html `
              <div class="column">
                <strong style="margin-bottom: 8px;">
                  ${this.activeEntry.prev_header ? 'Header' : 'Entry'} Hash
                </strong>
                <span style="margin-bottom: 16px;">
                  ${this.shorten(this.activeEntryHash, 50)}
                </span>
                <json-viewer
                  .data=${this.shorten(this.activeEntry, 40)}
                ></json-viewer>
                ${this.withMetadata
                ? html ` <span style="margin: 16px 0; font-weight: bold;">
                        Metadata
                      </span>
                      <json-viewer
                        .data=${this.shorten(this.activeEntryDetails, 40)}
                      ></json-viewer>`
                : html ``}
              </div>
            `
            : html `
              <div class="column fill center-content">
                <span class="placeholder">Select entry to inspect</span>
              </div>
            `}
      </div>
    `;
    }
};
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], EntryDetail.prototype, "conductors", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], EntryDetail.prototype, "activeDna", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], EntryDetail.prototype, "activeEntryHash", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], EntryDetail.prototype, "withMetadata", void 0);
EntryDetail = __decorate([
    consumePlayground()
], EntryDetail);
customElements.define('holochain-playground-entry-detail', EntryDetail);

export { EntryDetail };
//# sourceMappingURL=holochain-playground-entry-detail.js.map
