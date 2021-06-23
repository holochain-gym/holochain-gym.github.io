import"./099c0a8b.js";import{h as e}from"./178f3cd5.js";import{H as t,E as n,a,C as s,S as i,Z as l}from"./d12199c0.js";import"./962426a7.js";let o,r,c=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",a),customElements.define("call-zome-fns",s),customElements.define("source-chain",i),customElements.define("zome-fns-results",l);const m={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"links",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:n})=>(await e({content:n,entry_def_id:"sample"}),t({content:n})),arguments:[{name:"content",type:"String"}]},create_link:{call:({create_link:e})=>({base:t,target:n,tag:a})=>e({base:t,target:n,tag:a}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},deferred:!1}}},d=()=>e(o||(o=c`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
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
          .excludedEntryTypes=${0}
          style="flex: 1; height: 500px;"
        >
        </entry-graph>
      </div>
    </holochain-playground-container>
  `),1,m,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),y={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"links",entry_defs:[{id:"post",visibility:"Public"},{id:"path",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:({create_entry:e,hash_entry:t,create_link:n,agent_info:a})=>async({content:s})=>{await e({content:s,entry_def_id:"post"});const i=await t({content:s}),{agent_latest_pubkey:l}=await a();return await n({base:l,target:i,tag:"author"}),i},arguments:[{name:"content",type:"String"}]},get_links:{call:({get_links:e})=>({base:t})=>e(t),arguments:[{name:"base",type:"EntryHash"}]}}}]},deferred:!1}}},p=()=>e(r||(r=c`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
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
  `),1,y,(e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"links",fnName:"create_post",payload:{content:"Good morning!"},cap:null})})),g=document,u=[{key:"Simple",story:d},{key:"Simple2",story:p}];let f=!1;for(const e of u){const t=g.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,f=!0,Object.assign(t,{}))}f&&(customElements.get("mdjs-preview")||import("./7010af11.js"),customElements.get("mdjs-story")||import("./be63f4b9.js"));export{d as Simple,p as Simple2};
