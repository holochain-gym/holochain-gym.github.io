/**
 * Copyright (c) 2020 Dorian Cortes, Gary Valverde
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property } from 'lit-element';
import { createContext } from './context';
import { Context } from '../types/context';

/**
 * Context Provider
 * @class
 */
export class ContextProvider extends LitElement {
  @property({ type: Context })
  context: Context;

  @property({ type: Object })
  value: object = {};

  constructor() {
    super();
    this.context = createContext(this.value);
  }

  render() {
    this.context.setValue(this.value);
    return html`
      <slot></slot>
    `;
  }
}
