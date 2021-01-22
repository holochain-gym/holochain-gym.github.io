/**
 * @desc Compensates for browsers that use floats in output
 * - from: 'transform3d(12.25px, 6.75px, 0px)'
 * - to: 'transform3d(12px, 7px, 0px)'
 * @param {string} cssValue
 */
export function normalizeTransformStyle(cssValue: string): string;
