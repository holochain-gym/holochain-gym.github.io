# Concepts >> Source-Chain ||20

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  ZomeFnsResults,
  CallZomeFns,
  SourceChain,
  DhtCells,
} from "@holochain-playground/elements";

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

**TLDR: every agent maintains an append-only linear hash-chain which contains all the actions that agent has taken.**

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="https://developer.holochain.org/concepts/3_source_chain/">Core Concepts: Source Chain</a></li>
<li><a href="https://en.wikipedia.org/wiki/Hash_chain">Hash chains</a></li>
</ul>
</inline-notification>

# Source Chain

We already know that in a Holochain DHT, every agent is running its own node. In addition to storing their appropriate shard of the DHT, **each agent is also maintaining a linear history of each action that agent has taken**.

This is stored in the agent's node in the form of a hash-chain, with one element referencing the previous one. After that, that action gets published into the DHT, in which it will propagate and eventually made available for other agents to see.

## Try it!

Here you can see a source chain for an agent, in its initial state after installing the hApp. 

Every piece of data added to the source chain is called an **element**. An element consists of:

- A header: contains the metadata of that action (author, timestamp, signature...).
- Maybe an entry: some actions create entries in the DHT, so the element also contains the entry.

Let's try to add more elements to it:


1. Select the `create_entry` function in the "Call Zome Fns" block.
2. Input some random content for the entry and click "Execute".
   - See that the source chain has a new element. 
   - Click on the new blue circle. 
     - You can see in the "Header Contents" block the content of the header. 
     - See the `prev_header` property in the header, referencing the previous header hash: this is what creates the chain of headers. 
   - Click on the new grey rounded rectangle. 
     - You can see in the "Entry Contents" block the content of the entry.
3. Play around with all the actions available, add new elements and inspect their contents.

```js story
export const Sim0 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];
      }}
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
  `;
};
```

## Source Chain + DHT

So, how does the source chain combine with the DHT?

You can think of Holochain as the combination of a local and linear source chain, and a public DHT space to which you can publish data.

One of the most important characteristics of the source chain is that it's linear and ordered, representing all the actions an agent has taken in sequence.

All the events that happen linearly in each of these hash chains are the ones that get aggregated and modify the public DHT data, in a CRDT manner.

### Try it!

Here you have an interactive representation of the DHT on the right side, and the source-chain of the selected agent on the left side.

1. Select one of the agents in the "DHT Cells" block.
   - See that its source-chain already contains the initial 3 elements chained together.
2. Create an entry with arbitrary content.
   - See that the source chain has a new element added to it: this is the entry we just created.
3. Switch to another agent by selecting it in the "DHT Cells" block.
   - See that the source chain for that agent has still only the 3 first elements.

You can switch through different agents and do different actions and see how holochain behaves.

```js story
export const Sim1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];
      }}
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
  `;
};
```
