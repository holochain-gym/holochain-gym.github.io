import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as n,a as l,C as i,S as a,D as s,Z as o}from"./393087b4.js";import"./962426a7.js";let c,r,d,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",l),customElements.define("call-zome-fns",i),customElements.define("source-chain",a),customElements.define("dht-cells",s),customElements.define("zome-fns-results",o);const g={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},y=()=>e(c||(c=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 720px; margin-right: 20px;">
        </source-chain>
        <entry-contents style="flex-basis: 550px; height: 720px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,g,(e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"snacking_journal",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null})})),p=()=>e(r||(r=m`
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
  `),1,g,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),u={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"mixed",entry_defs:[{id:"snacking_log",visibility:"Public"},{id:"greeting_text",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]},say_greeting:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"greeting_text"}),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},h=()=>e(d||(d=m`
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
  `),1,u,(e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null}).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 2: lemon pie"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 4: chocolat"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 5: marsmallows"},cap:null})))})),f=document,x=[{key:"Sim0",story:y},{key:"Sim1",story:p},{key:"Sim2",story:h}];let _=!1;for(const e of x){const t=f.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,_=!0,Object.assign(t,{}))}_&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{y as Sim0,p as Sim1,h as Sim2};
