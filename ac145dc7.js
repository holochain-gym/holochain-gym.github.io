import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as s,a as o,C as n,S as l,D as a,Z as r,R as i}from"./393087b4.js";import{W as c,N as d}from"./677de7e9.js";import"./962426a7.js";let m,u,y,p,g,f=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",o),customElements.define("call-zome-fns",n),customElements.define("source-chain",l),customElements.define("dht-cells",a),customElements.define("zome-fns-results",r),customElements.define("run-steps",i);const h=[{title:e=>`${e.conductors[0].name} (an honest agent) creates an entry`,run:async e=>{var t;p.workflowsToDisplay=[c.CALL_ZOME,c.APP_VALIDATION],p.networkRequestsToDisplay=[d.PUBLISH_REQUEST,d.WARRANT],g.workflowsToDisplay=[c.CALL_ZOME,c.APP_VALIDATION],g.networkRequestsToDisplay=[d.PUBLISH_REQUEST,d.WARRANT],await(t=100,new Promise((e=>setTimeout((()=>e()),t))));const s=e.conductors[0].getAllCells()[0];y=await e.conductors[0].callZomeFn({cellId:s.cellId,zome:"demo_entries",fnName:"create_entry",payload:{content:"Good morning!"},cap:null})}},{title:e=>`${e.conductors[1].name} (an honest agent) tries to update that same entry`,run:async e=>{const t=e.conductors[1].getAllCells()[0];e.updatePlayground({activeAgentPubKey:t.agentPubKey});try{await e.conductors[1].callZomeFn({cellId:t.cellId,zome:"demo_entries",fnName:"update_entry",payload:{original_header_address:y,new_content:"Bad morning!"},cap:null})}catch(e){}}},{title:e=>`${e.conductors[9].name} (a BAD AGENT!) updates that same entry`,run:async e=>{const t=e.conductors[9].getAllCells()[0];e.updatePlayground({activeAgentPubKey:t.agentPubKey});try{await e.conductors[9].callZomeFn({cellId:t.cellId,zome:"demo_entries",fnName:"update_entry",payload:{original_header_address:y,new_content:"Bad morning!"},cap:null})}catch(e){}}}],_=()=>e(m||(m=f`
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
  `),10,(e=>{const t=e.detail.conductors;t[9].setBadAgent({disable_validation_before_publish:!0,pretend_invalid_elements_are_valid:!0}),e.target.activeAgentPubKey=t[1].getAllCells()[0].agentPubKey,p=e.target.querySelector("#dht-cells")}),h,[],[]),x=()=>e(u||(u=f`
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
  `),10,(e=>{const t=e.detail.conductors;for(let e=4;e<10;e++)t[e].setBadAgent({disable_validation_before_publish:!0,pretend_invalid_elements_are_valid:!0});e.target.activeAgentPubKey=t[1].getAllCells()[0].agentPubKey,g=e.target.querySelector("#dht-cells2")}),h,[],[]),w=document,b=[{key:"Simple1",story:_},{key:"Simple2",story:x}];let A=!1;for(const e of b){const t=w.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,A=!0,Object.assign(t,{}))}A&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{_ as Simple1,x as Simple2};
