# Basic >> Zome functions ||101

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
<li><a href="/concepts/dna-zomes/">Gym: Dnas and zomes</a></li>
</ul>
</inline-notification>

In this chapter you will learn
* what zome functions are
* how you create a zome function
* how to get data in and out of your zome
* about some commons errors you encounter while coding

## Zome Functions
Before you talk about a [zome function](https://developer.holochain.org/docs/glossary/#zome-function) you need to understand what a [zome](https://developer.holochain.org/docs/glossary/#zome) is. A zome is a "basic unit of modularity inside a DNA". You can think of it as a package inside your codebase. Let's take a look. 

Open the zomes folder `developers/1.basic/0.zome-functions/exercise/zomes` in the developers-exercise git repo you [cloned](/developers/requirements/setup/#clone-repo).

It contains just one folder: `exercise`. But you can rename the folder or add more zomes folders, so you can separate different concerns in different folders. Most exercises in the gym will have only one zome, named 'exercise'. This is just to keep things simple. 

### DNA
All your zome(s) together form a DNA. Just like the chromosomes in a cell in your body form one DNA. This DNA is compiled into a 
WASM binary. This means that when you want call a function in your zome from your UI or your integration test, you are calling an actual program. This is the point where you need zome functions.

### Zome function

A zome function is the bridge between the inside and the outside world. The inside world is your Rust code your zomes, entries in the DHT, ... The outside world is your UI or integration test that calls your code with the help of the [conductor](https://developer.holochain.org/docs/glossary/#conductor). So basically a zome function is a **function** that can be called **from the outside**.

### Getting ready

You need to figure out
- how to mark a function so it can be called from the outside
- how data can be send in and out the zome

In case you forgot, Zomes are written in [Rust](https://www.rust-lang.org/). Don't worry if you are new to the language, we will gladly help you grow comfortable with it. Look in the [Rust section](/developers/requirements/rust/) or join us at the [Holochain forum](https://forum.holochain.org/).

We went ahead and added some standard Rust code for you in the `zomes/exercise/src/lib.rs` file:

```rust
pub struct SomeExternalInput {
    first_name: String,
    last_name: String,
}

pub struct SomeExternalOutput(String);

pub fn hello_world(_:()) -> ExternResult<SomeExternalOutput> {
    let message: String = String::from("Hello world");
    let output: SomeExternalOutput = SomeExternalOutput(message);
    
    Ok(output)
}

pub fn say_my_name(external_input:SomeExternalInput) -> ExternResult<SomeExternalOutput> {
    let message: String = format!("Your name is {} {}", 
                                    external_input.first_name, 
                                    external_input.last_name);
    let output: SomeExternalOutput = SomeExternalOutput(message);
    
    Ok(output)
}

pub fn get_agent_id(_:()) -> ExternResult<AgentInfo> {
    Ok(agent_info()?)
}

```

`SomeExternalInput` and `SomeExternalOutput` are just simple **structs**. A [struct](https://doc.rust-lang.org/std/keyword.struct.html) in Rust is similar to classes in other languages. `SomeExternalInput` has 2 fields: first_name and last_name. `SomeExternalOutput` is a struct wrapped around a simple String. _You will soon see why you need to wrap a String in a struct when you want to use them as input/output. And why you cannot send simple Strings in and outside of your zome._

Next you have 3 **public functions**. If you are new to Rust, then `_:()` might seem weird. The input parameter has a name `_` and the type is an Object `()`. But it just means: "I accept anything, because I will not be using it". 

Finally you see the **return type** of each function.
Functions that return a `Result` are very [common](https://learning-rust.github.io/docs/e3.option_and_result.html) in Rust. `ExternResult` is an enhanced Result type, specially adapted for use in zomes. In stead of a standard `Err`, you need a `WasmError` as the error type in your result. Because, as we mentioned above, your zome is compiled into a WASM binary. So every error you want to report to the outside world is in fact a [WasmError](https://docs.rs/hdk/0.0.100/hdk/map_extern/type.ExternResult.html).

### Import HDK

Becoming an expert starts by making every possible error. So go ahead and make some errors.

<inline-notification type="tip" title="Exercise">

1. Open a terminal in `developer-exercises` folder.
2. Enter the nix-shell by running: `nix-shell`  
   _You should run this in the folder containing the default.nix file_
3. Go to folder with the exercise `1.basic/0.zome-functions/exercise`
4. Compile and test your code: `cd tests && npm install && npm run build`.
5. Inspect the Rust compiler error

</inline-notification>

You should see the following error:

<pre style="background-color:black;color:white"><span style="color:#EF2929"><b>error[E0412]</b></span><b>: cannot find type `ExternResult` in this scope</b>
  <span style="color:#729FCF"><b>--&gt; </b></span>zomes/exercise/src/lib.rs:10:29
   <span style="color:#729FCF"><b>|</b></span>
<span style="color:#729FCF"><b>10</b></span> <span style="color:#729FCF"><b>| </b></span>pub fn hello_world(_:()) -&gt; ExternResult&lt;SomeExternalOutput&gt; {
   <span style="color:#729FCF"><b>| </b></span>                            <span style="color:#EF2929"><b>^^^^^^^^^^^^</b></span> <span style="color:#EF2929"><b>not found in this scope</b></span>
   <span style="color:#729FCF"><b>|</b></span>
<span style="color:#34E2E2"><b>help</b></span>: consider importing this type alias
   <span style="color:#729FCF"><b>|</b></span>
<span style="color:#729FCF"><b>3</b></span>  <span style="color:#729FCF"><b>| </b></span>use hdk::prelude::ExternResult;
   <span style="color:#729FCF"><b>|</b></span>
</pre>

The compiler tells you:
1. it cannot find ExternResult
2. suggests you might want to import it using: `use hdk::prelude::ExternResult;` _The Rust compiler makes this lovely suggestion because we added `hdk` as a dependency in `cargo.toml`_

The Holochain team built a Rust library `hdk`, which stands for _Holochain Development Kit_ and contains all important Holochain functions, types and attributes you will want to use in your zome. Since you will be using more than one HDK function or type, it is best to add the following statement to the top of the `lib.rs` file.

```rust
use hdk::prelude::*;

```

Go ahead and take a quick look at that [prelude](https://github.com/holochain/holochain/blob/develop/crates/hdk/src/prelude.rs) file to get a taste of what the HDK provides.

### External inputs

Now that you have fixed the import statement, you will discover that building your zome succeeds. Let's see if we can break something else.  
We wrote an integration test for you, to test if everything works correctly. The best way to write integration/scenario tests in typescript is to use [Tryorama](https://developer.holochain.org/docs/glossary/#tryorama), a holochain typescript library, to write these tests. Take a look in the `1.basic/0.zome-functions/exercise/tests/src/index.ts` file. Run the test to see what fails.


<inline-notification type="tip" title="Exercise">

1. Check that your are still in a `nix-shell`.
   _The beginning of the command line should have nix-shell in it_
2. Check that your are still in the folder `1.basic/0.zome-functions/exercise`.
3. Compile and test your code: `cd tests && npm install && npm test`.
4. Inspect the error.

</inline-notification>

You should see the following error:

<pre style="background-color:black;color:white">tryorama] <strong><span style="color:#CC0000">error</span></strong>: Test error: {
  type: &apos;error&apos;,
  data: {
    type: &apos;ribosome_error&apos;,
    data: &quot;Attempted to call a zome function that doesn&apos;t exist: Zome: exercise Fn hello_world&quot;
  }
}
not ok 1 Test threw an exception. See output for details.</pre>

It simply means that our test code `.call("exercise", "hello_world", null);`, which calls the `hello_world` function in the zome `exercise`, cannot find that function. So making a function public in your zome is *not* enough. You need to add an attribute on the top of a public function to make it possible for this function to be called from outside the zome. The attribute you need to add is `#[hdk_extern]`. Only public functions with this attribute can be called from outside a zome. Adding the attribute makes it a **zome function**.

<inline-notification type="tip" title="Exercise">

1. Add `#[hdk_extern]` on top of the 3 public functions.
2. Compile and test your code: `cd tests && npm install && npm test`.
3. Inspect the error.
</inline-notification>

<pre style="background-color:black;color:white"><span style="color:#EF2929"><b>error[E0277]</b></span><b>: the trait bound `SomeExternalOutput: hdk::prelude::Serialize` is not satisfied</b>
  <span style="color:#729FCF"><b>--&gt; </b></span>zomes/exercise/src/lib.rs:11:1
   <span style="color:#729FCF"><b>|</b></span>
<span style="color:#729FCF"><b>11</b></span> <span style="color:#729FCF"><b>| </b></span>#[hdk_extern]
   <span style="color:#729FCF"><b>| </b></span><span style="color:#EF2929"><b>^^^^^^^^^^^^^</b></span> <span style="color:#EF2929"><b>the trait `hdk::prelude::Serialize` is not implemented for `SomeExternalOutput`</b></span>
   <span style="color:#729FCF"><b>| </b></span>
</pre>

The compiler is complaining that our `SomeExternalOutput` struct is not implementing the trait `hdk::prelude::Serialize`. You will also see `#[hdk_extern]` mentioned. `#[hdk_extern]` is a Rust macro and it requires that the function it is added to, has one input parameter and that this parameter can be serialized. Because zome functions live on the boundary of your WASM binary, they need to be able to serialize and deserialize all data structs that go in or out the zome.  
Luckily this is all standard Rust stuff. Annotate the 2 structs `SomeExternalInput` and `SomeExternalOutput` with the following attribute **#[derive(Serialize, Deserialize, Debug)]**. This attribute makes sure the data in the structs can be sent to this zome over a network, from a GUI, or – like in our case – from a test script.  
It is also the reason why you cannot use a simple String as the input or output for a zome function. You cannot add `#[derive(Serialize, Deserialize, Debug)]` to a String, only to a struct.

**Side note**  
Requirements for a zome function:
* needs to be a public function
* needs to return a `ExternResult<T>`
* needs to be decorated with `#[hdk_extern]` 
* takes exactly 1 input param

To test this last requirement remove the input param `external_input` or `_:()` in one of the functions. Or add a second param. And look at what the Rust compiler tells you.

## Exercise

To finish this exercise add the attributes to the structs.

<inline-notification type="tip" title="Exercise">

1. Add `#[derive(Serialize, Deserialize, Debug)]` on top of the 2 structs.
2. Compile and test your code: `cd tests && npm install && npm test`.
3. Inspect the error.
</inline-notification>

## Agent info

The `hello_world` and `say_my_name` are very simple toy functions. In `get_agent_info` on the other hand you call a real hdk function [`agent_info()`](https://docs.rs/hdk/0.0.100/hdk/info/fn.agent_info.html). AgentInfo is the current agent’s original pubkey/address that they joined the network with and their most recent pubkey/address. Your agent info or [Agent ID](https://developer.holochain.org/docs/glossary/#agent-id) is one of the four genesis events that are created add the beginning of your [source-chain](/concepts/source-chain/) by the [subconscious](/developers/basic/source-chain/#subconscious) part of your holochain application. When you install a holochain app an Agent ID is created. When a DNA, composed of one or more zomes, is instantiated and Agent ID is created they form a [cell](https://developer.holochain.org/docs/glossary/#cell). Zomes, DNA, cells might sound confusing at first. Stick with it because the design principles of holochain are deeply rooted in nature. And everything in nature that is slow and consumes too much power, does not survive ...


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
   _you should run this in the folder containing the default.nix file_  
   _starting the nix-shell for the very first time might take a long time, somewhere between 20 to 80 minutes, after that it will take just a few seconds_
3. Go to folder with the exercise `basic/0.zome-functions/exercise`.
4. Inside `zome/exercise/src/lib.rs`:
   - Define a new struct for your entry: 'Greeting'.
   - Implement the function with `unimplemented!()`.
5. Compile and test your code: `cd tests && npm install && npm test`.
6. Don't stop until the test runs green.

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
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

- You forgot to compile the zome. Run `CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown` in the _developer-exercises/basic/0.zome-functions/exercise_ folder.

```
thread 'holochain-tokio-thread' panicked at 'TODO: DnaError
(ZomeNotFound("Zome \'exercise\' not found"))',
/build/source/crates/holochain/src/core/ribosome.rs:336:14
```


This is the error you see when you call a zome function that has no params
<pre style="background-color:black;color:white"><span style="color:#EF2929"><b>error</b></span><b>: custom attribute panicked</b>
  <span style="color:#729FCF"><b>--&gt; </b></span>zomes/exercise/src/lib.rs:12:1
   <span style="color:#729FCF"><b>|</b></span>
<span style="color:#729FCF"><b>12</b></span> <span style="color:#729FCF"><b>| </b></span>#[hdk_extern]
   <span style="color:#729FCF"><b>| </b></span><span style="color:#EF2929"><b>^^^^^^^^^^^^^</b></span>
   <span style="color:#729FCF"><b>|</b></span>
   <span style="color:#729FCF"><b>= </b></span><b>help</b>: message: internal error: entered unreachable code
</pre>

This is the error you see when you call a zome function that has more than one params
<pre style="background-color:black;color:white"><span style="color:#EF2929"><b>error[E0061]</b></span><b>: this function takes 2 arguments but 1 argument was supplied</b>
  <span style="color:#729FCF"><b>--&gt; </b></span>zomes/exercise/src/lib.rs:20:1
   <span style="color:#729FCF"><b>|</b></span>
<span style="color:#729FCF"><b>20</b></span> <span style="color:#729FCF"><b>| </b></span>#[hdk_extern]
   <span style="color:#729FCF"><b>| </b></span><span style="color:#EF2929"><b>^^^^^^^^^^^^^</b></span>
   <span style="color:#729FCF"><b>| </b></span><span style="color:#EF2929"><b>|</b></span>
   <span style="color:#729FCF"><b>| </b></span><span style="color:#EF2929"><b>supplied 1 argument</b></span>
   <span style="color:#729FCF"><b>| </b></span><span style="color:#EF2929"><b>expected 2 arguments</b></span>
<span style="color:#729FCF"><b>21</b></span> <span style="color:#729FCF"><b>| </b></span>pub fn say_my_name(a:SomeExternalInput, b:SomeExternalInput) -&gt; ExternResult&lt;SomeExternalOutput&gt; {
   <span style="color:#729FCF"><b>| ------------------------------------------------------------------------------------------------</b></span> <span style="color:#729FCF"><b>defined here</b></span>
   <span style="color:#729FCF"><b>|</b></span>
   <span style="color:#729FCF"><b>= </b></span><b>note</b>: this error originates in a macro (in Nightly builds, run with -Z macro-backtrace for more info)
</pre>

**[Next >](/developers/basic/entries/)**
