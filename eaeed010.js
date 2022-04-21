import{p as e}from"./2af62055.js";import{d as t,E as n,a as o,C as l,S as s,Z as a,G as d,e as m,f as r,g as y,h as c}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-golden-layout",t),customElements.define("entry-graph",n),customElements.define("entry-contents",o),customElements.define("call-zome-fns",l),customElements.define("source-chain",s),customElements.define("zome-fns-results",a),customElements.define("golden-layout-root",d),customElements.define("golden-layout-row",m),customElements.define("golden-layout-column",r),customElements.define("golden-layout-stack",y),customElements.define("golden-layout-component",c);const u={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"helloworld",entry_defs:[{id:"demo_entry",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e})=>({content:t})=>e({content:t,entry_def_id:"demo_entry"}),arguments:[{name:"content",type:"String"}]},update_entry:{call:({update_entry:e})=>({original_header_address:t,new_content:n})=>e(t,{content:n,entry_def_id:"demo_entry"}),arguments:[{name:"original_header_address",type:"HeaderHash"},{name:"new_content",type:"String"}],get:{call:({get:e})=>({hash:t})=>e(t),arguments:[{name:"hash",type:"AnyDhtHash"}]}}}}]},deferred:!1}}},i=()=>e`
    <holochain-playground-golden-layout
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${u}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
    >
      <golden-layout-root style="width: 100%; height: 800px; margin-bottom: 40px;">
        <golden-layout-column>
          <golden-layout-row>
            <golden-layout-component title="Call Zome Fns">
              <call-zome-fns
                id="call-zome"
                style="margin: 12px;"
                hide-zome-selector
                hide-agent-pub-key
              >
              </call-zome-fns>
            </golden-layout-component>

            <golden-layout-stack>
              <golden-layout-component title="Entry Contents">
                <entry-contents style="margin: 12px;"> </entry-contents>
              </golden-layout-component>

              <golden-layout-component title="Zome Fns Results">
                <zome-fns-results style="margin: 12px;"> </zome-fns-results>
              </golden-layout-component>
            </golden-layout-stack>
          </golden-layout-row>

          <golden-layout-component title="Entry Graph">
            <entry-graph
              hide-filter
              show-headers
              .excludedEntryTypes=${["Agent"]}
              style="margin: 12px;"
            >
            </entry-graph>
          </golden-layout-component>
        </golden-layout-column>
      </golden-layout-root>
    </holochain-playground-golden-layout>
  `,g=document,p=[{key:"Simple",story:i}];let f=!1;for(const e of p){const t=g.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,f=!0,Object.assign(t,{}))}f&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{i as Simple};
