import { _ as __decorate, a as __metadata } from '../tslib.es6-654e2c24.js';
import { html, css, property } from 'lit-element';
import { Conductor } from '@holochain-playground/core';
import { sharedStyles } from './utils/shared-styles.js';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { BaseElement } from './utils/base-element.js';
import { Button } from 'scoped-material-components/mwc-button';
import '@open-wc/scoped-elements';
import '@holochain-playground/container';

class HolochainPlaygroundCallZome extends BaseElement {
    constructor() {
        super(...arguments);
        this._results = [];
        this._arguments = {};
    }
    async callZomeFunction(fnName) {
        try {
            const result = await this.conductor.callZomeFn({
                cellId: this.cellId,
                zome: this.zome.name,
                payload: this._arguments,
                fnName,
                cap: null,
            });
            this._results.push({ result, fnName, zome: this.zome });
        }
        catch (e) {
            this._results.push({ result: e, fnName, zome: this.zome });
        }
        finally {
            this.requestUpdate();
        }
    }
    renderCallableFunction(name, zomeFunction) {
        return html `<div class="row" style="margin: 8px 0;">
      <mwc-button
        raised
        @click=${() => this.callZomeFunction(name)}
        style="width: 12em; margin-top: 18px;"
        >${name}</mwc-button
      >
      <div class="column" style="flex: 1; margin-left: 16px;">
        ${zomeFunction.arguments.map((arg) => html `<mwc-textfield
              style="margin-top: 8px"
              outlined
              label=${arg.name + ': ' + arg.type}
              @input=${(e) => (this._arguments[arg.name] = e.target.value)}
            ></mwc-textfield>`)}
      </div>
    </div>`;
    }
    renderResults() {
        return html `
      <div class="column">
        ${this._results.map((result) => html `<span
              >${result.zome.name} > ${result.fnName}: ${result.result}</span
            >`)}
      </div>
    `;
    }
    render() {
        const zomeFns = Object.entries(this.zome.zome_functions);
        return html `
      <div class="column" style="flex: 1;">
        ${zomeFns.map(([name, fn], index) => html `${this.renderCallableFunction(name, fn)}${index <
            zomeFns.length - 1
            ? html `<span class="horizontal-divider"></span>`
            : html ``}`)}
      </div>
    `;
    }
    static get scopedElements() {
        return {
            'mwc-button': Button,
            'mwc-textfield': TextField,
        };
    }
}
HolochainPlaygroundCallZome.styles = [
    css `
      :host {
        display: flex;
        flex: 1;
      }
      .horizontal-divider {
        background-color: grey;
        height: 1px;
        width: 100%;
        opacity: 0.3;
        margin-bottom: 0;
      }
    `,
    sharedStyles,
];
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], HolochainPlaygroundCallZome.prototype, "zome", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Conductor)
], HolochainPlaygroundCallZome.prototype, "conductor", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], HolochainPlaygroundCallZome.prototype, "cellId", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], HolochainPlaygroundCallZome.prototype, "_results", void 0);

export { HolochainPlaygroundCallZome };
//# sourceMappingURL=holochain-playground-call-zome.js.map
