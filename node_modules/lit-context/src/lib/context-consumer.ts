/**
 * Copyright (c) 2020 Dorian Cortes, Gary Valverde
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { consumeContext } from "./context";
import { ContextProvider } from "./context-provider";
import { MapFn } from "../types/context";

/**
 * Context Consumer
 * @param providerTag
 * @param consumer 
 * @param mapFn 
 */
export const contextConsumer = <T = object>(providerTag: string, consumer: Element, mapFn?: MapFn<T>) => {
  let provider: ContextProvider | null = null;
  let node: Element | null = consumer;

  do {
    let slot: Boolean = node.assignedSlot instanceof HTMLSlotElement;
    /**
     * Find the node's closest provider tag
     */
    provider = node?.closest(providerTag);

    /**
     * If within a slot 
     */
    let parentIsSlotted;
    if (slot && provider === null) {
      provider = node?.assignedSlot?.closest(providerTag) || null;
      /**
       * If provider remains null
       */
      if (provider === null) {
        /**
         * Then check if the parent node of the slotted element is slotted as well
         */
        parentIsSlotted = node?.parentElement?.assignedSlot instanceof HTMLSlotElement;
      }
    }

    /**
     * Find the root node
     */
    let root: Element | ShadowRoot | null = node?.getRootNode() as ShadowRoot;

    /**
     * If within a slot
     */
    if (slot && root === null) {
      root = node?.assignedSlot?.getRootNode() as ShadowRoot || null;
    } 
    /**
     * Set the node to the root host
     */
    node = parentIsSlotted ? node?.parentElement : root?.host;
  } while (!provider && node);

  /**
   * If there's a valid provider
   */
  if (provider) {
    /**
     * Register the context to be consumed
     */
    const unsubscribe = consumeContext(provider.context, (providerNewValue: T, providerOldValue: T) => {
      if (!consumer.isConnected) {
        unsubscribe();
      } else if (mapFn instanceof Function) {
        mapFn.call(consumer, providerNewValue, providerOldValue);
      } else {
        Object.assign(consumer, providerNewValue);
      }
    });
  }
};