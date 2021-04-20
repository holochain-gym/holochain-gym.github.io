import"./3ecf4d48.js";import{h as e}from"./7b4e2b6a.js";import{H as t,E as n,a,C as s,S as l,Z as i}from"./97466b3b.js";import"./962426a7.js";let o,r,c=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",a),customElements.define("call-zome-fns",s),customElements.define("source-chain",l),customElements.define("zome-fns-results",i);const m={zomes:[{name:"links",entry_defs:[{id:"sample",visibility:"Public"}],zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:n})=>(await e({content:n,entry_def_id:"sample"}),t({content:n})),arguments:[{name:"content",type:"String"}]},create_link:{call:({create_link:e})=>({base:t,target:n,tag:a})=>e({base:t,target:n,tag:a}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},y=()=>e(o||(o=c`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
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
  `),1,m,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),d={zomes:[{name:"links",entry_defs:[{id:"post",visibility:"Public"},{id:"path",visibility:"Public"}],zome_functions:{create_post:{call:({create_entry:e,hash_entry:t,create_link:n,agent_info:a})=>async({content:s})=>{await e({content:s,entry_def_id:"post"});const l=await t({content:s}),{agent_latest_pubkey:i}=await a();return await n({base:i,target:l,tag:"author"}),l},arguments:[{name:"content",type:"String"}]},get_links:{call:({get_links:e})=>({base:t})=>e(t),arguments:[{name:"base",type:"EntryHash"}]}}}]},g=()=>e(r||(r=c`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
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
  `),1,d,(e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"links",fnName:"create_post",payload:{content:"Good morning!"},cap:null})})),p=document,h=[{key:"Simple",story:y},{key:"Simple2",story:g}];let u=!1;for(const e of h){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,u=!0,Object.assign(t,{}))}u&&(customElements.get("mdjs-preview")||import("./9c634124.js"),customElements.get("mdjs-story")||import("./de8039dc.js"));export{y as Simple,g as Simple2};
