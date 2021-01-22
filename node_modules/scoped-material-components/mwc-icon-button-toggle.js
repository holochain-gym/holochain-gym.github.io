import { __decorate } from 'tslib';
import { R as RippleHandlers } from './ripple-handlers-a617bd83.js';
import { query, property, queryAsync, internalProperty, eventOptions, html } from 'lit-element';
import { BaseElement, addHasRemoveClass } from '@material/mwc-base/base-element';
import { observer } from '@material/mwc-base/observer';
import MDCIconButtonToggleFoundation from '@material/icon-button/foundation';
import { s as style } from './mwc-icon-button-css-4fafa060.js';

class IconButtonToggleBase extends BaseElement {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCIconButtonToggleFoundation;
        this.label = '';
        this.disabled = false;
        this.onIcon = '';
        this.offIcon = '';
        this.on = false;
        this.shouldRenderRipple = false;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { getAttr: (name) => {
                return this.mdcRoot.getAttribute(name);
            }, setAttr: (name, value) => {
                this.mdcRoot.setAttribute(name, value);
            }, notifyChange: (evtData) => {
                this.dispatchEvent(new CustomEvent('MDCIconButtonToggle:change', { detail: evtData, bubbles: true }));
            } });
    }
    handleClick() {
        this.on = !this.on;
        this.mdcFoundation.handleClick();
    }
    focus() {
        this.rippleHandlers.startFocus();
        this.mdcRoot.focus();
    }
    blur() {
        this.rippleHandlers.endFocus();
        this.mdcRoot.blur();
    }
    renderRipple() {
        return this.shouldRenderRipple ? html `
            <mwc-ripple
                .disabled="${this.disabled}"
                unbounded>
            </mwc-ripple>` :
            '';
    }
    render() {
        return html `
      <button
          class="mdc-icon-button"
          @click="${this.handleClick}"
          aria-label="${this.label}"
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
        <span class="mdc-icon-button__icon">
          <slot name="offIcon">
            <i class="material-icons">${this.offIcon}</i>
          </slot>
        </span>
        <span class="mdc-icon-button__icon mdc-icon-button__icon--on">
          <slot name="onIcon">
            <i class="material-icons">${this.onIcon}</i>
          </slot>
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
    query('.mdc-icon-button')
], IconButtonToggleBase.prototype, "mdcRoot", void 0);
__decorate([
    property({ type: String })
], IconButtonToggleBase.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], IconButtonToggleBase.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], IconButtonToggleBase.prototype, "onIcon", void 0);
__decorate([
    property({ type: String })
], IconButtonToggleBase.prototype, "offIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    observer(function (state) {
        this.mdcFoundation.toggle(state);
    })
], IconButtonToggleBase.prototype, "on", void 0);
__decorate([
    queryAsync('mwc-ripple')
], IconButtonToggleBase.prototype, "ripple", void 0);
__decorate([
    internalProperty()
], IconButtonToggleBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    eventOptions({ passive: true })
], IconButtonToggleBase.prototype, "handleRippleMouseDown", null);
__decorate([
    eventOptions({ passive: true })
], IconButtonToggleBase.prototype, "handleRippleTouchStart", null);

class IconButtonToggle extends IconButtonToggleBase {
}
IconButtonToggle.styles = style;

export { IconButtonToggle };
//# sourceMappingURL=mwc-icon-button-toggle.js.map
