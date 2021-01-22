import { BaseElement } from './utils/base-element';
import { HolochainPlaygroundDhtShard } from './holochain-playground-dht-shard';
import { HolochainPlaygroundEntryDetail } from './holochain-playground-entry-detail';
import { Card } from 'scoped-material-components/mwc-card';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { Tab } from 'scoped-material-components/mwc-tab';
import { TabBar } from 'scoped-material-components/mwc-tab-bar';
export declare class HolochainPlaygroundConductorDetail extends BaseElement {
    selectedTabIndex: number;
    private conductorHelp;
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult[];
    renderAgentHelp(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'holochain-playground-dht-shard': typeof HolochainPlaygroundDhtShard;
        'holochain-playground-entry-detail': typeof HolochainPlaygroundEntryDetail;
        'mwc-tab': typeof Tab;
        'mwc-tab-bar': typeof TabBar;
        'mwc-card': typeof Card;
        'mwc-icon-button': typeof IconButton;
        'mwc-dialog': typeof Dialog;
    };
}
