import{r as e,h as t,L as s,c as i}from"./0fafd573.js";import{s as r,u as n,c as o}from"./de191b48.js";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */window.JSCompiler_renameProperty=(e,t)=>e;const a={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},d=(e,t)=>t!==e&&(t==t||e==e),h={attribute:!0,type:String,converter:a,reflect:!1,hasChanged:d};class c extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=h){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const r=this[e];this[t]=i,this.requestUpdateInternal(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||h}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=d){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,i=t.converter||a,r="function"==typeof i?i:i.fromAttribute;return r?r(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,i=t.converter;return(i&&i.toAttribute||a.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=h){const i=this.constructor,r=i._attributeNameForProperty(e,s);if(void 0!==r){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(r):this.setAttribute(r,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let i=!0;if(void 0!==e){const r=this.constructor;s=s||r.getPropertyOptions(e),r._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}c.finalized=!0,(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const l={};class p extends c{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),i=[];s.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!r){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return n(t)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?r?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==l&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return l}}p.finalized=!0,p.render=e;let u,g,m=e=>e;const f=e=>{const t=e.firstElementChild;t&&t.removeAttribute("focused")},b=e=>{e.removeAttribute("expanded");const t=e.firstElementChild;t&&(t.removeAttribute("expanded"),t.setAttribute("aria-expanded","false"))},y=e=>{e.removeAttribute("expanded")};customElements.define("lion-accordion",class extends p{static get properties(){return{focusedIndex:{type:Number},expanded:{type:Array}}}static get styles(){return[o(u||(u=m`
        .accordion {
          display: flex;
          flex-direction: column;
        }

        .accordion ::slotted([slot='invoker']) {
          margin: 0;
        }

        .accordion ::slotted([slot='invoker'][expanded]) {
          font-weight: bold;
        }

        .accordion ::slotted([slot='content']) {
          margin: 0;
          visibility: hidden;
          display: none;
        }

        .accordion ::slotted([slot='content'][expanded]) {
          visibility: visible;
          display: block;
        }
      `))]}render(){return t(g||(g=m`
      <div class="accordion">
        <slot name="invoker"></slot>
        <slot name="content"></slot>
      </div>
    `))}constructor(){super(),this.styles={},this.__store=[],this.__focusedIndex=-1,this.__expanded=[]}firstUpdated(e){super.firstUpdated(e),this.__setupSlots()}__setupSlots(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("slot[name=invoker]"),s=()=>{this.__cleanStore(),this.__setupStore(),this.__updateFocused(),this.__updateExpanded()};t&&t.addEventListener("slotchange",s)}__setupStore(){const e=Array.from(this.querySelectorAll('[slot="invoker"]')),t=Array.from(this.querySelectorAll('[slot="content"]'));e.length!==t.length&&console.warn(`The amount of invokers (${e.length}) doesn't match the amount of contents (${t.length}).`),e.forEach(((e,s)=>{const i={uid:Math.random().toString(36).substr(2,10),index:s,invoker:e,content:t[s],clickHandler:this.__createInvokerClickHandler(s),keydownHandler:this.__handleInvokerKeydown.bind(this)};(({element:e,uid:t,index:s})=>{e.style.setProperty("order",`${s+1}`),e.setAttribute("id",`content-${t}`),e.setAttribute("aria-labelledby",`invoker-${t}`)})({element:i.content,...i}),(({element:e,uid:t,index:s,clickHandler:i,keydownHandler:r})=>{e.style.setProperty("order",`${s+1}`);const n=e.firstElementChild;n&&(n.setAttribute("id",`invoker-${t}`),n.setAttribute("aria-controls",`content-${t}`),n.addEventListener("click",i),n.addEventListener("keydown",r))})({element:i.invoker,...i}),f(i.invoker),y(i.content),b(i.invoker),this.__store.push(i)}))}__cleanStore(){this.__store&&(this.__store.forEach((e=>{((e,t,s)=>{const i=e.firstElementChild;i&&(i.removeAttribute("id"),i.removeAttribute("aria-controls"),i.removeEventListener("click",t),i.removeEventListener("keydown",s))})(e.invoker,e.clickHandler,e.keydownHandler)})),this.__store=[])}__createInvokerClickHandler(e){return()=>{this.focusedIndex=e,this.__toggleExpanded(e)}}__handleInvokerKeydown(e){const t=e;switch(t.key){case"ArrowDown":case"ArrowRight":t.preventDefault(),this.focusedIndex+2<=this._pairCount&&(this.focusedIndex+=1);break;case"ArrowUp":case"ArrowLeft":t.preventDefault(),this.focusedIndex>=1&&(this.focusedIndex-=1);break;case"Home":t.preventDefault(),this.focusedIndex=0;break;case"End":t.preventDefault(),this.focusedIndex=this._pairCount-1}}set focusedIndex(e){const t=this.__focusedIndex;this.__focusedIndex=e,this.__updateFocused(),this.dispatchEvent(new Event("focused-changed")),this.requestUpdate("focusedIndex",t)}get focusedIndex(){return this.__focusedIndex}get _pairCount(){return this.__store.length}set expanded(e){const t=this.__expanded;this.__expanded=e,this.__updateExpanded(),this.dispatchEvent(new Event("expanded-changed")),this.requestUpdate("expanded",t)}get expanded(){return this.__expanded}__updateFocused(){if(!this.__store||!this.__store[this.focusedIndex])return;const e=Array.from(this.children).find((e=>{var t;return"invoker"===e.slot&&(null===(t=e.firstElementChild)||void 0===t?void 0:t.hasAttribute("focused"))}));e&&f(e);const{invoker:t}=this.__store[this.focusedIndex];t&&(e=>{const t=e.firstElementChild;t&&(t.focus(),t.setAttribute("focused","true"))})(t)}__updateExpanded(){this.__store&&this.__store.forEach(((e,t)=>{-1!==this.expanded.indexOf(t)?((e=>{e.setAttribute("expanded","true");const t=e.firstElementChild;t&&(t.setAttribute("expanded","true"),t.setAttribute("aria-expanded","true"))})(e.invoker),e.content.setAttribute("expanded","true")):(b(e.invoker),y(e.content))}))}__toggleExpanded(e){const{expanded:t}=this,s=t.indexOf(e);-1===s?t.push(e):t.splice(s,1),this.expanded=t}});const _={platform:"web",size:"webSmall",theme:"light",language:"en",autoHeight:!0,deviceMode:!1,rememberSettings:!1,edgeDistance:!0};let v=[];function S(e){v=v.filter((t=>t!==e))}let w=!1;function x(e){if(w)for(const t of Object.keys(_)){const s=t;switch(s){case"autoHeight":case"deviceMode":case"rememberSettings":case"edgeDistance":e[s]=_[s];break;default:e[s]=_[s]}}else k(e)}function k(e){let t=!1;for(const s of Object.keys(_)){const i=s;if(_[i]!==e[i]){switch(i){case"autoHeight":case"deviceMode":case"rememberSettings":case"edgeDistance":_[i]=e[i];break;default:_[i]=e[i]}t=!0,w=!0}}return t}function P(e,t){if(k(e)){!function(){for(const e of Object.keys(_)){const t=e;_.rememberSettings?localStorage.setItem(`mdjsViewerSharedStates-${t}`,_[t].toString()):localStorage.removeItem(`mdjsViewerSharedStates-${t}`)}}();for(const e of v)e!==t&&e()}}!function(){for(const e of Object.keys(_)){const t=e,s=localStorage.getItem(`mdjsViewerSharedStates-${t}`);if(null!==s){switch(t){case"autoHeight":case"deviceMode":case"rememberSettings":case"edgeDistance":_[t]="true"===s;break;default:_[t]=s}w=!0}}}();let $,A,C,U,z,E,I,O,H,R,D,j,M,T,q,L,V,F,N,B,J,G,K,X,Q,W,Y,Z=e=>e;customElements.define("mdjs-preview",class extends s{static get properties(){return{story:{attribute:!1},key:{type:String},deviceMode:{type:Boolean,attribute:"device-mode",reflect:!0},sameSettings:{type:Boolean},contentHeight:{type:Number},simulatorUrl:{type:String},platform:{type:String},platforms:{type:Array},size:{type:String},sizes:{type:Array},theme:{type:String,reflect:!0},themes:{type:Array},language:{type:String},languages:{type:Array},edgeDistance:{type:Boolean},autoHeight:{type:Boolean},rememberSettings:{type:Boolean},__copyButtonText:{type:String}}}constructor(){var e,s,i;super(),i=()=>{this.__syncUp=!1,x(this),this.__syncUp=!0},(s="onSubscribe")in(e=this)?Object.defineProperty(e,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[s]=i,this.story=()=>t($||($=Z` <p>Loading...</p> `)),this.key="",this.contentHeight=0,this.simulatorUrl="",this.__supportsClipboard="clipboard"in navigator,this.__copyButtonText="Copy Code",this.theme="light",this.themes=[],this.language="en-US",this.languages=[{key:"en",name:"English"},{key:"en-US",name:"English (United States)"},{key:"en-GB",name:"English (United Kingdom)"},{key:"de",name:"German"},{key:"es",name:"Spanish"},{key:"fi",name:"Finnish"},{key:"fr",name:"French"},{key:"it",name:"Italian"},{key:"nl",name:"Dutch"},{key:"pl",name:"Polish"},{key:"pt",name:"Portuguese"},{key:"ro",name:"Romanian"},{key:"sv",name:"Swedish"}],this.platform="web",this.platforms=[],this.size="webSmall",this.sizes=[{key:"webSmall",name:"Small",platform:"web",width:360,height:640,dpr:1},{key:"webMedium",name:"Medium",platform:"web",width:640,height:640,dpr:1},{key:"webLarge",name:"Large",platform:"web",width:1024,height:640,dpr:1},{key:"pixel2",name:"Pixel 2",platform:"android",width:411,height:731,dpr:2.6},{key:"galaxyS5",name:"Galaxy S5",platform:"android",width:360,height:640,dpr:3},{key:"iphoneX",name:"iPhone X",platform:"ios",width:375,height:812,dpr:3},{key:"iPad",name:"iPad",platform:"ios",width:768,height:1024,dpr:2}],this.deviceMode=!1,this.autoHeight=!0,this.edgeDistance=!0,this.sameSettings=!0,this.rememberSettings=!1,this.__firstRun=!0,this.__syncUp=!1}connectedCallback(){super.connectedCallback(),this.sameSettings&&x(this),window.addEventListener("message",(e=>{const t=JSON.parse(e.data);if("mdjs-viewer-resize"===t.action){const e=document.body.querySelector(`[mdjs-story-name="${t.storyKey}"]`);e&&(e.contentHeight=t.height)}}))}get baseUrl(){return document.location.origin}get deviceHeight(){var e;const t=(null===(e=this.sizeData)||void 0===e?void 0:e.height)||50;return this.autoHeight?Math.min(this.contentHeight,t):t}getSizesFor(e){return this.sizes.filter((t=>t.platform===e))}get sizeData(){return this.sizes.find((e=>e.key===this.size))||{width:50,height:50,name:"default"}}update(e){var t;super.update(e),this.sameSettings&&this.__syncUp&&P(this,this.onSubscribe),e.has("sameSettings")&&(this.sameSettings?(t=this.onSubscribe,v.push(t)):S(this.onSubscribe))}disconnectedCallback(){super.disconnectedCallback(),this.sameSettings&&S(this.onSubscribe)}firstUpdated(){this.__syncUp=!0}get iframeUrl(){const e=document.querySelector("script[type=module][mdjs-setup]");if(!e)throw new Error('Could not find a <script type="module" src="..." mdjs-setup><\/script>');const t=new URLSearchParams;t.set("story-file",e.src),t.set("story-key",this.key),t.set("theme",this.theme),t.set("platform",this.platform),t.set("language",this.language),t.set("edge-distance",this.edgeDistance.toString());const s=[...document.querySelectorAll("link[mdjs-use]")];for(const e of s)e.href&&t.append("stylesheets",e.href);return`${this.simulatorUrl}#?${t.toString()}`}changePlatform(e){this.platform=e;const t=this.getSizesFor(this.platform);this.size=t[0].key}async onCopy(){this.textContent&&(await navigator.clipboard.writeText(this.textContent.trim()),this.__copyButtonText="Copied ✅",setTimeout((()=>{this.__copyButtonText="Copy code"}),2e3))}renderPlatforms(){if(this.platforms.length)return t(A||(A=Z`
        <h4>Platform</h4>
        <div
          class="segmented-control"
          @change=${0}
        >
          ${0}
        </div>
      `),(e=>{e.target&&this.changePlatform(e.target.value)}),this.platforms.map((e=>t(C||(C=Z`
              <label class="${0}">
                <span>${0}</span>
                <input
                  type="radio"
                  name="platform"
                  value="${0}"
                  ?checked=${0}
                />
              </label>
            `),this.platform===e.key?"selected":"",e.name,e.key,this.platform===e.key))))}renderPlatform(){if(this.platforms.length)return t(U||(U=Z`
        <div>
          <h3>Platform</h3>
          ${0}
        </div>
      `),this.renderPlatforms())}renderSizes(){if(this.sizes.length)return t(z||(z=Z`
        <h4>Size</h4>
        <div
          class="segmented-control"
          @change=${0}
        >
          ${0}
        </div>
      `),(e=>{e.target&&(this.size=e.target.value)}),this.getSizesFor(this.platform).map((e=>t(E||(E=Z`
              <label class="${0}">
                <span>${0}</span>
                <input
                  type="radio"
                  name="size"
                  value="${0}"
                  .checked=${0}
                />
              </label>
            `),this.size===e.key?"selected":"",e.name,e.key,this.size===e.key))))}renderViewport(){return t(I||(I=Z`
      <div>
        <h3>Viewport</h3>
        ${0} ${0}
      </div>
    `),this.renderSizes(),this.renderAutoHeight())}renderThemes(){if(this.themes.length)return t(O||(O=Z`
        <div
          class="segmented-control"
          @change=${0}
        >
          ${0}
        </div>
      `),(e=>{e.target&&(this.theme=e.target.value)}),this.themes.map((e=>t(H||(H=Z`
              <label class="${0}">
                <span>${0}</span>
                <input
                  type="radio"
                  name="theme"
                  value="${0}"
                  ?checked=${0}
                />
              </label>
            `),this.theme===e.key?"selected":"",e.name,e.key,this.theme===e.key))))}renderVisual(){return t(R||(R=Z`
      <div>
        <h3>Visual</h3>
        ${0} ${0}
      </div>
    `),this.renderThemes(),this.renderEdgeDistance())}renderLanguages(){if(this.languages.length)return t(D||(D=Z`
        <label>
          Language
          <select
            @change=${0}
          >
            ${0}
          </select>
        </label>
      `),(e=>{e.target&&(this.language=e.target.value)}),this.languages.map((e=>t(j||(j=Z`
                <option value="${0}" ?selected=${0}>
                  ${0}
                </option>
              `),e.key,this.language===e.key,e.name))))}renderLocalization(){return t(M||(M=Z`
      <div>
        <h3>Localization</h3>
        ${0}
      </div>
    `),this.renderLanguages())}renderEdgeDistance(){return t(T||(T=Z`
      <div>
        <label class="${0}">
          Apply distance to edge
          <span part="switch-button"></span>

          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.edgeDistance?"switch selected":"switch",this.edgeDistance,(e=>{e.target&&(this.edgeDistance=e.target.checked)}))}renderAutoHeight(){return t(q||(q=Z`
      <div>
        <label class="${0}">
          Fit height to content
          <span part="switch-button"></span>
          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.autoHeight?"switch selected":"switch",this.autoHeight,(e=>{e.target&&(this.autoHeight=e.target.checked)}))}renderSameSettings(){return t(L||(L=Z`
      <div>
        <label class="${0}">
          Same settings for all simulations
          <span part="switch-button"></span>
          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.sameSettings?"switch selected":"switch",this.sameSettings,(e=>{e.target&&(this.sameSettings=e.target.checked)}))}renderRememberSettings(){return this.sameSettings?t(F||(F=Z`
      <div>
        <label class="${0}">
          Remember settings
          <span part="switch-button"></span>
          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.rememberSettings?"switch selected":"switch",this.rememberSettings,(e=>{e.target&&(this.rememberSettings=e.target.checked)})):t(V||(V=Z``))}renderSyncSettings(){return t(N||(N=Z`
      <div>
        <h3>Global</h3>
        ${0} ${0}
      </div>
    `),this.renderSameSettings(),this.renderRememberSettings())}render(){return t(B||(B=Z`
      <div id="wrapper">
        ${0}
      </div>
      <lion-accordion class="options">
        ${0}
        <h3 slot="invoker">
          <button>Code</button>
        </h3>
        <div slot="content">
          <slot id="code-slot"></slot>
          <button part="copy-button" @click="${0}" ?hidden="${0}">
            ${0}
          </button>
        </div>
      </lion-accordion>
      ${0}
    `),!1===this.deviceMode?t(J||(J=Z`<div>${0}</div>`),this.story({shadowRoot:this.shadowRoot})):t(G||(G=Z`
              <iframe
                part="iframe"
                csp=${0}
                .src=${0}
                style=${0}
              ></iframe>
              <p part="frame-description" style=${0}>
                ${0} - ${0}x${0}
              </p>
            `),`script-src ${document.location.origin} 'unsafe-inline'; connect-src ws://${document.location.host}/`,this.iframeUrl,`width: ${this.sizeData.width}px; height: ${this.deviceHeight}px;`,`width: ${this.sizeData.width+4}px;`,this.sizeData.name,this.deviceHeight,this.sizeData.width),this.deviceMode?t(K||(K=Z`
              <h3 slot="invoker">
                <button>Settings</button>
              </h3>
              <div slot="content">
                <div class="settings-wrapper">
                  ${0} ${0} ${0}
                  ${0} ${0}
                </div>
              </div>
            `),this.renderPlatform(),this.renderViewport(),this.renderVisual(),this.renderLocalization(),this.renderSyncSettings()):"",this.onCopy,!this.__supportsClipboard,this.__copyButtonText,this.simulatorUrl?t(X||(X=Z`
            <div class="controls">
              <a href=${0} target="_blank">Open simulation in new window</a>
              <button
                @click=${0}
                class="simulation-toggle"
              >
                ${0} device simulation
              </button>
            </div>
          `),this.iframeUrl,(()=>this.deviceMode=!this.deviceMode),this.deviceMode?t(Q||(Q=Z`Disable`)):t(W||(W=Z`Enable`))):"")}static get styles(){return i(Y||(Y=Z`
      :host {
        display: block;
        padding-bottom: 10px;
      }

      iframe {
        border: 2px solid #4caf50;
        background: #fff;
      }

      [part='copy-button'] {
        border: 1px solid var(--primary-color, #3f51b5);
        border-radius: 9px;
        padding: 7px;
        background: none;
        font-weight: bold;
        color: var(--primary-color, #3f51b5);
        text-align: center;
        font-size: 12px;
        line-height: 12px;
        float: right;
        margin-top: -10px;
      }

      [part='copy-button']:hover {
        background-color: var(--primary-color, #3f51b5);
        color: #fff;
      }

      .switch {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .switch:focus-within [part='switch-button'] {
        box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 40%), 0 0 0 4px rgb(31 117 203 / 48%);
      }

      [part='switch-button'] {
        display: inline-block;
        width: 44px;
        background: #808080;
        height: 25px;
        border-radius: 15px;
        position: relative;
      }

      [part='switch-button']::after {
        content: ' ';
        width: 18px;
        height: 18px;
        border-radius: 10px;
        background: rgb(255, 255, 255);
        display: block;
        position: absolute;
        top: 3px;
        left: 4px;
      }

      .switch.selected [part='switch-button'] {
        background: var(--primary-color, #008000);
      }

      .switch.selected [part='switch-button']::after {
        left: auto;
        right: 4px;
      }

      [part='frame-description'] {
        margin: -5px 0 10px 0;
        text-align: right;
        font-size: 12px;
        color: #333;
      }

      .settings-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px 40px;
        max-width: 650px;
      }

      @media (min-width: 640px) {
        .settings-wrapper {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .settings-wrapper h3 {
        margin: 10px 0;
        font-size: 16px;
      }

      .options {
        display: block;
        padding: 15px 0;
      }

      .controls {
        display: flex;
        justify-content: space-between;
      }

      .controls a {
        color: var(--primary-color, #3f51b5);
        font-size: 14px;
        line-height: 37px;
      }

      .simulation-toggle {
        border: 1px solid var(--primary-color, #3f51b5);
        border-radius: 9px;
        padding: 10px;
        background: none;
        font-weight: bold;
        color: var(--primary-color, #3f51b5);
        text-align: center;
      }

      .simulation-toggle:hover {
        background-color: var(--primary-color, #3f51b5);
        color: #fff;
      }

      h3[slot='invoker'] button {
        font-size: 16px;
        display: block;
        position: relative;
        padding: 10px;
        border: none;
        border-bottom: 1px solid #bbb;
        width: 100%;
        background: none;
        text-align: left;
        font-weight: bold;
      }

      h3[slot='invoker'] button::after {
        content: '>';
        right: 20px;
        top: 10px;
        position: absolute;
        transform: rotate(90deg);
      }

      h3[slot='invoker'][expanded='true'] button::after {
        transform: rotate(-90deg);
      }

      h3[slot='invoker'][expanded='true'] button {
        border-bottom: none;
      }

      [slot='content'] {
        border-bottom: 1px solid #bbb;
        padding: 10px;
      }

      h3[slot='invoker']:first-child button {
        border-top: 1px solid #bbb;
      }

      h4 {
        font-weight: normal;
        font-size: 14px;
        margin: 5px 0;
      }

      .segmented-control {
        border: 1px solid var(--primary-color, #3f51b5);
        border-radius: 18px;
        display: inline-block;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .segmented-control span {
        padding: 5px 10px;
        display: inline-block;
        border-radius: 18px;
        margin: 2px 0;
      }

      .segmented-control label:first-child span {
        margin-left: 2px;
      }

      .segmented-control label:last-child span {
        margin-right: 2px;
      }

      .segmented-control label.selected span {
        background: var(--primary-color, #3f51b5);
        color: #fff;
      }

      .segmented-control label:focus-within span {
        box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 40%), 0 0 0 4px rgb(31 117 203 / 48%);
      }

      .segmented-control input,
      .switch input {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      select {
        display: block;
        padding: 5px;
        border: 1px solid #333;
        border-radius: 3px;
      }
    `))}});
