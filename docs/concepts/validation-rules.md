# Concepts >> Validation Rules ||50

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  ZomeFnsResults,
  CallZomeFns,
  SourceChain,
  DhtCells,
  RunSteps,
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
customElements.define("run-steps", RunSteps);
```

```js story
let headerHash = undefined;
let dhtCells = undefined;
let dhtCells2 = undefined;
const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const steps = [
  {
    title: (context) =>
      `${context.conductors[0].name} (an honest agent) creates an entry`,
    run: async (context) => {
      dhtCells.workflowsToDisplay = [
        WorkflowType.CALL_ZOME,
        WorkflowType.APP_VALIDATION,
      ];
      dhtCells.networkRequestsToDisplay = [
        NetworkRequestType.PUBLISH_REQUEST,
        NetworkRequestType.WARRANT,
      ];
      dhtCells2.workflowsToDisplay = [
        WorkflowType.CALL_ZOME,
        WorkflowType.APP_VALIDATION,
      ];
      dhtCells2.networkRequestsToDisplay = [
        NetworkRequestType.PUBLISH_REQUEST,
        NetworkRequestType.WARRANT,
      ];

      await sleep(100);

      const cell = context.conductors[0].getAllCells()[0];
      headerHash = await context.conductors[0].callZomeFn({
        cellId: cell.cellId,
        zome: "demo_entries",
        fnName: "create_entry",
        payload: { content: "Good morning!" },
        cap: null,
      });
    },
  },
  {
    title: (context) =>
      `${context.conductors[1].name} (an honest agent) tries to update that same entry`,
    run: async (context) => {
      const cell = context.conductors[1].getAllCells()[0];
      context.updatePlayground({
        activeAgentPubKey: cell.agentPubKey,
      });

      try {
        await context.conductors[1].callZomeFn({
          cellId: cell.cellId,
          zome: "demo_entries",
          fnName: "update_entry",
          payload: {
            original_header_address: headerHash,
            new_content: "Bad morning!",
          },
          cap: null,
        });
      } catch (e) {}
    },
  },
  {
    title: (context) =>
      `${context.conductors[9].name} (a BAD AGENT!) updates that same entry`,
    run: async (context) => {
      const cell = context.conductors[9].getAllCells()[0];
      context.updatePlayground({
        activeAgentPubKey: cell.agentPubKey,
      });

      try {
        await context.conductors[9].callZomeFn({
          cellId: cell.cellId,
          zome: "demo_entries",
          fnName: "update_entry",
          payload: {
            original_header_address: headerHash,
            new_content: "Bad morning!",
          },
          cap: null,
        });
      } catch (e) {}
    },
  },
];
export const Simple1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${(e) => {
        const conductors = e.detail.conductors;

        conductors[9].setBadAgent({
          disable_validation_before_publish: true,
          pretend_invalid_elements_are_valid: true,
        });

        e.target.activeAgentPubKey = conductors[1].getAllCells()[0].agentPubKey;
        dhtCells = e.target.querySelector("#dht-cells");
      }}
    >
      <div
        style="display: flex; flex-direction: row; height: 700px; margin-bottom: 20px;"
      >
        <div
          style="display: flex; flex-direction: column; flex-basis: 250px; flex-grow: 0; margin-right: 20px;"
        >
          <run-steps style="flex: 1; margin-bottom: 20px;" .steps=${steps}>
          </run-steps>
          <source-chain style="flex: 1"></source-chain>
        </div>
        <dht-cells
          show-zome-fn-success
          id="dht-cells"
          style="width: 800px"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
          step-by-step
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `;
};
```

But that surely cannot sustain a 51% attack... can it?

```js story
export const Simple2 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${10}
      @ready=${(e) => {
        const conductors = e.detail.conductors;
          

        for (let i = 4; i < 10; i++) {
          conductors[i].setBadAgent({
            disable_validation_before_publish: true,
            pretend_invalid_elements_are_valid: true,
          });
        }

        e.target.activeAgentPubKey = conductors[1].getAllCells()[0].agentPubKey;
        dhtCells2 = e.target.querySelector("#dht-cells2");
      }}
    >
      <div
        style="display: flex; flex-direction: row; height: 800px; margin-bottom: 20px;"
      >
        <div
          style="display: flex; flex-direction: column; flex-basis: 250px; flex-grow: 0; margin-right: 20px;"
        >
          <run-steps style="flex: 1; margin-bottom: 20px;" .steps=${steps}>
          </run-steps>
          <source-chain style="flex: 1"></source-chain>
        </div>
        <dht-cells
          show-zome-fn-success
          id="dht-cells2"
          style="width: 800px"
          .workflowsToDisplay=${[]}
          .networkRequestsToDisplay=${[]}
          step-by-step
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `;
};
```

// challenge: try to attack a holochain network: given some validation rules, convert an agent into a bad actor and try to cheat. Look what happens to the network
