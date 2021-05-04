import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as s,a,C as n,S as o,D as l}from"./393087b4.js";import{W as i,N as r,G as c}from"./677de7e9.js";import"./962426a7.js";let m,d=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",a),customElements.define("call-zome-fns",n),customElements.define("source-chain",o),customElements.define("dht-cells",l);const y={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:s})=>(await e({content:s,entry_def_id:"sample"}),t({content:s})),arguments:[{name:"content",type:"String"}]},get:{call:({get:e})=>({hash:t})=>e(t,{strategy:c.Latest}),arguments:[{name:"hash",type:"Hash"}]}}},{name:"links",entry_defs:[{id:"sample",visibility:"Public"}],validation_functions:{},zome_functions:{create_link:{call:({create_link:e})=>({base:t,target:s,tag:a})=>e({base:t,target:s,tag:a}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},deferred:!1}}},p=()=>e(m||(m=d`
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
  `),20,y,(e=>{e.detail.conductors[0].getAllCells()[0].cellId;const t=e.target.querySelector("#dht-cells");setTimeout((()=>{t.workflowsToDisplay=[i.CALL_ZOME,i.APP_VALIDATION],t.networkRequestsToDisplay=[r.PUBLISH_REQUEST,r.GET_REQUEST]}),4e3)}),[],[]),f=document,u=[{key:"Simple",story:p}];let g=!1;for(const e of u){const t=f.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,g=!0,Object.assign(t,{}))}g&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{p as Simple};
