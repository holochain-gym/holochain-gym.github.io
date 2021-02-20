# Basic >> Hashes ||102

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

Welcome back to our Holochain gym. In the previous exercise you learned how to create a entry in a zome. You compiled your zome to a dna, you asked the holochain conductor to turn that dna in a cell, you tested your zome code in that cell through a test script.And you learned that you needed the following things in your code:
- import hdk library
- a serializable struct for input
- a public function with `#[hdk_extern()]` to make calls from the outside into your zome
- a struct with `#[hdk_entry()]` to serve as the base for your entry definition
- register your entry definition `entry_defs![NameOfYourStruct::entry_def()];`

You learned that there are 4 entry types: agent, app, claim cap, grant cap.
And will you were playing with the simulation, you learned that an entry has a hash.
Not bad for your first exercise!


## Hash function

Hashes are one the main ingredients in a holochain app. So let's find out what they are. Since we are a gym and not a library you are going to try it out.
Select "say_greeting" in the CallZomeFns below, type **Hello World** in the input and click _EXECUTE_.
Click on the newly added object in the Entry Graph and look at the value of Entry hash of in Entry Details.
Now type in something else, like Hello World in your own language, and execute again. Open the details of the new object and compare the hash values. What do you notice?


<!-- ```js story
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
      }}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 200px; margin-bottom: 20px;"
        hide-zome-selector
        hide-agent-pub-key
        hide-results
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
``` -->

First of all each hash has the same length. No matter how small or how big the input is, the hash is always the same length. If you don't believe it, try it. Try a really long greeting, but please do not damage our equipement.
The second thing you will find is that hashes do not look very similar. In fact, even the smallest difference in the input will give a very different hash. Don't believe, try it. Create an entry for *hello world* all lowercase, or add a comma or even a space.
The hashes will be very different.
Finally for the grand finale: add *Hello world* as an entry and then add it again. What do you notice?

Nothing happens. And that is a feature, not a bug. Because the same input, always returns the same hash. So when you added the *Hello World* entry a second and a third time the Entry Graph detected it already had an entry with this hash. And why save it again, if you already have it. It is a smart way to store data.

## Hash table

When you combine all these properties of hashes you can do interesting stuff. If for every piece of data or content you have, you can calculate the hash value, then you could easily make a nice big list of all the hashes. No matter the size of your data, each piece will have it's own unique hash and every hash has the same size. ASnce all those hashes can be mapped to their content, you can use that list as an index. This type of list has a name, it's a **hash table**. And the fancy name for this way of storing and retrieving your data is called**content addressable storage**. Because the content, well actually the hash of the content, can be used as a unique address. So the same content only needs to be stored once, and having small compact hash table is much easier than digging through all entries, big and small, one by one.

## Getting ready

Because they play a big role in how data is stored and retrieved, hashes are important in holochain apps. So now you know too. Enough talking. It is time to get ready for the exercise. 

This time you are building a library zome. The zome will need 2 functions that can be called from the outside: `add_book` and `get_book`. You will add your favorite book and retrieve it from the library zome with -you guessed it- its hash.

## Try it!  

First let's practice the movements in our simulation gym.
Select "add_book" in the CallZomeFns below, type the title in the input and click _EXECUTE_.
Click on the newly added object in the Entry Graph and copy the value of Entry hash. 
Select "get_book" in the CallZomeFns, put in the hash and click _EXECUTE_.

Now type in something else, like Hello World in your own language, and execute again. Open the details of the new object and compare the hash values. What do you notice?

add book 
get book with hash value

```js story
const sampleZome = {
  name: "library",
  entry_defs: [
    {
      id: "book",
      visibility: "Public",
    },
  ],
  zome_functions: {
    add_book: {
      call: ({ create_entry }) => ({ content }) => {
        return create_entry({ content, entry_def_id: "book" });
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
        <entry-detail style="flex-basis: 360px; height: 250px;"> </entry-detail>
      </div>
    </holochain-playground-container>
  `;
};
```

## exercise
- make entry for book, same as ex1 but 2 fields title & content
- ExternResult<HeaderHash> 
externresult = same as rust result, but to send outside of zome, so serializable
headerhash is just String with hash value, and a type. ther are many types of hash, header and entry most important
other you need t

- add_book2 which return entryhash



Add entry, check hash
Return is header hash, strange
Hint about elements
Hash entry
Get entry





<div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>