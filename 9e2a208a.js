import{p as e}from"./2af62055.js";import{H as t,E as n,a,C as s,S as i,Z as l}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",a),customElements.define("call-zome-fns",s),customElements.define("source-chain",i),customElements.define("zome-fns-results",l);const o={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"links",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:n})=>(await e({content:n,entry_def_id:"sample"}),t({content:n})),arguments:[{name:"content",type:"String"}]},create_link:{call:({create_link:e})=>({base:t,target:n,tag:a})=>e({base:t,target:n,tag:a}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},deferred:!1}}},r=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${o}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="height: 350px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 350px;">
        </entry-contents>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; height: 500px;"
        >
        </entry-graph>
      </div>
    </holochain-playground-container>
  `,c={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"links",entry_defs:[{id:"post",visibility:"Public"},{id:"path",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:({create_entry:e,hash_entry:t,create_link:n,agent_info:a})=>async({content:s})=>{await e({content:s,entry_def_id:"post"});const i=await t({content:s}),{agent_latest_pubkey:l}=await a();return await n({base:l,target:i,tag:"author"}),i},arguments:[{name:"content",type:"String"}]},get_links:{call:({get_links:e})=>({base:t})=>e(t),arguments:[{name:"base",type:"EntryHash"}]}}}]},deferred:!1}}},m=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${c}
      @ready=${e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"links",fnName:"create_post",payload:{content:"Good morning!"},cap:null})}}
    >
      <div
        style="display: flex; flex-direction: row; height: 350px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
          selectedZomeFnName="get_links"
        >
        </call-zome-fns>
        <zome-fns-results
          hide-agent-pub-key
          style="flex: 1;"
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          style="flex: 1; height: 500px; margin-right: 20px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 500px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `,d=document,y=[{key:"Simple",story:r},{key:"Simple2",story:m}];let p=!1;for(const e of y){const t=d.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,p=!0,Object.assign(t,{}))}p&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{r as Simple,m as Simple2};
