import"./3ecf4d48.js";import{h as e}from"./7b4e2b6a.js";import{H as t,E as s,a as n,C as a,S as l,D as o}from"./97466b3b.js";import{W as i,N as r,G as c}from"./49bd6e75.js";import"./962426a7.js";let m,y=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",n),customElements.define("call-zome-fns",a),customElements.define("source-chain",l),customElements.define("dht-cells",o);const d={zomes:[{name:"entries",entry_defs:[{id:"sample",visibility:"Public"}],zome_functions:{create_entry:{call:({create_entry:e,hash_entry:t})=>async({content:s})=>(await e({content:s,entry_def_id:"sample"}),t({content:s})),arguments:[{name:"content",type:"String"}]},get:{call:({get:e})=>({hash:t})=>e(t,{strategy:c.Latest}),arguments:[{name:"hash",type:"Hash"}]}}},{name:"links",entry_defs:[{id:"sample",visibility:"Public"}],zome_functions:{create_link:{call:({create_link:e})=>({base:t,target:s,tag:n})=>e({base:t,target:s,tag:n}),arguments:[{name:"base",type:"EntryHash"},{name:"target",type:"EntryHash"},{name:"tag",type:"any"}]}}}]},p=()=>e(m||(m=y`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
      @ready=${0}
    >
      <div style="display: flex; flex-direction: row; align-items: start;">
        <dht-cells
          id="dht-cells"
          .workflowsToDisplay=${0}
          .networkRequestsToDisplay=${0}
          style="height: 700px; flex:1; margin-bottom: 20px;margin-right: 20px;"
        ></dht-cells>
        <div style="display: flex; flex-direction: column; flex-basis: 400px;">
          <source-chain
            style="height: 400px; margin-bottom: 20px"
          ></source-chain>
          <entry-contents style="height: 280px;"></entry-contents>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; align-items: start;">
        <call-zome-fns id="call-zome" style="height: 400px;"> </call-zome-fns>
      </div>
    </holochain-playground-container>
  `),20,d,(e=>{e.detail.conductors[0].getAllCells()[0].cellId;const t=e.target.querySelector("#dht-cells");setTimeout((()=>{t.workflowsToDisplay=[i.CALL_ZOME,i.APP_VALIDATION],t.networkRequestsToDisplay=[r.PUBLISH_REQUEST,r.GET_REQUEST]}),4e3)}),[],[]),h=document,u=[{key:"Simple",story:p}];let g=!1;for(const e of u){const t=h.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,g=!0,Object.assign(t,{}))}g&&(customElements.get("mdjs-preview")||import("./9c634124.js"),customElements.get("mdjs-story")||import("./de8039dc.js"));export{p as Simple};
