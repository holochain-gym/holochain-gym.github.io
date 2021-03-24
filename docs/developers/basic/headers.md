# Basic >> Headers ||103

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
import { html } from "lit-html";
import {
  HolochainPlaygroundContainer,
  EntryContents,
  EntryGraph,
  CallZomeFns,
  SourceChain,
  DhtCells,
} from "@holochain-playground/elements";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define("entry-graph", EntryGraph);
customElements.define("entry-contents", EntryContents);
customElements.define("call-zome-fns", CallZomeFns);
customElements.define("source-chain", SourceChain);
customElements.define("dht-cells", DhtCells);
```

## Recap

Nice to see you again. We are happy to see your progress. You are really building up some core strength here.

By now you know what entries are, how you save them in your holochain app, retrieve them and even write a test for a zome function. And you took a long and hard look at hashes. Perhaps they were not new to you, but they are such a crucial aspect of any holochain app, that it couldn't hurt to refresh those muscles. So on to the next topic: headers.

## Headers

Headers are a delightful topic. Knowing how to work with headers will give you great flexibility! And what is strength without flexibility...
In one of the previous exercises you already saw some header stuff passing by. So let's take a look at them again.
In the simulation below we already added one entry.
First click on the grey circle with the text `kitchen_jar`. This should look familiar. It is just an entry. Then click on the top most blue rectangle with the text 'Create' and points directly the entry. And look at what you see on the righthand side in the Header Contents panel.

```js story
const simulatedDna0 = {
  zomes: [
    {
      name: "jars",
      entry_defs: [
        {
          id: "kitchen_jar",
          visibility: "Public",
        },
      ],
      zome_functions: {
        add_label: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            return create_entry({ content, entry_def_id: "kitchen_jar" });
          },
          arguments: [{ name: "content", type: "String" }],
        },
      },
    },
  ],
};
export const Sim0 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDna0}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];

        conductor.callZomeFn({
          cellId: cell.cellId,
          zome: "jars",
          fnName: "add_label",
          payload: { content: "#1 pistacchios" },
          cap: null,
        });
      }}
    >
      
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px;">
        </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

When you click on the blue square, you will see a blob of json data, just as you see below. The response get is something that is called an `element` in Holochain language. You will look a elements in more detail in the next exercise, but basically an element is just the combination of an entry and a header.
You will see that there are 2 top level objects: entry and signed_header. The signed_header consists of a header and a signature. You can ignore the latter. Before we talk about the header, take one more look at the entry. What do you notice?

```json
{
  "entry": {
    "entry_type": "App",
    "content": "#1 pistacchios"
  },
  "signed_header": {
    "header": {
      "content": {
        "author": "uhCAk4EP68467-xI_YMR4wO6jYjr3spY5Dvw165WF_aD2Ng8",
        "header_seq": 3,
        "prev_header": "uhCkkK6ag489p016T64YVrN2SyjdM6bY41Kt4RNEM3AKY7_w",
        "timestamp": [
          1616571211,
          293000
        ],
        "entry_hash": "uhCEkEPwEe57YM0PFD1Iy3m0eDD1iHPOcesa-ktpjULuImfE",
        "entry_type": {
          "App": {
            "id": 0,
            "zome_id": 0,
            "visibility": "Public"
          }
        },
        "type": "Create"
      },
      "hash": "uhCkkf9mOVrLftiyHHnXSpZ49l_JyMhi0Qw-SUosIMMBfmVo"
    },
    "signature": 
  }
}
```

Well the most stricking aspect of the entry is its simplicity. This is by design. Remember that the entry is stored and retrieved based on its hash, the content adressable stuff... Well if you and I and 100 others want to store a picture of Wangari Maathai in our Holochain app then there is no need to store it 102 times. One copy would be enough. In reality Holochain apps will keep several copies to ensure the app is reliable and perfomant, but that a whole different topic.

So the main idea is: keep entries simple, so they are efficient to store and retrieve. An entry can tell you two things 
1. what type of entry it is: Agent, App, CapClaim, CapGrant
2. what the content of the entry is

An entry does not tell you who created the entry, when it was created or if it was modified. This is where the header comes in. You could think of an header as a kind of metadata.
Let take a look what we can decypher from the example above.

* **author** the public key of the agent (cell) that signed the entry. This is a crucial component to prove to others you are really the author of this entry. Luckily it is all added automaticaly.    
* **timestamp** of when this entry was committed. It will state the time for when the entry was created. This the time of a specific machine, not some universal, global atomic clock. The time is in UTC, so no timezone information. And the format is combination standard Linux Epoch Time e.g._1616571211_  combined with elapsed nanoseconds,e.g._293000_.  While all this is very helpful to know, it cannot -reliably- be used to order events. Clocks on machine can be skewed, changed manually or do funny stuff on new years eve.  
* **header_seq** & **prev_header** are a better way to determine order. We will talk about them in a next exercise.  
* **type** indication what type of header this is. There are a number of header types: Dna,  AgentValidationPkg, InitZomesComplete, CreateLink, DeleteLink, Create, Update, Delete. In this exercise you will only have to deal with Create, Update, Delete.

All headers have the above mentioned fields, with one small exception of the Dna header, which doesn't have a prev_header, for the very simple reason that it is always the first header to be created in a holochain app.  
And some headers have some extra fields. Create and Update have 2 more fields. And not surprisingly these field tell something about entries. Because entries a very lightweight and most of the metadata is in the header, like author, timestamp, etcetera there has to be a link between an entry and its header.  
* **entry_hash** is the hash of the entry. It is exactly the same hash you worked with in the previous exercise. And since you can get the entry based on its hash, it is enough to store the entry hash inside the header. This makes a header a lightweight data structure. Whether your entry contains all published articles of Elisabeth Sawin or just a single "Hello world", the size of the header will about the same size. That is why entries and headers make such a good team: _**entries are simple, headers are light**_.  
* **entry_type**: contains some additional information on about the entry itself, like the id of the hApp, the id of the zome, it's visibility. We touch on this in the next exercise.

* **hash** And last but not least a header has is own hash. Just like entry, the hash of the header is completely determined by its content. Change one letter in the header and the headerhash will be completely different.

## Getting ready

So let's get to work with headers and entries. This time you will do your workout in the kitchen.
On your kitchen table you have 3 jars filled with nuts. Jar #1 contains pistacchios, jar #2 brazil nuts and jar #3 contains peanuts. And since you want to keep everything neatly ordered, you are going to label the jars. Sadly after you try your first peanut, you realise you are allergic to them.
After a day and a night in the hospital you are back on your feet and decide to throw away all peanuts and use the jar, after thouroughly washing it out, for cashews. And that is the moment that you realise that you need to change the label on the jar. Luckily there is a zome function for that. Which you are going to write. In total the zome will need 3 functions that can be called from the outside: `add_label`, `get_label` and `change_label`. 

Let's do a dry run in the simulation gym.
Select "add_label" in the CallZomeFns below, type `#1 pistacchios` in the input and click _EXECUTE_. Do the same for `#2 brazil nuts` and `#3 peanuts`.
In the Entry Graph, click on the newly added entry for the jar with peanuts and copy the value of Entry hash. 
Select "get_label" in the CallZomeFns, put in the hash and click _EXECUTE_. And doublecheck if you see the right jar.

After the peanut incident it is time to update the label for this jar. To do this you call the "update_label" function and you input 2 things. The new label: `#3 cashews` and the **header hash**. So look into the response you got back from "get_label" and look for the hash in the header, _not_ the entry_hash. Click _EXECUTE_ and look in the source chain panel to see what got added.

```js story
const simulatedDna1 = {
  zomes: [
    {
      name: "entries",
      entry_defs: [
        {
          id: "kitchen_jar",
          visibility: "Public",
        },
      ],
      zome_functions: {
        add_label: {
          call: ({ create_entry, hash_entry }) => async ({ content }) => {
            return create_entry({ content, entry_def_id: "kitchen_jar" });
          },
          arguments: [{ name: "content", type: "String" }],
        },
        get_label: {
          call: ({ get }) => ({ hash }) => {
            return get(hash);
          },
          arguments: [{ name: "hash", type: "EntryHash" }],
        },
        update_label: {
          call: ({ update_entry }) => ({
            original_header_address,
            new_content,
          }) => {
            return update_entry({
              original_header_address,
              new_content,
              entry_def_id: "kitchen_jar",
            });
          },
          arguments: [
            { name: "original_header_address", type: "HeaderHash" },
            { name: "new_content", type: "String" },
          ],
        },
        delete_label: {
          call: ({ delete_entry }) => ({ deletes_header_address }) => {
            return delete_entry(deletes_header_address);
          },
          arguments: [{ name: "deletes_header_address", type: "HeaderHash" }],
        },
      },
    },
  ],
};
export const Sim1 = () => {
  return html`
    <holochain-playground-container
      .numberOfSimulatedConductors=${1}
      .simulatedDnaTemplate=${simulatedDna1}
      @ready=${(e) => {
        const conductor = e.detail.conductors[0];

        const cell = conductor.getAllCells()[0];

        e.target.activeAgentPubKey = cell.cellId[1];
      }}
    >
      <call-zome-fns
        id="call-zome"
        style="height: 400px; margin-bottom: 20px;"
        hide-agent-pub-key
      >
      </call-zome-fns>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px;">
        </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `;
};
```

What you see is that the original Create header is still there and the original entry is still there and it is not updated. But you do see a new header of type Update with a new header. And if you open Update header you will see that it refers to the original create header and the original entry. 
The update header is basically saying: "Hey, remember that jar you labelled as #3 peanuts? Well I am renaming it to #3 cashews".
So in a holochain app data is never overwritten. If you change the label on the jar 10 times, then your _chain_ will contain at least 11 headers. One create header and 10 update headers. And all these headers will point to entries.

## Exercise

Ok, it is time to start stretching. We raise the bar a little more this time. You start with an empty `lib.rs` file in your zome. It is up to you to add the `add_label`, `get_label` and `update_label`. Look at the tests or in previous exercises if you get lost.

It is up to you to add struct Book with two fields, title and content, to define your entry, add all the attributes and to register your entry definition. Again, look [here](https://github.com/holochain/holochain/blob/develop/crates/hdk/src/prelude.rs) to see what functions might help you accomplish your goals.

## Deleting entries

When you are done creating a zome that can add an update labels, you might start wondering: given that entries in a holochain app never really disappear, you might be wondering how you delete an entry? The answers is simple: with a header. Just like the add_label function that created an header pointing to a new entry, you can delete that same entry by creating an delete header.

You can also delete updates. And according to the docs: if you delete all the headers `a previously published Entry will become inaccessible if all of its`. We have not simulation of exercise for that. But you can take up that challenge and build one yourself. We will reward you with a lifetime membership to the holochain gym if you can come up with a good exercise.

# Errors

If you encounter an error check here if you can find something that looks like your error. If not head to the [forum.holochain.org](https://forum.holochain.org/t/gym-help-needed-offer-request/4622/15) and ask for help.

```rust
no error added yet
```

For Rust specific questions:
https://forum.holochain.org/c/technical/rust/15
or 
your favorite search engine

