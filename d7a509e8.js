import{p as e}from"./2af62055.js";import{H as t,E as n,a as s,C as a,S as o,Z as r}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",s),customElements.define("call-zome-fns",a),customElements.define("source-chain",o),customElements.define("zome-fns-results",r);const i={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[{id:"post",visibility:"Public"},{id:"anchor",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:e=>async({content:t})=>{await e.create_entry({content:t,entry_def_id:"post"}),await e.create_entry({content:"ALL_POSTS",entry_def_id:"anchor"});const n=await e.hash_entry({content:"ALL_POSTS"}),s=await e.hash_entry({content:t});return await e.create_link({base:n,target:s,tag:null}),s},arguments:[{name:"content",type:"String"}]},get_all_posts:{call:({get_links:e,hash_entry:t,get:n})=>async()=>{const s=(await e(await t({content:"ALL_POSTS"}))).map((e=>n(e.target)));return Promise.all(s)},arguments:[]}}}]},deferred:!1}}},l=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${i}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
    >
      <div
        style="display: flex; flex-direction: row; height: 350px;margin-bottom: 20px;"
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
      <entry-graph
        hide-filter
        show-entry-contents
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px; margin-bottom: 24px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `,c=document,m=[{key:"Exercise",story:l}];let d=!1;for(const e of m){const t=c.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,d=!0,Object.assign(t,{}))}d&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{l as Exercise};
