import { Button } from 'scoped-material-components/mwc-button';
import { Dialog } from 'scoped-material-components/mwc-dialog';
import { IconButton } from 'scoped-material-components/mwc-icon-button';
import { BaseElement } from '../utils/base-element';
export declare class HolochainPlaygroundHelpButton extends BaseElement {
    heading: string;
    _helpDialog: Dialog;
    renderHelpDialog(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
    static get scopedElements(): {
        'mwc-icon-button': typeof IconButton;
        'mwc-button': typeof Button;
        'mwc-dialog': typeof Dialog;
    };
}
