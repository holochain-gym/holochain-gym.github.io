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
import { LitElement, html, property, query } from 'lit-element';
import 'lit-html';
import { U as UpdateContextEvent, g as consumePlayground } from '../context-2cfc45e6.js';
import '../mwc-button-f31b7080.js';
import '../ripple-handlers-03d96165.js';
import '../processors/message.js';
import '../processors/create-conductors.js';
import '../processors/build-simulated-playground.js';
import { fileToPlayground, downloadFile } from '../processors/files.js';

let ImportExport = class ImportExport extends LitElement {
    import() {
        const file = this.fileUpload.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
            const playground = JSON.parse(event.target.result);
            this.dispatchEvent(new UpdateContextEvent(fileToPlayground(playground)));
        };
        reader.readAsText(file);
    }
    export() {
        const playground = {
            activeAgentPubKey: this.activeAgentPubKey,
            activeDna: this.activeDna,
            activeEntryHash: this.activeEntryHash,
            conductors: this.conductors,
            conductorsUrls: this.conductorsUrls,
        };
        const blob = new Blob([JSON.stringify(playground)], {
            type: 'application/json',
        });
        downloadFile(`holochain-playground-${Date.now().toLocaleString()}.json`, blob);
    }
    render() {
        return html `
      <mwc-button
        label="Import"
        icon="publish"
        style="margin-right: 18px;"
        @click=${() => this.fileUpload.click()}
      ></mwc-button>
      <mwc-button
        label="Export"
        icon="get_app"
        style="margin-right: 18px;"
        @click=${() => this.export()}
      ></mwc-button>
      <input
        type="file"
        id="file-upload"
        accept="application/json"
        style="display:none"
        @change=${() => this.import()}
      />
    `;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ImportExport.prototype, "activeDna", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ImportExport.prototype, "activeAgentPubKey", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ImportExport.prototype, "activeEntryHash", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], ImportExport.prototype, "conductors", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], ImportExport.prototype, "conductorsUrls", void 0);
__decorate([
    query('#file-upload'),
    __metadata("design:type", HTMLInputElement)
], ImportExport.prototype, "fileUpload", void 0);
ImportExport = __decorate([
    consumePlayground()
], ImportExport);
customElements.define('holochain-playground-import-export', ImportExport);

export { ImportExport };
//# sourceMappingURL=holochain-playground-import-export.js.map
