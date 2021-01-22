import { Snackbar } from 'scoped-material-components/mwc-snackbar';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { LitElement, Constructor } from 'lit-element';
import { Conductor, SimulatedDnaTemplate } from '@holochain-playground/core';
import { AgentPubKey, Hash } from '@holochain-open-dev/core-types';
declare const HolochainPlaygroundContainer_base: Constructor<LitElement>;
export declare class HolochainPlaygroundContainer extends HolochainPlaygroundContainer_base {
    numberOfSimulatedConductors: number;
    simulatedDnaTemplate: SimulatedDnaTemplate;
    private snackbar;
    private message;
    /** Context variables */
    activeDna: Hash | undefined;
    activeAgentPubKey: AgentPubKey | undefined;
    activeEntryHash: Hash | undefined;
    conductors: Conductor[];
    conductorsUrls: string[] | undefined;
    static get provide(): string[];
    static get styles(): import("lit-element").CSSResult;
    firstUpdated(): Promise<void>;
    showMessage(message: string): void;
    renderSnackbar(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-circular-progress': typeof CircularProgress;
        'mwc-snackbar': typeof Snackbar;
        'mwc-icon-button': typeof IconButton;
    };
}
export {};
