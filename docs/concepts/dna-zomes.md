# Concepts >> DNA and Zomes ||40

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SelectActiveDna,
  SourceChain,
  DhtCells,
  selectCell
} from "@holochain-playground/elements";
import {
  GetStrategy,
  NetworkRequestType,
  WorkflowType,
  hash,
  HashType,
} from "@holochain-playground/core";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("dht-cells", DhtCells);
customElements.define("select-active-dna", SelectActiveDna);
```

**TLDR: each DNA creates its own DHT network, whose ID is the hash of its source code.**

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="https://developer.holochain.org/concepts/2_application_architecture/">Core Concepts: Application Architecture</a></li>
<li><a href="https://en.wikipedia.org/wiki/Modularity">Modularity</a></li>
</ul>
</inline-notification>

# DNA

`DNAs` are one of the most important building blocks in Holochain. Simply put, a `DNA` is the source-code for the game you are playing with your peers in Holochain.

And here is the twist: in Holochain, **every DNA creates its own peer-to-peer DHT network**. This makes it so that **you are agreeing to the rules of the game before actually joining the network** and beginning to play with peers. This is going to be key for validation rules.

One of the most important characteristics of a `DNA` is that **it's identified by the hash of the source-code**. It follows that if you change something from that code and install that `DNA` again, you are literally creating a new network.

You can also create some entries in one `DNA` and switch back and forth `DNAs` to realise that when you create a new network, none of the data is ported.

## Zomes

In Holochain `DNAs` are composed of multiple `zomes`. `Zomes` are like modules: you can put them together to aggregate its functionality.

These are examples for different zomes:

- Roles zome
- Blogging zome
- File storage zome
- Currency zome
- Calendar zome
- Content management zome
- Index/filtering zome

And from this list we could group different zomes together to make different happs:

- Meetup clone:
  - Calendar zome
  - Communities zome
  - Currency zome
  - Roles zome
- Wikipedia clone:
  - Roles zome
  - Content management zome 
  - Index/filtering zome
- Twitter clone:
  - Blogging zome
  - File storage zome

You can start to see how zomes can add a lot of composability to Holochain's functionalities.

### Declarations

Each zome has to declare:

- Zome functions: these are the functions that can be executed from outside Holochain (the UI of a web app, for example).
- Entry types: the kinds of entries that this zome is going to create in its zome functions.
- Validation rules: the rules by which the entry types of this zome are valid or not.

### Constraints

These are the constraints by which zomes are to play with each other:

- Each `zome` can see the entries committed by any other `zome`, both in the DHT and in the source chain.
- Each `zome` is responsible for validating the entries and links it creates.
- `Zomes` can call functions from one another.
- A `zome` can attach links to entries created from other `zomes`.
