# Concepts >> DHT ||10

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SourceChain,
  DhtCells,
} from "@holochain-playground/elements";
import {
  GetStrategy,
  NetworkRequestType,
  WorkflowType,
} from "@holochain-playground/simulator";

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

**TLDR: in Holochain, every person runs their own node participating fully in a DHT network**.

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="https://developer.holochain.org/concepts/4_dht">Core Concepts: DHT</a></li>
<li><a href="https://en.wikipedia.org/wiki/Distributed_hash_table">DHTs</a></li>
</ul>
</inline-notification>

# Holochain's DHT

A Holochain network is a DHT (Distributed Hash Table) of peers, playing together by the same rules. The DHT is the main way in which agents share data in Holochain. Every agent runs its own node: if you want to participate in the DHT, you have to run your own instance and join the network.

Usually, DHTs are just key-value stores: you can create some piece of data which gets hashed, and after that anyone can query its contents with that hash.

**Holochain's DHT is eventually consistent**: data takes some time to propagate throughout the network. This means that there is no guarantee about the order in which different pieces of data will arrive, or that you are seeing all the data that has been published.

However, since the internal data structures are [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type), no matter the order of arrival of each piece of data, the end state will always be the same.

Holochain security model based on validation rules enables attachment of metadata in the DHT: not only can we create entries, but also we can add links to them, or update them. This way we can build complex graph structures in our DHTs that allow for efficient navigation of the data.

## Try it!

Here you have it! In this representation of the DHT, every node is a cell (an instance of the DNA running), and the connections between them indicate that they are neighbors which gossip regularly with each other.

Every node belongs to a person running it. You can see the name of the person to which the node belongs.

To try to visualize how DHT behaves:

1. Input some arbitrary content for the entry in the "Call Zome Fns" panel.
2. Click "Execute".
3. See how the data gets published to the DHT and validated there.

If you need more time, you can activate the step-by-step mode and click "Play" whenever you are ready to continue. Have fun!

```js story
const simulatedDna = {
  zomes: [
    {
      name: "entries",
      entry_defs: [
        {
          id: "sample",
          visibility: "Public",
        },
      ],
      validation_functions: {},
      zome_functions: {
        create_entry: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            await create_entry({ content, entry_def_id: "sample" });
            return hash_entry({ content });
          },
          arguments: [{ name: "content", type: "String" }],
        },
      },
    },
  ],
};
const simulatedHapp = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: simulatedDna,
      deferred: false,
    },
  },
};
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${20}
      .simulatedHapp=${simulatedHapp}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        const dhtCells = e.target.querySelector("#dht-cells");
        setTimeout(() => {
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
      <div style="display: flex; flex-direction: row; height: 700px;">
        <dht-cells
          id="dht-cells"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
          style="flex:1; margin-right: 20px;"
        ></dht-cells>
        <call-zome-fns id="call-zome" style="flex-basis: 500px; flex-grow: 0;">
        </call-zome-fns>
      </div>
    </holochain-playground-container>
  `;
};
```
