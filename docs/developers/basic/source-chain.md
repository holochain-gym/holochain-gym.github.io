# Basic >> Querying the Source Chain ||105

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

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="/concepts/dna-zomes/">Gym: Dnas and Zomes</a></li>
<li><a href="/concepts/source-chain/">Gym: Source Chain</a></li>
</ul>
</inline-notification>

## Recap

You learned about entries and headers: two of the most basic building blocks in any holochain app and experienced first hand, while solving the exercises, that hashes are the glue that holds everything together. We briefly mentioned something about hash tables and the DHT. You can learn more about the DHT [here](/concepts/dht/).

## Headers

Headers are a delightful topic. Knowing how to work with headers will give you great flexibility! And what is strength without flexibility...  
In one of the previous exercises you already saw some header stuff passing by. So let's take a look at them again.

In the simulation below we already added one entry.

First click on the grey rounded square with the text `snacking_log`. This should look familiar. It is just an entry. Then click on the top most blue circle with the text 'Create' that points directly to the entry. And look at what you see on the righthand side in the Header Contents panel.

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

const simulatedHapp = {
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
      .simulatedHapp=${simulatedHapp}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];

        conductor.callZomeFn({
          cellId: cell.cellId,
          zome: "snacking_journal",
          fnName: "register_snacking",
          payload: { content: "april 1: gummi bears" },
          cap: null,
        });
      }}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 720px; margin-right: 20px;">
        </source-chain>
        <entry-contents style="flex-basis: 550px; height: 720px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

When you click on the blue square, you will see a blob of json data, similar to the one you see below. The response you get is something that is called a **header** in Holochain language.

```json
{
  "header": {
    "content": {
      "author": "uhCAk4EP68467-xI_YMR4wO6jYjr3spY5Dvw165WF_aD2Ng8",
      "header_seq": 3,
      "prev_header": "uhCkkK6ag489p016T64YVrN2SyjdM6bY41Kt4RNEM3AKY7_w",
      "timestamp": [
        1616571211,
        293000
      ],
      "entry_hash": "uhCEkEPwEe57YM0PFD1Iy3m0eDD1iHPOcesa-ktpjULuImfE",
      "entry_type": {
        "App": {
          "id": 0,
          "zome_id": 0,
          "visibility": "Public"
        }
      },
      "type": "Create"
    },
    "hash": "uhCkkf9mOVrLftiyHHnXSpZ49l_JyMhi0Qw-SUosIMMBfmVo"
  },
  "signature":
}
```

An entry does not tell you who created the entry, when it was created or any other useful information. This is where the header comes in. You could think of an header as a kind of metadata.

Let's take a look what we can decypher from the example above.

- **author**: the public key of the agent (cell) that signed the entry. This is a crucial component to prove to others you are really the author of this entry. Luckily it is all added automatically.
- **timestamp**: timestamp of when this entry was committed. It will state the time for when the entry was created. This the time of a specific machine, not some universal, global atomic clock. The time is in UTC, so no timezone information. And the format is a combination of standard Linux Epoch Time e.g._1616571211_ combined with elapsed nanoseconds, e.g._293000_. While all this is very helpful to know, it cannot -reliably- be used to order events. Clocks on machine can be skewed, changed manually or do funny stuff on new years eve.
- **header_seq** & **prev_header** are a better way to determine order. We will talk about them in another exercise.
- **type** indicates what type of header this is. There are a number of header types:
  - Dna
  - AgentValidationPkg
  - InitZomesComplete
  - CreateLink
  - DeleteLink
  - Create
  - Update
  - Delete

In this exercise you will only have to deal with `Create`. All headers have the above mentioned fields, with one small exception of the Dna header, which doesn't have a prev_header, for the very simple reason that it is always the first header to be created in a holochain app.

And some headers have some extra fields. Create and Update have 2 more fields. And not surprisingly these fields tell something about entries. Because entries a very lightweight and most of the metadata is in the header, like author, timestamp, etcetera there has to be a link between an entry and its header.

- **entry_hash** is the hash of the entry. It is exactly the same hash you worked with in the previous exercise. And since you can get the entry based on its hash, it is enough to store the entry hash inside the header. This makes a header a lightweight data structure. Whether your entry contains a 25000 page document or just a single "Hello world" string, the size of the header will be roughly the same size. That is why entries and headers make such a good team: _**entries are simple, headers are light**_.
- **entry_type**: contains some additional information on about the entry itself, like the id of the hApp, the id of the zome, it's visibility. We touch on this in a future exercise.

- **hash** And last but not least a header has is own hash. Just like entry, the hash of the header is completely determined by its content. Change one letter in the header and the headerhash will be completely different.

## Source Chain

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

Even before you add your first entries, like you did in the [entries exercise](/developers/basic/entries/), 3 headers and 1 entry will be created automatically in your holochain app. These 4 elements, the [genesis events](https://developer.holochain.org/docs/glossary/#genesis-elements) are created by what you call the **subconscious** of your holochain app. When you talk about the subconscious of your holochain app, you are talking about all the entries, headers, DHT operations and validations that happen that are not actively, _consciously_, triggered by you, the user.

The 3 headers and 1 entry are created when the happ is installed, the moment when your DNA is instantiated into a cell. Click on the headers and the entry below to learn more about them.

```js story
export const Sim1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp}
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

In the [elements exercise](/developers/basic/elements/) you built the zome for a simple snacking logger app. The simulation below already contains your snacking logs.

- Click on all the entries (grey rounded squares) to see what you snacked recently
- Click on the headers (blue circles) and look at `hash` in the header and at the `prev_header` value. Notice how they form a **flawless chain**, all the way down to the DNA header.
- Select "register_snacking" in the CallZomeFns below, type `april 3: ice cream` in the input and click \_EXECUTE\*. You will see that the new header is added at the end of the chain. It is impossible to insert something in the middle of your chain. That would break your chain and make it invalid. So regardless of any dates or timestamp in the entry or header, a new header will always added at the end. Your source chain is **append only**. You can never hide the fact that you ate lemon pie on april 2nd. And you cannot deny that you logged `april 3: ice cream` after you logged `april 5: marsmallows`.
- Select "say_greeting" in the CallZomeFns below, type `Hello world` in the input and click \_EXECUTE\*. Your source chain can contain any entry type that you defined in your zomes. It does not matter if your entries are a snacking_log, a greeting_text or anything else. You can **mix entries of different types**, the headers will always appear in your source chain in the same order as they were created.
- Select "query_all" in the CallZomeFns, and execute it. See that the result for the function is the list of all the elements that are committed in your source chain.

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
        query_all: {
          call: ({ query }) => async () => {
            return query({});
          },
          arguments: [],
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
      dna: simulatedDna1,
      deferred: false,
    },
  },
};
export const Sim2 = () => {
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

- `query_all_elements` returns the full array of elements contained in the source chain of the agent.
- `query_snackings` queries the source chain and returns only the elements that contain a `Snacking` entry. WARNING! This query should also [return the entries themselves](https://docs.rs/hdk/0.0.100/hdk/prelude/struct.ChainQueryFilter.html#method.include_entries).
- `query_by_time` queries the source chain and filters it by a time range of when the element was committed.

<inline-notification type="tip" title="Exercise">

1. Check if you are still inside the nix-shell  
   _Your terminal should look similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`
2. Implement `query_all_elements`, `query_snackings`, `query_by_time`
3. Compile and test your code: `cd tests && npm install && npm test`
4. Don't stop until the tests run green

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/prelude/type.HeaderHash.html">`HeaderHash`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/chain/fn.query.html">`query`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/prelude/struct.ChainQueryFilter.html">`ChainQueryFilter`</a></li>
</ul>
</inline-notification>

# Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or
your favorite search engine.
