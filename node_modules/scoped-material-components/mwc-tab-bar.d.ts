import { TabBarBase } from '@material/mwc-tab-bar/mwc-tab-bar-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Tab } from './mwc-tab';
import { TabScroller } from './mwc-tab-scroller';
declare const TabBar_base: Constructor<TabBarBase & ScopedElementsHost>;
export declare class TabBar extends TabBar_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-tab': typeof Tab;
        'mwc-tab-scroller': typeof TabScroller;
    };
    protected getScrollerElement(): TabScroller;
}
export {};
