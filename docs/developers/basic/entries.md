# Basic >> Entries ||101

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryDetail,
  EntryGraph,
  CallZomeFns,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-detail", EntryDetail);
customElements.define("call-zome-fns", CallZomeFns);
```

## What is an entry

One the most basic things you can do in a zome is creating an entry. Just a quick reminder: a zome is a module in a DNA, and a DNA is the base of any holochain app.
And adding an entry is basicly taking some data and saving it somewhere locally. I bet you are thinking: "I already know how to do that. I'm going to jump to the advanced exercises".

Well, in your holochain app, when you create an entry a few things will happen. First of all your holochain app will validate your piece of data, but we will get into that in later exercises. We do not want you to get injured during your very first exercise.  
Next, your piece of data will be attached to the source chain of your agent, hence the chain in Holochain. And last but not least, your holochain app will send your piece of data to some random people who are running the same app. Don't worry, soon we will talk about source chains, agents and why sending data to random people is not scary as it sounds.

## Try it!

Your first exercise will be a genuine "Hello World" exercise. The challenge is to create an entry in your holochain app which will contains the text "Hello World".
To prove we are a first class gym, we have setup a simulation below where you can try this out before you actual start coding.
Select "say_greeting" in the CallZomeFns below, type **Hello World** in the input and click _EXECUTE_.
Notice how a greeting object gets added to the Entry Graph. Click on the newly added object to see more details in Entry Details.

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
    say_greeting: {
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: "greeting" });
      },
      arguments: [{ name: "content", type: "String" }],
    },
    get: {
      call: ({ get }) => ({ hash }) => {
        return get(hash);
      },
      arguments: [{ name: "hash", type: "EntryHash" }],
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
      <call-zome-fns
        id="call-zome"
        style="height: 400px; margin-bottom: 20px;"
        hide-zome-selector
        hide-agent-pub-key
      >
      </call-zome-fns>
      <div style="display: flex; flex-direction: row; align-items: start;">
        <entry-graph
          .showFilter=${false}
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; margin-right: 20px; height: 500px;"
        >
        </entry-graph>
        <entry-detail style="flex-basis: 360px; height: 250px;"> </entry-detail>
      </div>
    </holochain-playground-container>
  `;
};
```

<br>  
<br>

In the details you see 3 things: the _entry hash_, the _entry type_ and _content_. Content is a custom field, meaning you can give it a different name if you want to. You could add more fields as well, but for now one will do.  
The **Entry type** is something specific to the holochain technology underpinning our app. There are 4 types of entries: Agent, App, CapClaim, CapGrant. For this exercise we limit our focus to App entries.  
The **Entry hash** is the last of the three. You could think of the entry hash as the unique adress of this specific entry. Add another greeting and inspect the details. You will see that the hashes are completely different. Hashes have some interesting properties and benefits and we will learn more about them in the next exercise.

## Getting ready

So, lets get to the real work. In case you forgot, zomes are written in Rust, so you will be doing your most of the exercises in Rust. Don't worry if you are new to Rust, we will help you out.  
We went ahead and added some code already for you in the exercise.

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    content: String,
}

pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
}

```

### External inputs

Above you see the code we already added to the `zomes/exercise/src/lib.rs` file. One thing you need to remember is that zomes are just modules, by them self they don't do much. You need to feed them data and ask them to do stuff. To be really honest, zomes do a lot, even when you are you not looking, but that will become clear over time.

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    content: String,
}
```

The `SomeExternalInput` struct is a simple Rust struct. A struct is a bit similar to classes in some other languages. In this case it contains one simple field to hold your "Hello World" greeting.  
On top of it you see `#[derive(Serialize, Deserialize, Clone, Debug)]`. This is what they call an attribute in Rust. This annotation adds some useful stuff. Especially `Serialize` and `Deserialize` are crucial. They make sure that the data in this struct can be sent to this zome sent over a network, from a GUI or, like in the our case, from a test script.

### External calls

So we have a struct that can carry our data from the outside into our zome. Now we need to know to how to actually send this data to our zome. We have this public function `say_greeting` in our code. But it being a public function is not enough. We need to add two more things.

First you need to add an attribute on top of this function to make it clear that this function can be called from outside the zome. The attribute you need to add is `#[hdk_extern]`. Only public functions with this attribute can be called from outside a zome.

```rust
#[hdk_extern]         // add this attribute
pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
}
```

### Import hdk functions

The other thing you need to do is tell the code where this `#[hdk_extern]` comes from. This attribute may give our public function special powers, it cannot come out of nowhere.  
The Holochain team built a Rust library `hdk3`, which stands for _holochain development kit_ and contains all important Holochain functions you will want to call from within your zome. So add this line to the top your file.

```rust
use hdk3::prelude::*;
```

This is how import are done in Rust. You start with `use` followed by the name of the library `hdk3`. In this case `prelude` which is just a file inside the hdk3 library where they gathered all the useful hdk functions in one place. This way you can add all these functions at once , just adding the `*`.

Go ahead and take a quick look at that `prelude` file:  
https://github.com/holochain/holochain/blob/develop/crates/hdk3/src/prelude.rs  
You will find most of the things you will use in your exercise listed in that file.

### External outputs

The challenge is to create an entry which contains the text "Hello World". The text will be passed to the zome as a `SomeExternalInput` struct by the test script. But we still need to create an actual entry. Luckily, the hdk has specific function for that, with the unimaginative name: `create_entry`. And since you imported all functions from the prelude already, you can use this function immediately in your code.

So, your first attempt might look something like this `create_entry(String::from("Hello World"))` or `create_entry(input.content)`. But this won't work.  
Because an entry needs to be saved locally and send over the network, it has to be serializable. And a String itself is not serializable. To do this we create a `struct` that will hold our data.

```rust
pub struct Greeting(String);
```

The name of the struct `Greeting` is just a name you chose. And `Greeting(String)` is a Rust way of saying that you want to disguise a String as a Greeting struct, so you can put attributes on it. When you start developing your own zomes you will likely have multiple fields in a struct, but for now we will keep it simple.

### Hdk_entry

Wrapping your "Hello World" in a struct is not enough. You need to add an attribute. And that attribute is `#[hdk_entry()]`. The nice thing about it is that it already adds a `Serialize` and `Deserialize` attribute behind the screens. So you only need to add one attribute, not three.

```rust
#[hdk_entry(id = "greeting")]
pub struct Greeting(String);
```

### Entry definition

The final thing you need to do, is to register your struct as an entry definition so your application knows you want to create entries with this particular struct. You do this by adding the following line somewhere in your zome code: `entry_defs![Greeting::entry_def()];`. Greeting is the name of your struct and `entry_def()` is a static function defined on that struct. You might be quick to point out that you did not create any methods for the Greeting struct. Well that is one of a things the `#[hdk_entry()]` attribute does for you. It generates a definition based on your struct and a method to get this definition.

```rust
#[hdk_entry(id = "greeting")]
pub struct Greeting(String);

entry_defs![Greeting::entry_def()];
```

## Exercise

So now it is up to you to finish this exercise. Add all the things we just explained to your code and finish by implementing the `say_greeting` function, build your zome and run the test.
You only need to add a few lines in this first exercise, but know that when the test succeeds, you:

- made your first zome module in Rust
- compiled your zome into a DNA in WASM, a state of the art binary format
- ran a test script, written in Typescript, executed in Nodejs
- initiated an actual real holochain conductor
- which instantiated your DNA into a real, actual holochain cell
- and executed test script that asked your cell to make a real entry in with the words "Hello World"

You will in fact have created your very first decentralized, agent centric, boundary pushing holochain app. A real hApp!

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
