import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as s,a as o,Z as n,C as i,h as a,D as r}from"./393087b4.js";import"./962426a7.js";let l,d=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",o),customElements.define("zome-fns-results",n),customElements.define("call-zome-fns",i),customElements.define("conductor-admin",a),customElements.define("dht-cells",r);const m={name:"simulated-app",description:"",slots:{lobby:{dna:{properties:{},zomes:[{name:"entries2",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{}}]},deferred:!1},privateChat:{dna:{properties:{},zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{validate_create_agent:e=>async({membrane_proof:e})=>({resolved:!0,valid:"supersecretcode"===e})},zome_functions:{}}]},deferred:!0}}},c=()=>e(l||(l=d`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; height: 600px; flex-direction: row; margin-bottom: 20px;"
      >
        <conductor-admin style="flex-basis: 600px; margin-right: 20px;">
        </conductor-admin>
        <dht-cells style="flex: 1;"> </dht-cells>
      </div>
    </holochain-playground-container>
  `),10,m,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]})),p=document,u=[{key:"Simple",story:c}];let f=!1;for(const e of u){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,f=!0,Object.assign(t,{}))}f&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{c as Simple};