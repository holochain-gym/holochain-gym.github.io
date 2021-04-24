# Basic >> Elements ||103

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  ZomeFnsResults,
  CallZomeFns,
  SourceChain,
  DhtCells,
} from "@holochain-playground/elements";
import { WorkflowType, NetworkRequestType } from "@holochain-playground/core";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("dht-cells", DhtCells);
customElements.define("zome-fns-results", ZomeFnsResults);
```

`Elements` are the combination of a header plus their accompanying entry, if they have one. As we learned in the `Headers` exercise, only two types of header really add an entry: `Create` and `Update`. So, examples of elements would be: the `Create` header plus it's entry, or a `CreateLink` header by itself. `Elements` are important because you will encounter them a lot while developing hApps.

## Demo

But first, with all the concepts we already have in our belt, let's try to integrate them all together to form a clear picture of the basic things that are happening in holochain when adding elements.

Below, look at the `DHT Cells` block, as it's the first time it appears. In that block, every node in the graph is a holochain agent participating in the DHT. Here, you can see a holochain network of 4 agents. When calling zome functions in the `Call Zome Fns` block, they will be called by the agent that is selected at that moment.

1. Select one agent from the DHT Cells block.
2. Call the `create_entry` function for that agent, with some arbitrary content.
3. See that a new element has been added to the source chain, and also a new entry has been added to the entry graph.
4. Now, see that little `Show Headers` checkbox on the bottom of the `Entry Graph` block? Enable it.
   - With this, you can see the `Create` header that is accompanying the entry in the DHT.
5. Switch to another agent.
   - See that that agent's source-chain is still in its original state: the only source-chain that has changed is the one for the agent that created the entry.
6. Create an entry for this new agent, **with the same content as the first one**.
   - If you look at the entry graph, you'll see still only one entry in the DHT, but it now has two headers accompanying it.

```js story
const sampleZome1 = {
  name: "demo_entries",
  entry_defs: [
    {
      id: "demo_entry",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_entry: {
      call: ({ create_entry }) => async ({ content }) => {
        return create_entry({ content, entry_def_id: "demo_entry" });
      },
      arguments: [{ name: "content", type: "any" }],
    },
  },
};

const simulatedDnaTemplate1 = {
  zomes: [sampleZome1],
};
export const Simple1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${4}
      .simulatedDnaTemplate=${simulatedDnaTemplate1}
    >
      <div
        style="display: flex; flex-direction: row; height: 400px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
        >
        </call-zome-fns>
        <dht-cells
          style="flex: 1"
          hide-filter
          hide-time-controller
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
        ></dht-cells>
      </div>
      <div
        style="display: flex; height: 450px; flex-direction: row; margin-bottom: 20px;"
      >
        <entry-graph
          style="flex: 1; margin-right: 20px;"
          .excludedEntryTypes=${["Agent"]}
        >
        </entry-graph>
        <source-chain style="flex: 1; height: 100%; margin-right: 20px;">
        </source-chain>
      </div>
    </holochain-playground-container>
  `;
};
```

You can play around with this functionality to see how holochain behaves to different inputs.

## Getting elements

It's really important to think about elements when getting content from the DHT via hashes.

1. Create an entry with some arbitrary content.
    - You should see an entry with its `Create` header in the `Entry Graph` block.
2. **Create the same entry** a second time. 
    - You should see the two `Create` headers accompanying the entry. 
3. Now, switch to the `get` zome fn. Click on the entry and copy its hash to the `hash` argument, and execute the `get`.
    - See that only the second header is returned with the `get`. This is because, as the [`get` documentation](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html) explains, `get` is the simplified version for getting things from the DHT, that only returns the latest header when getting an entry.
4. Switch to the `get_details` zome fn, and execute it with the same `EntryHash`. 
    - See that, in this case, all the headers are returned. This is because `get_details` returns all the metadata that is accompanying the entry.
5. Click on one of the headers, and copy its hash. Try to do a `get_details` with it.
    - See that it's only returning the header that we requested, along with its entry! This is because `get_details` returns all the metadata for the hash that we requested. When we do commit a `Create` element, the header gets attached to the entry's metadata, but not to every other `Create` header for that same entry.

```js story
const sampleZome2 = {
  name: "demo_entries",
  entry_defs: [
    {
      id: "demo_entry",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_entry: {
      call: ({ create_entry }) => async ({ content }) => {
        return create_entry({ content, entry_def_id: "demo_entry" });
      },
      arguments: [{ name: "content", type: "any" }],
    },
    get: {
      call: ({ get }) => ({ hash }) => {
        return get(hash);
      },
      arguments: [{ name: "hash", type: "AnyDhtHash" }],
    },
    get_details: {
      call: ({ get_details }) => ({ hash }) => {
        return get_details(hash);
      },
      arguments: [{ name: "hash", type: "AnyDhtHash" }],
    },
  },
};

const simulatedDnaTemplate2 = {
  zomes: [sampleZome2],
};
export const Simple2 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDnaTemplate2}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <div
        style="display: flex; flex-direction: row; height: 500px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <zome-fns-results
          hide-agent-pub-key
          style="flex: 1;"
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; height: 350px; margin-bottom: 20px;"
      >
        <entry-graph
          style="flex: 1; margin-right: 20px;"
          .excludedEntryTypes=${["Agent"]}
          hide-filter
          show-headers
        >
        </entry-graph>
        <entry-contents style="flex-basis: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```
