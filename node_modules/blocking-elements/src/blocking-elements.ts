/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * `BlockingElements` manages a stack of elements that inert the interaction
 * outside them. The top element is the interactive part of the document.
 * The stack can be updated with the methods `push, remove, pop`.
 */
export interface BlockingElements {
  /**
   * Call this whenever this object is about to become obsolete. This empties
   * the blocking elements
   */
  destructor(): void;

  /**
   * The top blocking element.
   */
  top: HTMLElement|null;

  /**
   * Adds the element to the blocking elements.
   */
  push(element: HTMLElement): void;

  /**
   * Removes the element from the blocking elements. Returns true if the
   * element was removed.
   */
  remove(element: HTMLElement): boolean;

  /**
   * Remove the top blocking element and returns it.
   */
  pop(): HTMLElement|null;

  /**
   * Returns if the element is a blocking element.
   */
  has(element: HTMLElement): boolean;
}

export interface DocumentWithBlockingElements extends Document {
  $blockingElements: BlockingElements;
}

(() => {
  /* Symbols for private properties */
  const _blockingElements = Symbol();
  const _alreadyInertElements = Symbol();
  const _topElParents = Symbol();
  const _siblingsToRestore = Symbol();
  const _parentMO = Symbol();

  /* Symbols for private static methods */
  const _topChanged = Symbol();
  const _swapInertedSibling = Symbol();
  const _inertSiblings = Symbol();
  const _restoreInertedSiblings = Symbol();
  const _getParents = Symbol();
  const _getDistributedChildren = Symbol();
  const _isInertable = Symbol();
  const _handleMutations = Symbol();

  interface Inertable extends HTMLElement {
    inert?: boolean;
  }

  interface InternalState {
    [_siblingsToRestore]: Set<MaybeHasInternalState>;
    [_parentMO]: MutationObserver;
  }
  interface HasInternalState extends Inertable, InternalState {}
  interface MaybeHasInternalState extends Inertable, Partial<InternalState> {}

  /**
   * ShadyDOM shady roots look a lot like real ShadowRoots. The __shady property
   * gives them away, though.
   */
  interface MaybeShadyRoot extends Element {
    __shady: unknown;
    host: Element;
  }

  class BlockingElementsImpl implements BlockingElements {
    /**
     * The blocking elements.
     */
    private[_blockingElements]: MaybeHasInternalState[] = [];

    /**
     * Used to keep track of the parents of the top element, from the element
     * itself up to body. When top changes, the old top might have been removed
     * from the document, so we need to memoize the inerted parents' siblings
     * in order to restore their inerteness when top changes.
     */
    private[_topElParents]: HasInternalState[] = [];

    /**
     * Elements that are already inert before the first blocking element is
     * pushed.
     */
    private[_alreadyInertElements] = new Set<MaybeHasInternalState>();

    destructor(): void {
      // Restore original inertness.
      this[_restoreInertedSiblings](this[_topElParents]);
      // Note we don't want to make these properties nullable on the class,
      // since then we'd need non-null casts in many places. Calling a method on
      // a BlockingElements instance after calling destructor will result in an
      // exception.
      const nullable = this as unknown as {
        [_blockingElements]: null;
        [_topElParents]: null;
        [_alreadyInertElements]: null;
      };
      nullable[_blockingElements] = null;
      nullable[_topElParents] = null;
      nullable[_alreadyInertElements] = null;
    }

    get top(): HTMLElement|null {
      const elems = this[_blockingElements];
      return elems[elems.length - 1] || null;
    }

    push(element: HTMLElement): void {
      if (!element || element === this.top) {
        return;
      }
      // Remove it from the stack, we'll bring it to the top.
      this.remove(element);
      this[_topChanged](element);
      this[_blockingElements].push(element);
    }

    remove(element: HTMLElement): boolean {
      const i = this[_blockingElements].indexOf(element);
      if (i === -1) {
        return false;
      }
      this[_blockingElements].splice(i, 1);
      // Top changed only if the removed element was the top element.
      if (i === this[_blockingElements].length) {
        this[_topChanged](this.top);
      }
      return true;
    }

    pop(): HTMLElement|null {
      const top = this.top;
      top && this.remove(top);
      return top;
    }

    has(element: HTMLElement): boolean {
      return this[_blockingElements].indexOf(element) !== -1;
    }

    /**
     * Sets `inert` to all document elements except the new top element, its
     * parents, and its distributed content.
     */
    private[_topChanged](newTop: MaybeHasInternalState|null): void {
      const toKeepInert = this[_alreadyInertElements];
      const oldParents = this[_topElParents];
      // No new top, reset old top if any.
      if (!newTop) {
        this[_restoreInertedSiblings](oldParents);
        toKeepInert.clear();
        this[_topElParents] = [];
        return;
      }

      const newParents = this[_getParents](newTop);
      // New top is not contained in the main document!
      if (newParents[newParents.length - 1].parentNode !== document.body) {
        throw Error('Non-connected element cannot be a blocking element');
      }
      // Cast here because we know we'll call _inertSiblings on newParents
      // below.
      this[_topElParents] = newParents as Array<HasInternalState>;

      const toSkip = this[_getDistributedChildren](newTop);

      // No previous top element.
      if (!oldParents.length) {
        this[_inertSiblings](newParents, toSkip, toKeepInert);
        return;
      }

      let i = oldParents.length - 1;
      let j = newParents.length - 1;
      // Find common parent. Index 0 is the element itself (so stop before it).
      while (i > 0 && j > 0 && oldParents[i] === newParents[j]) {
        i--;
        j--;
      }
      // If up the parents tree there are 2 elements that are siblings, swap
      // the inerted sibling.
      if (oldParents[i] !== newParents[j]) {
        this[_swapInertedSibling](oldParents[i], newParents[j]);
      }
      // Restore old parents siblings inertness.
      i > 0 && this[_restoreInertedSiblings](oldParents.slice(0, i));
      // Make new parents siblings inert.
      j > 0 && this[_inertSiblings](newParents.slice(0, j), toSkip, null);
    }

    /**
     * Swaps inertness between two sibling elements.
     * Sets the property `inert` over the attribute since the inert spec
     * doesn't specify if it should be reflected.
     * https://html.spec.whatwg.org/multipage/interaction.html#inert
     */
    private[_swapInertedSibling](
        oldInert: HasInternalState, newInert: MaybeHasInternalState): void {
      const siblingsToRestore = oldInert[_siblingsToRestore];
      // oldInert is not contained in siblings to restore, so we have to check
      // if it's inertable and if already inert.
      if (this[_isInertable](oldInert) && !oldInert.inert) {
        oldInert.inert = true;
        siblingsToRestore.add(oldInert);
      }
      // If newInert was already between the siblings to restore, it means it is
      // inertable and must be restored.
      if (siblingsToRestore.has(newInert)) {
        newInert.inert = false;
        siblingsToRestore.delete(newInert);
      }
      newInert[_parentMO] = oldInert[_parentMO];
      newInert[_siblingsToRestore] = siblingsToRestore;
      (oldInert as MaybeHasInternalState)[_parentMO] = undefined;
      (oldInert as MaybeHasInternalState)[_siblingsToRestore] = undefined;
    }

    /**
     * Restores original inertness to the siblings of the elements.
     * Sets the property `inert` over the attribute since the inert spec
     * doesn't specify if it should be reflected.
     * https://html.spec.whatwg.org/multipage/interaction.html#inert
     */
    private[_restoreInertedSiblings](elements: HasInternalState[]) {
      for (const element of elements) {
        const mo = element[_parentMO];
        mo.disconnect();
        (element as MaybeHasInternalState)[_parentMO] = undefined;
        const siblings = element[_siblingsToRestore];
        for (const sibling of siblings) {
          sibling.inert = false;
        }
        (element as MaybeHasInternalState)[_siblingsToRestore] = undefined;
      }
    }

    /**
     * Inerts the siblings of the elements except the elements to skip. Stores
     * the inerted siblings into the element's symbol `_siblingsToRestore`.
     * Pass `toKeepInert` to collect the already inert elements.
     * Sets the property `inert` over the attribute since the inert spec
     * doesn't specify if it should be reflected.
     * https://html.spec.whatwg.org/multipage/interaction.html#inert
     */
    private[_inertSiblings](
        elements: MaybeHasInternalState[], toSkip: Set<HTMLElement>|null,
        toKeepInert: Set<HTMLElement>|null) {
      for (const element of elements) {
        // Assume element is not a Document, so it must have a parentNode.
        const parent = element.parentNode!;
        const children = parent.children;
        const inertedSiblings = new Set<HTMLElement>();
        for (let j = 0; j < children.length; j++) {
          const sibling = children[j] as MaybeHasInternalState;
          // Skip the input element, if not inertable or to be skipped.
          if (sibling === element || !this[_isInertable](sibling) ||
              (toSkip && toSkip.has(sibling))) {
            continue;
          }
          // Should be collected since already inerted.
          if (toKeepInert && sibling.inert) {
            toKeepInert.add(sibling);
          } else {
            sibling.inert = true;
            inertedSiblings.add(sibling);
          }
        }
        // Store the siblings that were inerted.
        element[_siblingsToRestore] = inertedSiblings;
        // Observe only immediate children mutations on the parent.
        const mo = new MutationObserver(this[_handleMutations].bind(this));
        element[_parentMO] = mo;
        let parentToObserve = parent;
        // If we're using the ShadyDOM polyfill, then our parent could be a
        // shady root, which is an object that acts like a ShadowRoot, but isn't
        // actually a node in the real DOM. Observe the real DOM parent instead.
        const maybeShadyRoot = parentToObserve as MaybeShadyRoot;
        if (maybeShadyRoot.__shady && maybeShadyRoot.host) {
          parentToObserve = maybeShadyRoot.host;
        }
        mo.observe(parentToObserve, {
          childList: true,
        });
      }
    }

    /**
     * Handles newly added/removed nodes by toggling their inertness.
     * It also checks if the current top Blocking Element has been removed,
     * notifying and removing it.
     */
    private[_handleMutations](mutations: MutationRecord[]): void {
      const parents = this[_topElParents];
      const toKeepInert = this[_alreadyInertElements];
      for (const mutation of mutations) {
        // If the target is a shadowRoot, get its host as we skip shadowRoots when
        // computing _topElParents.
        const target = (mutation.target as ShadowRoot).host || mutation.target;
        const idx = target === document.body ?
            parents.length :
            parents.indexOf(target as HasInternalState);
        const inertedChild = parents[idx - 1];
        const inertedSiblings = inertedChild[_siblingsToRestore];

        // To restore.
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const sibling = mutation.removedNodes[i] as MaybeHasInternalState;
          if (sibling === inertedChild) {
            console.info('Detected removal of the top Blocking Element.');
            this.pop();
            return;
          }
          if (inertedSiblings.has(sibling)) {
            sibling.inert = false;
            inertedSiblings.delete(sibling);
          }
        }

        // To inert.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const sibling = mutation.addedNodes[i] as MaybeHasInternalState;
          if (!this[_isInertable](sibling)) {
            continue;
          }
          if (toKeepInert && sibling.inert) {
            toKeepInert.add(sibling);
          } else {
            sibling.inert = true;
            inertedSiblings.add(sibling);
          }
        }
      }
    }

    /**
     * Returns if the element is inertable.
     */
    private[_isInertable](element: HTMLElement): boolean {
      return false === /^(style|template|script)$/.test(element.localName);
    }

    /**
     * Returns the list of newParents of an element, starting from element
     * (included) up to `document.body` (excluded).
     */
    private[_getParents](element: HTMLElement): Array<HTMLElement> {
      const parents = [];
      let current: HTMLElement|null|undefined = element;
      // Stop to body.
      while (current && current !== document.body) {
        // Skip shadow roots.
        if (current.nodeType === Node.ELEMENT_NODE) {
          parents.push(current);
        }
        // ShadowDom v1
        if (current.assignedSlot) {
          // Collect slots from deepest slot to top.
          while (current = current.assignedSlot) {
            parents.push(current);
          }
          // Continue the search on the top slot.
          current = parents.pop();
          continue;
        }
        current = current.parentNode as HTMLElement ||
            (current as Node as ShadowRoot).host;
      }
      return parents;
    }

    /**
     * Returns the distributed children of the element's shadow root.
     * Returns null if the element doesn't have a shadow root.
     */
    private[_getDistributedChildren](element: HTMLElement):
        Set<HTMLElement>|null {
      const shadowRoot = element.shadowRoot;
      if (!shadowRoot) {
        return null;
      }
      const result = new Set<HTMLElement>();
      let i;
      let j;
      let nodes;
      const slots = shadowRoot.querySelectorAll('slot');
      if (slots.length && slots[0].assignedNodes) {
        for (i = 0; i < slots.length; i++) {
          nodes = slots[i].assignedNodes({
            flatten: true,
          });
          for (j = 0; j < nodes.length; j++) {
            if (nodes[j].nodeType === Node.ELEMENT_NODE) {
              result.add(nodes[j] as HTMLElement);
            }
          }
        }
        // No need to search for <content>.
      }
      return result;
    }
  }

  (document as DocumentWithBlockingElements).$blockingElements =
      new BlockingElementsImpl();
})();
