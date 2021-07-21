import"./099c0a8b.js";import{H as e,E as t,a as n,C as s,S as a,Z as o,T as r}from"./9fd83f86.js";import"./178f3cd5.js";import"./962426a7.js";let i,l=e=>e;customElements.define("holochain-playground-container",e),customElements.define("entry-graph",t),customElements.define("entry-contents",n),customElements.define("call-zome-fns",s),customElements.define("source-chain",a),customElements.define("zome-fns-results",o);const c={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[{id:"post",visibility:"Public"},{id:"anchor",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:e=>async({content:t})=>{await e.create_entry({content:t,entry_def_id:"post"}),await e.create_entry({content:"ALL_POSTS",entry_def_id:"anchor"});const n=await e.hash_entry({content:"ALL_POSTS"}),s=await e.hash_entry({content:t});return await e.create_link({base:n,target:s,tag:null}),s},arguments:[{name:"content",type:"String"}]},get_all_posts:{call:({get_links:e,hash_entry:t,get:n})=>async()=>{const s=(await e(await t({content:"ALL_POSTS"}))).map((e=>n(e.target)));return Promise.all(s)},arguments:[]}}}]},deferred:!1}}},m=()=>r(i||(i=l`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
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
        .excludedEntryTypes=${0}
        style="flex: 1; height: 500px; margin-bottom: 24px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `),1,c,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),d=document,y=[{key:"Exercise",story:m}];let u=!1;for(const e of y){const t=d.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,u=!0,Object.assign(t,{}))}u&&(customElements.get("mdjs-preview")||import("./a5c23f09.js"),customElements.get("mdjs-story")||import("./4af84d5a.js"));export{m as Exercise};
