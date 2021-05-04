# Concepts >> Querying your Source-Chain ||20

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

## Recap

You learned about entries and headers: two of the most basic building blocks in any holochain app and experienced first hand, while solving the exercises, that hashes are the glue that holds everything together. We briefly mentioned something about hash tables and the DHT. You can learn more about the DHT [here](/developers/intermediate/DHT).

## Source chain

The Source chain. It sounds like something out of a scifi movie or a fantasy novel. And it is in fact a large part of what makes holochain unique. It's where some of the magic happens.

The [glossary](https://developer.holochain.org/docs/glossary/#source-chain) explains it the following way:

> A hash chain of elements committed by an agent. Every agent has a separate source chain for each of the cells they’re running, which stores all of the actions they’ve taken in that cell.

_Let's unpack this_

When you download a compiled [DNA](https://developer.holochain.org/docs/glossary/#dna), a [WASM](https://developer.holochain.org/docs/glossary/#webassembly-wasm) binary, from somewhere or when you compile it locally and you run this DNA in a holochain [conductor](https://developer.holochain.org/docs/glossary/#conductor) that is running on your machine, then this DNA would be instantiated and linked to your [agent ID](https://developer.holochain.org/docs/glossary/#agent-id). That thing is a [cell](https://developer.holochain.org/docs/glossary/#cell).

If you want to keep things simple in your head, you can just say "when you run a DNA". A DNA can consist of one or more zomes. All our exercises so far only contained one zome, the one you compiled from `zomes/exercise/lib.rs`. For the sake of simplicity we will keep on pretending every DNA has just one [zome](https://developer.holochain.org/docs/glossary/#zome). For now.

Now for the crucial part: "**stores all of the actions**". Every action, which in holochain speak means: every header and entry, that are produced by you, the agent, will become a part of the source chain, for as long as that agent has that DNA installed.
Whenever a new action is committed (creating entries or links, updating...) a new element is added to that chain, with its header referencing the previous one.
Essentially, the source-chain is a **hash-chain of all the actions that a particular agent has committed in this DNA**.

Perhaps this does sounds like some weird form of magic.
Head over to the simulation where you will see that, underneath, it is just headers and entries.

## Subconscious

Even before you add your first entries, like you did in the [entries exercise](/basis/entries), 3 headers and 1 entry will be created automatically in your holochain app. These 4 elements, the [genesis events](https://developer.holochain.org/docs/glossary/#genesis-elements) are created by what you call the **subconscious** of your holochain app. When you talk about the subconscious of your holochain app, you are talking about all the entries, headers, DHT operations and validations that happen that are not actively, _consciously_, triggered by you, the user.

The 3 headers and 1 entry are created when the happ is installed, the moment when your DNA is instantiated into a cell. Click on the headers and the entry below to learn more about them.

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
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp0}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];
      }}
    >
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

- **DNA** is a special type of header that marks the beginning of your source chain. In contrast to other headers it doesn't have a `header_seq` or a `prev_header` field, because it is the very first header in your holochain app. If a 1000 people run the same [DNA](https://developer.holochain.org/docs/glossary/#dna) all of their holochain apps will have the same first header. And that is important, because that means you are, just like in real life, part of the same organism. In the world of holochain apps that means you share the same DHT through which you share data, through which you collaborate. **Same DNA, same DHT. Different DNA, different DHT**

- **AgentValidationPkg** is important in deciding who is allowed to become part of the organism. It could be open access, as in, everyone with the same DNA can participate. But you can construct a [membrane](https://developer.holochain.org/docs/glossary/#membrane) around your organism that controls who or under which conditions someone can participate. It is a very interesting part of a holochain app, but also a more advanced topic.

- **Create header** is just a simple header of type CREATE. The only special thing is that it points to an entry of type AGENT

- **Agent entry** or the [agent ID entry](https://developer.holochain.org/docs/glossary/#agent-id-entry), this entry contains the [agent ID](https://developer.holochain.org/docs/glossary/#agent-id), your public key. The agent ID is crucial in proving who you are to others cell in the organism, other people running the same DNA.

You can think of the source chain as a blank notebook with page numbers. If you use it to record events, one event on one page, and you never skip a page, you are effectively using your notebook as a ledger. This gives your notebook some interesting properties. If you open a page on a specific event, you can find out what happened right before. And if you hand your notebook to someone, that someone can inspect your notebook to see if you removed a page or not, just by looking at the page numbers. The `prev_header` field in the headers acts like a page number. This is useful if another person is trying to validate if your notebook is telling the _complete_ truth of what you wrote down in there.

## Happened before

_Let's put this in to practice_

In the [headers exercise](/basic/headers) you built the zome for a simple snacking logger app. The simulation below already contains your snacking logs.

- Click on all the entries (grey rounded squares) to see what you snacked recently
- Click on the headers (blue circles) and look at `hash` in the header and at the `prev_header` value. Notice how they form a **flawless chain**, all the way down to the DNA header.
- Select "register*snacking" in the CallZomeFns below, type `april 3: ice cream` in the input and click \_EXECUTE*. You will see that the new header is added at the end of the chain. It is impossible to insert something in the middle of your chain. That would break your chain and make it invalid. So regardless of any dates or timestamp in the entry or header, a new header will always added at the end. Your source chain is **append only**. You can never hide the fact that you ate lemon pie on april 2nd. And you cannot deny that you logged `april 3: ice cream` after you logged `april 5: marsmallows`.
- Select "say*greeting" in the CallZomeFns below, type `Hello world` in the input and click \_EXECUTE*. Your source chain can contain any entry type that you defined in your zomes. It does not matter if your entries are a snacking_log, a greeting_text or anything else. You can **mix entries of different types**, the headers will always appear in your source chain in the same order as they were created.

```js story
const simulatedDna1 = {
  zomes: [
    {
      name: "mixed",
      entry_defs: [
        {
          id: "snacking_log",
          visibility: "Public",
        },
        {
          id: "greeting_text",
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
        say_greeting: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            return create_entry({ content, entry_def_id: "greeting_text" });
          },
          arguments: [{ name: "content", type: "String" }],
        },
      },
    },
  ],
};

const simulatedHapp1 = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: {
        zomes: [simulatedDna1],
      },
      deferred: false,
    },
  },
};
export const Sim1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp1}
      @ready=${(e) => {
        const conductor1 = e.detail.conductors[0];

        const cell1 = conductor1.getAllCells()[0];

        e.target.activeAgentPubKey = cell1.cellId[1];

        conductor1
          .callZomeFn({
            cellId: cell1.cellId,
            zome: "mixed",
            fnName: "register_snacking",
            payload: { content: "april 1: gummi bears" },
            cap: null,
          })
          .then(() =>
            conductor1.callZomeFn({
              cellId: cell1.cellId,
              zome: "mixed",
              fnName: "register_snacking",
              payload: { content: "april 2: lemon pie" },
              cap: null,
            })
          )
          .then(() =>
            conductor1.callZomeFn({
              cellId: cell1.cellId,
              zome: "mixed",
              fnName: "register_snacking",
              payload: { content: "april 4: chocolat" },
              cap: null,
            })
          )
          .then(() =>
            conductor1.callZomeFn({
              cellId: cell1.cellId,
              zome: "mixed",
              fnName: "register_snacking",
              payload: { content: "april 5: marsmallows" },
              cap: null,
            })
          );
      }}
    >
      <div
        style="display: flex; height: 300px; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px; height: 100%;"
          hide-agent-pub-key
        >
        </call-zome-fns>

        <zome-fns-results
          style="flex: 1; height: 100%;"
          hide-agent-pub-key
        ></zome-fns-results>
      </div>
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

## Exercise

This time we will do some lightweight exercises, just to get a feel for the chain part of our source chain. You need to implement 3 functions.

- `is_previous_header_hash` if you give your zome 2 hashes, it will answer if the second header hash is the previous, a direct parent, of the first header hash.
- `happened_before` does the same as the above function, but it is not limited to the direct parent. I will determine is the second hash is an ancestor. So it is not limited to the direct parent.
- `get_header_sequence_number` the header contains a field header_seq, which contains the sequence number of the header in the chain. The very first header, the DNA header, does not have this field. You could say it is implicitly zero. The next header starts counting at one. Imagine your UI is loading all the headers to show. In that case it can come in handy if you have an idea of where in the chain you are.

<inline-notification type="tip" title="Exercise">

1. Check if you are still inside the nix-shell  
   _Your terminal should look similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`
2. Implement `is_previous_header_hash`, `happened_before`, `get_header_sequence_number`
3. Compile your code: `./run_build.sh`
4. Run the test: `./run_tests.sh`
5. Don't stop until the tests run green

</inline-notification>

### Relevant HDK documentation:

- [create_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html).
- [hash_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.hash_entry.html).
- [get](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html)
- [HeaderHash](https://docs.rs/hdk/0.0.100/hdk/prelude/type.HeaderHash.html)

# Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

_Nothing added for now_

For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or
your favorite search engine

## Solution

If you get stuck implementing this exercise, you can always look at its [solution](https://github.com/holochain-gym/developer-exercises/tree/solution/basic/4.source-chain).
