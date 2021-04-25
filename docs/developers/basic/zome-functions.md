# Basic >> Zome functions ||101

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

## Zome
Before you talk about a [zome function](https://developer.holochain.org/docs/glossary/#zome-function) you need to understand what a [zome](https://developer.holochain.org/docs/glossary/#zome) is. A zome is a "basic unit of modularity inside a DNA". You can think of it as a package inside your codebase. Let's take a look. 

* Open the zomes folder `developers/1.basic/0.entries/zomes` in the developers-exercise git repo you [cloned](http://localhost:8000/developers/requirements/setup/#clone-repo).

It contains just one folder `exercise`. But you can rename the folder or add more zomes folders, so you can separate different concerns in different folders. Most exercises in the gym will have only one zome 'exercise'. This is just to keep things simple. 

## DNA
All your zome(s) together form a DNA. Just like the chromosomes in your body form one DNA. This DNA is compiled into a 
WASM binary. This means that when you want call a function in your zome from your UI or your integration test, you are calling an actual program. This is the point where you need zome functions.

## Zome function

A zome function is the bridge between the inside of you DNA and the outside world. In that outside world the [conductor](https://developer.holochain.org/docs/glossary/#conductor) plays an important role, but you can ignore that for now. So basically a zome function is a **function that can be called from the outside**.

You need to figure out
- how to mark a function so it can be called from the outside
- struct that can be serialized



## Getting ready

_So, lets get to the real work!_

In case you forgot, Zomes are written in [Rust](https://www.rust-lang.org/). Don't worry if you are new to the language, we will gladly help you grow comfortable with it - join us over at the [Holochain forum](https://forum.holochain.org/).

We went ahead and added some code already for you in the `zomes/exercise/src/lib.rs` file:

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    greeting_text: String,
}

pub fn say_greeting(input: SomeExternalInput) -> ExternResult<HeaderHash> {
    unimplemented()!
    who am i   agent ID
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

The `SomeExternalInput` struct is a simple [Rust struct](https://doc.rust-lang.org/std/keyword.struct.html). A struct is similar to classes in other languages. In this case, it contains one custom field to hold your "Hello, World!" greeting.

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

The challenge is to create an entry which contains the text "Hello, World!". The text will be passed to the zome as a `SomeExternalInput` struct by the test script. But we still need to create an actual entry. Luckily, the HDK has a specific function for that, named simply `create_entry`. And since you imported all functions from the prelude already, you can use this function immediately in your code.

So, your first attempt might look something like `create_entry(String::from("Hello, World!"))` or `create_entry(input.content)`. But this won't work.  
Because an entry needs to be saved locally and sent over the network, it has to be serializable. And a String itself is not serializable. To do this we create a `struct` that will hold our data.

```rust
pub struct Greeting(String);
```

The name of the struct, in this case `Greeting`, is just a name you choose. And `Greeting(String)` is a Rust way of saying that you want to disguise a String as a Greeting struct, so you can put attributes on it. When you start developing your own zomes you will likely have multiple fields in a struct, but for now we will keep it simple.

### hdk_entry

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
2. Enter the nix-shell: `nix-shell`  
   _you should run this in the folder containing the default.nix file_  
   _starting the nix-shell for the very first time might take a long time, somewhere between 20 to 80 minutes, after that I will take just a few seconds_
3. Go to folder with the exercise `basic/0.entries`
4. Inside `zome/exercise/src/lib.rs`
   - Define a new struct for your entry: 'Greeting'
   - Implement the function with `unimplemented!()`
5. Compile your code: `./run_build.sh`.
6. Run the test: `./run_tests.sh`
7. Don't stop until the test runs green

</inline-notification>

### Relevant HDK documentation: 
- [create_entry](https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html).

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

- You forgot to compile the zome. Run `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown` in the _developer-exercises/basic/0.entries_ folder.

```
thread 'holochain-tokio-thread' panicked at 'TODO: DnaError
(ZomeNotFound("Zome \'exercise\' not found"))',
/build/source/crates/holochain/src/core/ribosome.rs:336:14
```

## Solution

If you get stuck implementing this exercise, you can always look at its [solution](https://github.com/holochain-gym/developer-exercises/tree/solution/basic/0.entries). 