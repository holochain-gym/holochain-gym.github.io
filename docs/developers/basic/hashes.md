# Basic >> Playing with Hashes ||103

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  ZomeFnsResults,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("zome-fns-results", ZomeFnsResults);
customElements.define("call-zome-fns", CallZomeFns);
```

<inline-notification type="tip" title="Useful reads">
<ul>
<li><a href="https://en.wikipedia.org/wiki/Hash_function">Hash function</a></li>
</ul>
</inline-notification>

## Recap

Welcome back to our Holochain gym. In the previous exercise you learned how to create a entry in a zome. You compiled your zome to a dna, you asked the holochain conductor to turn that dna in a cell, you tested your zome code in that cell through a test script. And you learned that you needed the following things in your code:

- import hdk library
- a serializable struct for input
- a public function with `#[hdk_extern]` to make calls from the outside into your zome
- a struct with `#[hdk_entry()]` to serve as the base for your entry definition
- register your entry definition `entry_defs![NameOfYourStruct::entry_def()];`

You learned that there are 4 entry types: agent, app, claim cap, grant cap.
And that an entry has a hash. Not bad for your first exercise!

## Hash function

Hashes are one of the main ingredients in a holochain app. So let's find out what they are. And since we are a gym and not a library you are going to try it out.
Select "say\*greeting" in the CallZomeFns below, type **Hello World** in the input and click _EXECUTE_.
Click on the newly added object in the Entry Graph and look at the value of Entry hash of in Entry Contents.
Now type something else, like Hello World in your own language, and execute again. Open the details of the new object and compare the hash values. What do you notice?

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
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: "greeting" });
      },
      arguments: [{ name: "content", type: "String" }],
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
      <call-zome-fns
        id="call-zome"
        style="height: 250px; margin-bottom: 20px;"
        hide-zome-selector
        hide-agent-pub-key
      >
      </call-zome-fns>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; margin-right: 20px; height: 500px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 600px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

First thing you might notice is that each hash has the same length. No matter how small or how big the input is, the hash is always the same length. If you don't believe it, try it. Try a really long greeting.
The second thing you will find is that hashes do not look very similar. In fact, even the smallest difference in the input will give a very different hash. Again, try it out! Create an entry for _hello world_ all lowercase, or add a comma or even a space.
The hashes will be very different.
Finally for the grand finale: add _Hello world_ as an entry and then add it again. What do you notice?

Nothing happens. And that is a feature, not a bug. Because the same input, always returns the same hash. So when you add the _Hello World_ entry a second and a third time the Entry Graph detects it already has an entry with this hash. And why save it again, if you already have it. It is a smart way to store data.

## Hash table

When you combine all these properties of hashes you can do interesting stuff. If for every piece of data or content you have, you can calculate the hash value, then you could easily make a nice big list of all the hashes. No matter the size of the data you want to store, each piece will have it's own hash, which is unique but has the same size as all other hashes. And since all those hashes can be mapped to their content, you can use that list as an index. This type of list has a name, it's a **hash table**. The fancy name for this way of storing and retrieving your data this way is called **content addressable storage**. Because the content, well actually the hash of the content, is be used as a unique address for the content. It will really get interesting when we upgrade this hash table to a distributed hash table, a DHT.

## Getting ready

So I hope you see that hashes play a big role in how data is stored and retrieved. You will see them popping up when we talk about headers, elements, the DHT, validations. They are everywhere.  
Enough talking. It is time to get ready for the exercise.

This time you are building a library zome. The zome will need 2 functions that can be called from the outside: `add_book` and `get_book`. You will add your favorite book and retrieve it from the library zome based on -you guessed it- the hash of its entry. In one of the next exercise we will see that there are other ways to retrieve your data: headers and elements. But it is good to know you can always find your entry again based on its entry hash.

First let's practice a bit in the simulation gym.
Select `add_book` in the CallZomeFns below, type the title of your favorite book in the input and click _EXECUTE_.
Click on the newly added object in the Entry Graph and copy the value of Entry hash.
Select `get_book` in the CallZomeFns, put in the hash and click _EXECUTE_. Open the last item with the green check with the text `get_book in library zome, result: `, in the "Zome Fns Results" panel just right of the execute button. Inspect the details.  
We told you you would see hashes everywhere. Look for the entry_hash and check if it matches. If it does, it means you successfully created and retrieved an entry from the holochain simulation app.

```js story
const sampleZome2 = {
  name: "library",
  entry_defs: [
    {
      id: "book",
      visibility: "Public",
    },
  ],
  validation_functions: {},
  zome_functions: {
    add_book: {
      call: (hdk) => async ({ content }) => {
        await hdk.create_entry({
          content,
          entry_def_id: "book",
        });
        const postHash = await hdk.hash_entry({ content });
        return "";
      },
      arguments: [{ name: "content", type: "String" }],
    },
    get_book: {
      call: ({ get }) => ({ hash }) => {
        return get(hash);
      },
      arguments: [{ name: "hash", type: "EntryHash" }],
    },
  },
};

const simulatedHapp2 = {
  name: "simulated-app",
  description: "",
  slots: {
    default: {
      dna: {
        zomes: [sampleZome2],
      },
      deferred: false,
    },
  },
};

export const Exercise = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedHapp=${simulatedHapp2}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <div
        style="display: flex; flex-direction: row; height: 500px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome2"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <zome-fns-results
          hide-agent-pub-key
          style="flex: 1;"
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <entry-graph
          hide-filter
          .excludedEntryTypes=${["Agent"]}
          style="flex: 1; margin-right: 20px; height: 500px;"
        >
        </entry-graph>
        <entry-contents style="flex-basis: 600px; height: 500px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

## Exercise

### Add book

Since the previous exercise went well, we will raise the bar a little and leave a bit more of the work to you. We will start you off with this:

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    title: String,
    content: String,
}

pub fn add_book(input: SomeExternalInput) -> ExternResult<EntryHash> {
    unimplemented!();
}

pub fn get_book(hash: String) -> ExternResult<Book> {
    unimplemented()
}
```

It is up to you to add Book struct with two fields: title and content, to define your entry, add all the attributes and to register your entry definition.
There is one thing we didn't tell in the previous exercise: `create_entry` returns a `ExternResult<HeaderHash>` and not an EntryHash. So you will have to calculate the Entry hash yourself and return it. Look [here](https://docs.rs/hdk/0.0.100/hdk/prelude/index.html) to see what function might be suited for that.

<inline-notification type="tip" title="Exercise">

1. Go to the `developer-exercises`.
2. Enter the nix-shell: `nix-shell`  .
   _You should run this in the folder containing the default.nix file_  .
   _starting the nix-shell for the very first time might take a long time, somewhere between 20 to 80 minutes, after that it will take just a few seconds_.
   _When it is done your terminal should similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`.
3. Go to folder with the exercise `1.basic/2.hashes`.
4. Inside `zomes/exercise/src/lib.rs`:
   - Define a new struct for your entry: 'Book'.
   - Implement the function `add_book`.
5. Compile and test your code: `cd tests && npm install && npm test`.
6. Don't stop until the test runs green.

</inline-notification>

### Add test

If you really want to take your exercises seriously, you need to know how to add tests yourself. Until now, every time you ran `./run_tests` script, it would jump in the `tests` directory and run the typescript tests with `npm test`. The tests are real integration tests. They take the zome, as a compiled dna, and have a holochain conductor create a cell, for a specific user, with this dna.
The tests are fairly straightforward. Take a look at the code in `tests\src\index.ts`. If you are done exploring, add the code here below, just behind this line `t.ok(entryHash, "test add book");`.

```typescript
let entry = await alice_common.cells[0].call(
  "exercise", // name of zome
  "get_book", // function to call
  entryHash // value to pass to the function
);
t.deepEqual(entry, book, "test book found"); // tape test assertion
```

Run the tests and verify that you have a second assertion in your test, and that it fails. The only good test, is the test that failed at least once. That way you know you are actually testing something real.

### Get book

After you get a failing test, it is up to you to make it pass. Implement the `get_book` function.
Run the tests. And if everything passes, then it is time to put your feet up, relax and rest.

<inline-notification type="tip" title="Exercise">

1. Add the extra test.
2. Check if you are still inside the nix-shell.
   _Your terminal should similar to this_ `[nix-shell:~/path-to-workspace/developer-exercises/path-to-exercise]$`.
3. Implement the function `get_book`.
4. Compile and test your code: `cd tests && npm install && npm test`.
5. Don't stop until the test runs green.

</inline-notification>

<inline-notification type="tip" title="Relevant HDK documentation">
<ul>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.create_entry.html">`create_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.hash_entry.html">`hash_entry`</a></li>
<li><a href="https://docs.rs/hdk/0.0.100/hdk/entry/fn.get.html">`get`</a></li>
</ul>
</inline-notification>

## Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

- The name of your property in the test (typescript) might not match the name in the zome (Rust)

```
ok 1 should be truthy
07:29:31 [tryorama] error: Test error: {
  type: 'error',
  data: {
    type: 'ribosome_error',
    data: 'Wasm error while working with Ribosome: Deserialize([0])'
  }
}
not ok 2 Test threw an exception. See output for details.
```

Verify that fieldname in typescript, match with the fieldnames in Rust

```
// Rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalEntryHash{
    value: String,  // has to match with
}
```

```
// Typescript
let book = await alice_common.cells[0].call(
  "exercise",
  "get_book",
  {
    // CORRECT
    value: "SDJCZjlsjfldkjfzerezmdljfdsmoiezr",
    // WRONG
    differentfieldname: "SDJCZjlsjfldkjfzerezmdljfdsmoiezr",
  }
);
```

For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or
your favorite search engine.

