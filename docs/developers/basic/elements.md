# Basic >> Getting Elements ||106

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

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="/concepts/source-chain/">Gym: Source Chain</a></li>
</ul>
</inline-notification>

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

const simulatedHapp1 = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: {
        zomes: [sampleZome1],
      },
      deferred: false,
    },
  },
};
export const Simple1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${4}
      .simulatedHapp=${simulatedHapp1}
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
   - See that only the first (= oldest) header is returned with the `get`. This is because, as the [`get` documentation](https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html) explains, `get` is the simplified version for getting things from the DHT, that only returns the "oldest live" header when getting an entry.
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

const simulatedHapp2 = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: {
        zomes: [sampleZome2],
      },
      deferred: false,
    },
  },
};
export const Simple2 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp2}
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
        <entry-contents style="flex-basis: 500px;"> </entry-contents>
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
Implement a function `get_all_headers_from_content` that returns the array of headers that have committed the entry with the given contents. The last test in the exercise passes in "april 2: lemon pie" as a String and you need to return the all the headers that have committed that same String. Hint: use `get_details`, and return an empty vector if `Details` is `None`.

<inline-notification type="tip" title="Exercise">

1. Add the right imports.
2. Check if you are still inside the nix-shell.
   _Your terminal should similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`
3. Add a struct `SnackingLog`.
4. Implement `register_snacking`, `get_by_entry_hash` and `get_by_header_hash`.
5. Implement `get_all_headers_from_content`.
6. Compile and test your code: `cd tests && npm install && npm test`.
7. Don't stop until the tests run green.

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/prelude/enum.Header.html">`Header`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/prelude/type.HeaderHash.html">`HeaderHash`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.hash_entry.html">`hash_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.get_details.html">`get_details`</a></li>
</ul>
</inline-notification>


# Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or
your favorite search engine.
