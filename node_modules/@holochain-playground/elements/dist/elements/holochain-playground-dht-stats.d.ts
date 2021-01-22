import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { LinearProgress } from 'scoped-material-components/mwc-linear-progress';
import { BaseElement } from './utils/base-element';
export declare class HolochainPlaygroundDhtStats extends BaseElement {
    private statsHelp;
    private nNodes;
    private rFactor;
    private timeout;
    private processing;
    static get styles(): import("lit-element").CSSResult;
    get activeCell(): import("@holochain-playground/core").Cell;
    get allCells(): import("@holochain-playground/core").Cell[];
    renderStatsHelp(): import("lit-element").TemplateResult;
    republish(): Promise<void>;
    updateDHTStats(): void;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-linear-progress': typeof LinearProgress;
        'mwc-textfield': typeof TextField;
        'mwc-icon-button': typeof IconButton;
        'mwc-dialog': typeof Dialog;
    };
}
