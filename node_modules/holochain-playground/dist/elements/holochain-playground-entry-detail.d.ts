import { LitElement } from 'lit-element';
import '@alenaksu/json-viewer';
export declare class EntryDetail extends LitElement {
    private conductors;
    private activeDna;
    private activeEntryHash;
    withMetadata: boolean;
    static get styles(): import("lit-element").CSSResult[];
    get activeEntry(): any;
    get activeEntryDetails(): import("../types/metadata").EntryDetails;
    shorten(object: any, length: number): any;
    render(): import("lit-element").TemplateResult;
}
