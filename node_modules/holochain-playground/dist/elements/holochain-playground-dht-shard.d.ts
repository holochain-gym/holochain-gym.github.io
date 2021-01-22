import { LitElement } from 'lit-element';
import '@alenaksu/json-viewer';
export declare class DHTShard extends LitElement {
    private activeDna;
    private conductors;
    private activeAgentPubKey;
    cell: {
        dna: string;
        agentId: string;
    };
    static style(): import("lit-element").CSSResult;
    get activeCell(): import("../core/cell").Cell;
    render(): import("lit-element").TemplateResult;
}
