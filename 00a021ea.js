import{h as e}from"./7b4e2b6a.js";import"./3ecf4d48.js";import{H as l,D as t,R as a,Z as n}from"./97466b3b.js";import{N as o,W as s}from"./49bd6e75.js";import"./962426a7.js";let c,r,m=e=>e;customElements.define("holochain-playground-container",l),customElements.define("dht-cells",t),customElements.define("run-steps",a),customElements.define("zome-fns-results",n);const d=[{title:"Alice tries to do a remote call on Bob's 'sample' zome function",run:async e=>{const l=e.conductors[0],t=l.getAllCells()[0].cellId,a=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:t[1]});try{await l.callZomeFn({cellId:t,zome:"sample",payload:{agentToCall:a[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}},{title:"Bob trusts her, so he creates a capability grant for Alice",run:async e=>{const l=e.conductors[0].getAllCells()[0].cellId,t=e.conductors[1],a=t.getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:a[1]});try{r=await t.callZomeFn({cellId:a,zome:"sample",payload:{grantedAgent:l[1]},fnName:"create_cap",cap:null})}catch(e){}}},{title:"Alice tries to call the 'sample' function for Bob again",run:async e=>{const l=e.conductors[0],t=l.getAllCells()[0].cellId,a=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:t[1]});try{await l.callZomeFn({cellId:t,zome:"sample",payload:{agentToCall:a[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}},{title:"Bob doesn't trust Alice anymore, so he revokes her capability grant",run:async e=>{e.conductors[0].getAllCells()[0].cellId;const l=e.conductors[1],t=l.getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:t[1]});try{await l.callZomeFn({cellId:t,zome:"sample",payload:{capGrantToRevoke:r},fnName:"revoke_cap",cap:null})}catch(e){}}},{title:"Alice tries to call the 'sample' function for Bob again",run:async e=>{const l=e.conductors[0],t=l.getAllCells()[0].cellId,a=e.conductors[1].getAllCells()[0].cellId;e.updatePlayground({activeAgentPubKey:t[1]});try{await l.callZomeFn({cellId:t,zome:"sample",payload:{agentToCall:a[1]},fnName:"remote_sample_fn",cap:null})}catch(e){}}}],p={zomes:[{name:"sample",entry_defs:[],zome_functions:{create_cap:{call:({create_cap_grant:e})=>({grantedAgent:l})=>e({tag:"",access:{Assigned:{secret:"",assignees:[l]}},functions:[{zome:"sample",fn_name:"sample_fn"}]}),arguments:[{type:"AgentPubKey",name:"grantedAgent"}]},sample_fn:{call:()=>()=>"Hello",arguments:[]},revoke_cap:{call:({delete_cap_grant:e})=>({capGrantToRevoke:l})=>e(l),arguments:[{type:"HeaderHash",name:"capGrantToRevoke"}]},remote_sample_fn:{call:({call_remote:e})=>({agentToCall:l})=>e({agent:l,zome:"sample",fn_name:"sample_fn",cap:null,payload:null}),arguments:[{type:"AgentPubKey",name:"agentToCall"}]}}}]},i=()=>e(c||(c=m` <holochain-playground-container
  id="container"
  .numberOfSimulatedConductors=${0}
  .simulatedDnaTemplate=${0}
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
</holochain-playground-container>`),2,p,d,[s.CALL_ZOME],[o.CALL_REMOTE]),u=document,g=[{key:"Demo",story:i}];let y=!1;for(const e of g){const l=u.querySelector(`[mdjs-story-name="${e.key}"]`);l&&(l.story=e.story,l.key=e.key,y=!0,Object.assign(l,{}))}y&&(customElements.get("mdjs-preview")||import("./9c634124.js"),customElements.get("mdjs-story")||import("./de8039dc.js"));export{i as Demo};
