import { _ as __decorate, a as __metadata } from '../tslib.es6-654e2c24.js';
import { html, query, property } from 'lit-element';
import { selectCell, selectAllCells, selectRedundancyFactor, selectCells, selectUniqueDHTOpsCount, selectMedianHoldingDHTOps, selectGlobalDHTOpsCount } from './utils/selectors.js';
import { sharedStyles } from './utils/shared-styles.js';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { LinearProgress } from 'scoped-material-components/mwc-linear-progress';
import { BaseElement } from './utils/base-element.js';
import { createConductors, sampleDnaTemplate } from '@holochain-playground/core';
import '@holochain-open-dev/common';
import 'lodash-es';
import '@open-wc/scoped-elements';
import '@holochain-playground/container';

class HolochainPlaygroundDhtStats extends BaseElement {
    constructor() {
        super(...arguments);
        this.processing = false;
    }
    static get styles() {
        return sharedStyles;
    }
    get activeCell() {
        return (selectCell(this.activeDna, this.activeAgentPubKey, this.conductors) ||
            this.allCells[0]);
    }
    get allCells() {
        return selectAllCells(this.activeDna, this.conductors);
    }
    renderStatsHelp() {
        return html `
      <mwc-dialog id="stats-help" heading="DHT Statistics Help">
        <span>
          This panel contains statistics for the current state of the DHT.
          <br />
          <br />
          Having a redundancy factor of
          ${selectRedundancyFactor(this.activeCell)}, it will
          <strong>
            replicate every DHT Op in the
            ${selectRedundancyFactor(this.activeCell)} nodes that are closest to
            its neighborhood </strong
          >.
          <br />
          <br />
          The number of
          <strong
            >DHT Ops (DHT Operation Transforms) is a measure of the load that
            the DHT has to hold</strong
          >. A DHT Op is the command that a node receives to indicate it has to
          change something in its shard of the DHT. Example of DHT Ops are
          "StoreEntry", "RegisterAddLink".
        </span>
        <mwc-button slot="primaryAction" dialogAction="cancel">
          Got it!
        </mwc-button>
      </mwc-dialog>
    `;
    }
    async republish() {
        const newNodes = parseInt(this.nNodes.value);
        const currentNodes = this.allCells.length;
        const rFactor = parseInt(this.rFactor.value);
        const dna = this.activeDna;
        let conductors = this.conductors;
        if (newNodes > currentNodes) {
            const newNodesToCreate = newNodes - currentNodes;
            conductors = await createConductors(newNodesToCreate, conductors, sampleDnaTemplate());
        }
        else if (newNodes < currentNodes) {
            const conductorsToRemove = currentNodes - newNodes;
            const getMaxSourceChainLength = (conductor) => Math.max(...selectCells(this.activeDna, conductor).map((cell) => cell.state.sourceChain.length));
            conductors = conductors.sort((c1, c2) => getMaxSourceChainLength(c1) - getMaxSourceChainLength(c2));
            conductors.splice(0, conductorsToRemove);
        }
        /*
        TODO: handle gossip at the core layer
            if (changedNodes) {
              const peers = conductors.map((c) => c.cells[dna].agentId);
        
              for (const conductor of conductors) {
                conductor.cells[dna].peers = peers.filter(
                  (p) => p !== conductor.cells[dna].agentId
                );
              }
            }
            
            this.updatePlayground({
              conductors: conductors,
            });
            
            if (changedNodes || selectRedundancyFactor(this.activeCell) !== rFactor) {
              const cells = conductors.map((c) => c.cells[dna]);
              for (const cell of cells) {
                cell.DHTOpTransforms = {};
                cell.redundancyFactor = rFactor;
              }
              for (const cell of cells) {
                cell.republish();
              }
            }
            */
        this.processing = false;
    }
    updateDHTStats() {
        this.processing = true;
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.republish();
        }, 400);
    }
    render() {
        return html `
      ${this.renderStatsHelp()}
      <div class="column" style="position: relative;">
        <div style="padding: 16px;">
          <h3 class="title">Global DHT Stats</h3>

          <mwc-icon-button
            style="position: absolute; right: 8px; top: 8px;"
            icon="help_outline"
            @click=${() => (this.statsHelp.open = true)}
          ></mwc-icon-button>

          <div class="row center-content">
            <div class="row center-content" style="padding-right: 16px;">
              <span style="margin-right: 8px;">Number of nodes: </span
              ><mwc-textfield
                id="number-of-nodes"
                min="1"
                max="50"
                outlined
                type="number"
                style="width: 5em;"
                .disabled=${this.conductorsUrls !== undefined}
                @change=${() => this.updateDHTStats()}
                .value=${this.allCells.length.toString()}
              ></mwc-textfield>
            </div>
            <div class="row center-content" style="padding-right: 24px;">
              <span style="margin-right: 8px;">Redundancy factor: </span
              ><mwc-textfield
                id="r-factor"
                min="1"
                max="50"
                outlined
                type="number"
                .disabled=${this.conductorsUrls !== undefined}
                style="width: 5em;"
                @change=${() => this.updateDHTStats()}
                .value=${selectRedundancyFactor(this.activeCell).toString()}
              ></mwc-textfield>
            </div>
            <div class="column fill">
              <span style="margin-bottom: 2px;"
                >Unique DHT Ops:
                <strong>${selectUniqueDHTOpsCount(this.allCells)}</strong></span
              >
              <span style="margin-bottom: 2px;"
                >Median DHT Ops per node:
                <strong
                  >${selectMedianHoldingDHTOps(this.allCells)}</strong
                ></span
              >
              <span
                >Global DHT Ops:
                <strong>${selectGlobalDHTOpsCount(this.allCells)}</strong></span
              >
            </div>
          </div>
        </div>
        ${this.processing
            ? html `<mwc-linear-progress indeterminate></mwc-linear-progress>`
            : html ``}
      </div>
    `;
    }
    static get scopedElements() {
        return {
            'mwc-linear-progress': LinearProgress,
            'mwc-textfield': TextField,
            'mwc-icon-button': IconButton,
            'mwc-dialog': Dialog,
        };
    }
}
__decorate([
    query('#stats-help'),
    __metadata("design:type", Dialog)
], HolochainPlaygroundDhtStats.prototype, "statsHelp", void 0);
__decorate([
    query('#number-of-nodes'),
    __metadata("design:type", TextField)
], HolochainPlaygroundDhtStats.prototype, "nNodes", void 0);
__decorate([
    query('#r-factor'),
    __metadata("design:type", TextField)
], HolochainPlaygroundDhtStats.prototype, "rFactor", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], HolochainPlaygroundDhtStats.prototype, "processing", void 0);

export { HolochainPlaygroundDhtStats };
//# sourceMappingURL=holochain-playground-dht-stats.js.map
