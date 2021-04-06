# Basic >> Source-Chain ||105

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

## What is a source-chain?

A holochain DNA has two places in which you can store data:

- One global and shared public DHT (with which we have been playing in the previous exercises).
- A private source-chain per each agent in the network.

Essentially, the source-chain is a **hash-chain of all the actions that a particular agent has committed in this DNA**. Whenever a new action is committed (creating entries or links, updating...) a new element is added to that chain, with its header referencing the previous one.

## Try it!

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
        update_entry: {
          call: ({ update_entry }) => ({
            original_header_address,
            new_content,
          }) => {
            return update_entry(original_header_address, {
              content: new_content,
              entry_def_id: "sample",
            });
          },
          arguments: [
            { name: "original_header_address", type: "HeaderHash" },
            { name: "new_content", type: "String" },
          ],
        },
        delete_entry: {
          call: ({ delete_entry }) => ({ deletes_header_address }) => {
            return delete_entry(deletes_header_address);
          },
          arguments: [{ name: "deletes_header_address", type: "HeaderHash" }],
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
        delete_link: {
          call: ({ delete_link }) => ({ header_hash }) => {
            return delete_link({ header_hash });
          },
          arguments: [{ name: "header_hash", type: "HeaderHash" }],
        },
      },
    },
  ],
};
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDnaTemplate}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 400px; margin-bottom: 20px;"
        hide-agent-pub-key
      >
      </call-zome-fns>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px; margin-right: 20px;">
        </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```
