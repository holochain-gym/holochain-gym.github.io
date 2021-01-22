import { IconButtonBase } from '@material/mwc-icon-button/mwc-icon-button-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Ripple } from './mwc-ripple';
declare const IconButton_base: Constructor<IconButtonBase & ScopedElementsHost>;
export declare class IconButton extends IconButton_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    renderRipple(): import("lit-element").TemplateResult | "";
    ripple: Promise<Ripple | null>;
}
export {};
