import{h as e}from"./0fafd573.js";import"./70dd2230.js";import{H as t,D as l,R as a,Z as n}from"./393087b4.js";import{N as o,W as s}from"./78a9ee0d.js";import"./962426a7.js";let c,r,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("dht-cells",l),customElements.define("run-steps",a),customElements.define("zome-fns-results",n);const d=[{title:e=>`${e.conductors[0].name} tries to do a remote call on ${e.conductors[1].name}'s 'sample' zome function`,run:async e=>{const t=e.conductors[0],l=t.getAllCells()[0].cellId,a=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:l[1]});try{await t.callZomeFn({cellId:l,zome:"sample",payload:{agentToCall:a[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}},{title:e=>`${e.conductors[1].name} trusts her, so he creates a capability grant for ${e.conductors[0].name}`,run:async e=>{const t=e.conductors[0].getAllCells()[0].cellId,l=e.conductors[1],a=l.getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:a[1]});try{r=await l.callZomeFn({cellId:a,zome:"sample",payload:{grantedAgent:t[1]},fnName:"create_cap",cap:null})}catch(e){}}},{title:e=>`${e.conductors[0].name} tries to call the 'sample' function for ${e.conductors[1].name} again`,run:async e=>{const t=e.conductors[0],l=t.getAllCells()[0].cellId,a=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:l[1]});try{await t.callZomeFn({cellId:l,zome:"sample",payload:{agentToCall:a[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}},{title:e=>`${e.conductors[1].name} doesn't trust ${e.conductors[0].name} anymore, so he revokes her capability grant`,run:async e=>{e.conductors[0].getAllCells()[0].cellId;const t=e.conductors[1],l=t.getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:l[1]});try{await t.callZomeFn({cellId:l,zome:"sample",payload:{capGrantToRevoke:r},fnName:"revoke_cap",cap:null})}catch(e){}}},{title:e=>`${e.conductors[0].name} tries to call the 'sample' function for ${e.conductors[1].name} again`,run:async e=>{const t=e.conductors[0],l=t.getAllCells()[0].cellId,a=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:l[1]});try{await t.callZomeFn({cellId:l,zome:"sample",payload:{agentToCall:a[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}}],u={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"sample",entry_defs:[],validation_functions:{},zome_functions:{create_cap:{call:({create_cap_grant:e})=>({grantedAgent:t})=>e({tag:"",access:{Assigned:{secret:"",assignees:[t]}},functions:[{zome:"sample",fn_name:"sample_fn"}]}),arguments:[{type:"AgentPubKey",name:"grantedAgent"}]},sample_fn:{call:()=>()=>"Hello",arguments:[]},revoke_cap:{call:({delete_cap_grant:e})=>({capGrantToRevoke:t})=>e(t),arguments:[{type:"HeaderHash",name:"capGrantToRevoke"}]},remote_sample_fn:{call:({call_remote:e})=>({agentToCall:t})=>e({agent:t,zome:"sample",fn_name:"sample_fn",cap:null,payload:null}),arguments:[{type:"AgentPubKey",name:"agentToCall"}]}}}]},deferred:!1}}},p=()=>e(c||(c=m` <holochain-playground-container
  id="container"
  .numberOfSimulatedConductors=${0}
  .simulatedHapp=${0}
>
  <div
    style="width: 100%; display: flex; flex-direction: row; margin-bottom: 20px;"
  >
    <run-steps
      .steps=${0}
      style="flex: 1; margin-right: 20px; height: 350px;"
    ></run-steps>
    <dht-cells
      step-by-step
      hide-filter
      style="height: 600px; flex-basis: 700px;"
      show-zome-fn-success
      .workflowsToDisplay=${0}
      .networkRequestsToDisplay=${0}
    ></dht-cells>
  </div>
</holochain-playground-container>`),2,u,d,[s.CALL_ZOME],[o.CALL_REMOTE]),i=document,g=[{key:"Demo",story:p}];let y=!1;for(const e of g){const t=i.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,y=!0,Object.assign(t,{}))}y&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{p as Demo};
