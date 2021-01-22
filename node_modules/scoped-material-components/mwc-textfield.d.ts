import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
import { Constructor } from 'lit-element';
import { NotchedOutline } from './mwc-notched-outline';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
declare const TextField_base: Constructor<TextFieldBase & ScopedElementsHost>;
export declare class TextField extends TextField_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-notched-outline': typeof NotchedOutline;
    };
    protected outlineElement: NotchedOutline | null;
}
export {};
