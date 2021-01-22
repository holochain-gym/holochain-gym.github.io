import { TabBase } from '@material/mwc-tab/mwc-tab-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Ripple } from './mwc-ripple';
import { TabIndicator } from './mwc-tab-indicator';
declare const Tab_base: Constructor<TabBase & ScopedElementsHost>;
export declare class Tab extends Tab_base {
    static styles: import("lit-element").CSSResult;
    static get scopedElements(): {
        'mwc-tab-indicator': typeof TabIndicator;
        'mwc-ripple': typeof Ripple;
    };
    ripple: Promise<Ripple | null>;
    protected tabIndicator: TabIndicator;
    protected renderRipple(): import("lit-element").TemplateResult | "";
    protected renderIndicator(): import("lit-element").TemplateResult;
}
export {};
