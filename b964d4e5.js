import{p as e}from"./2af62055.js";import{H as t,E as s,a as o,Z as n,C as i,c as a,D as r}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",o),customElements.define("zome-fns-results",n),customElements.define("call-zome-fns",i),customElements.define("conductor-admin",a),customElements.define("dht-cells",r);const l={name:"simulated-app",description:"",slots:{lobby:{dna:{properties:{},zomes:[{name:"entries2",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{}}]},deferred:!1},privateChat:{dna:{properties:{},zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{validate_create_agent:e=>async({membrane_proof:e})=>({resolved:!0,valid:"supersecretcode"===e})},zome_functions:{}}]},deferred:!0}}},d=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      .simulatedHapp=${l}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}}
    >
      <div
        style="display: flex; height: 600px; flex-direction: row; margin-bottom: 20px;"
      >
        <conductor-admin style="flex-basis: 600px; margin-right: 20px;">
        </conductor-admin>
        <dht-cells style="flex: 1;"> </dht-cells>
      </div>
    </holochain-playground-container>
  `,m=document,c=[{key:"Simple",story:d}];let u=!1;for(const e of c){const t=m.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,u=!0,Object.assign(t,{}))}u&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{d as Simple};
