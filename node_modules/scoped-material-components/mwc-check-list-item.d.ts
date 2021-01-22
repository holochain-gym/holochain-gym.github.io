import { CheckListItemBase } from '@material/mwc-list/mwc-check-list-item-base';
import { Checkbox } from './mwc-checkbox';
import { Constructor } from 'lit-element';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
declare const CheckListItem_base: Constructor<CheckListItemBase & ScopedElementsHost>;
export declare class CheckListItem extends CheckListItem_base {
    static get scopedElements(): {
        'mwc-checkbox': typeof Checkbox;
    };
    static styles: import("lit-element").CSSResult[];
}
export {};
