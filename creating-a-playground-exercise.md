# Creating a playground exercise

1. Go to the [playground documentation](https://holochain-playground.github.io/elements/?path=/story/call-zome-fns--simple).
   - See which components are available and their options.
   - This list may grow soon, but the elements that are there should be quite stable.
2. In the gym exercise, add this at the beginning of the markdown file:
````js
```js script
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
````

  - Import the elements that you need from the documentation. If you'd need some other element, submit an issue in the playground repository.

3. In the place that you want your interactive playground to appear, write the following:

````js
```js story
const sampleZome = {
  name: "helloworld",
  entry_defs: [
    {
      id: "greeting",
      visibility: "Public",
    },
  ],
  zome_functions: {
    // Here you can code whatever functions you want your dna to have
    say_greeting: {
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: "greeting" });
      },
      arguments: [{ name: "content", type: "String" }],
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
    <!-->Here you can put whatever elements you want to show<-->
      <div style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;">
        <call-zome-fns
          id="call-zome"
          style="height: 250px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
          hide-results
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 250px;"> </entry-contents>
      </div>
      <entry-graph
        show-entry-contents
        hide-filter
        .excludedEntryTypes=${["Agent"]}
        style="flex: 1; height: 500px;"
      >
      </entry-graph>
    </holochain-playground-container>
  `;
};
```
````


You can also look at the numerous examples that you have available in this repository.