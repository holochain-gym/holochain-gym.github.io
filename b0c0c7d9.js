import{p as e}from"./2af62055.js";import{H as t,E as n,a,C as s,Z as o}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",a),customElements.define("call-zome-fns",s),customElements.define("zome-fns-results",o);const i={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:n})=>(await e({content:n,entry_def_id:"sample"}),t({content:n})),arguments:[{name:"content",type:"String"}]},create_link:{call:({create_link:e})=>({base:t,target:n,tag:a})=>e({base:t,target:n,tag:a}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},deferred:!1}}},r=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${i}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
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
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px; margin-bottom: 60px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `,l={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[{id:"post",visibility:"Public"},{id:"path",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:e=>async({content:t,tag1:n,tag2:a})=>{await e.create_entry({content:t,entry_def_id:"post"});const s=await e.hash_entry({content:t}),o="all_posts";await e.path.ensure(o);const i=await e.hash_entry({content:o});return await e.create_link({base:i,target:s,tag:null}),s},arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},c=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${l}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
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
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; margin-right: 20px;"
        >
        </entry-graph>
        <entry-contents style="flex: 1; "> </entry-contents>
      </div>
    </holochain-playground-container>
  `,m=document,d=[{key:"Simple",story:r},{key:"Exercise",story:c}];let y=!1;for(const e of d){const t=m.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,y=!0,Object.assign(t,{}))}y&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{c as Exercise,r as Simple};
