# Basic >> Entries ||101

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

## What is an entry

An entry is a basic unit of user data. As a Holochain developer one of the most basic things you can do is create an entry in a Zome.

*Quick reminder - A [Zome](https://developer.holochain.org/docs/glossary/#zome) is a module in a [DNA](https://developer.holochain.org/docs/glossary/#dna); the base of any [Holochain application (hApp)](https://developer.holochain.org/docs/glossary/#holochain-application-happ).*

## Creating an entry

*NOTE: If you are thinking "I already know how to do that, I'm going to jump to the advanced exercises!" - hold on as we do not want you to get injured during your very first exercise!*

When you create an entry a few things will happen:

1. Data validation *(we will learn how this works in later exercises)*.
2. The entry is written to your local [source chain](https://developer.holochain.org/docs/glossary/#source-chain) *(hence the 'chain' in 'Holochain')*.
3. If your [entry type](https://developer.holochain.org/docs/glossary/#entry-type) is marked as [public](https://developer.holochain.org/docs/glossary/#public-entry) like the one in this first exercise, your hApp will send it to some random people who are running the same hApp *(don't worry - soon we will talk about source chains, agents and why sending data to random people is not as scary as it may sound!)*.

## Try it!

Your first exercise will be [a traditional "Hello, World!" program](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) with a tiny twist to the text!

The challenge is to create an entry in your hApp which will contain the text "Holo, World!".

To prove we are a first class gym, we have set up a simulation below where you can try this out before you start coding:

1. Click `say_greeting` in the `CallZomeFns` section below to ensure it is selected.
2. Type "Holo, World!" in the `greeting_text: String` input field.
3. Click `EXECUTE`.

Notice how a greeting object gets added to the `Entry Graph`.

Click on the newly created object to inspect the details in `Entry Contents`.

```js story
const sampleZome = {
  name: "holoworld",
  entry_defs: [
    {
      id: "greeting",
      visibility: "Public",
    },
  ],
  zome_functions: {
    say_greeting: {
      call: ({ create_entry }) => ({ greeting_text }) => {
        return create_entry({ greeting_text, entry_def_id: "greeting" });
      },
      arguments: [{ name: "greeting_text", type: "String" }],
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

<br>  
<br>

In the `Entry Contents` you see three things: 

1. `Entry Hash` - the unique adress of this specific entry. If you create another `"greeting_text"` entry by repeating the previous steps and inspect the details of the new object you will see the `Entry Hash` is completely different. [Hashes](https://developer.holochain.org/docs/glossary/#hash) have some interesting properties and benefits which we will learn more about in the next exercise.

2. `"entry_type"` is specific to the Holochain technology underpinning our app. There are four types of entries: Agent, App, CapClaim, and CapGrant. For this exercise we limit our focus to [App entries](https://developer.holochain.org/docs/glossary/#app-entry).

3. `"greeting_text"` is a custom field so you can give it a different name if you want to. You could add more fields as well, but for now one will do.

## Getting ready

*So, lets get to the real work!*

In case you forgot, Zomes are written in [Rust](https://www.rust-lang.org/). Don't worry if you are new to the language, we will gladly help you grow comfortable with it - join us over at the [Holochain forum](https://forum.holochain.org/).

We went ahead and added some code already for you in the `zomes/exercise/src/lib.rs` file:

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    greeting_text: String,
}

pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
}

```

### External inputs

By themselves, Zomes don't do much - you need to feed them data and ask them to do stuff!

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    greeting_text: String,
}
```

The `SomeExternalInput` struct is a simple [Rust struct](https://doc.rust-lang.org/std/keyword.struct.html). A struct is similar to classes in other languages. In this case, it contains one custom field to hold your "Holo, World!" greeting.

On top of it you see `#[derive(Serialize, Deserialize, Clone, Debug)]`. This is what they call an ['attribute' in Rust](https://doc.rust-lang.org/rust-by-example/attribute.html). This annotation adds some useful metadata - `Serialize` and `Deserialize` are crucial; they make sure the data in this struct can be sent to this Zome over a network, from a GUI, or – like in our case – from a test script.

### External calls

So we have a struct that can carry our data from the outside into our zome. Now we need to know how to actually send this data to our zome. We have this public function `say_greeting` in our code, but it being a public function is not enough. We need to add two more things.

First, you need to add an attribute on top of this function to make it clear that this function can be called from outside the zome. The attribute you need to add is `#[hdk_extern]`. Only public functions with this attribute can be called from outside a zome.

```rust
#[hdk_extern]         // add this attribute
pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
}
```

### Import HDK functions

The other thing you need to do is tell the code where this `#[hdk_extern]` comes from. This attribute may give our public function special powers, so it cannot come out of nowhere.  
The Holochain team built a Rust library `hdk`, which stands for _Holochain Development Kit_ and contains all important Holochain functions you will want to call from within your zome. So add this line to the top of your file.

```rust
use hdk::prelude::*;
```

This is how imports are done in Rust. You start with `use` followed by the name of the library `hdk`. In this case we further select `prelude` which is just a file inside the hdk library where the team has gathered all the useful HDK functions in one place. This way you can add all these functions at once, simply by adding the `*`.

Go ahead and take a quick look at that `prelude` file:  
https://github.com/holochain/holochain/blob/develop/crates/hdk/src/prelude.rs  
You will find most of the things you will use in this exercise listed in that file.

### External outputs

The challenge is to create an entry which contains the text "Holo, World!". The text will be passed to the zome as a `SomeExternalInput` struct by the test script. But we still need to create an actual entry. Luckily, the HDK has a specific function for that, named simply `create_entry`. And since you imported all functions from the prelude already, you can use this function immediately in your code.

So, your first attempt might look something like `create_entry(String::from("Holo, World!"))` or `create_entry(input.greeting_text)`. But this won't work.  
Because an entry needs to be saved locally and sent over the network, it has to be serializable. And a String itself is not serializable. To do this we create a `struct` that will hold our data.

```rust
pub struct Greeting(String);
```

The name of the struct, in this case `Greeting`, is just a name you choose. And `Greeting(String)` is a Rust way of saying that you want to disguise a String as a Greeting struct, so you can put attributes on it. When you start developing your own zomes you will likely have multiple fields in a struct, but for now we will keep it simple.

### hdk_entry

Wrapping your "Holo, World!" in a struct is not enough. You need to add an attribute. And that attribute is `#[hdk_entry()]`. The nice thing about it is that it already adds a `Serialize` and `Deserialize` attribute behind the screens. So you only need to add one attribute, not three.

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
- and executed a test script that asked your cell to make a real entry with the words "Holo, World!"

You will in fact have created your very first decentralized, agent centric, boundary pushing Holochain app. A real hApp!

Relevant HDK documentation: [create_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html).

<inline-notification type="tip" title="Exercise">

1. Go to the `developer-exercises/basic/0.entries`.
2. Enter the nix-shell: `nix-shell`  
   _running this the first time might take several minutes or longer_
3. Define a new struct for your entry: 'Greeting'
4. Implement the function with `unimplemented!()`
5. Compile your code: `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown`.
6. Run the test: `./run_tests`
7. Don't stop until the test runs green

</inline-notification>

## Errors

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

- You forgot to compile the zome. Run `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown` in the _developer-exercises/basic/0.entries_ folder.

```
thread 'holochain-tokio-thread' panicked at 'TODO: DnaError
(ZomeNotFound("Zome \'exercise\' not found"))',
/build/source/crates/holochain/src/core/ribosome.rs:336:14
```
