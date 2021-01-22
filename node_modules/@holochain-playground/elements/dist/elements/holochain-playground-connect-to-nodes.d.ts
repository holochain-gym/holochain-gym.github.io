import { TextField } from 'scoped-material-components/mwc-textfield';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { BaseElement } from './utils/base-element';
export declare class HolochainPlaygroundConnectToNodes extends BaseElement {
    private open;
    private urlsState;
    static get styles(): import("lit-element").CSSResult;
    getUrlFields(): TextField[];
    setConnectionValidity(element: any): void;
    updateFields(): void;
    renderDialog(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
        'mwc-textfield': typeof TextField;
        'mwc-icon-button': typeof IconButton;
    };
}
