/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import {
  LitElement,
  customElement,
  html,
  property,
  classMap,
  findAssignedElements,
  query,
  PropertyValues
} from "@authentic/mwc-base/base-element";
import { ripple } from  "@authentic/mwc-ripple/ripple-directive";

import { style } from "./mwc-card-css";

import "@authentic/mwc-icon/mwc-icon-font";

declare global {
  interface HTMLElementTagNameMap {
    "mwc-card": Card;
  }
}

@customElement("mwc-card" as any)
export class Card extends LitElement {

  /**
   * Optional. The main tappable area of the card. 
   * Typically contains most (or all) card content except card actions. 
   * Only applicable to cards that have a primary action that the main surface should trigger
   */
  @query('.mdc-card__primary-action')
  protected primaryActionEl!: HTMLElement;

  /**
   * Optional. Row containing action buttons and/or icons.
   */
  @query('.mdc-card__actions')
  protected actionsEl!: HTMLElement;

  /**
   * Optional. A group of action buttons, displayed on the left side of the card (in LTR), adjacent to action-icons
   */
  @query('.mdc-card__action-buttons')
  protected actionButtonsEl!: HTMLElement;

  /**
   * Optional. A group of supplemental action icons, displayed on the right side of the card (in LTR), adjacent to action-buttons
   */
  @query('.mdc-card__action-icons')
  protected actionIconsEl!: HTMLElement;

  @query('slot[name="header"]')
  protected slotHeaderEl!: HTMLSlotElement;

  @query('slot[name="media"]')
  protected slotMediaEl!: HTMLSlotElement;

  @query('slot[name="content"]')
  protected slotContentEl!: HTMLSlotElement;

  @query('slot[name="action-buttons"]')
  protected slotActionButtonsEl!: HTMLSlotElement;

  @query('slot[name="action-icons"]')
  protected slotActionIconsEl!: HTMLSlotElement;

  /**
   * Optional. Default value is false. Removes the shadow and displays a hairline outline instead.
   */
  @property({ type: Boolean })
  outlined = false;
  
  /**
   * Optional. Define the aspect ratio for the main image, it can be 'square' or '16-9'
   */
  @property({ type: String })
  aspectRatio =  '';

  protected get headerEls() {
    return this.slotHeaderEl && findAssignedElements(this.slotHeaderEl, '*');
  }

  protected get mediaEls() {
    return this.slotMediaEl && findAssignedElements(this.slotMediaEl, '*');
  }

  protected get contentEls() {
    return this.slotContentEl && findAssignedElements(this.slotContentEl, '*');
  }

  protected get actionButtons() {
    return this.slotActionButtonsEl && findAssignedElements(this.slotActionButtonsEl, 'mwc-button');
  }

  protected get actionIcons() {
    return this.slotActionIconsEl && findAssignedElements(this.slotActionIconsEl, 'mwc-icon-button');
  }

  static styles = style;

  /**
   * Used to render the lit-html TemplateResult to the element's DOM
   */
  render() {
    const styles = {
      'mdc-card': true,
      'mdc-card--outlined': this.outlined
    };

    const mediaStyles = {
      'mdc-card__media': true,
      [`mdc-card__media--${this.aspectRatio}`]: this.aspectRatio !== '',
    };

    return html`
      <div class="${classMap(styles)}">
        <div class="mdc-card__primary-action" tabindex="0" .ripple="${ripple({ unbounded: false })}">
          <slot name="header"></slot>
          
          <div class="${classMap(mediaStyles)}">
            <div class="mdc-card__media-content">
              <slot name="media"></slot>
            </div>
          </div>

          <slot name="content"></slot>
        </div>

        <slot></slot>

        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            <slot name="action-buttons"></slot>
          </div>

          <div class="mdc-card__action-icons">
            <slot name="action-icons"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * This method is invoked whenever the card is updated
   * @param _changedProperties Map of changed properties with old values
   */
  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    
    const _hasHeaderEls = this.headerEls.length > 0;
    const _hasMediaEls = this.mediaEls.length > 0;
    const _hasContentEls = this.contentEls.length > 0;
    const _hasPrimaryAction = _hasHeaderEls || _hasMediaEls || _hasContentEls;
    const _hasActionButtons = this.actionButtons.length > 0;
    const _hasActionIcons = this.actionIcons.length > 0;
    const _hasActions = _hasActionButtons || _hasActionIcons;

    this.primaryActionEl!.classList.toggle('mdc-card__primary-action--empty', !_hasPrimaryAction)
    this.actionButtonsEl!.classList.toggle('mdc-card__action-buttons--empty', !_hasActionButtons);
    this.actionIconsEl!.classList.toggle('mdc-card__action-icons--empty', !_hasActionIcons);
    this.actionsEl!.classList.toggle('mdc-card__actions--empty', !_hasActions);
  }
}
