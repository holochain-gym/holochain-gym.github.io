# Beginner >> Entries ||101



**What is an entry?**

One the most basic things you can do in a Zome is creating an entry. Just a quick reminder: a Zome is a module in a DNA, and a DNA is the base of any holochain app.
And adding an entry is basicly taking some of data and saving it somewhere locally.  

I bet you are thinking: "I already know how to do that. I'm going to jump to the advanced exercises".  

Well, in your holochain app, when you create an entry a few things will happen. First of all your holochain app will validate your piece of data, but we will get into that much later. We do not want to get injured during our very first exercise. Next your piece of data will be attached to the source chain of your agent, hence the chain in Holochain. And last but not least, your holochain app will send your piece of data to some random people who are running the same app. Don't worry we will talk about source chains and agents soon.

```js script
import '@rocket/launch/inline-notification/inline-notification.js';
import { html } from "lit-html";
import { HolochainPlaygroundContainer } from "@holochain-playground/container";
import { HolochainPlaygroundEntryDetail } from "@holochain-playground/elements/dist/elements/holochain-playground-entry-detail";
import { HolochainPlaygroundEntryGraph } from "@holochain-playground/elements/dist/elements/holochain-playground-entry-graph";
import { HolochainPlaygroundCallZome } from "@holochain-playground/elements/dist/elements/holochain-playground-call-zome";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define(
  "holochain-playground-entry-graph",
  HolochainPlaygroundEntryGraph
);
customElements.define(
  "holochain-playground-entry-detail",
  HolochainPlaygroundEntryDetail
);
```

**Fake it until you make it**


So, lets get to it. In case you forgot, you will be doing your exercises in Rust. Don't worry if you are new to Rust, we will help you out. And of course you will want to use the HDK (Holochain Development Kit) in all your exercises. The HDK contains all important Holochain functions you want to call from within your Zome.  

We went ahead and added the HDK for you in the exercise. After all, it is your first time in the Holochain Gym

```rust
use hdk3::prelude::create_entry;
```
> Side note on Rust: `use` is how you import stuff in Rust; `prelude` is just a file inside the hdk where they gathered all the useful hdk functions; and `create_entry` means "please let me use this function in my app"

**No entry without a definition**

Your first exercise will be a genuine "Hello World" exercise. The challenge is to create an entry which contains the text "Hello World". You might be tempted to do this `create_entry(String::from("Hello World")`. But this won't. Tip: try it out anyway and see what error get. After all an expert is just someone who has a lot of experience in making errors.
// TODO make failing a step?  
The reason this won't work is because we need to serialize an entry. When you create an entry, your Holochain app will want to send it to other users who are running the same app. And sending stuff over the network means we have to serialize it. Literally turning it into a series of ones and zeros to send it over a wire.
To do this we first create a `struct`. 

```rust 
pub struct Greeting(String);
```
> Side note on Rust: `struct` is a bit similar to classes in some other languages. `Greeting` is just a the name we chose for this struct. `Greeting(String)` means that this struct is just a string in itself. Most of the time you will have multiple fields in a struct, as you see in the example below, but for now we will keep it simple.
>
> pub struct Greeting{  
>    my_custom_field: String;  
>    my_second_custom_field:  String;  
>  }  
>

However wrapping your "Hello World" in a struct is not enough if you want to create an entry in your holochain app. We need to add two more things. First thing to add is something called an _attribute_ in Rust: `#[hdk_entry(id = "greeting")]`. This attribute, in other languages they might call this annotations, decorates your struct with some extra stuff needed by your holochain app.  

```rust
#[hdk_entry(id = "greeting")]  
pub struct Greeting(String);
```
The final thing you need to do, is to tell your holochain app that you created a new entry type and that you would like to use it. You do this by adding the following in your zome code: `entry_defs![Greeting::entry_def()];`. This macro registers your freshly created entry type with your holochain app. 
`entry_def()` is static method of your struct. As you might have noticed: you did not create that method, now did you... Well that is one of a few things the `#[hdk_entry]` attribute does for you.

```rust
#[hdk_entry(id = "greeting")]  
pub struct Greeting(String);

entry_defs![Greeting::entry_def()];  
```

// TODO say something about id?

Well that is all you need to know for now. Put on your gym shoes, warm up and start the first exercise.



---

<inline-notification type="tip" title="Exercise">

1. Go to the [source code for the exercise](https://github.com/holochain-gym/developer-exercises/tree/master/basic/0.entries).
2. Define a new entry type: 'Greeting' 
3. Create a new entry with the text 'Hello World' in the function that contains `unimplemented!()`
4. Run the test we wrote for you by running `cargo test -- --nocapture`.
5. Don't stop until the test runs green
</inline-notification>

> Side note on Rust: running `cargo test` runs the tests but hides the output from the tests.  
> Adding `-- --nocapture` We added some test output to give some feedback on what is happening.  
> Just to get you off on the best start.