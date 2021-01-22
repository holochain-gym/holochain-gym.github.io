import { __decorate } from 'tslib';
import { R as RippleHandlers } from './ripple-handlers-a617bd83.js';
import { property, query, queryAsync, internalProperty, eventOptions, LitElement, html } from 'lit-element';
import 'lit-html/directives/class-map';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import '@material/mwc-base/base-element';
import '@material/ripple/foundation';
import 'lit-html/directives/style-map';
import { Ripple } from './mwc-ripple.js';
import { s as style } from './mwc-icon-button-css-4fafa060.js';

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

class IconButton extends ScopedElementsMixin(IconButtonBase) {
    static get scopedElements() {
        return {
            'mwc-ripple': Ripple,
        };
    }
    renderRipple() {
        return this.shouldRenderRipple
            ? html ` <mwc-ripple class="ripple" .disabled="${this.disabled}" unbounded>
        </mwc-ripple>`
            : '';
    }
}
IconButton.styles = style;
__decorate([
    queryAsync('.ripple')
], IconButton.prototype, "ripple", void 0);

export { IconButton };
//# sourceMappingURL=mwc-icon-button.js.map
