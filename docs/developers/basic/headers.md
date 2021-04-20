# Basic >> Headers ||104

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
customElements.define("zome-fns-results", ZomeFnsResults);
customElements.define("source-chain", SourceChain);
customElements.define("dht-cells", DhtCells);
```

## Recap

By now you know what entries are, how you save them in your holochain app, retrieve them and even write a test for a zome function. And you took a long and hard look at hashes. Perhaps they were not new to you, but they are such a crucial aspect of any holochain app, that it couldn't hurt to refresh those muscles. So on to the next topic: headers.

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
export const Sim0 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDna0}
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

When you click on the blue square, you will see a blob of json data, similar to the one you see below. The response you get is something that is called an **element** in Holochain language.

You will see that there are 2 top level objects: entry and signed_header. The signed_header consists of a header and a signature. You can ignore the latter for now. Before we talk about the header, take one more look at the entry. What do you notice?

```json
{
  "entry": {
    "entry_type": "App",
    "content": "Yes I did my workout today"
  },
  "signed_header": {
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
}
```

Well the most striking aspect of the entry is its simplicity. This is by design. Remember that the entry is stored and retrieved based on its hash, the content adressable stuff... Well if you and I and 100 others want to store a picture of Wangari Maathai in our Holochain app then there is no need to store it 102 times. One copy would be enough.

So the main idea is: keep entries simple, so they are efficient to store and retrieve. An entry can tell you two things

1. what type of entry it is: Agent, App, CapClaim, CapGrant
2. what the content of the entry is

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

## Getting ready

So let's get to work with headers and entries. This time you are going to make a simple snacking journal app. Imagine you recently joined a gym and apart from working out you also want to start eating more healthy. You decide to limit your unhealthy snacks. And of course doing that is always easier with an app.

To start you will need to implement these functions: `register_snacking`, `get_by_entry_hash` and `get_by_header_hash`. The first function is for making a note, a `snacking_log`, at the end of each day you failed to stay snack-free. The latter two are, admittingly rather technical ways, to retrieve a snacking_log.

Let's do a dry run in the simulation gym.

- Select "register*snacking" in the CallZomeFns below, type `april 2: lemon pie` in the input and click \_EXECUTE*.
- Next: add `april 4: chocolate` and `april 5: marshmallows`
- In the Entry Graph, click on one of the newly added snacking_log entries and copy the value of Entry hash.
- Select "get*by_entry_hash" in the CallZomeFns, put in the hash and click \_EXECUTE*. And double check to see if you get the right snacking_log.
- Next copy one of the header hashes, select "get*by_header_hash" in the CallZomeFns, put in the hash and click \_EXECUTE*. And double check to see if get the snacking_log you expected.

```js story
const simulatedDna1 = {
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
        get_by_entry_hash: {
          call: ({ get }) => ({ hash }) => {
            return get(hash);
          },
          arguments: [{ name: "hash", type: "EntryHash" }],
        },
        get_by_header_hash: {
          call: ({ get }) => ({ hash }) => {
            return get(hash);
          },
          arguments: [{ name: "hash", type: "HeaderHash" }],
        },
      },
    },
  ],
};
export const Sim1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDna1}
      @ready=${(e) => {
        const conductor1 = e.detail.conductors[0];

        const cell1 = conductor1.getAllCells()[0];

        e.target.activeAgentPubKey = cell1.cellId[1];
      }}
    >
      <div
        style="display: flex; height: 400px; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px; height: 100%;"
          hide-agent-pub-key
        >
        </call-zome-fns>

        <zome-fns-results style="flex: 1; height: 100%;"></zome-fns-results>
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

_Ok, it is time to start stretching._

It is up to you to implement the `register_snacking`, `get_by_entry_hash` and `get_by_header_hash` functions.
The function `register_snacking` requires some extra attention. You need to return both the header hash and the entry hash. We need this so we have the right hashes to test `get_by_entry_hash` and `get_by_header_hash`. We added this struct for you to use to return both hashes to the calling code in the test.

```Rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct HeaderAndEntryHash {
    entry_hash: EntryHashB64,
    header_hash: HeaderHashB64
}
```

A few more tips:

- Hashes are basic arrays with bytes. An easier way to send hashes back and forth between your UI, or, in our case, tests, and the zome code is to use encode the array as a Base64 string. You can use `holo_hash::HeaderHashB64` & `holo_hash::EntryHashB64`.
- Returning stuff to the UI or tests is always done inside [ExternResult](https://docs.rs/hdk/0.0.100/hdk/map_extern/type.ExternResult.html)

- [`get`](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html) returns a [ExternResult<Option<Element>>](https://docs.rs/hdk/0.0.100/hdk/map_extern/type.ExternResult.html). So if you call [`get`](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html) at the end of a external function it works smoothly, because at the end of externally accessed function, you need to return a ExternResult. But if you want to use the `Element` inside your function somehow, you need to unwrap the `Option`. And in Rust that means you need to handle the error. For instance like this:

```
  .ok_or(WasmError::Guest(String::from("Could not find SnackingLog for entry hash")))?;
```

Why **WasmError::Guest**?

The Rust code in our zome is compiled to a WASM binary. The holochain conductor runs this binary in a sort of virtual machine. The conductor is the host and your zome is the guest. That is why you need to handle possible errors in this way.

Look at the tests or in previous exercises if you need some inspiration. And if you really get lost, you can always take a look at the solution branch in git.

## Experiment

After you are done implementing the 3 functions, you can, by way of experiment, change the tests so that you use a header hash in the `get_by_entry_hash` function instead of a entry hash and see what happens.

_Spoiler_  
Although the HDK uses the same function to get an element with an entry based on an entry hash or a header hash: [get](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html) it won't work if you try to change the test. But it is interesting to see how it fails.

## Extra

You have to tackle one extra challenge which we didn't cover in the simulation. `get_by_entry_hash` and `get_by_header_hash` are good ways to retrieve a snacking log. But what happens if you know the content of the entry but not the header hash?
Implement a function `get_header_hash_by_content` that returns the header hash based on the content of the entry. The last test in the exercise passes in "april 2: lemon pie" as a String and you need to return the right header hash. You did something very similar in the hashes exercise...

<inline-notification type="tip" title="Exercise">

1. Add the right imports
2. Check if you are still inside the nix-shell  
   _Your terminal should similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`
3. Add a struct `SnackingLog`
4. Implement `register_snacking`, `get_by_entry_hash` and `get_by_header_hash`
5. Implement `get_header_hash_by_content`
6. Compile your code: `./run_build.sh`
7. Run the test: `./run_tests.sh`
8. Don't stop until the tests run green

</inline-notification>

### Relevant HDK documentation:

- [create_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html).
- [hash_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.hash_entry.html).
- [get](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html)
- [Header](https://docs.rs/hdk/0.0.100/hdk/prelude/enum.Header.html)
- [HeaderHash](https://docs.rs/hdk/0.0.100/hdk/prelude/type.HeaderHash.html)

# Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

_Nothing added for now_

For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or
your favorite search engine

## Solution

If you get stuck implementing this exercise, you can always look at its [solution](https://github.com/holochain-gym/developer-exercises/tree/solution/basic/3.headers).
