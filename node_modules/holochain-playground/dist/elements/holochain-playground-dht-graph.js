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
import { property, query, queryAsync, internalProperty, eventOptions, LitElement, html, css, customElement } from 'lit-element';
import 'lit-html';
import { U as UpdateContextEvent, g as consumePlayground } from '../context-2cfc45e6.js';
import '../mwc-button-f31b7080.js';
import { R as RippleHandlers } from '../ripple-handlers-03d96165.js';
import { D as Dialog } from '../mwc-dialog-fec05d28.js';
import { sharedStyles } from './utils/sharedStyles.js';
import { dnaNodes } from '../processors/graph.js';
import { a as cytoscape } from '../cytoscape.cjs-3c9fb94a.js';
import '../processors/message.js';
import '../processors/create-conductors.js';
import '../processors/build-simulated-playground.js';
import { selectAllCells, selectHoldingCells } from './utils/selectors.js';
import { vectorsEqual } from '../processors/utils.js';

/** @soyCompatible */
class IconButtonBase extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.icon = '';
        this.label = '';
        this.shouldRenderRipple = false;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    /** @soyTemplate */
    renderRipple() {
        return this.shouldRenderRipple ? html `
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` :
            '';
    }
    focus() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.startFocus();
            buttonElement.focus();
        }
    }
    blur() {
        const buttonElement = this.buttonElement;
        if (buttonElement) {
            this.rippleHandlers.endFocus();
            buttonElement.blur();
        }
    }
    /** @soyTemplate */
    render() {
        return html `<button
        class="mdc-icon-button"
        aria-label="${this.label || this.icon}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}">
      ${this.renderRipple()}
    <i class="material-icons">${this.icon}</i>
    <span class="default-slot-container">
        <slot></slot>
    </span>
  </button>`;
    }
    handleRippleMouseDown(event) {
        const onUp = () => {
            window.removeEventListener('mouseup', onUp);
            this.handleRippleDeactivate();
        };
        window.addEventListener('mouseup', onUp);
        this.rippleHandlers.startPress(event);
    }
    handleRippleTouchStart(event) {
        this.rippleHandlers.startPress(event);
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress();
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover();
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover();
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus();
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus();
    }
}
__decorate([
    property({ type: Boolean, reflect: true })
], IconButtonBase.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], IconButtonBase.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], IconButtonBase.prototype, "label", void 0);
__decorate([
    query('button')
], IconButtonBase.prototype, "buttonElement", void 0);
__decorate([
    queryAsync('mwc-ripple')
], IconButtonBase.prototype, "ripple", void 0);
__decorate([
    internalProperty()
], IconButtonBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    eventOptions({ passive: true })
], IconButtonBase.prototype, "handleRippleMouseDown", null);
__decorate([
    eventOptions({ passive: true })
], IconButtonBase.prototype, "handleRippleTouchStart", null);

/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const style = css `.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}:host{display:inline-block;outline:none;--mdc-ripple-color: currentcolor}:host([disabled]){pointer-events:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2)}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}`;

/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/** @soyCompatible */
let IconButton = class IconButton extends IconButtonBase {
};
IconButton.styles = style;
IconButton = __decorate([
    customElement('mwc-icon-button')
], IconButton);

let DHTGraph = class DHTGraph extends LitElement {
    constructor() {
        super(...arguments);
        this.lastNodes = [];
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
    async firstUpdated() {
        const nodes = dnaNodes(selectAllCells(this.activeDna, this.conductors));
        this.cy = cytoscape({
            container: this.graph,
            boxSelectionEnabled: false,
            autoungrabify: true,
            userPanningEnabled: false,
            userZoomingEnabled: false,
            layout: { name: 'circle' },
            style: `
            node {
              background-color: gray;
              label: data(label);
              font-size: 20px;
              width: 50px;
              height: 50px;
            }

            
             .desktop{
                background-image: url("assets/desktop_windows-outline-white-36dp.svg");
              }
            
             .laptop{
                background-image: url("assets/laptop-outline-white-36dp.svg");
             }
            

            .selected {
              border-width: 4px;
              border-color: black;
              border-style: solid;
            }

            .smartphone{
              background-image: url("assets/smartphone-outline-white-36dp.svg");
            }
    
            .highlighted {
              background-color: yellow;
            }
    
            edge {
              width: 1;
              line-style: dotted;
            }
          `,
        });
        this.cy.on('tap', 'node', (evt) => {
            this.dispatchEvent(new UpdateContextEvent({
                activeAgentPubKey: evt.target.id(),
                activeEntryHash: null,
            }));
        });
    }
    highlightNodesWithEntry(entryHash) {
        const allCells = selectAllCells(this.activeDna, this.conductors);
        allCells.forEach((cell) => this.cy.getElementById(cell.agentPubKey).removeClass('highlighted'));
        const holdingCells = selectHoldingCells(entryHash, allCells);
        for (const cell of holdingCells) {
            this.cy.getElementById(cell.agentPubKey).addClass('highlighted');
        }
    }
    updated(changedValues) {
        super.updated(changedValues);
        const cells = selectAllCells(this.activeDna, this.conductors);
        const newAgentIds = cells.map((c) => c.agentPubKey);
        if (!vectorsEqual(this.lastNodes, newAgentIds)) {
            if (this.layout)
                this.layout.stop();
            this.cy.remove('nodes');
            const nodes = dnaNodes(cells);
            this.cy.add(nodes);
            this.layout = this.cy.elements().makeLayout({ name: 'circle' });
            this.layout.run();
            this.lastNodes = newAgentIds;
        }
        cells.forEach((cell) => this.cy.getElementById(cell.agentPubKey).removeClass('selected'));
        this.cy.getElementById(this.activeAgentPubKey).addClass('selected');
        this.highlightNodesWithEntry(this.activeEntryHash);
    }
    renderDHTHelp() {
        return html `
      <mwc-dialog id="dht-help" heading="DHT Help">
        <span>
          This is a visual interactive representation of a holochain
          <a
            href="https://developer.holochain.org/docs/concepts/4_public_data_on_the_dht/"
            target="_blank"
            >DHT</a
          >, with ${this.conductors.length} nodes.
          <br />
          <br />
          In the DHT, all nodes have a <strong>public and private key</strong>.
          The public key is visible and shared througout the network, but
          private keys never leave their nodes. This public key is of 256 bits
          an it's actually the node's ID, which you can see labeled besides the
          nodes (encoded in base58 strings).
          <br />
          <br />
          If you pay attention, you will see that
          <strong>all nodes in the DHT are ordered alphabetically</strong>. This
          is because the nodes organize themselves in neighborhoods: they are
          more connected with the nodes that are closest to their ID, and less
          connected with the nodes that are far.
        </span>
        <mwc-button slot="primaryAction" dialogAction="cancel">
          Got it!
        </mwc-button>
      </mwc-dialog>
    `;
    }
    render() {
        return html `${this.renderDHTHelp()}
      <div class="column fill" style="position: relative">
        <h3 style="position: absolute; left: 28px; top: 28px;" class="title">
          DHT Nodes
        </h3>
        <div id="graph" style="height: 98%"></div>

        <mwc-icon-button
          style="position: absolute; right: 20px; top: 20px;"
          icon="help_outline"
          @click=${() => (this.dhtHelp.open = true)}
        ></mwc-icon-button>
      </div>`;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DHTGraph.prototype, "activeDna", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], DHTGraph.prototype, "conductors", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DHTGraph.prototype, "activeEntryHash", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DHTGraph.prototype, "activeAgentPubKey", void 0);
__decorate([
    query('#dht-help'),
    __metadata("design:type", Dialog)
], DHTGraph.prototype, "dhtHelp", void 0);
__decorate([
    query('#graph'),
    __metadata("design:type", Object)
], DHTGraph.prototype, "graph", void 0);
DHTGraph = __decorate([
    consumePlayground()
], DHTGraph);
customElements.define('holochain-playground-dht-graph', DHTGraph);

export { DHTGraph };
//# sourceMappingURL=holochain-playground-dht-graph.js.map
