# Basic >> Source chain ||105

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

## Recap

You learned about entries and headers: two of the most basic building blocks in any holochain app. And experienced first hand, while solving the exercises, that hashes are the glue that holds everything together. We briefly mentioned something about hash tables and the DHT. You can learn more about the DHT [here](/intermediate/DHT).

## Source chain

The Source chain. It sounds like something out of a scifi movie or a fantasy novel. And it is in fact a large part of what make holochain unique. It's where some of the magic happens.

The [glossary](https://developer.holochain.org/docs/glossary/#source-chain) explains it the following way:

> A hash chain of elements committed by an agent. Every agent has a separate source chain for each of the cells they’re running, which stores all of the actions they’ve taken in that cell.

_Let's unpack this_

When you download a compiled [DNA](https://developer.holochain.org/docs/glossary/#dna), a [WASM](https://developer.holochain.org/docs/glossary/#webassembly-wasm) binary, from somewhere or when you compile it locally and you run this DNA in a holochain [conductor](https://developer.holochain.org/docs/glossary/#conductor) that is running on your machine, then this DNA would be instantiated and linked to your [agent ID](https://developer.holochain.org/docs/glossary/#agent-id). That thing is a [cell](https://developer.holochain.org/docs/glossary/#cell).

If you want to keep things simple in your head, you can just say "when you run a DNA". A DNA can consist out of one or more zomes. All our exercises so far only contained one zome. The one you compiled from `zomes/exercise/lib.rs`. For the sake of simplicity we will keep on pretending every DNA has just one [zome](https://developer.holochain.org/docs/glossary/#zome). For now.

Now for the crucial part: "**stores all of the actions**". Every action, which in holochain speak means: every header and entry, that are produced by you, the agent, will become a part of the source chain, forever.
Whenever a new action is committed (creating entries or links, updating...) a new element is added to that chain, with its header referencing the previous one.
Essentially, the source-chain is a **hash-chain of all the actions that a particular agent has committed in this DNA**. 

Perhaps this does sounds like some weird form of magic.
Head over to the simulation where you will see that, underneath, it is just a headers and entries.

## Inside cell

Even before you add your first entries, like you did in the [entries exercise](/basis/entries), 3 headers and 1 entry will be created automatically, or put differently, by the **subconscious** of your holochain app. When you talk about the subconscious of your holochain app, you are talking about all the entries, headers, DHT operations and validations that happen that are not actively, _consciously_, triggered by you.

The 3 headers and 1 entry are created when the happ is installed, the moment when your DNA is instantiated into a cell. Click on headers and the entry below to learn more about them.

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
export const Sim0 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDna0}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];
      }}
    >
      
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px;">
        </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

- **DNA** is a special type of header that marks the beginning of your source chain. In contrast to other headers it doesn't have a `header_seq` or a `prev_header` field, because it is the very first header in your holochain app. If a 1000 people run the same DNA all of their holochain apps will have the same first header. And that is important, because that means you are, just like in real life, part of the same organism. In the world of holochain apps that means you share the same DHT through which you share data, through which you collaborate. **Same DNA, same DHT. Different DNA, different DHT**

- **AgentValidationPkg** is important in deciding who is allowed to become part of the organism. It could be open access, as in, everyone with the same DNA can participate. But you can construct a [membrane](https://developer.holochain.org/docs/glossary/#membrane) around your organism that controls who or under which conditions someone can participate. It is very interesting part of a holochain app, but also a more advanced topic.

- **Create header** is just a run of the mill header of type CREATE. The only special thing is that it points to entry of type AGENT

- **Agent entry** or the [agent ID entry](https://developer.holochain.org/docs/glossary/#agent-id-entry) this entry contains the [agent ID](), your public key. The agent ID is crucial in proving who you are to others cell in the organism, other people running the same DNA.

## Happened before

Paged notebook

## Visibility


## Entry graph
With the help of headers you can build a graph


TOEVOEGEN source chain
uitleggen 


Now your DNA has instantiated and is finally a cell.

Click in source chain sim

Start adding stuff
prev and next header
- niet 1 type entry
- alle entries/headers door elkaar/ zoals ze worden gecreeerd
unforgeable - analogie blanco notebook met paginering



visibility


A holochain DNA has two places in which you can store data:

- One global and shared public DHT (with which we have been playing in the previous exercises).
- A private source-chain per each agent in the network.

.
You should think of the source chain a blank notebook, with numbered pages. 
Each header on one page. rip out a page -> chain broken.
Other can check your chain, because it's inside the DHT

There are a few rules: you can only use one page for one day and you always use the next one. So you cannot leave any blank pages between entries.



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
