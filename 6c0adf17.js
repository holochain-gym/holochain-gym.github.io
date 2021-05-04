import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as n,a as i,C as s,S as l,D as a,Z as o}from"./393087b4.js";import"./962426a7.js";let c,r,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",i),customElements.define("call-zome-fns",s),customElements.define("source-chain",l),customElements.define("dht-cells",a),customElements.define("zome-fns-results",o);const d={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},g=()=>e(c||(c=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px; margin-right: 20px;">
        </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,d,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),y={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{zomes:[{name:"mixed",entry_defs:[{id:"snacking_log",visibility:"Public"},{id:"greeting_text",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]},say_greeting:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"greeting_text"}),arguments:[{name:"content",type:"String"}]}}}]}]},deferred:!1}}},p=()=>e(r||(r=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; height: 300px; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px; height: 100%;"
          hide-agent-pub-key
        >
        </call-zome-fns>

        <zome-fns-results
          style="flex: 1; height: 100%;"
          hide-agent-pub-key
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px; margin-right: 20px;">
        </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,y,(e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null}).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 2: lemon pie"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 4: chocolat"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 5: marsmallows"},cap:null})))})),u=document,f=[{key:"Sim0",story:g},{key:"Sim1",story:p}];let h=!1;for(const e of f){const t=u.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,h=!0,Object.assign(t,{}))}h&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{g as Sim0,p as Sim1};
