import { __decorate } from 'tslib';
import './ripple-handlers-a617bd83.js';
import { customElement, query, property, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import '@material/mwc-base/base-element';
import '@material/ripple/foundation';
import 'lit-html/directives/style-map';
import './mwc-ripple.js';
import '@material/mwc-base/form-element';
import 'lit-html/directives/if-defined';
import { s as style, C as CheckboxBase, a as Checkbox$1 } from './mwc-checkbox-25caeaa0.js';
import '@material/mwc-base/observer';
import { L as ListItemBase, s as style$1 } from './mwc-list-item-css-626f0dc6.js';
import { s as style$2 } from './mwc-control-list-item-css-b817c11e.js';

/** @soyCompatible */
let Checkbox = class Checkbox extends CheckboxBase {
};
Checkbox.styles = style;
Checkbox = __decorate([
    customElement('mwc-checkbox')
], Checkbox);

/**
 @license
 Copyright 2020 Google Inc. All Rights Reserved.

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
class CheckListItemBase extends ListItemBase {
    constructor() {
        super(...arguments);
        this.left = false;
        this.graphic = 'control';
    }
    render() {
        const checkboxClasses = {
            'mdc-list-item__graphic': this.left,
            'mdc-list-item__meta': !this.left,
        };
        const text = this.renderText();
        const graphic = this.graphic && this.graphic !== 'control' && !this.left ?
            this.renderGraphic() :
            html ``;
        const meta = this.hasMeta && this.left ? this.renderMeta() : html ``;
        const ripple = this.renderRipple();
        return html `
      ${ripple}
      ${graphic}
      ${this.left ? '' : text}
      <span class=${classMap(checkboxClasses)}>
        <mwc-checkbox
            reducedTouchTarget
            tabindex=${this.tabindex}
            .checked=${this.selected}
            ?disabled=${this.disabled}
            @change=${this.onChange}>
        </mwc-checkbox>
      </span>
      ${this.left ? text : ''}
      ${meta}`;
    }
    async onChange(evt) {
        const checkbox = evt.target;
        const changeFromProp = this.selected === checkbox.checked;
        if (!changeFromProp) {
            this._skipPropRequest = true;
            this.selected = checkbox.checked;
            await this.updateComplete;
            this._skipPropRequest = false;
        }
    }
}
__decorate([
    query('slot')
], CheckListItemBase.prototype, "slotElement", void 0);
__decorate([
    query('mwc-checkbox')
], CheckListItemBase.prototype, "checkboxElement", void 0);
__decorate([
    property({ type: Boolean })
], CheckListItemBase.prototype, "left", void 0);
__decorate([
    property({ type: String, reflect: true })
], CheckListItemBase.prototype, "graphic", void 0);

class CheckListItem extends ScopedElementsMixin(CheckListItemBase) {
    static get scopedElements() {
        return {
            'mwc-checkbox': Checkbox$1,
        };
    }
}
CheckListItem.styles = [style$1, style$2];

export { CheckListItem };
//# sourceMappingURL=mwc-check-list-item.js.map
