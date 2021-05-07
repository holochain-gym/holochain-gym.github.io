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

**TLDR: the most important part of a DNA is the Validation Rules (rules of the game), which determine which actions are valid and which aren't. If someone tries to break them, an immune response is triggered.**

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="https://developer.holochain.org/concepts/7_validation/">Core Concepts: Validation Rules</a></li>
<li><a href="https://en.wikipedia.org/wiki/Deterministic_algorithm">Deterministic algorithms</a></li>
</ul>
</inline-notification>

# Validation Rules

`Validation Rules` are probably the most important mechanism in holochain. They are encoded in the `Dna`, and define **what is valid and what is not valid in the context of it**. 

You can think of it this way: if we all agree that we are playing soccer, then when someone touches the ball with your hand, we all know that that's invalid in the context of this game. But, if we are playing basketball, that's obviously allowed. 

**Validation Rules need to be deterministic**. In short, this means that they need to give back the same result (valid or invalid) for one given element, no matter when they are run, by whom, or in what circumstances. 

## The Immune System

But! What happens if someone breaks the rules? How does Holochain keep data integrity if some malicious agent publishes bad data to the network?

### Try it!

Here you can see a network of 10 agents with 1 malicious node (marked with 😈). 

In this `Dna` there is only one validation rule: **anyone can create posts, but only the author can update their own posts**.

In this scenario our malicious agent will try to update a post created by another agent, which is not allowed. Let's see what happens when you click "Run".

> You can refresh the page and run it however many times you want, and you can also enable the "Step by Step" mode to get a closer look.

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
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `;
};
```

So! If you look closely, all the connections between the malicious agents and the other nodes have been closed. Effectively, the malicious agent has been booted out of the network, and the other agents won't talk to it again.

Here is a brief description of what has happened:

1. The malicious agent was able to update its own chain without any problems (after all, they control the code that is running on their computer).
2. Then, they published the update to the Dht, to random nodes that are called "validators".
3. When the validators received that publish, before accepting it, they have run the validation rules for our Dna.
4. In this case, the update was not valid, and since we all agreed to play by the same rules just by being present in this Dna, we know that the malicious agent has cheated.
5. We then proceed to sound the alarm, creating warrants for everyone in the network to make sure they know about the cheating.
6. The nodes that receive those warrant run the validation rules themselves to know for sure, they close any connections they had with the cheating agent and they emit new warrants.


## But what happens with 51% of malicious nodes?

But that surely cannot sustain a 51% attack... can it?

In this other scenario, we have a network of 10 nodes, with only 4 of them being honests nodes. This network has the same rules as the last one: one agent cannot update another agent's post.

When you run this scenario, one of the malicious agents is going to update a post from another agent. What the other malicious agents will do is pretend that that action was valid, trying to convince the honest nodes that the update was valid in reality.

Try for yourself: click "Run" and see what happens.

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
        ></dht-cells>
      </div>
    </holochain-playground-container>
  `;
};
```

The honest nodes have been able to separate themselves into their own network, effectively excluding the other ones from participating.

How did the honest nodes know who was cheating? Every time an agent validates an element, they compare the result of their own validation with the validation done by other agents. If the results are different, that must mean that the other validator is trying to cheat as well (because remember, validation rules are deterministic!), so we close the connection as well.

Keep in mind that this representation and scenarios are a bit simplistic in favour of clarity: in reality, you will have different options on what to do about cheating agents, and how your `Dna` wants to react to different offenses in the network.