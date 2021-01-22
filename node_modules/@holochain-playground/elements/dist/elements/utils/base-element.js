import { LitElement } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { PlaygroundMixin } from '@holochain-playground/container';

class BaseElement extends PlaygroundMixin(ScopedElementsMixin(LitElement)) {
}

export { BaseElement };
//# sourceMappingURL=base-element.js.map
