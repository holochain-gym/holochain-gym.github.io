/**
 * Rotates focus within a list of elements. If shift key was not pressed and focus
 * is on last item, puts focus on the first item. Reversed if shift key.
 *
 * @param {HTMLElement} rootElement The root element
 * @param {KeyboardEvent} e The keyboard event
 */
export function rotateFocus(rootElement: HTMLElement, e: KeyboardEvent): void;
/**
 * Contains focus within given root element. When focus is on the last focusable
 * element inside the root element, the next focus will be redirected to the first
 * focusable element.
 *
 * @param {HTMLElement} rootElement The element to contain focus within
 * @returns {{ disconnect: () => void }} handler with a disconnect callback
 */
export function containFocus(rootElement: HTMLElement): {
    disconnect: () => void;
};
