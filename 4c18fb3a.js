import{p as e}from"./2af62055.js";import{H as t,E as n,a as s,C as o,S as l,D as i,Z as a}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",s),customElements.define("call-zome-fns",o),customElements.define("source-chain",l),customElements.define("dht-cells",i),customElements.define("zome-fns-results",a);const r={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"demo_entries",entry_defs:[{id:"demo_entry",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e})=>async({content:t})=>e({content:t,entry_def_id:"demo_entry"}),arguments:[{name:"content",type:"any"}]}}}]},deferred:!1}}},d=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${4}
      .simulatedHapp=${r}
    >
      <div
        style="display: flex; flex-direction: row; height: 400px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
        >
        </call-zome-fns>
        <dht-cells
          style="flex: 1"
          hide-filter
          hide-time-controller
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
        ></dht-cells>
      </div>
      <div
        style="display: flex; height: 450px; flex-direction: row; margin-bottom: 20px;"
      >
        <entry-graph
          style="flex: 1; margin-right: 20px;"
          .excludedEntryTypes=${["Agent"]}
        >
        </entry-graph>
        <source-chain style="flex: 1; height: 100%; margin-right: 20px;">
        </source-chain>
      </div>
    </holochain-playground-container>
  `,m={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"demo_entries",entry_defs:[{id:"demo_entry",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e})=>async({content:t})=>e({content:t,entry_def_id:"demo_entry"}),arguments:[{name:"content",type:"any"}]},get:{call:({get:e})=>({hash:t})=>e(t),arguments:[{name:"hash",type:"AnyDhtHash"}]},get_details:{call:({get_details:e})=>({hash:t})=>e(t),arguments:[{name:"hash",type:"AnyDhtHash"}]}}}]},deferred:!1}}},c=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${m}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
    >
      <div
        style="display: flex; flex-direction: row; height: 500px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <zome-fns-results
          hide-agent-pub-key
          style="flex: 1;"
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; height: 350px; margin-bottom: 20px;"
      >
        <entry-graph
          style="flex: 1; margin-right: 20px;"
          .excludedEntryTypes=${["Agent"]}
          hide-filter
          show-headers
        >
        </entry-graph>
        <entry-contents style="flex-basis: 500px;"> </entry-contents>
      </div>
    </holochain-playground-container>
  `,y=document,h=[{key:"Simple1",story:d},{key:"Simple2",story:c}];let p=!1;for(const e of h){const t=y.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,p=!0,Object.assign(t,{}))}p&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{d as Simple1,c as Simple2};
