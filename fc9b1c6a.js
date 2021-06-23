import"./099c0a8b.js";import{h as e}from"./178f3cd5.js";import{H as t,E as s,a as o,Z as n,C as i,j as a,D as r}from"./d12199c0.js";import"./962426a7.js";let l,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",o),customElements.define("zome-fns-results",n),customElements.define("call-zome-fns",i),customElements.define("conductor-admin",a),customElements.define("dht-cells",r);const d={name:"simulated-app",description:"",slots:{lobby:{dna:{properties:{},zomes:[{name:"entries2",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{}}]},deferred:!1},privateChat:{dna:{properties:{},zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{validate_create_agent:e=>async({membrane_proof:e})=>({resolved:!0,valid:"supersecretcode"===e})},zome_functions:{}}]},deferred:!0}}},c=()=>e(l||(l=m`
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
  `),10,d,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]})),p=document,u=[{key:"Simple",story:c}];let f=!1;for(const e of u){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,f=!0,Object.assign(t,{}))}f&&(customElements.get("mdjs-preview")||import("./7010af11.js"),customElements.get("mdjs-story")||import("./be63f4b9.js"));export{c as Simple};
