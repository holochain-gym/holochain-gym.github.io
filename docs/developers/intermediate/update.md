# Intermediate >> Update ||204

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
import {
  HolochainPlaygroundGoldenLayout,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SourceChain,
  ZomeFnsResults,
} from "@holochain-playground/elements";
import {
  GoldenLayoutRoot,
  GoldenLayoutRow,
  GoldenLayoutColumn,
  GoldenLayoutStack,
  GoldenLayoutComponent,
} from "@scoped-elements/golden-layout";

customElements.define(
  "holochain-playground-golden-layout",
  HolochainPlaygroundGoldenLayout
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("zome-fns-results", ZomeFnsResults);
customElements.define("golden-layout-root", GoldenLayoutRoot);
customElements.define("golden-layout-row", GoldenLayoutRow);
customElements.define("golden-layout-column", GoldenLayoutColumn);
customElements.define("golden-layout-stack", GoldenLayoutStack);
customElements.define("golden-layout-component", GoldenLayoutComponent);
```

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="/developers/basic/entries/">Gym: Creating Entries</a></li>
<li><a href="https://docs.rs/hdk/0.0.110/hdk/prelude/struct.Update.html">HDK Docs: Update header</a></li>
</ul>
</inline-notification>

## Updating Entries

Updates on entries are another basic primitive that Holochain offers via the HDK to hApp developers. It consists of **marking** an old entry as updated, and **creating** a new one with updated content.

It's important to understand this: the DHT is an append only store, in which you can't _really_ modify data. The only thing you can do is add new data that refers to old data in it.

So, when we _update_ an entry, **we are not modifying the contents of the original entry**, we are **creating a new entry** and **marking the old entry as updated by the new one**.

This means that if we for example do a `get` with the hash of the original entry, **we are going to get the contens of the original entry, even if that entry has been updated**.

So, let's see what updating an entry looks like:

```rust
use hdk::prelude::*;

#[hdk_entry(id = "post")]
struct Post(String);

entry_defs![Post::entry_def()];

#[hdk_extern]
fn create_post(post: Post) -> ExternResult<HeaderHash> {
    create_entry(post)
}

#[hdk_extern]
fn update_post(old_header_address: HeaderHash, new_post: Post) -> ExternResult<HeaderHash> {
    update_entry(old_header_address, new_post)
}
```

Do you see something interesting in the `update_post` function? **We are not really updating an entry, we are updating its header**!

Here you can start to see the importance of `Elements`, `Headers` and `HeaderHashes`: it's not enough to know the entry hash that we want to update, we need to know _which header created that entry_ in order to update it.

## Try it!

Here is a very simple interactive simulation of creating an update chain:

1. Click in one of the nodes.
2. Create an entry with arbritary content in `Call Zome Fns`.
3. Select its header in the `Entry Graph`, and see its contents in `Entry Contents`.
   - Copy the hash of the header by clicking on the "Copy" button inside that `Entry Contents` while having the header selected.
4. In `Call Zome Fns`, select the`update_entry` function.
5. In the `original_header_address` field, paste the header that you copied, and in `new_content` pass some arbritatry content as well.
6. See the `Entry Graph` that is created from these actions.

```js story
const sampleZome = {
  name: "helloworld",
  entry_defs: [
    {
      id: "demo_entry",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_entry: {
      call:
        ({ create_entry }) =>
        ({ content }) => {
          return create_entry({ content: content, entry_def_id: "demo_entry" });
        },
      arguments: [{ name: "content", type: "String" }],
    },
    update_entry: {
      call:
        ({ update_entry }) =>
        ({ original_header_address, new_content }) => {
          return update_entry(original_header_address, {
            content: new_content,
            entry_def_id: "demo_entry",
          });
        },
      arguments: [
        { name: "original_header_address", type: "HeaderHash" },
        { name: "new_content", type: "String" },
      ],
      get: {
        call:
          ({ get }) =>
          ({ hash }) => {
            return get(hash);
          },
        arguments: [{ name: "hash", type: "AnyDhtHash" }],
      },
    },
  },
};

const simulatedHapp = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: {
        zomes: [sampleZome],
      },
      deferred: false,
    },
  },
};
export const Simple = () => {
  return html`
    <holochain-playground-golden-layout
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <golden-layout-root style="flex: 1;">
        <golden-layout-column>
          <golden-layout-row>
            <golden-layout-component title="Call Zome Fns">
              <call-zome-fns
                id="call-zome"
                style="margin: 12px;"
                hide-zome-selector
                hide-agent-pub-key
              >
              </call-zome-fns>
            </golden-layout-component>

            <golden-layout-stack>
              <golden-layout-component title="Entry Contents">
                <entry-contents style="margin: 12px;"> </entry-contents>
              </golden-layout-component>

              <golden-layout-component title="Zome Fns Results">
                <zome-fns-results style="margin: 12px;"> </zome-fns-results>
              </golden-layout-component>
            </golden-layout-stack>
          </golden-layout-row>

          <golden-layout-component title="Entry Graph">
            <entry-graph
              hide-filter
              show-headers
              .excludedEntryTypes=${["Agent"]}
              style="margin: 12px;"
            >
            </entry-graph>
          </golden-layout-component>
        </golden-layout-column>
      </golden-layout-root>
    </holochain-playground-golden-layout>
  `;
};
```

You can play around with update chains for a while. You can also try to update the same entry multiple times! What happens then?
