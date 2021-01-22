import { SwitchBase } from '@material/mwc-switch/mwc-switch-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Ripple } from './mwc-ripple';
declare const Switch_base: Constructor<SwitchBase & ScopedElementsHost>;
export declare class Switch extends Switch_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
}
export {};
