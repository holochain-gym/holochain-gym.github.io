/**
 * Copyright (c) 2020 Dorian Cortes, Gary Valverde
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Context } from "../types/context";

/**
 * 
 * @param initialValue 
 * @return { Context }
 */
export function createContext(initialValue: object): Context {
  const context = new Context(initialValue);
  return context;
}

export function consumeContext(context: Context, callback: Function) {
  /**
   * Get the subscriptions to a context
   */
  const { subscriptions } = context;
  /**
   * Add the new subscription
   */
  subscriptions?.add(callback);
  /**
   * 
   */
  callback(context?.getValue());

  return () => {
    subscriptions?.delete(callback);
  }
}

