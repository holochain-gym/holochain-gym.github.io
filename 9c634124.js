import{L as e,c as t,h as i}from"./7b4e2b6a.js";let s,n,r=e=>e;const o=e=>{const t=e.firstElementChild;t&&t.removeAttribute("focused")},a=e=>{e.removeAttribute("expanded");const t=e.firstElementChild;t&&(t.removeAttribute("expanded"),t.setAttribute("aria-expanded","false"))},d=e=>{e.removeAttribute("expanded")};customElements.define("lion-accordion",class extends e{static get properties(){return{focusedIndex:{type:Number},expanded:{type:Array}}}static get styles(){return[t(s||(s=r`
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
      `))]}render(){return i(n||(n=r`
      <div class="accordion">
        <slot name="invoker"></slot>
        <slot name="content"></slot>
      </div>
    `))}constructor(){super(),this.styles={},this.__store=[],this.__focusedIndex=-1,this.__expanded=[]}firstUpdated(e){super.firstUpdated(e),this.__setupSlots()}__setupSlots(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("slot[name=invoker]"),i=()=>{this.__cleanStore(),this.__setupStore(),this.__updateFocused(),this.__updateExpanded()};t&&t.addEventListener("slotchange",i)}__setupStore(){const e=Array.from(this.querySelectorAll('[slot="invoker"]')),t=Array.from(this.querySelectorAll('[slot="content"]'));e.length!==t.length&&console.warn(`The amount of invokers (${e.length}) doesn't match the amount of contents (${t.length}).`),e.forEach(((e,i)=>{const s={uid:Math.random().toString(36).substr(2,10),index:i,invoker:e,content:t[i],clickHandler:this.__createInvokerClickHandler(i),keydownHandler:this.__handleInvokerKeydown.bind(this)};(({element:e,uid:t,index:i})=>{e.style.setProperty("order",`${i+1}`),e.setAttribute("id",`content-${t}`),e.setAttribute("aria-labelledby",`invoker-${t}`)})({element:s.content,...s}),(({element:e,uid:t,index:i,clickHandler:s,keydownHandler:n})=>{e.style.setProperty("order",`${i+1}`);const r=e.firstElementChild;r&&(r.setAttribute("id",`invoker-${t}`),r.setAttribute("aria-controls",`content-${t}`),r.addEventListener("click",s),r.addEventListener("keydown",n))})({element:s.invoker,...s}),o(s.invoker),d(s.content),a(s.invoker),this.__store.push(s)}))}__cleanStore(){this.__store&&(this.__store.forEach((e=>{((e,t,i)=>{const s=e.firstElementChild;s&&(s.removeAttribute("id"),s.removeAttribute("aria-controls"),s.removeEventListener("click",t),s.removeEventListener("keydown",i))})(e.invoker,e.clickHandler,e.keydownHandler)})),this.__store=[])}__createInvokerClickHandler(e){return()=>{this.focusedIndex=e,this.__toggleExpanded(e)}}__handleInvokerKeydown(e){const t=e;switch(t.key){case"ArrowDown":case"ArrowRight":t.preventDefault(),this.focusedIndex+2<=this._pairCount&&(this.focusedIndex+=1);break;case"ArrowUp":case"ArrowLeft":t.preventDefault(),this.focusedIndex>=1&&(this.focusedIndex-=1);break;case"Home":t.preventDefault(),this.focusedIndex=0;break;case"End":t.preventDefault(),this.focusedIndex=this._pairCount-1}}set focusedIndex(e){const t=this.__focusedIndex;this.__focusedIndex=e,this.__updateFocused(),this.dispatchEvent(new Event("focused-changed")),this.requestUpdate("focusedIndex",t)}get focusedIndex(){return this.__focusedIndex}get _pairCount(){return this.__store.length}set expanded(e){const t=this.__expanded;this.__expanded=e,this.__updateExpanded(),this.dispatchEvent(new Event("expanded-changed")),this.requestUpdate("expanded",t)}get expanded(){return this.__expanded}__updateFocused(){if(!this.__store||!this.__store[this.focusedIndex])return;const e=Array.from(this.children).find((e=>{var t;return"invoker"===e.slot&&(null===(t=e.firstElementChild)||void 0===t?void 0:t.hasAttribute("focused"))}));e&&o(e);const{invoker:t}=this.__store[this.focusedIndex];t&&(e=>{const t=e.firstElementChild;t&&(t.focus(),t.setAttribute("focused","true"))})(t)}__updateExpanded(){this.__store&&this.__store.forEach(((e,t)=>{-1!==this.expanded.indexOf(t)?((e=>{e.setAttribute("expanded","true");const t=e.firstElementChild;t&&(t.setAttribute("expanded","true"),t.setAttribute("aria-expanded","true"))})(e.invoker),e.content.setAttribute("expanded","true")):(a(e.invoker),d(e.content))}))}__toggleExpanded(e){const{expanded:t}=this,i=t.indexOf(e);-1===i?t.push(e):t.splice(i,1),this.expanded=t}});const l={platform:"web",size:"webSmall",theme:"light",language:"en",autoHeight:!0,deviceMode:!1,rememberSettings:!1,edgeDistance:!0};let c=[];function h(e){c=c.filter((t=>t!==e))}let p=!1;function u(e){if(p)for(const t of Object.keys(l)){const i=t;switch(i){case"autoHeight":case"deviceMode":case"rememberSettings":case"edgeDistance":e[i]=l[i];break;default:e[i]=l[i]}}else g(e)}function g(e){let t=!1;for(const i of Object.keys(l)){const s=i;if(l[s]!==e[s]){switch(s){case"autoHeight":case"deviceMode":case"rememberSettings":case"edgeDistance":l[s]=e[s];break;default:l[s]=e[s]}t=!0,p=!0}}return t}function m(e,t){if(g(e)){!function(){for(const e of Object.keys(l)){const t=e;l.rememberSettings?localStorage.setItem(`mdjsViewerSharedStates-${t}`,l[t].toString()):localStorage.removeItem(`mdjsViewerSharedStates-${t}`)}}();for(const e of c)e!==t&&e()}}!function(){for(const e of Object.keys(l)){const t=e,i=localStorage.getItem(`mdjsViewerSharedStates-${t}`);if(null!==i){switch(t){case"autoHeight":case"deviceMode":case"rememberSettings":case"edgeDistance":l[t]="true"===i;break;default:l[t]=i}p=!0}}}();let b,f,y,v,k,x,w,S,_,$,A,E,z,H,D,I,U,C,j,L,P,M,O,R=e=>e;customElements.define("mdjs-preview",class extends e{static get properties(){return{story:{attribute:!1},key:{type:String},deviceMode:{type:Boolean,attribute:"device-mode",reflect:!0},sameSettings:{type:Boolean},contentHeight:{type:Number},simulatorUrl:{type:String},platform:{type:String},platforms:{type:Array},size:{type:String},sizes:{type:Array},theme:{type:String,reflect:!0},themes:{type:Array},language:{type:String},languages:{type:Array},edgeDistance:{type:Boolean},autoHeight:{type:Boolean},rememberSettings:{type:Boolean}}}constructor(){var e,t,s;super(),s=()=>{this.__syncUp=!1,u(this),this.__syncUp=!0},(t="onSubscribe")in(e=this)?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,this.story=()=>i(b||(b=R` <p>Loading...</p> `)),this.key="",this.contentHeight=0,this.simulatorUrl="",this.theme="light",this.themes=[{key:"light",name:"Light"},{key:"dark",name:"Dark"}],this.language="en-US",this.languages=[{key:"en",name:"English"},{key:"en-US",name:"English (United States)"},{key:"en-GB",name:"English (United Kingdom)"},{key:"de",name:"German"},{key:"es",name:"Spanish"},{key:"fi",name:"Finnish"},{key:"fr",name:"French"},{key:"it",name:"Italian"},{key:"nl",name:"Dutch"},{key:"pl",name:"Polish"},{key:"pt",name:"Portuguese"},{key:"ro",name:"Romanian"},{key:"sv",name:"Swedish"},{key:"sv",name:"Swedish"}],this.platform="web",this.platforms=[{key:"web",name:"Web"},{key:"android",name:"Android"},{key:"ios",name:"iOS"}],this.size="webSmall",this.sizes=[{key:"webSmall",name:"Small",platform:"web",width:360,height:640,dpr:1},{key:"webMedium",name:"Medium",platform:"web",width:640,height:640,dpr:1},{key:"webLarge",name:"Large",platform:"web",width:1024,height:640,dpr:1},{key:"pixel2",name:"Pixel 2",platform:"android",width:411,height:731,dpr:2.6},{key:"galaxyS5",name:"Galaxy S5",platform:"android",width:360,height:640,dpr:3},{key:"iphoneX",name:"iPhone X",platform:"ios",width:375,height:812,dpr:3},{key:"iPad",name:"iPad",platform:"ios",width:768,height:1024,dpr:2}],this.deviceMode=!1,this.autoHeight=!0,this.edgeDistance=!0,this.sameSettings=!0,this.rememberSettings=!1,this.__firstRun=!0,this.__syncUp=!1}connectedCallback(){super.connectedCallback(),this.sameSettings&&u(this),window.addEventListener("message",(e=>{const t=JSON.parse(e.data);if("mdjs-viewer-resize"===t.action){const e=document.body.querySelector(`[mdjs-story-name="${t.storyKey}"]`);e&&(e.contentHeight=t.height)}}))}get baseUrl(){return document.location.origin}get deviceHeight(){var e;return this.autoHeight?this.contentHeight+10:(null===(e=this.sizeData)||void 0===e?void 0:e.height)||50}getSizesFor(e){return this.sizes.filter((t=>t.platform===e))}get sizeData(){return this.sizes.find((e=>e.key===this.size))||{width:50,height:50,name:"default"}}update(e){var t;super.update(e),this.sameSettings&&this.__syncUp&&m(this,this.onSubscribe),e.has("sameSettings")&&(this.sameSettings?(t=this.onSubscribe,c.push(t)):h(this.onSubscribe))}disconnectedCallback(){super.disconnectedCallback(),this.sameSettings&&h(this.onSubscribe)}firstUpdated(){this.__syncUp=!0}get iframeUrl(){const e=document.querySelector("script[type=module][mdjs-setup]");if(!e)throw new Error('Could not find a <script type="module" src="..." mdjs-setup><\/script>');const t=new URLSearchParams;t.set("story-file",e.src),t.set("story-key",this.key),t.set("theme",this.theme),t.set("platform",this.platform),t.set("language",this.language),t.set("edge-distance",this.edgeDistance.toString());const i=[...document.querySelectorAll("link[mdjs-use]")];for(const e of i)e.href&&t.append("stylesheets",e.href);return`${this.simulatorUrl}#?${t.toString()}`}changePlatform(e){this.platform=e;const t=this.getSizesFor(this.platform);this.size=t[0].key}renderPlatforms(){return i(f||(f=R`
      <div>
        <h3>Platform</h3>
        <h4>Platform</h4>
        <div
          class="segmented-control"
          @change=${0}
        >
          ${0}
        </div>
      </div>
    `),(e=>{e.target&&this.changePlatform(e.target.value)}),this.platforms.map((e=>i(y||(y=R`
              <label class="${0}">
                <span>${0}</span>
                <input
                  type="radio"
                  name="platform"
                  value="${0}"
                  ?checked=${0}
                />
              </label>
            `),this.platform===e.key?"selected":"",e.name,e.key,this.platform===e.key))))}renderSizes(){return i(v||(v=R`
      <div>
        <h3>Viewport</h3>
        <h4>Size</h4>
        <div
          class="segmented-control"
          @change=${0}
        >
          ${0}
        </div>
        ${0}
      </div>
    `),(e=>{e.target&&(this.size=e.target.value)}),this.getSizesFor(this.platform).map((e=>i(k||(k=R`
              <label class="${0}">
                <span>${0}</span>
                <input
                  type="radio"
                  name="size"
                  value="${0}"
                  .checked=${0}
                />
              </label>
            `),this.size===e.key?"selected":"",e.name,e.key,this.size===e.key))),this.renderAutoHeight())}renderThemes(){return i(x||(x=R`
      <div>
        <h3>Visual</h3>
        <h4>Theme</h4>
        <div
          class="segmented-control"
          @change=${0}
        >
          ${0}
        </div>
        ${0}
      </div>
    `),(e=>{e.target&&(this.theme=e.target.value)}),this.themes.map((e=>i(w||(w=R`
              <label class="${0}">
                <span>${0}</span>
                <input
                  type="radio"
                  name="theme"
                  value="${0}"
                  ?checked=${0}
                />
              </label>
            `),this.theme===e.key?"selected":"",e.name,e.key,this.theme===e.key))),this.renderEdgeDistance())}renderLanguages(){return i(S||(S=R`
      <div>
        <h3>Localization</h3>
        <label>
          Language
          <select
            @change=${0}
          >
            ${0}
          </select>
        </label>
      </div>
    `),(e=>{e.target&&(this.language=e.target.value)}),this.languages.map((e=>i(_||(_=R`
                <option value="${0}" ?selected=${0}>
                  ${0}
                </option>
              `),e.key,this.language===e.key,e.name))))}renderEdgeDistance(){return i($||($=R`
      <div>
        <label class="${0}">
          Apply distance to edge
          <span class="switch-button"></span>

          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.edgeDistance?"switch selected":"switch",this.edgeDistance,(e=>{e.target&&(this.edgeDistance=e.target.checked)}))}renderAutoHeight(){return i(A||(A=R`
      <div>
        <label class="${0}">
          Fit height to content
          <span class="switch-button"></span>
          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.autoHeight?"switch selected":"switch",this.autoHeight,(e=>{e.target&&(this.autoHeight=e.target.checked)}))}renderSameSettings(){return i(E||(E=R`
      <div>
        <label class="${0}">
          Same settings for all simulations
          <span class="switch-button"></span>
          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.sameSettings?"switch selected":"switch",this.sameSettings,(e=>{e.target&&(this.sameSettings=e.target.checked)}))}renderRememberSettings(){return this.sameSettings?i(H||(H=R`
      <div>
        <label class="${0}">
          Remember settings
          <span class="switch-button"></span>
          <input
            type="checkbox"
            ?checked=${0}
            @change=${0}
          />
        </label>
      </div>
    `),this.rememberSettings?"switch selected":"switch",this.rememberSettings,(e=>{e.target&&(this.rememberSettings=e.target.checked)})):i(z||(z=R``))}renderSyncSettings(){return i(D||(D=R`
      <div>
        <h3>Global</h3>
        ${0} ${0}
      </div>
    `),this.renderSameSettings(),this.renderRememberSettings())}render(){return i(I||(I=R`
      <div id="wrapper">
        ${0}
      </div>
      <lion-accordion class="options">
        ${0}
        <h3 slot="invoker">
          <button>Code</button>
        </h3>
        <div slot="content">
          <slot></slot>
        </div>
      </lion-accordion>
      ${0}
    `),!1===this.deviceMode?i(U||(U=R`<div>${0}</div>`),this.story({shadowRoot:this.shadowRoot})):i(C||(C=R`
              <iframe
                csp=${0}
                .src=${0}
                style=${0}
              ></iframe>
              <p class="frame-description" style=${0}>
                ${0} - ${0}x${0}
              </p>
            `),`script-src ${document.location.origin} 'unsafe-inline'; connect-src ws://${document.location.host}/`,this.iframeUrl,`width: ${this.sizeData.width}px; height: ${this.deviceHeight}px;`,`width: ${this.sizeData.width+4}px;`,this.sizeData.name,this.deviceHeight,this.sizeData.width),this.deviceMode?i(j||(j=R`
              <h3 slot="invoker">
                <button>Settings</button>
              </h3>
              <div slot="content">
                <div class="settings-wrapper">
                  ${0} ${0} ${0}
                  ${0} ${0}
                </div>
              </div>
            `),this.renderPlatforms(),this.renderSizes(),this.renderThemes(),this.renderLanguages(),this.renderSyncSettings()):"",this.simulatorUrl?i(L||(L=R`
            <div class="controls">
              <a href=${0} target="_blank">Open simulation in new window</a>
              <button
                @click=${0}
                class="simulation-toggle"
              >
                ${0} device simulation
              </button>
            </div>
          `),this.iframeUrl,(()=>this.deviceMode=!this.deviceMode),this.deviceMode?i(P||(P=R`Disable`)):i(M||(M=R`Enable`))):"")}static get styles(){return t(O||(O=R`
      :host {
        display: block;
        padding-bottom: 10px;
      }

      iframe {
        border: 2px solid #4caf50;
        background: #fff;
      }

      .switch {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .switch:focus-within .switch-button {
        box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 40%), 0 0 0 4px rgb(31 117 203 / 48%);
      }

      .switch-button {
        display: inline-block;
        width: 44px;
        background: grey;
        height: 25px;
        border-radius: 15px;
        position: relative;
      }

      .switch-button::after {
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

      .switch.selected .switch-button {
        background: green;
      }

      .switch.selected .switch-button::after {
        left: auto;
        right: 4px;
      }

      .frame-description {
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
        color: #3f51b5;
        font-size: 14px;
        line-height: 37px;
      }

      .simulation-toggle {
        border: 1px solid #3f51b5;
        border-radius: 9px;
        padding: 10px;
        background: none;
        font-weight: bold;
        color: #3f51b5;
        text-align: center;
      }

      .simulation-toggle:hover {
        background-color: #3f51b5;
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
        border: 1px solid #3f51b5;
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
        background: #3f51b5;
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
