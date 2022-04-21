import{p as e}from"./2af62055.js";import{H as t,E as s,a as o,C as n,S as l,D as a,W as i,N as r}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",o),customElements.define("call-zome-fns",n),customElements.define("source-chain",l),customElements.define("dht-cells",a);const c={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:s})=>(await e({content:s,entry_def_id:"sample"}),t({content:s})),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},m=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${20}
      .simulatedHapp=${c}
      @ready=${e=>{e.detail.conductors[0].getAllCells()[0].cellId;const t=e.target.querySelector("#dht-cells");setTimeout((()=>{t.workflowsToDisplay=[i.CALL_ZOME,i.APP_VALIDATION],t.networkRequestsToDisplay=[r.PUBLISH_REQUEST,r.GET_REQUEST]}),4e3)}}
    >
      <div style="display: flex; flex-direction: row; height: 700px;">
        <dht-cells
          id="dht-cells"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
          style="flex:1; margin-right: 20px;"
        ></dht-cells>
        <call-zome-fns id="call-zome" style="flex-basis: 500px; flex-grow: 0;">
        </call-zome-fns>
      </div>
    </holochain-playground-container>
  `,d=document,y=[{key:"Simple",story:m}];let u=!1;for(const e of y){const t=d.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,u=!0,Object.assign(t,{}))}u&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{m as Simple};
