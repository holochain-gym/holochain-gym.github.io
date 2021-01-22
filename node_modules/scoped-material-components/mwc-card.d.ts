import { TemplateResult } from 'lit-html/lib/template-result';
import { CSSResult } from 'lit-element/lib/css-tag';
import { LitElement, PropertyValues } from 'lit-element';

declare global {
    interface HTMLElementTagNameMap {
        "mwc-card": Card;
    }
}
declare class Card extends LitElement {
    /**
     * Optional. The main tappable area of the card.
     * Typically contains most (or all) card content except card actions.
     * Only applicable to cards that have a primary action that the main surface should trigger
     */
    protected primaryActionEl: HTMLElement;
    /**
     * Optional. Row containing action buttons and/or icons.
     */
    protected actionsEl: HTMLElement;
    /**
     * Optional. A group of action buttons, displayed on the left side of the card (in LTR), adjacent to action-icons
     */
    protected actionButtonsEl: HTMLElement;
    /**
     * Optional. A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to action-buttons
     */
    protected actionIconsEl: HTMLElement;
    protected slotHeaderEl: HTMLSlotElement;
    protected slotMediaEl: HTMLSlotElement;
    protected slotContentEl: HTMLSlotElement;
    protected slotActionButtonsEl: HTMLSlotElement;
    protected slotActionIconsEl: HTMLSlotElement;
    /**
     * Optional. Default value is false. Removes the shadow and displays a hairline outline instead.
     */
    outlined: boolean;
    /**
     * Optional. Define the aspect ratio for the main image, it can be 'square' or '16-9'
     */
    aspectRatio: string;
    protected readonly headerEls: HTMLElement[];
    protected readonly mediaEls: HTMLElement[];
    protected readonly contentEls: HTMLElement[];
    protected readonly actionButtons: HTMLElement[];
    protected readonly actionIcons: HTMLElement[];
    static styles: CSSResult;
    /**
     * Used to render the lit-html TemplateResult to the element's DOM
     */
    render(): TemplateResult;
    /**
     * This method is invoked whenever the card is updated
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties: PropertyValues): void;
}

export { Card };
