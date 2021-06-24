import"./099c0a8b.js";import{H as e,E as t,a as l,C as s,S as o,D as n,Z as i,T as c}from"./9fd83f86.js";import"./178f3cd5.js";import"./962426a7.js";let a,r,m=e=>e;customElements.define("holochain-playground-container",e),customElements.define("entry-graph",t),customElements.define("entry-contents",l),customElements.define("call-zome-fns",s),customElements.define("source-chain",o),customElements.define("dht-cells",n),customElements.define("zome-fns-results",i);const d=()=>c(a||(a=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 800px; margin-bottom: 40px"
      >
        <source-chain style="flex: 1; margin-right: 20px"></source-chain>
        <div
          style="display: flex; flex-direction: column; flex-basis: 500px; margin-right: 20px; "
        >
          <call-zome-fns id="call-zome" style="flex: 1; margin-bottom: 20px">
          </call-zome-fns>
          <entry-contents style="flex: 1;"></entry-contents>
        </div>
      </div>
    </holochain-playground-container>
  `),10,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),f=()=>c(r||(r=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      @ready=${0}
    >
      <div style="display: flex; flex-direction: row; height: 800px;">
        <div
          style="display: flex; flex-direction: column; flex-basis: 500px; margin-right: 20px;"
        >
          <source-chain style="flex: 1; margin-bottom: 20px"></source-chain>
          <call-zome-fns id="call-zome" style="flex: 1;"> </call-zome-fns>
        </div>
        <dht-cells id="dht-cells" style="flex:1;"></dht-cells>
      </div>
    </holochain-playground-container>
  `),10,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),y=document,u=[{key:"Sim0",story:d},{key:"Sim1",story:f}];let p=!1;for(const e of u){const t=y.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,p=!0,Object.assign(t,{}))}p&&(customElements.get("mdjs-preview")||import("./a5c23f09.js"),customElements.get("mdjs-story")||import("./4af84d5a.js"));export{d as Sim0,f as Sim1};
