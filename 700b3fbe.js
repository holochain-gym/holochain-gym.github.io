import{p as e}from"./2af62055.js";import{H as t,E as n,a as s,C as o}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",s),customElements.define("call-zome-fns",o);const r={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"helloworld",entry_defs:[{id:"greeting",visibility:"Public"}],validation_functions:{},zome_functions:{say_greeting:{call:({create_entry:e})=>({greeting_text:t})=>e({content:t,entry_def_id:"greeting"}),arguments:[{name:"greeting_text",type:"String"}]}}}]},deferred:!1}}},i=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${r}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="height: 250px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 250px;">
        </entry-contents>
      </div>
      <entry-graph
        show-entry-contents
        hide-filter
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `,a=document,l=[{key:"Simple",story:i}];let m=!1;for(const e of l){const t=a.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,m=!0,Object.assign(t,{}))}m&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{i as Simple};
