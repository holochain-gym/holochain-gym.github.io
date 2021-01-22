import { __decorate } from 'tslib';
import { R as RippleHandlers } from './ripple-handlers-a617bd83.js';
import { property, query, queryAsync, internalProperty, eventOptions, html, css } from 'lit-element';
import 'lit-html/directives/class-map';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import '@material/mwc-base/base-element';
import '@material/ripple/foundation';
import 'lit-html/directives/style-map';
import { Ripple } from './mwc-ripple.js';
import { FormElement, addHasRemoveClass } from '@material/mwc-base/form-element';
import { observer } from '@material/mwc-base/observer';
import MDCSwitchFoundation from '@material/switch/foundation';

class SwitchBase extends FormElement {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.disabled = false;
        this.shouldRenderRipple = false;
        this.mdcFoundationClass = MDCSwitchFoundation;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    changeHandler(e) {
        this.mdcFoundation.handleChange(e);
        // catch "click" event and sync properties
        this.checked = this.formElement.checked;
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { setNativeControlChecked: (checked) => {
                this.formElement.checked = checked;
            }, setNativeControlDisabled: (disabled) => {
                this.formElement.disabled = disabled;
            }, setNativeControlAttr: (attr, value) => {
                this.formElement.setAttribute(attr, value);
            } });
    }
    renderRipple() {
        return this.shouldRenderRipple ? html `
        <mwc-ripple 
          .accent="${this.checked}"
          .disabled="${this.disabled}"
          unbounded>
        </mwc-ripple>` :
            '';
    }
    focus() {
        const formElement = this.formElement;
        if (formElement) {
            this.rippleHandlers.startFocus();
            formElement.focus();
        }
    }
    blur() {
        const formElement = this.formElement;
        if (formElement) {
            this.rippleHandlers.endFocus();
            formElement.blur();
        }
    }
    render() {
        return html `
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          ${this.renderRipple()}
          <div class="mdc-switch__thumb">
            <input
              type="checkbox"
              id="basic-switch"
              class="mdc-switch__native-control"
              role="switch"
              @change="${this.changeHandler}"
              @focus="${this.handleRippleFocus}"
              @blur="${this.handleRippleBlur}"
              @mousedown="${this.handleRippleMouseDown}"
              @mouseenter="${this.handleRippleMouseEnter}"
              @mouseleave="${this.handleRippleMouseLeave}"
              @touchstart="${this.handleRippleTouchStart}"
              @touchend="${this.handleRippleDeactivate}"
              @touchcancel="${this.handleRippleDeactivate}">
          </div>
        </div>
      </div>`;
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
    property({ type: Boolean }),
    observer(function (value) {
        this.mdcFoundation.setChecked(value);
    })
], SwitchBase.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function (value) {
        this.mdcFoundation.setDisabled(value);
    })
], SwitchBase.prototype, "disabled", void 0);
__decorate([
    query('.mdc-switch')
], SwitchBase.prototype, "mdcRoot", void 0);
__decorate([
    query('input')
], SwitchBase.prototype, "formElement", void 0);
__decorate([
    queryAsync('mwc-ripple')
], SwitchBase.prototype, "ripple", void 0);
__decorate([
    internalProperty()
], SwitchBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    eventOptions({ passive: true })
], SwitchBase.prototype, "handleRippleMouseDown", null);
__decorate([
    eventOptions({ passive: true })
], SwitchBase.prototype, "handleRippleTouchStart", null);

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
const style = css `.mdc-switch__thumb-underlay{left:-14px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-14px}.mdc-switch__native-control{width:64px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch.mdc-switch--checked .mdc-switch__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-switch.mdc-switch--checked .mdc-switch__thumb{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__track{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);border-color:#fff;border-color:var(--mdc-theme-surface, #fff)}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:36px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-16px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(16px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent}`;

class Switch extends ScopedElementsMixin(SwitchBase) {
    static get scopedElements() {
        return {
            'mwc-ripple': Ripple,
        };
    }
}
Switch.styles = style;

export { Switch };
//# sourceMappingURL=mwc-switch.js.map
