import"./099c0a8b.js";import{H as e,E as t,a as n,C as a,Z as s,T as o}from"./9fd83f86.js";import"./178f3cd5.js";import"./962426a7.js";let i,r,l=e=>e;customElements.define("holochain-playground-container",e),customElements.define("entry-graph",t),customElements.define("entry-contents",n),customElements.define("call-zome-fns",a),customElements.define("zome-fns-results",s);const c={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:n})=>(await e({content:n,entry_def_id:"sample"}),t({content:n})),arguments:[{name:"content",type:"String"}]},create_link:{call:({create_link:e})=>({base:t,target:n,tag:a})=>e({base:t,target:n,tag:a}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},deferred:!1}}},m=()=>o(i||(i=l`
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
          hide-agent-pub-key
          hide-zome-selector
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 350px;">
        </entry-contents>
      </div>
      <entry-graph
        show-entry-contents
        .excludedEntryTypes=${0}
        style="flex: 1; height: 500px; margin-bottom: 60px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `),1,c,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),d={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[{id:"post",visibility:"Public"},{id:"path",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:e=>async({content:t,tag1:n,tag2:a})=>{await e.create_entry({content:t,entry_def_id:"post"});const s=await e.hash_entry({content:t}),o="all_posts";await e.path.ensure(o);const i=await e.hash_entry({content:o});return await e.create_link({base:i,target:s,tag:null}),s},arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},y=()=>o(r||(r=l`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; height: 400px; flex-direction: row; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <zome-fns-results style="flex: 1;"></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; margin-bottom: 20px; height: 500px;"
      >
        <entry-graph
          hide-filter
          show-entry-contents
          .excludedEntryTypes=${0}
          style="flex: 1; margin-right: 20px;"
        >
        </entry-graph>
        <entry-contents style="flex: 1; "> </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,d,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),p=document,g=[{key:"Simple",story:m},{key:"Exercise",story:y}];let u=!1;for(const e of g){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,u=!0,Object.assign(t,{}))}u&&(customElements.get("mdjs-preview")||import("./a5c23f09.js"),customElements.get("mdjs-story")||import("./4af84d5a.js"));export{y as Exercise,m as Simple};
