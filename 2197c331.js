import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as s,a as o,C as n,S as l,D as a}from"./393087b4.js";import{W as i,N as r}from"./78a9ee0d.js";import"./962426a7.js";let c,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",o),customElements.define("call-zome-fns",n),customElements.define("source-chain",l),customElements.define("dht-cells",a);const d={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:s})=>(await e({content:s,entry_def_id:"sample"}),t({content:s})),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},y=()=>e(c||(c=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div style="display: flex; flex-direction: row; height: 700px;">
        <dht-cells
          id="dht-cells"
          .workflowsToDisplay=${0}
          .networkRequestsToDisplay=${0}
          style="flex:1; margin-right: 20px;"
        ></dht-cells>
        <call-zome-fns id="call-zome" style="flex-basis: 500px; flex-grow: 0;">
        </call-zome-fns>
      </div>
    </holochain-playground-container>
  `),20,d,(e=>{e.detail.conductors[0].getAllCells()[0].cellId;const t=e.target.querySelector("#dht-cells");setTimeout((()=>{t.workflowsToDisplay=[i.CALL_ZOME,i.APP_VALIDATION],t.networkRequestsToDisplay=[r.PUBLISH_REQUEST,r.GET_REQUEST]}),4e3)}),[],[]),f=document,p=[{key:"Simple",story:y}];let u=!1;for(const e of p){const t=f.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,u=!0,Object.assign(t,{}))}u&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{y as Simple};
