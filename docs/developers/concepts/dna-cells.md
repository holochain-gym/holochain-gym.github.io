# Concepts >> Dna and Cells ||16

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  ZomeFnsResults,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("zome-fns-results", ZomeFnsResults);
customElements.define("call-zome-fns", CallZomeFns);
```

```js story
const sampleZome = {
  name: "helloworld",
  entry_defs: [
    {
      id: "greeting",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    say_greeting: {
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: "greeting" });
      },
      arguments: [{ name: "content", type: "String" }],
    },
  },
};

const simulatedHapp = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: {
        zomes: [sampleZome],
      },
      deferred: false,
    },
  },
};
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 250px; margin-bottom: 20px;"
        hide-zome-selector
        hide-agent-pub-key
      >
      </call-zome-fns>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; margin-right: 20px; height: 500px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 600px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```
