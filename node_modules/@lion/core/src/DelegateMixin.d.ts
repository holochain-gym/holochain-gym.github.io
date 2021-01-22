export type DelegateMixin = typeof import("../types/DelegateMixinTypes").DelegateMixinImplementation;
export const DelegateMixin: typeof import("../types/DelegateMixinTypes").DelegateMixinImplementation;
export type DelegateEvent = {
    /**
     * - Type of event
     */
    type: string;
    /**
     * - Event arguments
     */
    handler: EventHandlerNonNull;
    opts?: boolean | AddEventListenerOptions;
};
