import { LitElement } from 'lit-element';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';
export declare class ConnectToNodes extends LitElement {
    private conductorsUrls;
    private open;
    private urlsState;
    static get styles(): import("lit-element").CSSResult;
    getUrlFields(): TextFieldBase[];
    setConnectionValidity(element: any): void;
    updateFields(): void;
    renderDialog(): import("lit-element").TemplateResult;
    render(): import("lit-element").TemplateResult;
}
