import type { List as L } from '@material/mwc-list';
import { ListItem } from './mwc-list-item';
import { Constructor } from 'lit-element';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
declare const List_base: Constructor<L & ScopedElementsHost>;
export declare class List extends List_base {
    static get scopedElements(): {
        'mwc-list-item': typeof ListItem;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
