import { LitElement, PropertyValues } from 'lit-element';
import '@material/mwc-menu/mwc-menu-surface';
import '@alenaksu/json-viewer';
import { Cell } from '../core/cell';
export declare class SourceChain extends LitElement {
    private activeDna;
    private conductors;
    private activeAgentPubKey;
    private activeEntryHash;
    static get styles(): import("lit-element").CSSResult[];
    private cy;
    private nodes;
    private _cell;
    private _subscription;
    get activeCell(): Cell;
    private _nodeInfo;
    private _nodeInfoMenu;
    firstUpdated(): void;
    updated(changedValues: PropertyValues): void;
    render(): import("lit-element").TemplateResult;
}
