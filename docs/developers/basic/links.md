# Basic >> Links ||103

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
```

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
};

const simulatedDnaTemplate = {
  zomes: [sampleZome],
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
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="height: 350px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
          hide-results
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 350px;">
        </entry-contents>
      </div>
      <entry-graph
        hide-filter
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px; margin-bottom: 20px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `;
};
```

Great! Now you might be thinking: what do we do with links? Links are useful to attach metadata to entries, without having to change its content (and if we don't change the content, the hash doesn't change either).

Here we have some posts created, with a link from the author public key to all the posts they have created.

Try creating some posts and see how the entries behave, and try to do a `get_links` with the public key of the author to get the links to all the posts that that agent has created.

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
  zome_functions: {
    create_post: {
      call: ({ create_entry, hash_entry, create_link, agent_info }) => async ({
        content,
      }) => {
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
      call: ({ get_links }) => ({ base }) => {
        return get_links(base);
      },
      arguments: [{ name: "base", type: "EntryHash" }],
    },
  },
};

const simulatedDnaTemplate2 = {
  zomes: [sampleZome2],
};
export const Simple2 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDnaTemplate2}
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
      <call-zome-fns
        id="call-zome"
        style="height: 350px; margin-bottom: 20px;"
        hide-zome-selector
        hide-agent-pub-key
        selectedZomeFnName="get_links"
      >
      </call-zome-fns>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          style="flex: 1; height: 500px; margin-right: 20px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 500px; height: 350px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

Relevant HDK documentation:

- [create_link](https://docs.rs/hdk/0.0.100/hdk/link/fn.create_link.html).
- [get_links](https://docs.rs/hdk/0.0.100/hdk/link/fn.get_links.html).
