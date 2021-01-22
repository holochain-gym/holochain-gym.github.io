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
import { LitElement, html, customElement, classMap, query } from '@authentic/mwc-base/base-element';
import { style} from './mwc-icon-host-css';
import './mwc-icon-font';

@customElement('mwc-icon' as any)
export class Icon extends LitElement {

  /**
   * Root element for icon component.
   */
  @query(".mdc-icon")
  protected mdcRoot!: any;

  static styles = style;
  
  /**
   * Invoked when the element is first updated. 
   * Implement to perform one time work on the element after update.
   */
  firstUpdated() {
    this.updateComplete
        .then(() => {
        this.requestUpdate();
    });
  }

  /**
   * Used to render the lit-html TemplateResult to the element's DOM
   */
  render() {
    let hasDifferentFont = false;

    if (this.mdcRoot && this.mdcRoot.parentNode.host.getAttribute('class') !== null) {
      let parentClasses = this.mdcRoot.parentNode.host.getAttribute('class');
      parentClasses = parentClasses.replace(/mdc/g,'');
      hasDifferentFont = parentClasses.includes('md');
    }

    const classes = {
      'material-icons': true,
      'mdc-icon': true
    };

    if (hasDifferentFont) return html`<span class="${classMap(classes)}"><slot></slot></span>`;

    return html`<i class="${classMap(classes)}"><slot></slot></i>`;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'mwc-icon': Icon;
  }
}
