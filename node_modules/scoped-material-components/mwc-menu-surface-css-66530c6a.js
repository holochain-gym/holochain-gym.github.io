import { __decorate } from 'tslib';
import { query, property, internalProperty, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { BaseElement, addHasRemoveClass } from '@material/mwc-base/base-element';
import { styleMap } from 'lit-html/directives/style-map';
import { observer } from '@material/mwc-base/observer';
import { doesElementContainFocus, deepActiveElementPath } from '@material/mwc-base/utils';
import { Corner, CornerBit } from '@material/menu-surface/constants';
import MDCMenuSurfaceFoundation from '@material/menu-surface/foundation';

// tslint:disable:no-bitwise
// required for closure compiler
const stringToCorner = {
    'TOP_LEFT': Corner.TOP_LEFT,
    'TOP_RIGHT': Corner.TOP_RIGHT,
    'BOTTOM_LEFT': Corner.BOTTOM_LEFT,
    'BOTTOM_RIGHT': Corner.BOTTOM_RIGHT,
    'TOP_START': Corner.TOP_START,
    'TOP_END': Corner.TOP_END,
    'BOTTOM_START': Corner.BOTTOM_START,
    'BOTTOM_END': Corner.BOTTOM_END,
};
/**
 * @fires opened
 * @fires closed
 */
class MenuSurfaceBase extends BaseElement {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCMenuSurfaceFoundation;
        this.absolute = false;
        this.fullwidth = false;
        this.fixed = false;
        this.x = null;
        this.y = null;
        // must be defined before open or else race condition in foundation occurs.
        this.quick = false;
        this.open = false;
        this.bitwiseCorner = Corner.TOP_START;
        this.previousMenuCorner = null;
        // must be defined before observer of anchor corner for initialization
        this.menuCorner = 'START';
        this.corner = 'TOP_START';
        this.styleTop = '';
        this.styleLeft = '';
        this.styleRight = '';
        this.styleBottom = '';
        this.styleMaxHeight = '';
        this.styleTransformOrigin = '';
        this.anchor = null;
        this.previouslyFocused = null;
        this.previousAnchor = null;
        this.onBodyClickBound = () => undefined;
    }
    render() {
        const classes = {
            'mdc-menu-surface--fixed': this.fixed,
            'mdc-menu-surface--fullwidth': this.fullwidth,
        };
        const styles = {
            'top': this.styleTop,
            'left': this.styleLeft,
            'right': this.styleRight,
            'bottom': this.styleBottom,
            'max-height': this.styleMaxHeight,
            'transform-origin': this.styleTransformOrigin,
        };
        return html `
      <div
          class="mdc-menu-surface ${classMap(classes)}"
          style="${styleMap(styles)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        <slot></slot>
      </div>`;
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { hasAnchor: () => {
                return !!this.anchor;
            }, notifyClose: () => {
                const init = { bubbles: true, composed: true };
                const ev = new CustomEvent('closed', init);
                this.open = false;
                this.mdcRoot.dispatchEvent(ev);
            }, notifyOpen: () => {
                const init = { bubbles: true, composed: true };
                const ev = new CustomEvent('opened', init);
                this.open = true;
                this.mdcRoot.dispatchEvent(ev);
            }, isElementInContainer: () => false, isRtl: () => {
                if (this.mdcRoot) {
                    return getComputedStyle(this.mdcRoot).direction === 'rtl';
                }
                return false;
            }, setTransformOrigin: (origin) => {
                const root = this.mdcRoot;
                if (!root) {
                    return;
                }
                this.styleTransformOrigin = origin;
            }, isFocused: () => {
                return doesElementContainFocus(this);
            }, saveFocus: () => {
                const activeElementPath = deepActiveElementPath();
                const pathLength = activeElementPath.length;
                if (!pathLength) {
                    this.previouslyFocused = null;
                }
                this.previouslyFocused = activeElementPath[pathLength - 1];
            }, restoreFocus: () => {
                if (!this.previouslyFocused) {
                    return;
                }
                if ('focus' in this.previouslyFocused) {
                    this.previouslyFocused.focus();
                }
            }, getInnerDimensions: () => {
                const mdcRoot = this.mdcRoot;
                if (!mdcRoot) {
                    return { width: 0, height: 0 };
                }
                return { width: mdcRoot.offsetWidth, height: mdcRoot.offsetHeight };
            }, getAnchorDimensions: () => {
                const anchorElement = this.anchor;
                return anchorElement ? anchorElement.getBoundingClientRect() : null;
            }, getBodyDimensions: () => {
                return {
                    width: document.body.clientWidth,
                    height: document.body.clientHeight,
                };
            }, getWindowDimensions: () => {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            }, getWindowScroll: () => {
                return {
                    x: window.pageXOffset,
                    y: window.pageYOffset,
                };
            }, setPosition: (position) => {
                const mdcRoot = this.mdcRoot;
                if (!mdcRoot) {
                    return;
                }
                this.styleLeft = 'left' in position ? `${position.left}px` : '';
                this.styleRight = 'right' in position ? `${position.right}px` : '';
                this.styleTop = 'top' in position ? `${position.top}px` : '';
                this.styleBottom = 'bottom' in position ? `${position.bottom}px` : '';
            }, setMaxHeight: async (height) => {
                const mdcRoot = this.mdcRoot;
                if (!mdcRoot) {
                    return;
                }
                // must set both for IE support as IE will not set a var
                this.styleMaxHeight = height;
                await this.updateComplete;
                this.styleMaxHeight = `var(--mdc-menu-max-height, ${height})`;
            } });
    }
    onKeydown(evt) {
        if (this.mdcFoundation) {
            this.mdcFoundation.handleKeydown(evt);
        }
    }
    onBodyClick(evt) {
        const path = evt.composedPath();
        if (path.indexOf(this) === -1) {
            this.close();
        }
    }
    registerBodyClick() {
        this.onBodyClickBound = this.onBodyClick.bind(this);
        // capture otherwise listener closes menu after quick menu opens
        document.body.addEventListener('click', this.onBodyClickBound, { passive: true, capture: true });
    }
    deregisterBodyClick() {
        document.body.removeEventListener('click', this.onBodyClickBound, { capture: true });
    }
    close() {
        this.open = false;
    }
    show() {
        this.open = true;
    }
}
__decorate([
    query('.mdc-menu-surface')
], MenuSurfaceBase.prototype, "mdcRoot", void 0);
__decorate([
    query('slot')
], MenuSurfaceBase.prototype, "slotElement", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function (isAbsolute) {
        if (this.mdcFoundation && !this.fixed) {
            this.mdcFoundation.setIsHoisted(isAbsolute);
        }
    })
], MenuSurfaceBase.prototype, "absolute", void 0);
__decorate([
    property({ type: Boolean })
], MenuSurfaceBase.prototype, "fullwidth", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function (isFixed) {
        if (this.mdcFoundation && !this.absolute) {
            this.mdcFoundation.setIsHoisted(isFixed);
        }
    })
], MenuSurfaceBase.prototype, "fixed", void 0);
__decorate([
    property({ type: Number }),
    observer(function (value) {
        if (this.mdcFoundation && this.y !== null && value !== null) {
            this.mdcFoundation.setAbsolutePosition(value, this.y);
            this.mdcFoundation.setAnchorMargin({ left: value, top: this.y, right: -value, bottom: this.y });
        }
    })
], MenuSurfaceBase.prototype, "x", void 0);
__decorate([
    property({ type: Number }),
    observer(function (value) {
        if (this.mdcFoundation && this.x !== null && value !== null) {
            this.mdcFoundation.setAbsolutePosition(this.x, value);
            this.mdcFoundation.setAnchorMargin({ left: this.x, top: value, right: -this.x, bottom: value });
        }
    })
], MenuSurfaceBase.prototype, "y", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function (value) {
        if (this.mdcFoundation) {
            this.mdcFoundation.setQuickOpen(value);
        }
    })
], MenuSurfaceBase.prototype, "quick", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    observer(function (isOpen, wasOpen) {
        if (this.mdcFoundation) {
            if (isOpen) {
                this.mdcFoundation.open();
                // wasOpen helps with first render (when it is `undefined`) perf
            }
            else if (wasOpen !== undefined) {
                this.mdcFoundation.close();
            }
        }
    })
], MenuSurfaceBase.prototype, "open", void 0);
__decorate([
    internalProperty(),
    observer(function (value) {
        if (this.mdcFoundation) {
            if (value) {
                this.mdcFoundation.setAnchorCorner(value);
            }
            else {
                this.mdcFoundation.setAnchorCorner(value);
            }
        }
    })
], MenuSurfaceBase.prototype, "bitwiseCorner", void 0);
__decorate([
    property({ type: String }),
    observer(function (value) {
        if (this.mdcFoundation) {
            const isValidValue = value === 'START' || value === 'END';
            const isFirstTimeSet = this.previousMenuCorner === null;
            const cornerChanged = !isFirstTimeSet && value !== this.previousMenuCorner;
            const initiallySetToEnd = isFirstTimeSet && value === 'END';
            if (isValidValue && (cornerChanged || initiallySetToEnd)) {
                this.bitwiseCorner = this.bitwiseCorner ^ CornerBit.RIGHT;
                this.mdcFoundation.flipCornerHorizontally();
                this.previousMenuCorner = value;
            }
        }
    })
], MenuSurfaceBase.prototype, "menuCorner", void 0);
__decorate([
    property({ type: String }),
    observer(function (value) {
        if (this.mdcFoundation) {
            if (value) {
                let newCorner = stringToCorner[value];
                if (this.menuCorner === 'END') {
                    newCorner = newCorner ^ CornerBit.RIGHT;
                }
                this.bitwiseCorner = newCorner;
            }
        }
    })
], MenuSurfaceBase.prototype, "corner", void 0);
__decorate([
    internalProperty()
], MenuSurfaceBase.prototype, "styleTop", void 0);
__decorate([
    internalProperty()
], MenuSurfaceBase.prototype, "styleLeft", void 0);
__decorate([
    internalProperty()
], MenuSurfaceBase.prototype, "styleRight", void 0);
__decorate([
    internalProperty()
], MenuSurfaceBase.prototype, "styleBottom", void 0);
__decorate([
    internalProperty()
], MenuSurfaceBase.prototype, "styleMaxHeight", void 0);
__decorate([
    internalProperty()
], MenuSurfaceBase.prototype, "styleTransformOrigin", void 0);

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
const style = css `.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px))}`;

export { MenuSurfaceBase as M, style as s };
//# sourceMappingURL=mwc-menu-surface-css-66530c6a.js.map
