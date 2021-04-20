# Intermediate >> Paths ||202

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  EntryContents,
  HolochainPlaygroundContainer,
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

Paths are the replacement of anchors in RSM. They fill the same role but add a lot more flexibility and dimensionality, and allow you to create complex indexes to query faster the DHT very easily.

The content of each path is a string with segments separated by a dot, for example: `all_tasks.project1.finished`. This path will create these entries:

- `all_tasks`
- `all_tasks.project1`
- `all_tasks.project1.finished`

Here, you can see that the root parent of the path is `all_tasks`, which has `all_tasks.project1` as child. Each of these entries has a hash in the DHT like any other entry. Also, every parent will have a link pointing to all its children.

## Try it!

Here you can create paths yourself, and see which entries and links are created.

```js story
const sampleZome = {
  name: "sample",
  entry_defs: [
    {
      id: "path",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    create_path: {
      call: (hdk) => ({ path }) => {
        return hdk.path.ensure(path);
      },
      arguments: [{ name: "path", type: "String" }],
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
          style="height: 250px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 250px;">
        </entry-contents>
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

The basic mechanism for which these entries are useful is to attach links to them. If you attach a link to the `all_tasks.project1.finished` that points to all tasks related with `project1` that have finished, now you can do a `get_links` on that path to get only those.

If, on the contrary, you want to get all tasks within the project regardless of status, you can get all the children paths from `all_tasks.project1`, which will give you for example `all_tasks.project1.todo`, `all_tasks.project1.doing` and `all_tasks.project1.finished`, and then do a `get_links` to tasks on those.

You can imagine different types of indexes built on top of paths, with multidimensional properties.

<inline-notification type="warning" title="Including paths in zomes">
Keep in mind that paths are already incorporated in the core hdk, so you don't need to import them from an external library. Although it is necessary to define them as an entry definition in your zome like this:

```rust
entry_defs![
    Path::entry_def(),
    ...
];
```

</inline-notification>

## Exercise

### Problem statement

We need to code a small zome that satisfies these capabilities:

- Create a new post, passing a content and some tags
- Get all posts within a day or an hour, examples:
  - "get me all posts posted on 21st February, 2021"
  - "get me all posts posted between 21:00 and 22:00 of 21st February, 2021"
- Get all the tags that have been created
- Get all posts that have been created with a certain tag
  - "get me all posts that have been posted with the tag "nature""

You can follow this entry design to accomplish it:

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

        const date = new Date();
        const pathStr = `all_posts.${date.getUTCFullYear()}-${
          date.getMonth() + 1
        }-${date.getUTCDate()}.${date.getHours()}`;

        await hdk.path.ensure(pathStr);
        const pathHash = await hdk.hash_entry({ content: pathStr });

        await hdk.create_link({ base: pathHash, target: postHash, tag: null });

        for (const tag of [tag1, tag2]) {
          if (tag) {
            const pathContent = `all_tags.${tag}`;
            await hdk.path.ensure(pathContent);

            const tagPathHash = await hdk.hash_entry({ content: pathContent });
            await hdk.create_link({
              base: tagPathHash,
              target: postHash,
              tag: null,
            });
          }
        }

        return postHash;
      },
      arguments: [
        { name: "content", type: "String" },
        { name: "tag1", type: "String" },
        { name: "tag2", type: "String" },
      ],
    },
  },
};

const simulatedDnaTemplate1 = {
  zomes: [sampleZome1],
};
export const Exercise = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDnaTemplate1}
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
          style="height: 400px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 400px;">
        </entry-contents>
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

<inline-notification type="tip" title="Exercise">

1. Go to the `developer-exercises`.
2. Enter the nix-shell: `nix-shell`  
   _you should run this in the folder containing the default.nix file_  
   _starting the nix-shell for the very first time might take a long time, somewhere between 20 to 80 minutes, after that I will take just a few seconds_
3. Go to folder with the exercise `intermediate/1.paths`
4. Inside `zome/exercise/src/lib.rs`
   - Implement all `unimplemented!()` functions
5. Compile your code: `./run_build.sh`.
6. Run the test: `./run_tests.sh`
7. Don't stop until the test runs green

</inline-notification>

### Relevant HDK documentation:

- [create_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html).
- [Path](https://docs.rs/hdk/0.0.100/hdk/hash_path/path/struct.Path.html).
- [get_links](https://docs.rs/hdk/0.0.100/hdk/link/fn.get_links.html).

## Solution

If you get stuck implementing this exercise, you can always look at its [solution](https://github.com/holochain-gym/developer-exercises/tree/solution/intermediate/1.paths).
