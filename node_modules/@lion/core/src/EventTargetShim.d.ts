export class EventTargetShim {
    addEventListener: (type: string, listener: EventListener, opts?: Object | undefined) => void;
    removeEventListener: (type: string, listener: EventListener, opts?: Object | undefined) => void;
    dispatchEvent: (event: Event | CustomEvent) => boolean;
}
