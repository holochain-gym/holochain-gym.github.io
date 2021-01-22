import { LitElement } from 'lit-element';
import '@material/mwc-linear-progress';
export declare class DHTStats extends LitElement {
    private activeDna;
    private conductors;
    private activeAgentPubKey;
    private conductorsUrls;
    private statsHelp;
    private nNodes;
    private rFactor;
    private timeout;
    private processing;
    static get styles(): import("lit-element").CSSResult;
    get activeCell(): import("../core/cell").Cell;
    get allCells(): import("../core/cell").Cell[];
    renderStatsHelp(): import("lit-element").TemplateResult;
    republish(): Promise<void>;
    updateDHTStats(): void;
    render(): import("lit-element").TemplateResult;
}
