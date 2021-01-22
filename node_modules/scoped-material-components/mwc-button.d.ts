import { ButtonBase } from '@material/mwc-button/mwc-button-base';
import { Constructor } from 'lit-element';
import { Icon } from './mwc-icon';
import { Ripple } from './mwc-ripple';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
declare const Button_base: Constructor<ButtonBase & ScopedElementsHost>;
export declare class Button extends Button_base {
    static get scopedElements(): {
        'mwc-icon': typeof Icon;
        'mwc-ripple': typeof Ripple;
    };
    ripple: Promise<Ripple | null>;
    static styles: import("lit-element").CSSResult;
}
export {};
