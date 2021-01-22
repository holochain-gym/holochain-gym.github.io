/**
 * Copyright (c) 2020 Dorian Cortes, Gary Valverde
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { contextConsumer } from "../lib/context-consumer";
import { MapFn } from "../types/context";

/**
 * @param providerTag Provider tag name
 * @param mapFn  Function to map provider value
 */
export type Constructor<T> = {
    // tslint:disable-next-line:no-any
    new(...args: any[]): T
};

// From the TC39 Decorators proposal
interface ClassDescriptor {
    kind: 'class';
    elements: ClassElement[];
    finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
}

// From the TC39 Decorators proposal
interface ClassElement {
    kind: 'field' | 'method';
    key: PropertyKey;
    placement: 'static' | 'prototype' | 'own';
    initializer?: Function;
    extras?: ClassElement[];
    finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
    descriptor?: PropertyDescriptor;
}

export const consume = <T = object>(providerTag: string, mapFn?: MapFn<T>) =>
    (classOrDescriptor: Constructor<HTMLElement> | ClassDescriptor) =>
        (typeof classOrDescriptor === 'function') ?
            legacyCustomElement<T>(classOrDescriptor, providerTag, mapFn) :
            standardCustomElement<T>(classOrDescriptor, providerTag, mapFn);

const legacyCustomElement =
    <T = object>(classConstructor: Constructor<HTMLElement>, providerTag: string, mapFn?: MapFn<T>) => {
        const consumer = (consumer: HTMLElement, mapFn?: MapFn<T>) => contextConsumer(providerTag, consumer, mapFn);
        return class extends classConstructor {
            connectedCallback() {
                super.connectedCallback();
                consumer(this, mapFn);
            }
        } as any
    };

const standardCustomElement =
    <T = object>(classConstructor: ClassDescriptor, providerTag: string, mapFn?: MapFn<T>) => {
        const { kind, elements } = classConstructor;
        const consumer = (consumer: HTMLElement, mapFn?: MapFn<T>) => contextConsumer(providerTag, consumer, mapFn);
        return {
            kind,
            elements,
            finisher(clazz: Constructor<HTMLElement>) {
                clazz.prototype.__litContextConnectedCallback = clazz.prototype.connectedCallback;
                clazz.prototype.connectedCallback = function connectedCallbackHandler() {
                  this.__litContextConnectedCallback();
                  consumer(this, mapFn);
                };
            }
        };
    };