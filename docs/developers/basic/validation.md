# Basic >> Validation ||107

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

`Op` is short for "DHT Operation". Every time you commit some action in your source chain, multiple DHT Operations are created and published to different parts of the DHT. This is because different read operations need to read different parts of the DHT, so we need to store the same element in multiple places.

This is a table describing the "DhtOps" that each action creates:


| Chain Action | DhtOp Name | Targeted hash basis | Payload | Metadata |
|--------------|------------|---------------------|---------|----------|
|create_entry(entry)| RegisterAgentActivity<br/> StoreRecord<br/> StoreContent | Author's public key<br/> Hash of the action <br/> Hash of the entry | Action <br/> Record <br/> Record | Hash of the action <br/> -  <br/> - |
|update_entry(original_action_hash, new_entry)| RegisterAgentActivity<br/> StoreRecord<br/> StoreContent<br/> RegisterContentUpdate<br/> RegisterRecordUpdate | Author's public key<br/> Hash of the action <br/> Hash of the entry <br/> Hash of the original entry <br/> Hash of the original action | New action <br/> New Record <br/> New record <br/> New action <br/> New action | Hash of the action <br/> - <br/> New entry updates old entry <br/> Old entry is updated to new entry <br/> Old action is updated to new action |
|delete_entry(action_hash)| RegisterAgentActivity<br/> StoreRecord<br/> RegisterContentDelete<br/> RegisterRecordDelete| Author's public key <br/> Hash of the new action <br/> Hash of the deleted entry <br/> Hash of the deleted action | New action <br/> New Record <br/> New action <br/> New action | Hash of the action <br/> - <br/> Old entry deleted by new action <br/> Old action deleted by new action |
|create_link(base, target, tag)| RegisterAgentActivity<br/> StoreRecord<br/> RegisterCreateLink| Author's public key <br/> Hash of the new action <br/> "Base" hash | Action <br/> Record <br/> Action |  Hash of the action <br/> - <br/> Link from the base to the target hash|
|delete_link(create_link_action_hash)| RegisterAgentActivity<br/> StoreRecord<br/> RegisterDeleteLink | Author's public key <br/> Hash of the new action <br/> Hash of the deleted create link action hash | Action <br/> Record <br/> Action | Hash of the action <br/> - <br/> Deleted link sent to tombstone | 

After the action is committed to the source chain and published to the DHT in those different parts, the agents who receive those publish requests first have to validate that the DHT Operation is actually valid and playing by the rules of the game. After making sure that the change is valid, the agents will start to answer DHT read operations (`get`, `get_links`, etc.) with its data.

To know more about how to implement validation rules in your application, read [this documentation](https://docs.rs/holochain_integrity_types/0.0.5/holochain_integrity_types/op/enum.Op.html#producing-operations).

## Exercise

We have provided the basic structure of validating a DNA that allows the creation of `Estimate`s.
Your task is to add the validation business logic for the `Estimate`s:

1. An Estimate value must be an agile Fibonacci value.
2. An Estimate's `item` must be non-empty.

### Extra credit

Add this validation rule:

* Each agent can only estimate the same `item` once.
