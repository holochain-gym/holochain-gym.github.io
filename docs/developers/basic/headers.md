# Basic >> Headers ||103

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

## Recap

Nice to see you again. We are happy to see your progress. You are really building up some core strength here.

By now you know what entries are, how you save them in your holochain app, retrieve them and even write a test for a zome function. And you took a long and hard look at hashes. Perhaps they were not new to you, but they are such a crucial aspect of any holochain app, that it couldn't hurt to refresh those muscles.

## Headers

Headers are a delightful topic. Knowing how to work with headers will give you great flexibility! And what is strength without flexibility...
In one of the previous exercises you already saw some header stuff passing by. So let's take a look at them again.
Select "say_greeting" in the CallZomeFns below, type **Hello World** in the input and click _EXECUTE_.
Click on the newly added object in the Entry Graph and look at the value of Entry hash of in Entry Details.
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
  zome_functions: {
    say_greeting: {
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: "greeting" });
      },
      arguments: [{ name: "content", type: "String" }],
    },
    get_greeting: {
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

        conductor.callZomeFn({
            cellId,
            zome: "helloworld",
            fnName: "say_greeting",
            payload: "hello world" ,
            cap: null,
          });


      }}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 200px; margin-bottom: 20px;"
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
        <entry-detail style="flex-basis: 600px; height: 500px;"> </entry-detail>
      </div>
    </holochain-playground-container>
  `;
};
```

First of all each hash has the same length. No matter how small or how big the input is, the hash is always the same length. If you don't believe it, try it. Try a really long greeting, but please do not damage our equipement.
The second thing you will find is that hashes do not look very similar. In fact, even the smallest difference in the input will give a very different hash. Don't believe, try! Create an entry for *hello world* all lowercase, or add a comma or even a space.
The hashes will be very different.
Finally for the grand finale: add *Hello world* as an entry and then add it again. What do you notice?

Nothing happens. And that is a feature, not a bug. Because the same input, always returns the same hash. So when you added the *Hello World* entry a second and a third time the Entry Graph detected it already has entry with this hash. And why save it again, if you already have it. It is a smart way to store data.

## Hash table

When you combine all these properties of hashes you can do interesting stuff. If for every piece of data or content you have, you can calculate the hash value, then you could easily make a nice big list of all the hashes. No matter the size of the data you want to store, each piece will have it's own hash, which is unique but has the same size as all other hashes. And since all those hashes can be mapped to their content, you can use that list as an index. This type of list has a name, it's a **hash table**. And the fancy name for this way of storing and retrieving your data is called**content addressable storage**. Because the content, well actually the hash of the content, can be used as a unique address for the content. I will really get interesting when we upgrade this hash table to a distribute hash table.

## Getting ready

So I hope you see that hashes play a big role in how data is stored and retrieved. You will see them poping up when we talk about headers, elements, the DHT, validations. They are everywhere.  
Enough talking. It is time to get ready for the exercise. 

This time you are building a library zome. The zome will need 2 functions that can be called from the outside: `add_book` and `get_book`. You will add your favorite book and retrieve it from the library zome with -you guessed it- via the hash of its entry. In the next exercise we will see that there are better way to retrieve your data: headers and elements. But it is good to know you can always find your entry again based on its entry hash.

First let's practice a bit in the simulation gym.
Select "add_book" in the CallZomeFns below, type the title of your favorite book in the input and click _EXECUTE_.
Click on the newly added object in the Entry Graph and copy the value of Entry hash. 
Select "get_book" in the CallZomeFns, put in the hash and click _EXECUTE_. Open the last item with the green check with the text `get_book in library zome, result: `, in the panel just right of the execute button. Inspect the details. We told you you would see hashes everywhere. Look for the entry_hash and check if it matches.
If it does, it means you succesfully created and retrieved an entry from the holochain simulation app.


```js story
const sampleZome2 = {
  name: "library",
  entry_defs: [
    {
      id: "book",
      visibility: "Public",
    },
  ],
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
      arguments: [
        { name: "content", type: "String" },
      ],
    },
    get_book: {
      call: ({ get }) => ({ hash }) => {
        return get(hash);
      },
      arguments: [{ name: "hash", type: "EntryHash" }],
    },
  },
};

const simulatedDnaTemplate2 = {
  zomes: [sampleZome2],
};
export const Exercise = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDnaTemplate2}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cellId = conductor.getAllCells()[0].cellId;

        e.target.activeAgentPubKey = cellId[1];
      }}
    >
      <call-zome-fns
        id="call-zome2"
        style="height: 500px; margin-bottom: 20px;"
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
        <entry-detail style="flex-basis: 600px; height: 500px;"> </entry-detail>
      </div>
    </holochain-playground-container>
  `;
};
```

## Exercise

### Add book

Since the previous exercise went well, we will raise the bar a little and leave a bit more of the work to you. We will start you of with this:

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

It is up to you to add struct Book with two fields, title and content, to define your entry, add all the attributes and to register your entry definition.
There is one thing we didn't tell in the previous exercise: `create_entry` returns a `ExternResult<HeaderHash>` and not an EntryHash. So you will have to calculate the Entry hash yourself and return it. Look [here](https://github.com/holochain/holochain/blob/develop/crates/hdk/src/prelude.rs) to see what function might be suited for that.


### Add test  

If you really want to take your exercises seriously, you need to know how to add tests yourself. Until now, every time you ran `./run_tests` script, it would jump in the tests directory up and run the tests, written in typescript, with `npm test`. In these tests we take the zome, that was compiled into a dna, and have a holochain conductor create a cell, for a specific user, with this dna. 
The tests are fairly straightforward. Take a look at the code in `tests\src\index.ts`. If you are done exploring, add the code here below, just behind this line `t.ok(entryHash, "test add book");`.


```typescript
let book = await alice_common.cells[0].call(
  "exercise",    // name of zome
  "get_book",    // function to call
  entryHash      // value to pass to the function
);
t.ok(book, "test get book"); // tape test assertion
```

Run the tests and verify that you have a second assertion in your test, and that it fails. The only good test, is the test that failed at least once. That way you know you are actually testing something real.

### Get book

After you get a failing test, it is up to you to make it pass. Implement the `get_book` function.
Run the tests. And if everything passes, then it is time to put your feet up, relax and rest.


# Errors

ok 1 should be truthy
07:29:31 [tryorama] error: Test error: {
  type: 'error',
  data: {
    type: 'ribosome_error',
    data: 'Wasm error while working with Ribosome: Deserialize([0])'
  }
}
not ok 2 Test threw an exception. See output for details.

==> verify that fieldname in typescript, match with the fieldnames in Rust
// Rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalEntryHash{
    value: String,  // has to match with 
}

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




For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or 
your favorite search engine
