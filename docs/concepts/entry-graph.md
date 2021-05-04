# Concepts >> Entry Graph ||30

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

```js story
export const Simple = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
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

Example of a forum app:

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
