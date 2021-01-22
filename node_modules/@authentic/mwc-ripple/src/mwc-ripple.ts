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
import { LitElement, html, property, customElement, classMap } from '@authentic/mwc-base/base-element';
import { ripple, RippleOptions } from './ripple-directive';
import { style } from './mwc-ripple-css';

@customElement('mwc-ripple' as any)
export class Ripple extends LitElement {

  /**
   * Optional. Default value sets to false. To use the primary color of the ripple effect.
   */
  @property({ type: Boolean })
  primary = false;

  /**
   * Optional. Default value sets to false. Activates the ripple (the first stage, 
   * which happens when the ripple surface is engaged via interaction, 
   * such as a mousedown or a pointerdown event). 
   * It expands from the center.
   */
  @property({ type: Boolean })
  active: boolean | undefined;

  /**
   * Optional. Default value sets to false. To use the secondary color of the ripple effect.
   */
  @property({ type: Boolean })
  accent = false;

  /**
   * Optional. Default value sets to false. Sets the ripple to be unbounded or not, based on the given boolean.
   */
  @property({ type: Boolean })
  unbounded = false;

  /**
   * Optional. Default value sets to false. Makes the ripple inactive and inaccessible via interaction.
   */
  @property({ type: Boolean })
  disabled = false;

  @property()
  protected interactionNode: HTMLElement = this;

  static styles = style;

  /**
   * Invoked each time the custom element is appended into the DOM. 
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed
   */
  connectedCallback() {
    if (this.interactionNode === this) {
      this.interactionNode = this.parentNode as HTMLElement;
    }
    super.connectedCallback();
  }

  // TODO(sorvell) #css: sizing.
  /**
   * Used to render the lit-html TemplateResult to the element's DOM
   */
  render() {
    const classes = {
      'mdc-ripple-surface--primary': this.primary,
      'mdc-ripple-surface--accent': this.accent,
    };
    const { disabled, unbounded, active, interactionNode } = this;
    const rippleOptions: RippleOptions = { disabled, unbounded, interactionNode };
    if (active !== undefined) {
      rippleOptions.active = active;
    }
    return html`
      <div .ripple="${ripple(rippleOptions)}" class="mdc-ripple-surface ${classMap(classes)}"></div>`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'mwc-ripple': Ripple;
  }
}
