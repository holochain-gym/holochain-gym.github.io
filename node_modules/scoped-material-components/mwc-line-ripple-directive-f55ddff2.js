import { __decorate } from 'tslib';
import { customElement } from 'lit-element';
import { directive } from 'lit-html';
import { s as style, N as NotchedOutlineBase } from './mwc-notched-outline-css-375af534.js';
import { MDCFloatingLabelFoundation } from '@material/floating-label/foundation';
import { MDCLineRippleFoundation } from '@material/line-ripple/foundation';

let NotchedOutline = class NotchedOutline extends NotchedOutlineBase {
};
NotchedOutline.styles = style;
NotchedOutline = __decorate([
    customElement('mwc-notched-outline')
], NotchedOutline);

const createAdapter = (labelElement) => {
    return {
        addClass: (className) => labelElement.classList.add(className),
        removeClass: (className) => labelElement.classList.remove(className),
        getWidth: () => labelElement.scrollWidth,
        registerInteractionHandler: (evtType, handler) => {
            labelElement.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: (evtType, handler) => {
            labelElement.removeEventListener(evtType, handler);
        },
    };
};
const partToFoundationMap = new WeakMap();
const floatingLabel = directive((label) => (part) => {
    const lastFoundation = partToFoundationMap.get(part);
    if (!lastFoundation) {
        const labelElement = part.committer.element;
        labelElement.classList.add('mdc-floating-label');
        const adapter = createAdapter(labelElement);
        const foundation = new MDCFloatingLabelFoundation(adapter);
        foundation.init();
        part.setValue(foundation);
        partToFoundationMap.set(part, { label, foundation });
    }
});

const createAdapter$1 = (lineElement) => {
    return {
        addClass: (className) => lineElement.classList.add(className),
        removeClass: (className) => lineElement.classList.remove(className),
        hasClass: (className) => lineElement.classList.contains(className),
        setStyle: (propertyName, value) => lineElement.style.setProperty(propertyName, value),
        registerEventHandler: (evtType, handler) => {
            lineElement.addEventListener(evtType, handler);
        },
        deregisterEventHandler: (evtType, handler) => {
            lineElement.removeEventListener(evtType, handler);
        },
    };
};
const partToFoundationMap$1 = new WeakMap();
const lineRipple = directive(() => (part) => {
    const lastFoundation = partToFoundationMap$1.get(part);
    if (!lastFoundation) {
        const lineElement = part.committer.element;
        lineElement.classList.add('mdc-line-ripple');
        const adapter = createAdapter$1(lineElement);
        const foundation = new MDCLineRippleFoundation(adapter);
        foundation.init();
        part.setValue(foundation);
        partToFoundationMap$1.set(part, foundation);
    }
});

export { floatingLabel as f, lineRipple as l };
//# sourceMappingURL=mwc-line-ripple-directive-f55ddff2.js.map
