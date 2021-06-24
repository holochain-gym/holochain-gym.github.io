# Intermediate >> Anchors ||201

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
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
<li><a href="/concepts/entry-graph/">Gym: Entry Graph</a></li>
<li><a href="https://developer.holochain.org/concepts/5_links_anchors/">Core Concepts: links and anchors</a></li>
</ul>
</inline-notification>

## What is an anchor?

You can think of anchors as an entry that every user knows the hash of. As the name implies, it acts as an 'anchor' with which we can link other entries to in order to create queries for things every user will need to access, for example, every user or post in the system.

## Try it!

Here you can try out a system where every post that is created gets linked to an anchor for posts.

```js story
const sampleZome1 = {
  name: "sample",
  entry_defs: [
    {
      id: "post",
      visibility: "Public",
    },
    {
      id: "anchor",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_post: {
      call:
        (hdk) =>
        async ({ content }) => {
          await hdk.create_entry({
            content,
            entry_def_id: "post",
          });
          await hdk.create_entry({
            content: "POSTS",
            entry_def_id: "anchor",
          });
          const anchorHash = await hdk.hash_entry({ content: "ALL_POSTS" });

          const postHash = await hdk.hash_entry({ content });

          await hdk.create_link({
            base: anchorHash,
            target: postHash,
            tag: null,
          });

          return postHash;
        },
      arguments: [{ name: "content", type: "String" }],
    },
    get_all_posts: {
      call:
        ({ get_links, hash_entry, get }) =>
        async () => {
          const links = await get_links(
            await hash_entry({ content: "ALL_POSTS" })
          );

          const promises = links.map((link) => get(link.target));
          return Promise.all(promises);
        },
      arguments: [],
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
        style="display: flex; flex-direction: row; height: 350px;margin-bottom: 20px;"
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
      <entry-graph
        hide-filter
        show-entry-contents
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px; margin-bottom: 24px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `;
};
```

<inline-notification type="warning" title="Including anchors in zomes">
Keep in mind that anchors are already incorporated in the core hdk, so you don't need to import them from an external library. Although it is necessary to define them as an entry definition in your zome like this:

```rust
entry_defs![
    Anchor::entry_def(),
    ...
];
```

</inline-notification>

## Exercise

For this exercise we will be implementing the above example.

1. `create_post`: creates a post and attaches it to an anchor for posts.

- Define an anchor with [`anchor`](https://docs.rs/hdk/0.0.100/hdk/hash_path/anchor/index.html) type = `ALL_POSTS` and text = `ALL_POSTS`. This will already internally create the anchor for you.
- Create the post entry, and calculate its hash.
- Create a link from the anchor entry to the post entry.

2. `get_all_posts` queries the links of the posts anchor and returns all the posts.

- Calculate the anchor entry hash.
- Get the links from the anchor entry to all the posts.
- For every target in these links, do a `get` to retrieve the posts.

<inline-notification type="tip" title="Exercise">

1. Check if you are still inside the nix-shell.
   _Your terminal should look similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`
2. Implement `create_post`, `get_all_posts`.
3. Compile and test your code: `cd tests && npm install && npm test`.
4. Don't stop until the tests run green.

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.hash_entry.html">`hash_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/link/fn.create_link.html">`create_link`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/link/fn.get_links.html">`get_links`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/hash_path/anchor/index.html">`anchors`</a></li>
</ul>
</inline-notification>
