import{p as e}from"./2af62055.js";import{H as t,E as s,a as n,C as o,S as l,D as a,Z as r,R as i,W as c,N as d}from"./8ad3a711.js";import"./962426a7.js";let u,m,y;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",s),customElements.define("entry-contents",n),customElements.define("call-zome-fns",o),customElements.define("source-chain",l),customElements.define("dht-cells",a),customElements.define("zome-fns-results",r),customElements.define("run-steps",i);const p=[{title:e=>`${e.conductors[0].name} (an honest agent) creates an entry`,run:async e=>{var t;m.workflowsToDisplay=[c.CALL_ZOME,c.APP_VALIDATION],m.networkRequestsToDisplay=[d.PUBLISH_REQUEST,d.WARRANT],y.workflowsToDisplay=[c.CALL_ZOME,c.APP_VALIDATION],y.networkRequestsToDisplay=[d.PUBLISH_REQUEST,d.WARRANT],await(t=100,new Promise((e=>setTimeout((()=>e()),t))));const s=e.conductors[0].getAllCells()[0];u=await e.conductors[0].callZomeFn({cellId:s.cellId,zome:"demo_entries",fnName:"create_entry",payload:{content:"Good morning!"},cap:null})}},{title:e=>`${e.conductors[1].name} (an honest agent) tries to update that same entry`,run:async e=>{const t=e.conductors[1].getAllCells()[0];e.updatePlayground({activeAgentPubKey:t.agentPubKey});try{await e.conductors[1].callZomeFn({cellId:t.cellId,zome:"demo_entries",fnName:"update_entry",payload:{original_header_address:u,new_content:"Bad morning!"},cap:null})}catch(e){}}},{title:e=>`${e.conductors[9].name} (a BAD AGENT!) updates that same entry`,run:async e=>{const t=e.conductors[9].getAllCells()[0];e.updatePlayground({activeAgentPubKey:t.agentPubKey});try{await e.conductors[9].callZomeFn({cellId:t.cellId,zome:"demo_entries",fnName:"update_entry",payload:{original_header_address:u,new_content:"Bad morning!"},cap:null})}catch(e){}}}],g=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${e=>{const t=e.detail.conductors;t[9].setBadAgent({disable_validation_before_publish:!0,pretend_invalid_elements_are_valid:!0}),e.target.activeAgentPubKey=t[1].getAllCells()[0].agentPubKey,m=e.target.querySelector("#dht-cells")}}
    >
      <div
        style="display: flex; flex-direction: row; height: 700px; margin-bottom: 20px;"
      >
        <div
          style="display: flex; flex-direction: column; flex-basis: 250px; flex-grow: 0; margin-right: 20px;"
        >
          <run-steps style="flex: 1; margin-bottom: 20px;" .steps=${p}>
          </run-steps>
          <source-chain style="flex: 1"></source-chain>
        </div>
        <dht-cells
          show-zome-fn-success
          id="dht-cells"
          style="width: 800px"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `,f=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${e=>{const t=e.detail.conductors;for(let e=4;e<10;e++)t[e].setBadAgent({disable_validation_before_publish:!0,pretend_invalid_elements_are_valid:!0});e.target.activeAgentPubKey=t[1].getAllCells()[0].agentPubKey,y=e.target.querySelector("#dht-cells2")}}
    >
      <div
        style="display: flex; flex-direction: row; height: 800px; margin-bottom: 20px;"
      >
        <div
          style="display: flex; flex-direction: column; flex-basis: 250px; flex-grow: 0; margin-right: 20px;"
        >
          <run-steps style="flex: 1; margin-bottom: 20px;" .steps=${p}>
          </run-steps>
          <source-chain style="flex: 1"></source-chain>
        </div>
        <dht-cells
          show-zome-fn-success
          id="dht-cells2"
          style="width: 800px"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `,h=document,_=[{key:"Simple1",story:g},{key:"Simple2",story:f}];let x=!1;for(const e of _){const t=h.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,x=!0,Object.assign(t,{}))}x&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{g as Simple1,f as Simple2};
