import '@material/mwc-circular-progress';
import { Conductor } from '../core/conductor';
import './utils/context';
import { ContextProvider } from 'lit-context';
export declare class Playgroundprovider extends ContextProvider {
    numberOfSimulatedConductors: number;
    private snackbar;
    private message;
    /** Context variables */
    private activeDna;
    private activeAgentPubKey;
    private activeEntryHash;
    private conductors;
    conductorsUrls: string[] | undefined;
    get contextValue(): {
        activeDna: string;
        activeAgentPubKey: string;
        activeEntryHash: string;
        conductors: Conductor[];
        conductorsUrls: string[];
    };
    static get styles(): import("lit-element").CSSResult;
    firstUpdated(): Promise<void>;
    updated(values: any): void;
    showError(error: string): void;
    renderSnackbar(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
