/**
 * Copyright (c) 2020 Dorian Cortes, Gary Valverde
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

interface IContext {
    getValue(): object
    setValue(newValue: object): void
}

export type MapFn<T = object> = (providerNewValue?: T, providerOldValue?: T) => void;

export class Context implements IContext {
    value: object;
    subscriptions: Set<Function>;

    constructor(initialValue: object) {
        this.value = initialValue;
        this.subscriptions = new Set<Function>()
    }

    getValue() {
        return this.value;
    }

    setValue(newValue: object) {
        const oldValue = this.value;
        this.value = newValue;
        this.subscriptions?.forEach(subscription => subscription(newValue, oldValue));
    }
}