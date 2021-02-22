# Intermediate >> DHT ||201

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SourceChain,
  DhtCells,
} from "@holochain-playground/elements";
import { GetStrategy, NetworkRequestType, WorkflowType } from "@holochain-playground/core";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("dht-cells", DhtCells);
```

## Holochain's DHT

Before continuing, it is worth to stop for a bit and go deeper into how things work on holochain, before adding more concepts. We are going to focus on the way that holochain implements its DHT.

Usually, DHTs are just key-value stores: you can create some piece of data, which gets hashed, and after that anyone can query its contents with that hash.

Holochain security model based on validation rules enables attachment of metadata in the DHT: not only we can create entries, but we can add links to them, or update them. This way, we can build complex graph structures in our DHTs that allow for efficient navigation of the data.

## Try it!

Here you have it! In this representation of the DHT, every node is a cell (an instance of the DNA running), and the connections between them indicate that they are neighbors which gossip regularly with each other.

To try to visualize how DHT behaves:

1. Create a new entry.
2. Select the new entry from the source chain.
   - See the yellow nodes? Those are the validator nodes that are holding our new entry.
3. Get the entry with its entry hash.
   - See the get request? It goes to the nodes which are holding the entry.
4. Create a link with that entry as a base (the target doesn't matter).
   - Watch closely! The agent making the request is going to publish the link to the same nodes as our entry!
   - This is the link metadata attaching itself to the entry base hash.

If you need more time, you can active the step-by-step mode and click play whenever you are ready to continue. Have fun!

```js story
const simulatedDnaTemplate = {
  zomes: [
    {
      name: "entries",
      entry_defs: [
        {
          id: "sample",
          visibility: "Public",
        },
      ],
      zome_functions: {
        create_entry: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            return create_entry({ content, entry_def_id: "sample" });
          },
          arguments: [{ name: "content", type: "String" }],
        },
        get: {
          call: ({ get }) => ({hash}) => {
            return get(hash, {strategy: GetStrategy.Latest});
          },
          arguments: [{ name: "hash", type: "Hash" }],
        },
      },
    },
    {
      name: "links",
      entry_defs: [
        {
          id: "sample",
          visibility: "Public",
        },
      ],
      zome_functions: {
        create_link: {
          call: ({ create_link }) => ({ base, target, tag }) => {
            return create_link({ base, target, tag });
          },
          arguments: [
            { name: "base", type: "EntryHash" },
            { name: "target", type: "EntryHash" },
            { name: "tag", type: "any" },
          ],
        },
      },
    },
  ],
};
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${20}
      .simulatedDnaTemplate=${simulatedDnaTemplate}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        const dhtCells = e.target.querySelector("#dht-cells");
        setTimeout(() => {
          console.log(dhtCells);
          dhtCells.workflowsToDisplay = [
            WorkflowType.CALL_ZOME,
            WorkflowType.APP_VALIDATION,
          ];
          dhtCells.networkRequestsToDisplay = [
            NetworkRequestType.PUBLISH_REQUEST,
            NetworkRequestType.GET_REQUEST,
          ];
        }, 4000);
      }}
    >
      <div style="display: flex; flex-direction: row; align-items: start;">
        <dht-cells
          id="dht-cells"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
          style="height: 700px; flex:1; margin-bottom: 20px;margin-right: 20px;"
        ></dht-cells>
        <div style="display: flex; flex-direction: column; flex-basis: 400px;">
          <source-chain
            style="height: 400px; margin-bottom: 20px"
          ></source-chain>
          <entry-contents
            style="height: 280px;"
          ></entry-contents>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; align-items: start;">
        <call-zome-fns
          id="call-zome"
          style="height: 400px;"
        >
        </call-zome-fns>
      </div>
    </holochain-playground-container>
  `;
};
```
