import{p as e}from"./2af62055.js";import{H as t,D as a,R as l,Z as n,W as o,N as s}from"./8ad3a711.js";import"./962426a7.js";let c;customElements.define("holochain-playground-container",t),customElements.define("dht-cells",a),customElements.define("run-steps",l),customElements.define("zome-fns-results",n);const r=[{title:e=>`${e.conductors[0].name} tries to do a remote call on ${e.conductors[1].name}'s 'sample' zome function`,run:async e=>{const t=e.conductors[0],a=t.getAllCells()[0].cellId,l=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:a[1]});try{await t.callZomeFn({cellId:a,zome:"sample",payload:{agentToCall:l[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}},{title:e=>`${e.conductors[1].name} trusts her, so he creates a capability grant for ${e.conductors[0].name}`,run:async e=>{const t=e.conductors[0].getAllCells()[0].cellId,a=e.conductors[1],l=a.getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:l[1]});try{c=await a.callZomeFn({cellId:l,zome:"sample",payload:{grantedAgent:t[1]},fnName:"create_cap",cap:null})}catch(e){}}},{title:e=>`${e.conductors[0].name} tries to call the 'sample' function for ${e.conductors[1].name} again`,run:async e=>{const t=e.conductors[0],a=t.getAllCells()[0].cellId,l=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:a[1]});try{await t.callZomeFn({cellId:a,zome:"sample",payload:{agentToCall:l[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}},{title:e=>`${e.conductors[1].name} doesn't trust ${e.conductors[0].name} anymore, so he revokes her capability grant`,run:async e=>{e.conductors[0].getAllCells()[0].cellId;const t=e.conductors[1],a=t.getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:a[1]});try{await t.callZomeFn({cellId:a,zome:"sample",payload:{capGrantToRevoke:c},fnName:"revoke_cap",cap:null})}catch(e){}}},{title:e=>`${e.conductors[0].name} tries to call the 'sample' function for ${e.conductors[1].name} again`,run:async e=>{const t=e.conductors[0],a=t.getAllCells()[0].cellId,l=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:a[1]});try{await t.callZomeFn({cellId:a,zome:"sample",payload:{agentToCall:l[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}}],m={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[],validation_functions:{},zome_functions:{create_cap:{call:({create_cap_grant:e})=>({grantedAgent:t})=>e({tag:"",access:{Assigned:{secret:"",assignees:[t]}},functions:[{zome:"sample",fn_name:"sample_fn"}]}),arguments:[{type:"AgentPubKey",name:"grantedAgent"}]},sample_fn:{call:()=>()=>"Hello",arguments:[]},revoke_cap:{call:({delete_cap_grant:e})=>({capGrantToRevoke:t})=>e(t),arguments:[{type:"HeaderHash",name:"capGrantToRevoke"}]},remote_sample_fn:{call:({call_remote:e})=>({agentToCall:t})=>e({agent:t,zome:"sample",fn_name:"sample_fn",cap:null,payload:null}),arguments:[{type:"AgentPubKey",name:"agentToCall"}]}}}]},deferred:!1}}},d=()=>e` <holochain-playground-container
  id="container"
  .numberOfSimulatedConductors=${2}
  .simulatedHapp=${m}
>
  <div
    style="width: 100%; display: flex; flex-direction: row; margin-bottom: 20px;"
  >
    <run-steps
      .steps=${r}
      style="flex: 1; margin-right: 20px; height: 350px;"
    ></run-steps>
    <dht-cells
      step-by-step
      hide-filter
      style="height: 600px; flex-basis: 700px;"
      show-zome-fn-success
      .workflowsToDisplay=${[o.CALL_ZOME]}
      .networkRequestsToDisplay=${[s.CALL_REMOTE]}
    ></dht-cells>
  </div>
</holochain-playground-container>`,u=document,p=[{key:"Demo",story:d}];let i=!1;for(const e of p){const t=u.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,i=!0,Object.assign(t,{}))}i&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{d as Demo};
