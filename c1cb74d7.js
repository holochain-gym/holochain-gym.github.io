import"./099c0a8b.js";import{H as e,E as t,a as s,Z as o,C as n,j as i,D as a,T as r}from"./9fd83f86.js";import"./178f3cd5.js";import"./962426a7.js";let l,d=e=>e;customElements.define("holochain-playground-container",e),customElements.define("entry-graph",t),customElements.define("entry-contents",s),customElements.define("zome-fns-results",o),customElements.define("call-zome-fns",n),customElements.define("conductor-admin",i),customElements.define("dht-cells",a);const m={name:"simulated-app",description:"",slots:{lobby:{dna:{properties:{},zomes:[{name:"entries2",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{}}]},deferred:!1},privateChat:{dna:{properties:{},zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{validate_create_agent:e=>async({membrane_proof:e})=>({resolved:!0,valid:"supersecretcode"===e})},zome_functions:{}}]},deferred:!0}}},c=()=>r(l||(l=d`
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
  `),10,m,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]})),p=document,u=[{key:"Simple",story:c}];let f=!1;for(const e of u){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,f=!0,Object.assign(t,{}))}f&&(customElements.get("mdjs-preview")||import("./a5c23f09.js"),customElements.get("mdjs-story")||import("./4af84d5a.js"));export{c as Simple};
