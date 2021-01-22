/**
 * Use the [inert] attribute to be forwards compatible with: https://html.spec.whatwg.org/multipage/interaction.html#inert
 */
/**
 * Makes sibling elements inert, sets the inert attribute and aria-hidden for
 * screen readers.
 * @param {HTMLElement} element
 */
export function setSiblingsInert(element: HTMLElement): void;
/**
 * Removes inert and aria-hidden attribute from sibling elements
 * @param {HTMLElement} element
 */
export function unsetSiblingsInert(element: HTMLElement): void;
