import { __decorate } from 'tslib';
import { query, property, eventOptions, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { FormElement, addHasRemoveClass } from '@material/mwc-base/form-element';
import { observer } from '@material/mwc-base/observer';
import { applyPassive } from '@material/dom/events';
import MDCSliderFoundation from '@material/slider/foundation';

const INPUT_EVENT = 'input';
const CHANGE_EVENT = 'change';
class SliderBase extends FormElement {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCSliderFoundation;
        this.min = 0;
        this.max = 100;
        this._value = 0;
        this.step = 0;
        this.disabled = false;
        this.pin = false;
        this.markers = false;
        this.pinMarkerText = '';
        this.trackMarkerContainerStyles = {};
        this.thumbContainerStyles = {};
        this.trackStyles = {};
        this.isFoundationDestroyed = false;
    }
    set value(value) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setValue(value);
        }
        this._value = value;
        this.requestUpdate('value', value);
    }
    get value() {
        if (this.mdcFoundation) {
            return this.mdcFoundation.getValue();
        }
        else {
            return this._value;
        }
    }
    // TODO(sorvell) #css: needs a default width
    render() {
        const isDiscrete = this.step !== 0;
        const hostClassInfo = {
            'mdc-slider--discrete': isDiscrete,
            'mdc-slider--display-markers': this.markers && isDiscrete,
        };
        let markersTemplate = '';
        if (isDiscrete && this.markers) {
            markersTemplate = html `
        <div
            class="mdc-slider__track-marker-container"
            style="${styleMap(this.trackMarkerContainerStyles)}">
        </div>`;
        }
        let pin = '';
        if (this.pin) {
            pin = html `
      <div class="mdc-slider__pin">
        <span class="mdc-slider__pin-value-marker">${this.pinMarkerText}</span>
      </div>`;
        }
        return html `
      <div class="mdc-slider ${classMap(hostClassInfo)}"
           tabindex="0" role="slider"
           aria-valuemin="${this.min}" aria-valuemax="${this.max}"
           aria-valuenow="${this.value}"
           aria-disabled="${this.disabled.toString()}"
           data-step="${this.step}"
           @mousedown=${this.layout}
           @touchstart=${this.layout}>
        <div class="mdc-slider__track-container">
          <div
              class="mdc-slider__track"
              style="${styleMap(this.trackStyles)}">
          </div>
          ${markersTemplate}
        </div>
        <div
            class="mdc-slider__thumb-container"
            style="${styleMap(this.thumbContainerStyles)}">
          <!-- TODO: use cache() directive -->
          ${pin}
          <svg class="mdc-slider__thumb" width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875"></circle>
          </svg>
        <div class="mdc-slider__focus-ring"></div>
      </div>
    </div>`;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.mdcRoot && this.isFoundationDestroyed) {
            this.isFoundationDestroyed = false;
            this.mdcFoundation.init();
        }
    }
    updated(changed) {
        const minChanged = changed.has('min');
        const maxChanged = changed.has('max');
        if (minChanged && maxChanged) {
            if (this.max < this.mdcFoundation.getMin()) {
                // for when min is above previous max
                this.mdcFoundation.setMin(this.min);
                this.mdcFoundation.setMax(this.max);
            }
            else {
                // for when max is below previous min
                this.mdcFoundation.setMax(this.max);
                this.mdcFoundation.setMin(this.min);
            }
        }
        else if (minChanged) {
            this.mdcFoundation.setMin(this.min);
        }
        else if (maxChanged) {
            this.mdcFoundation.setMax(this.max);
        }
        super.updated(changed);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.isFoundationDestroyed = true;
        this.mdcFoundation.destroy();
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { getAttribute: (name) => this.mdcRoot.getAttribute(name), setAttribute: (name, value) => this.mdcRoot.setAttribute(name, value), removeAttribute: (name) => this.mdcRoot.removeAttribute(name), computeBoundingRect: () => {
                const rect = this.mdcRoot.getBoundingClientRect();
                const myRect = {
                    bottom: rect.bottom,
                    height: rect.height,
                    left: rect.left + window.pageXOffset,
                    right: rect.right,
                    top: rect.top,
                    width: rect.width,
                };
                return myRect;
            }, getTabIndex: () => this.mdcRoot.tabIndex, registerInteractionHandler: (type, handler) => {
                const init = type === 'touchstart' ? applyPassive() : undefined;
                this.mdcRoot.addEventListener(type, handler, init);
            }, deregisterInteractionHandler: (type, handler) => this.mdcRoot.removeEventListener(type, handler), registerThumbContainerInteractionHandler: (type, handler) => {
                const init = type === 'touchstart' ? applyPassive() : undefined;
                this.thumbContainer.addEventListener(type, handler, init);
            }, deregisterThumbContainerInteractionHandler: (type, handler) => this.thumbContainer.removeEventListener(type, handler), registerBodyInteractionHandler: (type, handler) => document.body.addEventListener(type, handler), deregisterBodyInteractionHandler: (type, handler) => document.body.removeEventListener(type, handler), registerResizeHandler: (handler) => window.addEventListener('resize', handler, applyPassive()), deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler), notifyInput: () => {
                const value = this.mdcFoundation.getValue();
                if (value !== this._value) {
                    this.value = value;
                    this.dispatchEvent(new CustomEvent(INPUT_EVENT, { detail: this, composed: true, bubbles: true, cancelable: true }));
                }
            }, notifyChange: () => {
                this.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: this, composed: true, bubbles: true, cancelable: true }));
            }, setThumbContainerStyleProperty: (propertyName, value) => {
                this.thumbContainerStyles[propertyName] = value;
                this.requestUpdate();
            }, setTrackStyleProperty: (propertyName, value) => {
                this.trackStyles[propertyName] = value;
                this.requestUpdate();
            }, setMarkerValue: (value) => this.pinMarkerText =
                value.toLocaleString(), setTrackMarkers: (step, max, min) => {
                // calculates the CSS for the notches on the slider. Taken from
                // https://github.com/material-components/material-components-web/blob/8f851d9ed2f75dc8b8956d15b3bb2619e59fa8a9/packages/mdc-slider/component.ts#L122
                const stepStr = step.toLocaleString();
                const maxStr = max.toLocaleString();
                const minStr = min.toLocaleString();
                // keep calculation in css for better rounding/subpixel behavior
                const markerAmount = `((${maxStr} - ${minStr}) / ${stepStr})`;
                const markerWidth = '2px';
                const markerBkgdImage = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
                const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
                const markerBkgdShorthand = `${markerBkgdImage} ${markerBkgdLayout}`;
                this.trackMarkerContainerStyles['background'] = markerBkgdShorthand;
                this.requestUpdate();
            }, isRTL: () => getComputedStyle(this.mdcRoot).direction === 'rtl' });
    }
    resetFoundation() {
        if (this.mdcFoundation) {
            this.mdcFoundation.destroy();
            this.mdcFoundation.init();
        }
    }
    async firstUpdated() {
        await super.firstUpdated();
        this.mdcFoundation.setValue(this._value);
    }
    /**
     * Layout is called on mousedown / touchstart as the dragging animations of
     * slider are calculated based off of the bounding rect which can change
     * between interactions with this component, and this is the only location
     * in the foundation that udpates the rects. e.g. scrolling horizontally
     * causes adverse effects on the bounding rect vs mouse drag / touchmove
     * location.
     */
    layout() {
        this.mdcFoundation.layout();
    }
}
__decorate([
    query('.mdc-slider')
], SliderBase.prototype, "mdcRoot", void 0);
__decorate([
    query('.mdc-slider')
], SliderBase.prototype, "formElement", void 0);
__decorate([
    query('.mdc-slider__thumb-container')
], SliderBase.prototype, "thumbContainer", void 0);
__decorate([
    query('.mdc-slider__pin-value-marker')
], SliderBase.prototype, "pinMarker", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], SliderBase.prototype, "value", null);
__decorate([
    property({ type: Number }),
    observer(function (value, old) {
        const oldWasDiscrete = old !== 0;
        const newIsDiscrete = value !== 0;
        if (oldWasDiscrete !== newIsDiscrete) {
            this.resetFoundation();
        }
        this.mdcFoundation.setStep(value);
    })
], SliderBase.prototype, "step", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    observer(function (value) {
        this.mdcFoundation.setDisabled(value);
    })
], SliderBase.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SliderBase.prototype, "pin", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    observer(function () {
        this.mdcFoundation.setupTrackMarker();
    })
], SliderBase.prototype, "markers", void 0);
__decorate([
    property({ type: String })
], SliderBase.prototype, "pinMarkerText", void 0);
__decorate([
    property({ type: Object })
], SliderBase.prototype, "trackMarkerContainerStyles", void 0);
__decorate([
    property({ type: Object })
], SliderBase.prototype, "thumbContainerStyles", void 0);
__decorate([
    property({ type: Object })
], SliderBase.prototype, "trackStyles", void 0);
__decorate([
    eventOptions({ capture: true, passive: true })
], SliderBase.prototype, "layout", null);

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
const style = css `@keyframes mdc-slider-emphasize{0%{animation-timing-function:ease-out}50%{animation-timing-function:ease-in;transform:scale(0.85)}100%{transform:scale(0.571)}}.mdc-slider{position:relative;width:100%;height:48px;cursor:pointer;touch-action:pan-x;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-container::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);opacity:.26}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-marker-container{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__thumb{fill:#018786;fill:var(--mdc-theme-secondary, #018786);stroke:#018786;stroke:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__focus-ring{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__pin{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__pin{color:#fff;color:var(--mdc-theme-text-primary-on-dark, white)}.mdc-slider--disable-touch-action{touch-action:none}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__track{background-color:#9a9a9a}.mdc-slider--disabled .mdc-slider__track-container::after{background-color:#9a9a9a;opacity:.26}.mdc-slider--disabled .mdc-slider__track-marker-container{background-color:#9a9a9a}.mdc-slider--disabled .mdc-slider__thumb{fill:#9a9a9a;stroke:#9a9a9a}.mdc-slider--disabled .mdc-slider__thumb{stroke:#fff;stroke:var(--mdc-slider-bg-color-behind-component, white)}.mdc-slider:focus{outline:none}.mdc-slider__track-container{position:absolute;top:50%;width:100%;height:2px;overflow:hidden}.mdc-slider__track-container::after{position:absolute;top:0;left:0;display:block;width:100%;height:100%;content:""}.mdc-slider__track{position:absolute;width:100%;height:100%;transform-origin:left top;will-change:transform}.mdc-slider[dir=rtl] .mdc-slider__track,[dir=rtl] .mdc-slider .mdc-slider__track{transform-origin:right top}.mdc-slider__track-marker-container{display:flex;margin-right:0;margin-left:-1px;visibility:hidden}.mdc-slider[dir=rtl] .mdc-slider__track-marker-container,[dir=rtl] .mdc-slider .mdc-slider__track-marker-container{margin-right:-1px;margin-left:0}.mdc-slider__track-marker-container::after{display:block;width:2px;height:2px;content:""}.mdc-slider__track-marker{flex:1}.mdc-slider__track-marker::after{display:block;width:2px;height:2px;content:""}.mdc-slider__track-marker:first-child::after{width:3px}.mdc-slider__thumb-container{position:absolute;top:15px;left:0;width:21px;height:100%;user-select:none;will-change:transform}.mdc-slider__thumb{position:absolute;top:0;left:0;transform:scale(0.571);stroke-width:3.5;transition:transform 100ms ease-out,fill 100ms ease-out,stroke 100ms ease-out}.mdc-slider__focus-ring{width:21px;height:21px;border-radius:50%;opacity:0;transition:transform 266.67ms ease-out,opacity 266.67ms ease-out,background-color 266.67ms ease-out}.mdc-slider__pin{display:flex;position:absolute;top:0;left:0;align-items:center;justify-content:center;width:26px;height:26px;margin-top:-2px;margin-left:-2px;transform:rotate(-45deg) scale(0) translate(0, 0);border-radius:50% 50% 50% 0%;z-index:1;transition:transform 100ms ease-out}.mdc-slider__pin-value-marker{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);transform:rotate(45deg)}.mdc-slider--active .mdc-slider__thumb{transform:scale3d(1, 1, 1)}.mdc-slider--focus .mdc-slider__thumb{animation:mdc-slider-emphasize 266.67ms linear}.mdc-slider--focus .mdc-slider__focus-ring{transform:scale3d(1.55, 1.55, 1.55);opacity:.25}.mdc-slider--in-transit .mdc-slider__thumb{transition-delay:140ms}.mdc-slider--in-transit .mdc-slider__thumb-container,.mdc-slider--in-transit .mdc-slider__track,.mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__thumb-container,.mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__track{transition:transform 80ms ease}.mdc-slider--discrete.mdc-slider--active .mdc-slider__thumb{transform:scale(calc(12 / 21))}.mdc-slider--discrete.mdc-slider--active .mdc-slider__pin{transform:rotate(-45deg) scale(1) translate(19px, -20px)}.mdc-slider--discrete.mdc-slider--focus .mdc-slider__thumb{animation:none}.mdc-slider--discrete.mdc-slider--display-markers .mdc-slider__track-marker-container{visibility:visible}:host{display:inline-block;min-width:120px;outline:none}`;

class Slider extends SliderBase {
}
Slider.styles = style;

export { Slider };
//# sourceMappingURL=mwc-slider.js.map
