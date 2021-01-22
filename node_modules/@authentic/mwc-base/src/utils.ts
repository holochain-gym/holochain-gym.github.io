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
import { matches } from '@material/dom/ponyfill';

/**
 * Return an element assigned to a given slot that matches the given selector
 */
export function findAssignedElement(slot: HTMLSlotElement, selector: string) {
  for (const node of slot.assignedNodes({ flatten: true })) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = (node as HTMLElement);
      if (matches(el, selector)) {
        return el;
      }
    }
  }

  return null;
}

/**
 * Return all elements assigned to a given slot that matches the given selector
 */
export function findAssignedElements(slot: HTMLSlotElement, selector: string) {
  const els: HTMLElement[] = [];

  for (const node of slot.assignedNodes({ flatten: true })) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = (node as HTMLElement);
      if (matches(el, selector)) {
        els.push(el);
      }
    }
  }

  return els;
}

/**
 * Emits a Custom Event
 */
export function emit(target: HTMLElement, evtType: string, evtData = {}, shouldBubble = false) {
  let evt;

  if (typeof CustomEvent === 'function') {
    evt = new CustomEvent(evtType, {
      detail: evtData,
      bubbles: shouldBubble,
      composed: shouldBubble
    });
  } else {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(evtType, shouldBubble, false, evtData);
  }

  target.dispatchEvent(evt);
}

export type Constructor<T> = new (...args: any[]) => T;

export function addHasRemoveClass(element: HTMLElement) {
  return {
    addClass: (className: string) => {
      element.classList.add(className);
    },
    removeClass: (className: string) => {
      element.classList.remove(className);
    },
    hasClass: (className: string) => element.classList.contains(className)
  }
}

/**
 * Returns the event’s path which is an array of the objects on which listeners will be invoked
 */
export function eventPath(e: MouseEvent): EventTarget[] {
  if ('composedPath' in e) return e.composedPath();
  if ('path' in e) return e['path'];
  //polyfill
  const path = [];
  let currentElem = e['target'];
  while (currentElem) {
    path.push(currentElem);
    currentElem = currentElem['parentElement'] as never;
  }
  if (path.indexOf(window as never) === -1 && path.indexOf(document as never) === -1) path.push(document as never);
  if (path.indexOf(window as never) === -1) path.push(window as never);

  return path;
}
