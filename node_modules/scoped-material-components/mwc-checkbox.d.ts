import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Ripple } from './mwc-ripple';
declare const Checkbox_base: Constructor<CheckboxBase & ScopedElementsHost>;
export declare class Checkbox extends Checkbox_base {
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
