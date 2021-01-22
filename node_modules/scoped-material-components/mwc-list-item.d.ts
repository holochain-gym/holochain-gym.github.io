import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Ripple } from './mwc-ripple';
declare const ListItem_base: Constructor<ListItemBase & ScopedElementsHost>;
export declare class ListItem extends ListItem_base {
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
