import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as n,a,C as s}from"./393087b4.js";import"./962426a7.js";let o,i,r=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",a),customElements.define("call-zome-fns",s);const l={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[{id:"path",visibility:"Public"}],validation_functions:{},zome_functions:{create_path:{call:e=>({path:t})=>e.path.ensure(t),arguments:[{name:"path",type:"String"}]}}}]},deferred:!1}}},c=()=>e(o||(o=r`
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
        hide-filter
        show-entry-contents
        .excludedEntryTypes=${0}
        style="flex: 1; height: 500px; margin-bottom: 24px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `),1,l,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),d={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[{id:"post",visibility:"Public"},{id:"path",visibility:"Public"}],validation_functions:{},zome_functions:{create_post:{call:e=>async({content:t,tag1:n,tag2:a})=>{await e.create_entry({content:t,entry_def_id:"post"});const s=await e.hash_entry({content:t}),o=new Date,i=`all_posts.${o.getUTCFullYear()}-${o.getMonth()+1}-${o.getUTCDate()}.${o.getHours()}`;await e.path.ensure(i);const r=await e.hash_entry({content:i});await e.create_link({base:r,target:s,tag:null});for(const t of[n,a])if(t){const n=`all_tags.${t}`;await e.path.ensure(n);const a=await e.hash_entry({content:n});await e.create_link({base:a,target:s,tag:null})}return s},arguments:[{name:"content",type:"String"},{name:"tag1",type:"String"},{name:"tag2",type:"String"}]}}}]},deferred:!1}}},m=()=>e(i||(i=r`
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
          style="height: 400px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 400px;">
        </entry-contents>
      </div>
      <entry-graph
        hide-filter
        show-entry-contents
        .excludedEntryTypes=${0}
        style="flex: 1; height: 500px; margin-bottom: 24px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `),1,d,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),p=document,y=[{key:"Simple",story:c},{key:"Exercise",story:m}];let g=!1;for(const e of y){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,g=!0,Object.assign(t,{}))}g&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{m as Exercise,c as Simple};
