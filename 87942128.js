import"./3ecf4d48.js";import{h as e}from"./7b4e2b6a.js";import{H as t,E as n,a as l,C as s,S as i,D as a,Z as o}from"./97466b3b.js";import"./962426a7.js";let c,r,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",l),customElements.define("call-zome-fns",s),customElements.define("source-chain",i),customElements.define("dht-cells",a),customElements.define("zome-fns-results",o);const d={zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]}}}]},g=()=>e(c||(c=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
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
  `),1,d,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),y={zomes:[{name:"mixed",entry_defs:[{id:"snacking_log",visibility:"Public"},{id:"greeting_text",visibility:"Public"}],zome_functions:{register_snacking:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]},say_greeting:{call:({create_entry:e,hash_entry:t})=>async({content:t})=>e({content:t,entry_def_id:"greeting_text"}),arguments:[{name:"content",type:"String"}]}}}]},u=()=>e(r||(r=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
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
  `),1,y,(e=>{const t=e.detail.conductors[0],n=t.getAllCells()[0];e.target.activeAgentPubKey=n.cellId[1],t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null}).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 2: lemon pie"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 4: chocolat"},cap:null}))).then((()=>t.callZomeFn({cellId:n.cellId,zome:"mixed",fnName:"register_snacking",payload:{content:"april 5: marsmallows"},cap:null})))})),p=document,h=[{key:"Sim0",story:g},{key:"Sim1",story:u}];let f=!1;for(const e of h){const t=p.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,f=!0,Object.assign(t,{}))}f&&(customElements.get("mdjs-preview")||import("./9c634124.js"),customElements.get("mdjs-story")||import("./de8039dc.js"));export{g as Sim0,u as Sim1};
