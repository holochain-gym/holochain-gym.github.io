import{p as e}from"./2af62055.js";import{H as t,E as n,a,C as l,S as i,D as s,Z as o}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",a),customElements.define("call-zome-fns",l),customElements.define("source-chain",i),customElements.define("dht-cells",s),customElements.define("zome-fns-results",o);const c={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]}}}]},deferred:!1}}},r=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${c}
      @ready=${e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"snacking_journal",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null})}}
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
  `,m=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${c}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]}}
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
  `,d={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"mixed",entry_defs:[{id:"snacking_log",visibility:"Public"},{id:"greeting_text",visibility:"Public"}],validation_functions:{},zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]},say_greeting:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"greeting_text"}),arguments:[{name:"content",type:"String"}]},query_all:{call:({query:e})=>async()=>e({}),arguments:[]}}}]},deferred:!1}}},g=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${d}
      @ready=${e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null}).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 2: lemon pie"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 4: chocolat"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 5: marsmallows"},cap:null})))}}
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
  `,y=document,u=[{key:"Sim0",story:r},{key:"Sim1",story:m},{key:"Sim2",story:g}];let p=!1;for(const e of u){const t=y.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,p=!0,Object.assign(t,{}))}p&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{r as Sim0,m as Sim1,g as Sim2};
