import { FabBase } from '@material/mwc-fab/mwc-fab-base';
import { ScopedElementsHost } from '@open-wc/scoped-elements/types/src/types';
import { Constructor } from 'lit-element';
import { Ripple } from './mwc-ripple';
declare const Fab_base: Constructor<FabBase & ScopedElementsHost>;
export declare class Fab extends Fab_base {
    static get scopedElements(): {
        'mwc-ripple': typeof Ripple;
    };
    static styles: import("lit-element").CSSResult;
}
export {};
