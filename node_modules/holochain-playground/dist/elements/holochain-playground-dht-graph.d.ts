import { LitElement } from 'lit-element';
import '@material/mwc-icon-button';
import '@material/mwc-button';
export declare class DHTGraph extends LitElement {
    private activeDna;
    private conductors;
    private activeEntryHash;
    private activeAgentPubKey;
    private dhtHelp;
    private graph;
    private lastNodes;
    private cy;
    private layout;
    static get styles(): import("lit-element").CSSResult[];
    firstUpdated(): Promise<void>;
    highlightNodesWithEntry(entryHash: string): void;
    updated(changedValues: any): void;
    renderDHTHelp(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
