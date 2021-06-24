import"./099c0a8b.js";import{H as e,E as t,a as s,C as n,S as o,D as l,Z as a,R as r,T as c,W as i,N as d}from"./9fd83f86.js";import"./178f3cd5.js";import"./962426a7.js";let u,m,y,p,g,f=e=>e;customElements.define("holochain-playground-container",e),customElements.define("entry-graph",t),customElements.define("entry-contents",s),customElements.define("call-zome-fns",n),customElements.define("source-chain",o),customElements.define("dht-cells",l),customElements.define("zome-fns-results",a),customElements.define("run-steps",r);const h=[{title:e=>`${e.conductors[0].name} (an honest agent) creates an entry`,run:async e=>{var t;p.workflowsToDisplay=[i.CALL_ZOME,i.APP_VALIDATION],p.networkRequestsToDisplay=[d.PUBLISH_REQUEST,d.WARRANT],g.workflowsToDisplay=[i.CALL_ZOME,i.APP_VALIDATION],g.networkRequestsToDisplay=[d.PUBLISH_REQUEST,d.WARRANT],await(t=100,new Promise((e=>setTimeout((()=>e()),t))));const s=e.conductors[0].getAllCells()[0];y=await e.conductors[0].callZomeFn({cellId:s.cellId,zome:"demo_entries",fnName:"create_entry",payload:{content:"Good morning!"},cap:null})}},{title:e=>`${e.conductors[1].name} (an honest agent) tries to update that same entry`,run:async e=>{const t=e.conductors[1].getAllCells()[0];e.updatePlayground({activeAgentPubKey:t.agentPubKey});try{await e.conductors[1].callZomeFn({cellId:t.cellId,zome:"demo_entries",fnName:"update_entry",payload:{original_header_address:y,new_content:"Bad morning!"},cap:null})}catch(e){}}},{title:e=>`${e.conductors[9].name} (a BAD AGENT!) updates that same entry`,run:async e=>{const t=e.conductors[9].getAllCells()[0];e.updatePlayground({activeAgentPubKey:t.agentPubKey});try{await e.conductors[9].callZomeFn({cellId:t.cellId,zome:"demo_entries",fnName:"update_entry",payload:{original_header_address:y,new_content:"Bad morning!"},cap:null})}catch(e){}}}],_=()=>c(u||(u=f`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 700px; margin-bottom: 20px;"
      >
        <div
          style="display: flex; flex-direction: column; flex-basis: 250px; flex-grow: 0; margin-right: 20px;"
        >
          <run-steps style="flex: 1; margin-bottom: 20px;" .steps=${0}>
          </run-steps>
          <source-chain style="flex: 1"></source-chain>
        </div>
        <dht-cells
          show-zome-fn-success
          id="dht-cells"
          style="width: 800px"
          .workflowsToDisplay=${0}
          .networkRequestsToDisplay=${0}
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `),10,(e=>{const t=e.detail.conductors;t[9].setBadAgent({disable_validation_before_publish:!0,pretend_invalid_elements_are_valid:!0}),e.target.activeAgentPubKey=t[1].getAllCells()[0].agentPubKey,p=e.target.querySelector("#dht-cells")}),h,[],[]),x=()=>c(m||(m=f`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 800px; margin-bottom: 20px;"
      >
        <div
          style="display: flex; flex-direction: column; flex-basis: 250px; flex-grow: 0; margin-right: 20px;"
        >
          <run-steps style="flex: 1; margin-bottom: 20px;" .steps=${0}>
          </run-steps>
          <source-chain style="flex: 1"></source-chain>
        </div>
        <dht-cells
          show-zome-fn-success
          id="dht-cells2"
          style="width: 800px"
          .workflowsToDisplay=${0}
          .networkRequestsToDisplay=${0}
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `),10,(e=>{const t=e.detail.conductors;for(let e=4;e<10;e++)t[e].setBadAgent({disable_validation_before_publish:!0,pretend_invalid_elements_are_valid:!0});e.target.activeAgentPubKey=t[1].getAllCells()[0].agentPubKey,g=e.target.querySelector("#dht-cells2")}),h,[],[]),w=document,A=[{key:"Simple1",story:_},{key:"Simple2",story:x}];let b=!1;for(const e of A){const t=w.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,b=!0,Object.assign(t,{}))}b&&(customElements.get("mdjs-preview")||import("./a5c23f09.js"),customElements.get("mdjs-story")||import("./4af84d5a.js"));export{_ as Simple1,x as Simple2};
