# Concepts >> Entry Graph ||30

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  EntryContents,
  HolochainPlaygroundContainer,
  EntryGraph,
  CallZomeFns,
  ZomeFnsResults,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("zome-fns-results", ZomeFnsResults);
```

**TLDR: you can think of data stored in the DHT as a graph database, with entries as nodes and links defining relationships between entries**.

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="https://developer.holochain.org/concepts/5_links_anchors/">Core Concepts: Links and anchors</a></li>
<li><a href="https://en.wikipedia.org/wiki/Graph_database">Graph database</a></li>
</ul>
</inline-notification>

# Entry Graph

How does shared data in the DHT look like?

The easiest way you can think about how data is structured in a Holochain **application is like a graph database**.

From all the actions taken from all the Source-Chains, each neighbor in the DHT aggregates them distributely to form an `Entry Graph`.

There are two main primitives that build this graph:

- Entries: an entry is a node in the graph.
- Links: a link connects two entries together. They are directed: they go from a base entry hash to a target entry hash.

## Try it!

You can try creating some entries:

1. Select the `create_entry` function, set a parameter and click execute.
   - See how an entry gets created in the entry graph.
2. Click on the entry.
   - See how the entry's contents are displayed.
3. Create a second entry.
   - Watch out! The content for the second entry has to be different than the first one if you want the entries to be different - entries are hashed!
4. Select the `create_link` function.
5. Copy the hash of one of the entries from the `Entry Contents` panel, and paste it as the `base` parameter of the `create_link` function.
6. Select the other entry, and copy the hash its hash to the `target` parameter of the `create_link` function.
7. Click `Execute`.
   - See how the two entries are now linked together.

```js story
const simulatedDna = {
  zomes: [
    {
      name: "entries",
      entry_defs: [
        {
          id: "sample",
          visibility: "Public",
        },
      ],
      validation_functions: {},
      zome_functions: {
        create_entry: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            await create_entry({ content, entry_def_id: "sample" });
            return hash_entry({ content });
          },
          arguments: [{ name: "content", type: "String" }],
        },
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
      },
    },
  ],
};
const simulatedHapp = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: simulatedDna,
      deferred: false,
    },
  },
};
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="height: 350px; margin-right: 20px;"
          hide-agent-pub-key
          hide-zome-selector
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 350px;">
        </entry-contents>
      </div>
      <entry-graph
        show-entry-contents
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px; margin-bottom: 60px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `;
};
```

## Thinking about data in your hApp

One of the most important steps that you have to take when designing your hApp is think about your entry relationship graph. Normally, you would expose zome functions that do multiple things, instead of creating just one entry.

This is an example design for a forum app. In this case, we have chosen to have a `create_post` function, that creates the post entry, creates a global "all_posts" entry, and creates a link from that global entry to the post entry.

Try to create some posts and look at how the graph of entries is created and grows with each post.

```js story
const sampleZome1 = {
  name: "sample",
  entry_defs: [
    {
      id: "post",
      visibility: "Public",
    },
    {
      id: "path",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_post: {
      call: (hdk) => async ({ content, tag1, tag2 }) => {
        await hdk.create_entry({
          content,
          entry_def_id: "post",
        });
        const postHash = await hdk.hash_entry({ content });
        const pathContent = `all_posts`;
        await hdk.path.ensure(pathContent);
        const tagPathHash = await hdk.hash_entry({ content: pathContent });

        await hdk.create_link({
          base: tagPathHash,
          target: postHash,
          tag: null,
        });

        return postHash;
      },
      arguments: [{ name: "content", type: "String" }],
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
export const Exercise = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp1}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <div
        style="display: flex; height: 400px; flex-direction: row; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <zome-fns-results style="flex: 1;"></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; margin-bottom: 20px; height: 500px;"
      >
        <entry-graph
          hide-filter
          show-entry-contents
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; margin-right: 20px;"
        >
        </entry-graph>
        <entry-contents style="flex: 1; "> </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```
