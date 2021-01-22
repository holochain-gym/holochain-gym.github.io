import { JsonViewer } from '@power-elements/json-viewer';
import { BaseElement } from './utils/base-element';
export declare class HolochainPlaygroundDhtShard extends BaseElement {
    cell: {
        dna: string;
        agentId: string;
    };
    static style(): import("lit-element").CSSResult;
    get activeCell(): import("@holochain-playground/core").Cell;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'json-viewer': typeof JsonViewer;
    };
}
