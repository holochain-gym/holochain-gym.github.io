import { PropertyValues } from 'lit-element';
import { MenuSurface } from 'scoped-material-components/mwc-menu-surface';
import { BaseElement } from './utils/base-element';
import { JsonViewer } from '@power-elements/json-viewer';
export declare class HolochainPlaygroundSourceChain extends BaseElement {
    static get styles(): import("lit-element").CSSResult[];
    private cy;
    private nodes;
    private _cell;
    private _subscription;
    private _nodeInfo;
    private _nodeInfoMenu;
    private graph;
    firstUpdated(): void;
    updated(changedValues: PropertyValues): void;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-menu-surface': typeof MenuSurface;
        'json-viewer': typeof JsonViewer;
    };
}
