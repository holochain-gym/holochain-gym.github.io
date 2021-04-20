import"./3ecf4d48.js";import{h as e}from"./7b4e2b6a.js";import{H as t,E as n,a as o,Z as s,C as i}from"./97466b3b.js";import"./962426a7.js";let l,r,a=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",o),customElements.define("zome-fns-results",s),customElements.define("call-zome-fns",i);const c={zomes:[{name:"helloworld",entry_defs:[{id:"greeting",visibility:"Public"}],zome_functions:{say_greeting:{call:({create_entry:e})=>({content:t})=>e({content:t,entry_def_id:"greeting"}),arguments:[{name:"content",type:"String"}]}}}]},m=()=>e(l||(l=a`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
      @ready=${0}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 250px; margin-bottom: 20px;"
        hide-zome-selector
        hide-agent-pub-key
      >
      </call-zome-fns>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${0}
          style="flex: 1; margin-right: 20px; height: 500px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 600px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,c,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),d={zomes:[{name:"library",entry_defs:[{id:"book",visibility:"Public"}],zome_functions:{add_book:{call:e=>async({content:t})=>(await e.create_entry({content:t,entry_def_id:"book"}),await e.hash_entry({content:t}),""),arguments:[{name:"content",type:"String"}]},get_book:{call:({get:e})=>({hash:t})=>e(t),arguments:[{name:"hash",type:"EntryHash"}]}}}]},y=()=>e(r||(r=a`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 500px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome2"
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
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${0}
          style="flex: 1; margin-right: 20px; height: 500px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 600px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,d,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),g=document,p=[{key:"Simple",story:m},{key:"Exercise",story:y}];let h=!1;for(const e of p){const t=g.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,h=!0,Object.assign(t,{}))}h&&(customElements.get("mdjs-preview")||import("./9c634124.js"),customElements.get("mdjs-story")||import("./de8039dc.js"));export{y as Exercise,m as Simple};
