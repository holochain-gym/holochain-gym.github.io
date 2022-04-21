import{p as e}from"./2af62055.js";import{H as t,E as l,a as o,C as s,S as n,D as i,Z as c}from"./8ad3a711.js";import"./962426a7.js";customElements.define("holochain-playground-container",t),customElements.define("entry-graph",l),customElements.define("entry-contents",o),customElements.define("call-zome-fns",s),customElements.define("source-chain",n),customElements.define("dht-cells",i),customElements.define("zome-fns-results",c);const a=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]}}
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
  `,r=()=>e`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]}}
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
  `,m=document,d=[{key:"Sim0",story:a},{key:"Sim1",story:r}];let y=!1;for(const e of d){const t=m.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,y=!0,Object.assign(t,{}))}y&&(customElements.get("mdjs-preview")||import("./49ae583c.js"),customElements.get("mdjs-story")||import("./e61adb1a.js"));export{a as Sim0,r as Sim1};
