/**
 * Copyright (c) 2020 Dorian Cortes, Gary Valverde
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ContextProvider } from "./context-provider";
import { contextConsumer } from "./context-consumer";
import { consume } from '../decorators/consume';
import { MapFn } from "../types/context";

/**
 * @param providerTagName Provider name (Note: It will be used to generate its custom element tag name)
 * @returns Context information and consume functionalities
 */
export const createContext = (providerName: string, defaultValue: object = {}) => {
  const tagName = providerName + '-provider';

  if (!customElements.get(tagName)) {
    customElements.define(tagName, class extends ContextProvider {
      value: object = defaultValue;
    });
  }

  return {
    getTagName: (): string => tagName,
    consumer: (consumer: HTMLElement, mapFn?: MapFn) => contextConsumer(tagName, consumer, mapFn),
    consume: (mapFn?: MapFn) => consume(tagName, mapFn) as any
  }
}