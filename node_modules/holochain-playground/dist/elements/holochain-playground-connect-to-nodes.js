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
import '../get-ecef9c10.js';
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
import { U as UpdateContextEvent, g as consumePlayground } from '../context-2cfc45e6.js';
import '../processors/message.js';
import '../processors/create-conductors.js';
import '../processors/build-simulated-playground.js';

//import { checkConnection } from '../processors/connect-to-conductors';
let ConnectToNodes = class ConnectToNodes extends LitElement {
    constructor() {
        super(...arguments);
        this.conductorsUrls = ['ws://localhost:8888'];
        this.open = false;
        this.urlsState = {};
    }
    static get styles() {
        return css `
      mwc-dialog {
        --mdc-theme-primary: black;
      }
    `;
    }
    getUrlFields() {
        return Array.apply(null, this.shadowRoot.querySelectorAll('.url-field'));
    }
    setConnectionValidity(element) {
        element.validityTransform = (newValue, nativeValidity) => {
            let valid = false;
            switch (this.urlsState[newValue]) {
                case 'resolved':
                    element.setCustomValidity('');
                    valid = true;
                    break;
                case 'rejected':
                    element.setCustomValidity('Could not connect to node, check admin interface');
                    break;
                default:
                    element.setCustomValidity('Checking connection...');
                    break;
            }
            this.requestUpdate();
            return { valid };
        };
    }
    updateFields() {
        const fields = this.getUrlFields();
        this.conductorsUrls = fields.map((f) => f.value);
        for (const field of fields) {
            this.setConnectionValidity(field);
            if (!this.urlsState[field.value]) ;
            field.reportValidity();
        }
    }
    renderDialog() {
        return html `<mwc-dialog
      id="connect-to-nodes"
      .open="${!!this.open}"
      @closed=${() => (this.open = false)}
    >
      <div class="column">
        <h3 class="title">
          ${this.conductorsUrls ? 'Connected Nodes' : 'Connect to nodes'}
        </h3>
        ${this.conductorsUrls.map((url, index) => html `
            <div class="row" style="margin-bottom: 16px;">
              <mwc-textfield
                style="width: 20em;"
                class="url-field"
                outlined
                label="Conductor url"
                value=${url}
                @input=${() => this.updateFields()}
              ></mwc-textfield>
              <mwc-icon-button
                icon="clear"
                .disabled=${this.conductorsUrls.length === 1}
                style="padding-top: 4px;"
                @click=${() => {
            this.conductorsUrls.splice(index, 1);
            this.conductorsUrls = [...this.conductorsUrls];
            setTimeout(() => this.updateFields());
        }}
              ></mwc-icon-button>
            </div>
          `)}
        <mwc-button
          label="Add node"
          icon="add"
          @click=${() => {
            this.conductorsUrls = [...this.conductorsUrls, ''];
            setTimeout(() => this.updateFields());
        }}
        >
        </mwc-button>
      </div>

      <mwc-button
        slot="primaryAction"
        dialogAction="confirm"
        label=${this.conductorsUrls
            ? 'Ok'
            : this.conductorsUrls
                ? 'Update connections'
                : 'Connect to nodes'}
        .disabled=${this.getUrlFields().length === 0 ||
            !this.getUrlFields().every((field) => field.validity.valid)}
        @click=${() => this.dispatchEvent(new UpdateContextEvent({
            conductorsUrls: this.conductorsUrls,
        }))}
      >
      </mwc-button>
    </mwc-dialog> `;
    }
    render() {
        return html `
      ${this.renderDialog()}
      <mwc-button
        style="margin-right: 18px;"
        label=${this.conductorsUrls ? 'CONNECTED NODES' : 'CONNECT TO NODES'}
        icon=${this.conductorsUrls ? 'sync' : 'sync_disabled'}
        @click=${() => {
            this.shadowRoot.getElementById('connect-to-nodes').open = true;
        }}
      ></mwc-button>
    `;
    }
};
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], ConnectToNodes.prototype, "conductorsUrls", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], ConnectToNodes.prototype, "open", void 0);
ConnectToNodes = __decorate([
    consumePlayground()
], ConnectToNodes);
customElements.define('holochain-playground-connect-to-nodes', ConnectToNodes);

export { ConnectToNodes };
//# sourceMappingURL=holochain-playground-connect-to-nodes.js.map
