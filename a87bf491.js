import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as l,a as s,C as o,S as n,D as i,Z as c}from"./393087b4.js";import"./962426a7.js";let r,a,d=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",l),customElements.define("entry-contents",s),customElements.define("call-zome-fns",o),customElements.define("source-chain",n),customElements.define("dht-cells",i),customElements.define("zome-fns-results",c);const m=()=>e(r||(r=d`
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
  `),10,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),y=()=>e(a||(a=d`
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
  `),10,(e=>{const t=e.detail.conductors[0].getAllCells()[0];e.target.activeAgentPubKey=t.cellId[1]})),f=document,u=[{key:"Sim0",story:m},{key:"Sim1",story:y}];let h=!1;for(const e of u){const t=f.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,h=!0,Object.assign(t,{}))}h&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{m as Sim0,y as Sim1};
