import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as n,a as s,C as o}from"./393087b4.js";import"./962426a7.js";let r,i=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",s),customElements.define("call-zome-fns",o);const l={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"helloworld",entry_defs:[{id:"greeting",visibility:"Public"}],validation_functions:{},zome_functions:{say_greeting:{call:({create_entry:e})=>({greeting_text:t})=>e({content:content,entry_def_id:"greeting"}),arguments:[{name:"greeting_text",type:"String"}]}}}]},deferred:!1}}},a=()=>e(r||(r=i`
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
  `),1,l,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),d=document,m=[{key:"Simple",story:a}];let c=!1;for(const e of m){const t=d.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,c=!0,Object.assign(t,{}))}c&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{a as Simple};
