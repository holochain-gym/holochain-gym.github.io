# Basic >> Attaching Links ||104

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SourceChain,
  ZomeFnsResults,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("zome-fns-results", ZomeFnsResults);
```

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="/concepts/entry-graph">Gym: Entry Graph</a></li>
<li><a href="https://developer.holochain.org/concepts/5_links_anchors/">Core Concepts: links and anchors</a></li>
</ul>
</inline-notification>

## What is a link?

A good way to think about the public DHT holochain data is like a graph: entries are nodes, and links are the edges that connect the entries.

A link has 3 basic properties:

- A base entry
- A target entry
- A tag with arbitrary content

## Try it!

To get a better sense of links, try creating a link between two entries:

1. Create an entry with some content with the `create_entry` function.
2. Create a different entry with the same function (remember, if you create an entry with the same content, it won't be a different entry).
3. Switch to the `create_link` function.
4. Click one of the entries from the graph. Copy the "Entry Hash" you see in "Entry Detail" and paste it in the `base` field.
5. Click on the other entry, and copy its hash to the `target` field.
6. If you want, input some example tag.
7. Click execute!

Now you should see the two entries linked together.

```js story
const sampleZome = {
  name: "links",
  entry_defs: [
    {
      id: "sample",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_entry: {
      call:
        ({ create_entry, hash_entry }) =>
        async ({ content }) => {
          await create_entry({ content, entry_def_id: "sample" });
          return hash_entry({ content });
        },
      arguments: [{ name: "content", type: "String" }],
    },
    create_link: {
      call:
        ({ create_link }) =>
        ({ base, target, tag }) => {
          return create_link({ base, target, tag });
        },
      arguments: [
        { name: "base", type: "EntryHash" },
        { name: "target", type: "EntryHash" },
        { name: "tag", type: "any" },
      ],
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
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 350px;">
        </entry-contents>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; height: 500px;"
        >
        </entry-graph>
      </div>
    </holochain-playground-container>
  `;
};
```

Great! Now you might be thinking: what do we do with links? Links are useful to attach metadata to entries, without having to change its content (and if we don't change the content, the hash doesn't change either).

Here we have some posts created, with a link from the author public key to all the posts they have created.

Try creating some posts and see how the entries behave, and try to do a `get_links` with the public key of the author to get the links to all the posts that that agent has created. You can get the public key of the author by clicking on the `Agent` entry and copying the hash of that entry. All agents create an initial `Agent` entry when they join the network, in order to be identified by other peers in that DHT.

```js story
const sampleZome2 = {
  name: "links",
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
      call:
        ({ create_entry, hash_entry, create_link, agent_info }) =>
        async ({ content }) => {
          await create_entry({ content, entry_def_id: "post" });

          const hash = await hash_entry({ content });

          const { agent_latest_pubkey } = await agent_info();

          await create_link({
            base: agent_latest_pubkey,
            target: hash,
            tag: "author",
          });

          return hash;
        },
      arguments: [{ name: "content", type: "String" }],
    },
    get_links: {
      call:
        ({ get_links }) =>
        ({ base }) => {
          return get_links(base);
        },
      arguments: [{ name: "base", type: "EntryHash" }],
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

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];

        conductor.callZomeFn({
          cellId: cell.cellId,
          zome: "links",
          fnName: "create_post",
          payload: { content: "Good morning!" },
          cap: null,
        });
      }}
    >
      <div
        style="display: flex; flex-direction: row; height: 350px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
          selectedZomeFnName="get_links"
        >
        </call-zome-fns>
        <zome-fns-results
          hide-agent-pub-key
          style="flex: 1;"
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          style="flex: 1; height: 500px; margin-right: 20px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 500px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

<inline-notification type="tip" title="Exercise">

1. Go to the `developer-exercises`.
2. Enter the nix-shell: `nix-shell`.
   _you should run this in the folder containing the default.nix file_.
   _starting the nix-shell for the very first time might take a long time, somewhere between 20 to 80 minutes, after that it will take just a few seconds_.
3. Implement the functions `create_post` and `get_posts_for_agent`.
4. Compile and test your code: `cd tests && npm install && npm test`.
5. Don't stop until the test runs green.

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.hash_entry.html">`hash_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/link/fn.create_link.html">`create_link`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/link/fn.get_links.html">`get_links`</a></li>
</ul>
</inline-notification>
