/**
 * Returns the activeElement, even when they are inside a shadowRoot.
 * (If an element in a shadowRoot is focused, document.activeElement
 * returns the shadowRoot host.
 *
 * @returns {Element}
 */
export function getDeepActiveElement(): Element;
