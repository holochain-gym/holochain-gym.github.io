# Intermediate >> Paths ||10

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import { HolochainPlaygroundContainer } from "@holochain-playground/container";
import { EntryDetail } from "@holochain-playground/elements/dist/elements/entry-detail";
import { EntryGraph } from "@holochain-playground/elements/dist/elements/entry-graph";
import { CallZomeFns } from "@holochain-playground/elements/dist/elements/call-zome-fns";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-detail", EntryDetail);
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
  zome_functions: {
    create_path: {
      call: (hdk) => ({ path }) => {
        return hdk.path.ensure(path, hdk);
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

        conductor
          .callZomeFn({
            cellId,
            zome: "sample",
            fnName: "create_path",
            payload: { path: "a.sample.path" },
            cap: null,
          })
          .then(() =>
            conductor.callZomeFn({
              cellId,
              zome: "sample",
              fnName: "create_path",
              payload: { path: "a.sample.path2" },
              cap: null,
            })
          );
      }}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 150px; margin-bottom: 20px;"
        hide-results
        hide-zome-selector
      >
      </call-zome-fns>
      <entry-graph
        .showFilter=${false}
        .excludedEntryTypes=${["Agent"]}
        style="height: 600px; width: 100%; margin-bottom: 20px;"
      ></entry-graph>
      <entry-detail style="height: 250px; flex: 1; margin-bottom: 20px;">
      </entry-detail>
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

        await hdk.path.ensure(pathStr, hdk);
        const pathHash = await hdk.hash_entry({ content: pathStr });

        await hdk.create_link({ base: pathHash, target: postHash, tag: null });

        for (const tag of [tag1, tag2]) {
          if (tag) {
            const pathContent = `all_tags.${tag}`;
            await hdk.path.ensure(pathContent, hdk);

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
        conductor.callZomeFn({
          cellId,
          zome: "sample",
          fnName: "create_post",
          payload: { content: "good morning", tag1: "nature", tag2: "giraffe" },
          cap: null,
        });
      }}
    >
      <call-zome-fns
        id="call-zome"
        hide-results
        hide-zome-selector
        style="height: 300px; margin-bottom: 20px;"
      >
      </call-zome-fns>
      <entry-graph
        .excludedEntryTypes=${["Agent"]}
        .showFilter=${false}
        style="height: 600px; width: 100%; margin-bottom: 20px;"
      ></entry-graph>
      <entry-detail style="height: 250px; flex: 1; margin-bottom: 20px;">
      </entry-detail>
    </holochain-playground-container>
  `;
};
```

<inline-notification type="tip" title="Exercise">

1. Go to the [source code for the exercise](https://github.com/holochain-gym/developer-exercises/tree/master/intermediate/1.paths).
2. Implement all `unimplemented!()` functions in the exercise.
3. Run `npm test` to test your implementation.

</inline-notification>
