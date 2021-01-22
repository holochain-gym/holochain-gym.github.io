import { _ as __decorate, a as __metadata } from '../tslib.es6-654e2c24.js';
import { html, property } from 'lit-element';
import { sharedStyles } from './utils/shared-styles.js';
import { selectCell, selectAllCells } from './utils/selectors.js';
import { getDhtShard } from '@holochain-playground/core';
import { J as JsonViewer } from '../json-viewer-d616c533.js';
import { BaseElement } from './utils/base-element.js';
import '@holochain-open-dev/common';
import 'lodash-es';
import '@open-wc/scoped-elements';
import '@holochain-playground/container';

class HolochainPlaygroundDhtShard extends BaseElement {
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
              <json-viewer
                id="dht-shard"
                style="margin-top: 16px;"
                .object=${JSON.stringify(getDhtShard(this.activeCell.state))}
              >
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
    static get scopedElements() {
        return {
            'json-viewer': JsonViewer,
        };
    }
}
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], HolochainPlaygroundDhtShard.prototype, "cell", void 0);

export { HolochainPlaygroundDhtShard };
//# sourceMappingURL=holochain-playground-dht-shard.js.map
