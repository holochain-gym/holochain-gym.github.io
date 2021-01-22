import type { Menu as M } from '@material/mwc-menu';
import { MenuSurface } from '@material/mwc-menu/mwc-menu-surface';
import { List } from './mwc-list';
import { Constructor } from 'lit-element';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
declare const Menu_base: Constructor<M & ScopedElementsHost>;
export declare class Menu extends Menu_base {
    static get scopedElements(): {
        'mwc-menu-surface': typeof MenuSurface;
        'mwc-list': typeof List;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
