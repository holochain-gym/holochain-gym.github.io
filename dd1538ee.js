import"./099c0a8b.js";import{H as e,E as t,a as n,C as s,T as o}from"./9fd83f86.js";import"./178f3cd5.js";import"./962426a7.js";let i,r=e=>e;customElements.define("holochain-playground-container",e),customElements.define("entry-graph",t),customElements.define("entry-contents",n),customElements.define("call-zome-fns",s);const l={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"helloworld",entry_defs:[{id:"greeting",visibility:"Public"}],validation_functions:{},zome_functions:{say_greeting:{call:({create_entry:e})=>({greeting_text:t})=>e({content:t,entry_def_id:"greeting"}),arguments:[{name:"greeting_text",type:"String"}]}}}]},deferred:!1}}},a=()=>o(i||(i=r`
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
        .excludedEntryTypes=${0}
        style="flex: 1; height: 500px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `),1,l,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),c=document,m=[{key:"Simple",story:a}];let d=!1;for(const e of m){const t=c.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,d=!0,Object.assign(t,{}))}d&&(customElements.get("mdjs-preview")||import("./a5c23f09.js"),customElements.get("mdjs-story")||import("./4af84d5a.js"));export{a as Simple};
