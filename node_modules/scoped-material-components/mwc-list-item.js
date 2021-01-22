import 'tslib';
import './ripple-handlers-a617bd83.js';
import 'lit-element';
import 'lit-html/directives/class-map';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import '@material/mwc-base/base-element';
import '@material/ripple/foundation';
import 'lit-html/directives/style-map';
import { Ripple } from './mwc-ripple.js';
import '@material/mwc-base/observer';
import { L as ListItemBase, s as style } from './mwc-list-item-css-626f0dc6.js';

class ListItem extends ScopedElementsMixin(ListItemBase) {
    static get scopedElements() {
        return {
            'mwc-ripple': Ripple,
        };
    }
}
ListItem.styles = style;

export { ListItem };
//# sourceMappingURL=mwc-list-item.js.map
