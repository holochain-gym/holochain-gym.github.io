# Basic >> Validation

<inline-notification type="tip" title="Useful reads">
  <ul>
    <li><a href="/concepts/validation-rules/">Validation Rules</a></li>
  </ul>
</inline-notification>

## Background

In this exercise we will implement validation. Validation ensures that only valid data ends up on
the chain used by an agent's hApp.

This hApp estimates work items. Agents can submit an `Estimate` with an estimate value:

```rust
pub struct Estimate {
    item: String,
    value: u8,
}
```

Our hApp has one requirement: all estimates must conform to the agile estimation recommendation of
using [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) less than or equal to 21.
(Here's an [agile estimation Fibonacci explainer](https://www.mountaingoatsoftware.com/blog/why-the-fibonacci-sequence-works-well-for-estimating)).

```rust
let valid_estimate_values = vec![0, 1, 2, 3, 5, 8, 13, 21];
```

So in addition to the `add_estimate` zome function allowing us to create new estimates, we will also
implement the `validate` zome function that ensures that only valid data is saved to the source chain.

## About validation

If your zome implements a `validate` function, the conductor will call it for all changes to the DHT
for any cell containing the zome.

The argument your `validate` will receive is an
[`holochain_integrity_types::op::Op`](https://docs.rs/holochain_integrity_types/0.0.5/holochain_integrity_types/op/enum.Op.html).

Every change to the source chain will produce a Op::RegisterAgentActivity and a Op::StoreElement.
Here's a list of the possible `Op` types and the conditions under which they occur:

* `StoreElement`: Any change to the agent source chain requires adding an
  [Element](https://developer.holochain.org/glossary/#element) and a
  [Header](https://developer.holochain.org/glossary/#header).
* `StoreEntry`: Create an [Entry](https://developer.holochain.org/glossary/#entry).
   Storing data on the chain that isn't just a header requires an Entry.
* `RegisterUpdate`: Update an [Entry](https://developer.holochain.org/glossary/#entry)
* `RegisterDelete`: Delete an [Entry](https://developer.holochain.org/glossary/#entry).
* `RegisterAgentActivity`: "Registers a new Header on an agent source chain."
* `RegisterCreateLink`: Create a [Link](https://developer.holochain.org/glossary/#entry).
* `RegisterDeleteLink`: Delete a [Link](https://developer.holochain.org/glossary/#entry).

Your validation function must handle `RegisterAgentActivity` and `StoreElement`. Which other
`Op`s you support depend on what agent actions your DNA supports, according to [these rules](https://docs.rs/holochain_integrity_types/0.0.5/holochain_integrity_types/op/enum.Op.html#producing-operations).

## Exercise

We have provided the basic structure of validating a DNA that allows the creation of `Estimate`s.
Your task is to add the validation business logic for the `Estimate`s:

1. An Estimate value must be an agile Fibonacci value.
2. An Estimate's `item` must be non-empty.

### Extra credit

Add this validation rule:

* Each agent can only estimate the same `item` once.
