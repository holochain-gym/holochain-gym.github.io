import 'tslib';
import 'lit-element';
import 'lit-html/directives/class-map';
import '@material/mwc-base/base-element';
import '@material/mwc-base/utils';
import '@material/top-app-bar/standard/foundation';
import '@material/top-app-bar/constants';
import '@material/top-app-bar/foundation';
import { T as TopAppBarBase, p as passiveEventOptionsIfSupported, s as style } from './mwc-top-app-bar-css-a3bc0856.js';
import MDCFixedTopAppBarFoundation from '@material/top-app-bar/fixed/foundation';

/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
class TopAppBarFixedBase extends TopAppBarBase {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCFixedTopAppBarFoundation;
    }
    barClasses() {
        return Object.assign(Object.assign({}, super.barClasses()), { 'mdc-top-app-bar--fixed': true });
    }
    registerListeners() {
        this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
    }
    unregisterListeners() {
        this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    }
}

class TopAppBarFixed extends TopAppBarFixedBase {
}
TopAppBarFixed.styles = style;

export { TopAppBarFixed };
//# sourceMappingURL=mwc-top-app-bar-fixed.js.map
