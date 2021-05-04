# Concepts >> Source-Chain ||20

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

The Source chain. It sounds like something out of a scifi movie or a fantasy novel. And it is in fact a large part of what makes holochain unique. It's where some of the magic happens.

The [glossary](https://developer.holochain.org/docs/glossary/#source-chain) explains it the following way:

> A hash chain of elements committed by an agent. Every agent has a separate source chain for each of the cells they’re running, which stores all of the actions they’ve taken in that cell.

_Let's unpack this_

When you download a compiled [DNA](https://developer.holochain.org/docs/glossary/#dna), a [WASM](https://developer.holochain.org/docs/glossary/#webassembly-wasm) binary, from somewhere or when you compile it locally and you run this DNA in a holochain [conductor](https://developer.holochain.org/docs/glossary/#conductor) that is running on your machine, then this DNA would be instantiated and linked to your [agent ID](https://developer.holochain.org/docs/glossary/#agent-id). That thing is a [cell](https://developer.holochain.org/docs/glossary/#cell).

If you want to keep things simple in your head, you can just say "when you run a DNA". A DNA can consist of one or more zomes.

Now for the crucial part: "**stores all of the actions**". Every action, which in holochain speak means: every header and entry, that are produced by you, the agent, will become a part of the source chain, for as long as that agent has that DNA installed.
Whenever a new action is committed (creating entries or links, updating...) a new element is added to that chain, with its header referencing the previous one.
Essentially, the source-chain is a **hash-chain of all the actions that a particular agent has committed in this DNA**.

Perhaps this does sounds like some weird form of magic.
Head over to the simulation where you will see that, underneath, it is just headers and entries.

### Try it!

Even before you add your first entries, 3 headers and 1 entry will be created automatically in your holochain app. These 4 elements, the [genesis events](https://developer.holochain.org/docs/glossary/#genesis-elements) are created by what you call the **subconscious** of your holochain app. When you talk about the subconscious of your holochain app, you are talking about all the entries, headers, DHT operations and validations that happen that are not actively, _consciously_, triggered by you, the user.

The 3 headers and 1 entry are created when the happ is installed, the moment when your DNA is instantiated into a cell. Click on the headers and the entry below to learn more about them. You can also call the "register_snacking" function to add new elements to the Source-Chain.

```js story
const simulatedDna0 = {
  zomes: [
    {
      name: "snacking_journal",
      entry_defs: [
        {
          id: "snacking_log",
          visibility: "Public",
        },
      ],
      validation_functions: {},
      zome_functions: {
        register_snacking: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            return create_entry({ content, entry_def_id: "snacking_log" });
          },
          arguments: [{ name: "content", type: "String" }],
        },
      },
    },
  ],
};

const simulatedHapp0 = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: simulatedDna0,
      deferred: false,
    },
  },
};
export const Sim0 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      .simulatedHapp=${simulatedHapp0}
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

How does the Source-Chain combine with the DHT?

```js story
export const Sim1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      .simulatedHapp=${simulatedHapp0}
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
