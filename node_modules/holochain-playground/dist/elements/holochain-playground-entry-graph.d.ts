import { LitElement } from 'lit-element';
import '@material/mwc-checkbox';
export declare class EntryGraph extends LitElement {
    showAgentsIds: boolean;
    private activeDna;
    private conductors;
    private activeEntryHash;
    private entryGraphHelp;
    private entryGraph;
    private lastEntriesIds;
    private cy;
    private layout;
    private ready;
    firstUpdated(): void;
    updated(changedValues: any): void;
    renderEntryGraphHelp(): import("lit-element").TemplateResult;
    updatedGraph(): any;
    static get styles(): import("lit-element").CSSResult[];
    render(): import("lit-element").TemplateResult;
}
