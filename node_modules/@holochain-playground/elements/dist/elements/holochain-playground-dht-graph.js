import { _ as __decorate, a as __metadata } from '../tslib.es6-654e2c24.js';
import { css, html, query } from 'lit-element';
import { c as cytoscape_cjs } from '../cytoscape.cjs-2bb12747.js';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Button } from 'scoped-material-components/mwc-button';
import { dnaNodes } from '../processors/graph.js';
import { selectAllCells, selectHoldingCells } from './utils/selectors.js';
import { sharedStyles } from './utils/shared-styles.js';
import { BaseElement } from './utils/base-element.js';
import { isEqual } from 'lodash-es';
import '@holochain-playground/core';
import '@holochain-open-dev/core-types';
import '@holochain-open-dev/common';
import './utils/hash.js';
import '@open-wc/scoped-elements';
import '@holochain-playground/container';

class HolochainPlaygroundDhtGraph extends BaseElement {
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
        window.addEventListener('scroll', () => {
            this.cy.resize();
        });
        this.cy = cytoscape_cjs({
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
            this.updatePlayground({
                activeAgentPubKey: evt.target.id(),
                activeEntryHash: null,
            });
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
        if (!isEqual(this.lastNodes, newAgentIds)) {
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
    static get scopedElements() {
        return {
            'mwc-icon-button': IconButton,
            'mwc-button': Button,
            'mwc-dialog': Dialog,
        };
    }
}
__decorate([
    query('#dht-help'),
    __metadata("design:type", Dialog)
], HolochainPlaygroundDhtGraph.prototype, "dhtHelp", void 0);
__decorate([
    query('#graph'),
    __metadata("design:type", Object)
], HolochainPlaygroundDhtGraph.prototype, "graph", void 0);

export { HolochainPlaygroundDhtGraph };
//# sourceMappingURL=holochain-playground-dht-graph.js.map
