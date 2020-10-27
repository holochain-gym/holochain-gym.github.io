# Beginner >> Elements ||10
```js script
import { html } from 'lit-html';
```

```html story
<iframe width="100%" height="500" src="https://www.youtube.com/embed/fI9dEy9JzFM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

---

Almost all hdk functions deal with elements, because they are such an important part of the holochain data integrity mechanism. 

These are all the header types that you can find in holochain:

```rust
pub enum Header {
    Dna(Dna),                               // Created when the application is installed
    AgentValidationPkg(AgentValidationPkg), // Contains the membrane proof for the agent
    InitZomesComplete(InitZomesComplete),   // Declares that all zome init functions have successfully completed
    CreateLink(CreateLink),                 // Header result of `create_link(base, target)`
    DeleteLink(DeleteLink),                 // Header result of `delete_link(add_link_header_hash)`
    OpenChain(OpenChain),                   // Will be used when the migration mechanism is implemented
    CloseChain(CloseChain),                 // Will be used when the migration mechanism is implemented
    Create(Create),                         // Produced by `create_entry(entry)`, carries its entry
    Update(Update),                         // Produced by `update_entry(updated_header_hash, entry)`, carries its entry
    Delete(Delete),                         // Produced by `delete_entry(deleted_header_hash)`
}
```

### Exercise

> [Link to source code](https://github.com/holochain-gym/developer-exercises/tree/master/basic/elements)

- Implement all `unimplemented!()` functions in the exercise. 
- Run `cargo test` to test your implementation.