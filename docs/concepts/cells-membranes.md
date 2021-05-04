# Concepts >> Cells and Membranes ||60

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  ZomeFnsResults,
  ConductorAdmin,
  DhtCells
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("zome-fns-results", ZomeFnsResults);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("conductor-admin", ConductorAdmin);
customElements.define("dht-cells", DhtCells);
```

```js story
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <div
        style="display: flex; height: 600px; flex-direction: row; margin-bottom: 20px;"
      >
        <conductor-admin
          style="flex-basis: 600px; margin-right: 20px;"
        >
        </conductor-admin>
        <dht-cells style="flex: 1;"> </dht-cells>
      </div>
    </holochain-playground-container>
  `;
};
```
