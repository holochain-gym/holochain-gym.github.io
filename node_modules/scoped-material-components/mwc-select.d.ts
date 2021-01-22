import type { Select as S } from '@material/mwc-select';
import { Icon } from './mwc-icon';
import { Menu } from './mwc-menu';
import { NotchedOutline } from './mwc-notched-outline';
import { Constructor } from 'lit-element';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
declare const Select_base: Constructor<S & ScopedElementsHost>;
export declare class Select extends Select_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-notched-outline': typeof NotchedOutline;
        'mwc-menu': typeof Menu;
        'mwc-icon': typeof Icon;
    };
}
export {};
