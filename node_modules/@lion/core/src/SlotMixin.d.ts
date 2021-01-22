export type SlotMixin = typeof import("../types/SlotMixinTypes").SlotMixinImplementation;
export const SlotMixin: typeof import("../types/SlotMixinTypes").SlotMixinImplementation;
export type SlotsMap = {
    [key: string]: typeof import("../types/SlotMixinTypes").slotFunction;
};
