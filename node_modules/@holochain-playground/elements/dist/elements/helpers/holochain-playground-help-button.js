import { _ as __decorate, a as __metadata } from '../../tslib.es6-654e2c24.js';
import { property, query } from 'lit-element';
import { html } from 'lit-html';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { BaseElement } from '../utils/base-element.js';
import '@open-wc/scoped-elements';
import '@holochain-playground/container';

class HolochainPlaygroundHelpButton extends BaseElement {
    renderHelpDialog() {
        return html `
      <mwc-dialog id="help-dialog" .heading=${this.heading}>
        <slot></slot>
        <mwc-button slot="primaryAction" dialogAction="cancel">
          Got it!
        </mwc-button>
      </mwc-dialog>
    `;
    }
    render() {
        return html `
      ${this.renderHelpDialog()}
      <mwc-icon-button
        icon="help_outline"
        @click=${() => this._helpDialog.show()}
      ></mwc-icon-button>
    `;
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
    property({ type: String }),
    __metadata("design:type", String)
], HolochainPlaygroundHelpButton.prototype, "heading", void 0);
__decorate([
    query('#help-dialog'),
    __metadata("design:type", Dialog)
], HolochainPlaygroundHelpButton.prototype, "_helpDialog", void 0);

export { HolochainPlaygroundHelpButton };
//# sourceMappingURL=holochain-playground-help-button.js.map
