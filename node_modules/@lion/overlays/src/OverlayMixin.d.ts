/**
 * @typedef {import('../types/OverlayConfig').OverlayConfig} OverlayConfig
 * @typedef {import('../types/OverlayMixinTypes').DefineOverlayConfig} DefineOverlayConfig
 * @typedef {import('../types/OverlayMixinTypes').OverlayHost} OverlayHost
 * @typedef {import('../types/OverlayMixinTypes').OverlayMixin} OverlayMixin
 */
/**
 * @type {OverlayMixin}
 */
export const OverlayMixinImplementation: OverlayMixin;
export type OverlayMixin = typeof import("../types/OverlayMixinTypes.js").OverlayImplementation;
export const OverlayMixin: typeof import("../types/OverlayMixinTypes.js").OverlayImplementation;
export type OverlayConfig = import("../types/OverlayConfig.js").OverlayConfig;
export type DefineOverlayConfig = import("../types/OverlayMixinTypes.js").DefineOverlayConfig;
export type OverlayHost = import("../types/OverlayMixinTypes.js").OverlayHost;
