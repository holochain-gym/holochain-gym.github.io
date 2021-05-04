import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as n,a as s,C as l,S as o,D as i,Z as a}from"./393087b4.js";import"./962426a7.js";let c,r,d=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",s),customElements.define("call-zome-fns",l),customElements.define("source-chain",o),customElements.define("dht-cells",i),customElements.define("zome-fns-results",a);const m={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},y=()=>e(c||(c=d`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 800px; margin-bottom: 40px"
      >
        <source-chain style="flex: 1; margin-right: 20px"></source-chain>
        <div
          style="display: flex; flex-direction: column; flex-basis: 500px; margin-right: 20px; "
        >
          <call-zome-fns id="call-zome" style="flex: 1; margin-bottom: 20px">
          </call-zome-fns>
          <entry-contents style="flex: 1;"></entry-contents>
        </div>
      </div>
    </holochain-playground-container>
  `),10,m,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),f=()=>e(r||(r=d`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div style="display: flex; flex-direction: row; height: 800px;">
        <div
          style="display: flex; flex-direction: column; flex-basis: 500px; margin-right: 20px;"
        >
          <source-chain style="flex: 1; margin-bottom: 20px"></source-chain>
          <call-zome-fns id="call-zome" style="flex: 1;"> </call-zome-fns>
        </div>
        <dht-cells id="dht-cells" style="flex:1;"></dht-cells>
      </div>
    </holochain-playground-container>
  `),10,m,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),u=document,p=[{key:"Sim0",story:y},{key:"Sim1",story:f}];let g=!1;for(const e of p){const t=u.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,g=!0,Object.assign(t,{}))}g&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{y as Sim0,f as Sim1};
