import { RadioListItemBase } from '@material/mwc-list/mwc-radio-list-item-base';
import { Radio } from './mwc-radio';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
declare const RadioListItem_base: Constructor<RadioListItemBase & ScopedElementsHost>;
export declare class RadioListItem extends RadioListItem_base {
    static styles: import("lit-element").CSSResult[];
    static get scopedElements(): {
        'mwc-radio': typeof Radio;
    };
}
export {};
