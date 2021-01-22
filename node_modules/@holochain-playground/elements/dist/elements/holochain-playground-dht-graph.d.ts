import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Button } from 'scoped-material-components/mwc-button';
import { Hash } from '@holochain-open-dev/core-types';
import { BaseElement } from './utils/base-element';
export declare class HolochainPlaygroundDhtGraph extends BaseElement {
    private dhtHelp;
    private graph;
    private lastNodes;
    private cy;
    private layout;
    static get styles(): import("lit-element").CSSResult[];
    firstUpdated(): Promise<void>;
    highlightNodesWithEntry(entryHash: Hash): void;
    updated(changedValues: any): void;
    renderDHTHelp(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-icon-button': typeof IconButton;
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
    };
}
