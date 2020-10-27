# Basic >> Elements ||10
```js script
import { html } from 'lit-html';
```

```html story
<iframe width="100%" height="500" src="https://www.youtube.com/watch?v=fI9dEy9JzFM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

These are all the Header types that you can find in holochain:

```rust
pub enum Header {
    Dna(Dna),                                   // [Subconscious] The first header in any source chain, created when the application is installed
    AgentValidationPkg(AgentValidationPkg),     // [Subconscious] Contains the membrane proof for the agent
    InitZomesComplete(InitZomesComplete),       // [Subconscious] Declares that all zome init functions have successfully completed
    CreateLink(CreateLink),                     // [Conscious] Header result of `create_link(base, target)`
    DeleteLink(DeleteLink),                     // [Conscious] Header result of `delete_link(add_link_header_hash)`
    OpenChain(OpenChain),                       // [Subconscious] Will be used when the migration mechanism is implemented
    CloseChain(CloseChain),                     // [Subconscious] Will be used when the migration mechanism is implemented
    Create(Create),                             // [Conscious] Header result of `create_entry(entry)`, is accompanied by its entry
    Update(Update),                             // [Conscious] Header result of `update_entry(updated_header_hash, entry)`, is accompanied by its entry
    Delete(Delete),                             // [Conscious] Header result of `delete_entry(deleted_header_hash)`
}
```

## Exercise

> [Exercise](https://github.com/holochain-gym/developer-exercises/tree/master/basic/elements)

To test if you have implemented well the exercises, run `cargo test` from the folder of the exercise.