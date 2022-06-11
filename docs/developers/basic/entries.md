# Basic >> Creating Entries ||102

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
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

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="/concepts/entry-graph/">Gym: Entry Graph</a></li>
</ul>
</inline-notification>

## What is an entry

An entry is a basic unit of user data. As a Holochain developer one of the most basic things you can do is create an entry in a Zome.

_Quick reminder - A [Zome](https://developer.holochain.org/docs/glossary/#zome) is a module in a [DNA](https://developer.holochain.org/docs/glossary/#dna); the base of any [Holochain application (hApp)](https://developer.holochain.org/docs/glossary/#holochain-application-happ)._

> You can always click `Glossary of Terms` in the menu above to review the terms that you don't understand yet.

## Creating an entry

When you create an entry a few things will happen:

1. Your data is validated locally _(we will learn how this works in later exercises)_.
2. The entry is written to your local [source chain](https://developer.holochain.org/docs/glossary/#source-chain) _(hence the 'chain' in 'Holochain')_.
3. If your [entry type](https://developer.holochain.org/docs/glossary/#entry-type) is marked as [public](https://developer.holochain.org/docs/glossary/#public-entry) like the one in this first exercise, your hApp will send it to some random people who are running the same hApp _(don't worry - soon we will talk about source chains, agents and why sending data to random people is not as scary as it may sound!)_.
4. The random people that received your data will validate your data using the same rules that were used in the first step. _(This is where the holo (coming from holographic) part comes into play. To become a real entry, your entry has to be seen and validated by different people/agents)_.

Luckily you do not have to worry about all of this yet. Since we are skipping all the validation steps in this exercise, creating an entry should just be as easy as in any other common application.

## Try it!

Your first exercise will be [a traditional "Hello, World!" program](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program).

The challenge is to create an entry in your hApp which will contain the text "Hello, World!".

Since we are a first class gym, we have set up a simulation below where you can try this out before you start coding:

1. Click `say_greeting` in the `CallZomeFns` section below to ensure it is selected.
2. Type "Hello, World!" in the `greeting_text: String` input field.
3. Click `EXECUTE`.

Notice how a greeting object gets added to the `Entry Graph`.

Click on the newly created object to inspect the details in `Entry Contents`.

```js story
const sampleZome = {
  name: "helloworld",
  entry_defs: [
    {
      id: "greeting",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    say_greeting: {
      call: ({ create_entry }) => ({ greeting_text }) => {
        return create_entry({ content: greeting_text, entry_def_id: "greeting" });
      },
      arguments: [{ name: "greeting_text", type: "String" }],
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
          style="height: 250px; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <entry-contents style="flex-basis: 500px; height: 250px;">
        </entry-contents>
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

<br>  
<br>

In the details you see 3 things: the _entry hash_, the _entry type_ and _content_.
**Content** is a custom field, meaning you can give it a different name if you want to. You could add more fields as well, but for now one will do.  
The **Entry type** is something specific to the Holochain technology underpinning our app. There are 4 types of entries: Agent, App, CapClaim, CapGrant. For this exercise we limit our focus to App entries.  
The **Entry hash** is the last of the three. You could think of the entry hash as the unique address of this specific entry. Add another greeting and inspect the details. You will see that the hashes are completely different. Hashes have some interesting properties and benefits and we will learn more about them in the next exercise.

## Getting ready

_So, lets get to the real work!_

Zomes are written in [Rust](https://www.rust-lang.org/). Don't worry if you are new to the language, we will gladly help you grow comfortable with it - join us over at the [Holochain forum](https://forum.holochain.org/).

We went ahead and added some code already for you in the `1.basic/1.entries/zomes/exercise/src/lib.rs` file:

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    greeting_text: String,
}

pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
}

```
### Import and annotate

Like in the previous exercise, we need to setup a few thing to make our code callable from the outside world.
Import the HDK functions.

```rust
use hdk::prelude::*;
```

Mark the structs that will move in and out of your zome with the proper annotations.

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    greeting_text: String,
}
```

Add `#[hdk_extern]` to the public function `say_greeting` so it can be called from outside a zome.

```rust
#[hdk_extern]         // add this attribute
pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
}
```

### Create entry

The challenge is to create an entry which contains the text "Hello, World!". The text will be passed to the zome as a `SomeExternalInput` struct by the test script. But we still need to create an actual entry. Luckily, the HDK has a specific function for that, named simply `create_entry`. And since you imported all functions from the prelude already, you can use this function immediately in your code.

So, your first attempt might look something like `create_entry(String::from("Hello, World!"))` or `create_entry(input.content)`. But this won't work.  
Because an entry needs to be saved locally and sent over the network, it has to be serializable. And a String itself is not serializable. To do this we create a `struct` that will hold our data (in more details, you are creating a [tuple struct](https://doc.rust-lang.org/std/keyword.struct.html) in rust) 

```rust
pub struct Greeting(String);
```

The name of the struct, in this case `Greeting`, is just a name you choose. And `Greeting(String)` is a Rust way of saying that you want to disguise a String as a Greeting struct, so you can put attributes on it. When you start developing your own zomes you will likely have multiple fields in a struct, but for now we will keep it simple.

### `hdk_entry`

Wrapping your "Hello, World!" in a struct is not enough. You need to add an attribute. And that attribute is `#[hdk_entry()]`. The nice thing about it is that it already adds a `Serialize` and `Deserialize` attribute behind the screens. So you only need to add one attribute, not three.

```rust
#[hdk_entry(id = "greeting")]
pub struct Greeting(String);
```

### Entry definition

The final thing you need to do, is to register your struct as an entry definition so your application knows you want to create entries with this particular struct. You do this by adding the following line somewhere in your zome code: `entry_defs![Greeting::entry_def()];`. Greeting is the name of your struct and `entry_def()` is a static function defined on that struct. You might be quick to point out that you did not create any methods for the Greeting struct. Well, that is one of the things the `#[hdk_entry()]` attribute does for you. It generates a definition based on your struct and a method to get this definition.

```rust
#[hdk_entry(id = "greeting")]
pub struct Greeting(String);

entry_defs![Greeting::entry_def()];
```

## Exercise

So now it is up to you to finish this exercise. Add all the things we just explained to your code and finish by implementing the `say_greeting` function, building your zome and running the test.
You only need to add a few lines in this first exercise, but know that when the test succeeds, you:

- made your first zome module in Rust
- compiled your zome into a DNA in WASM, a state of the art binary format
- ran a test script, written in Typescript, executed in Nodejs
- initiated an actual real holochain conductor
- which instantiated your DNA into a real, actual Holochain cell
- and executed a test script that asked your cell to make a real entry with the words "Hello, World!"

You will in fact have created your very first decentralized, agent centric, boundary pushing Holochain app. A real hApp!

<inline-notification type="tip" title="Exercise">

1. Go to the `developer-exercises`.
2. Enter the nix-shell: `nix-shell`.
   _you should run this in the folder containing the default.nix file_.
3. Go to folder with the exercise `1.basic/1.entries/exercise`.
4. Inside `zomes/exercise/src/lib.rs`
   - Define a new struct for your entry: 'Greeting'.
   - Implement the function with `unimplemented!()`.
5. Compile and test your code: `cd tests && npm test`.
6. Don't stop until the test runs green.

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.129/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.129/hdk/info/fn.agent_info.html">`agent_info`</a></li>
<li><a href="https://docs.rs/hdk/0.0.129/hdk/macro.entry_def.html">`entry_def`</a></li>
<li><a href="https://docs.rs/hdk/0.0.129/hdk/macro.entry_defs.html">`entry_defs`</a></li>
</ul>
</inline-notification>

### Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

- You forgot to add the `#[hdk_extern]` attribute on the `say_greeting` function.

```js
got an error for test 'say a greeting': {
  type: 'error',
  data: {
    type: 'ribosome_error',
    data: "Attempted to call a zome function that doesn't exist: Zome: exercise Fn say_greeting"
  }
}
```

- You forgot to compile the zome. Run `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown` in the _developer-exercises/basic/1.entries/exercise_ folder.

```
thread 'holochain-tokio-thread' panicked at 'TODO: DnaError
(ZomeNotFound("Zome \'exercise\' not found"))',
/build/source/crates/holochain/src/core/ribosome.rs:336:14
```
