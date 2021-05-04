# Concepts >> Dna and Zomes ||40

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SelectActiveDna,
  SourceChain,
  DhtCells,
  selectCell
} from "@holochain-playground/elements";
import {
  GetStrategy,
  NetworkRequestType,
  WorkflowType,
  hash,
  HashType,
} from "@holochain-playground/core";
import { DnaCode, demoHapp } from "@holochain-playground/blockly";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("dht-cells", DhtCells);
customElements.define("dna-code", DnaCode);
customElements.define("select-active-dna", SelectActiveDna);
```

```js story
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${4}
      .simulatedHapp=${demoHapp}
      @ready=${(e) => {
          const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

          console.log(e.target, cellId)
        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <div
        style="display: flex; flex-direction: row; margin-bottom: 20px; height: 600px;"
      >
        <dna-code
          style="flex: 1; margin-right: 20px;"
          @dna-compiled=${async (e) => {
            const context = e.target;
            const activeAgent = context.activeAgentPubKey;
            const cell = selectCell(
              context.activeDna,
              activeAgent,
              context.conductors
            );

            await cell.conductor.installHapp(
              {
                name: `blockly-happ${Date.now()}`,
                description: "",
                slots: {
                  default: {
                    deferred: false,
                    dna: e.detail.dna,
                  },
                },
              },
              {}
            );

            const dnaHash = hash(e.detail.dna, HashType.DNA);

            context.updatePlayground({
              activeDna: dnaHash,
            });
          }}
        ></dna-code>
        <div style="display: flex; flex-direction: column; flex: 1;">
          <select-active-dna
            style="margin-bottom: 20px; flex-grow: 0;"
          ></select-active-dna>
          <dht-cells id="dht-cells" style="flex:1;" hide-filter hide-time-controller></dht-cells>
        </div>
      </div>
      <div
        style="display: flex; flex-direction: row; margin-bottom: 20px; height: 350px;"
      >
        <call-zome-fns
          id="call-zome"
          style="margin-right: 20px; flex: 1;"
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-graph
          show-entry-contents
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1;"
        >
        </entry-graph>
      </div>
    </holochain-playground-container>
  `;
};
```
