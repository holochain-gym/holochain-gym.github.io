# Intermediate >> Capability Tokens ||11

```js script
import { html } from "lit-html";
import { HolochainPlaygroundCallZome } from "@holochain-playground/elements/dist/elements/holochain-playground-call-zome";
import { HolochainPlaygroundDhtCells } from "@holochain-playground/elements/dist/elements/holochain-playground-dht-cells";
import { HolochainPlaygroundContainer } from "@holochain-playground/container";
import { NetworkRequestType, WorkflowType } from "@holochain-playground/core";

customElements.define(
  "holochain-playground-container",
  HolochainPlaygroundContainer
);
customElements.define(
  "holochain-playground-dht-cells",
  HolochainPlaygroundDhtCells
);
customElements.define(
  "holochain-playground-call-zome",
  HolochainPlaygroundCallZome
);
```

**Capability tokens** are the unified security model of holochain. Whenever you want to call a zome function, the conductor will check whether you have capabilities to call it, and return and error if that's not the case.

This includes:

- Remote calls from other agents in the network
- Bridged calls from other DNAs
- Calls from the UI (this is not working yet)

Keep in mind that when trying to do a bridge call from a cell, if it has the same agent pub key as the callee cell, those are the same agent so the call will always be authorized to do so.

By default, all calls from other agent pub keys are **not authorized**. This means that if I try to do a remote call to another agent without having set up the capability tokens first, it will return an unauthorized error.

This is how the flow of capability tokens works from a conceptual point of view:

![](/_assets/cap-tokens.png)

## Demo

```js story
const dna = {
  zomes: [
    {
      name: "sample",
      entry_defs: [],
      zome_functions: {
        create_cap: {
          call: ({ create_cap_grant }) => ({ grantedAgent }) => {
            return create_cap_grant({
              tag: "",
              access: {
                Assigned: {
                  secret: "",
                  assignees: [grantedAgent],
                },
              },
              functions: [{ zome: "sample", fn_name: "sample_fn" }],
            });
          },
          arguments: [{ type: "AgentPubKey", name: "grantedAgent" }],
        },
        sample_fn: {
          call: () => () => {
            return "Hello";
          },
          arguments: [],
        },
        revoke_cap: {
          call: ({ delete_cap_grant }) => ({ capGrantToRevoke }) => {
            return delete_cap_grant({ header_hash: capGrantToRevoke });
          },
          arguments: [{ type: "HeaderHash", name: "capGrantToRevoke" }],
        },
        remote_sample_fn: {
          call: ({ call_remote }) => ({ agentToCall }) => {
            return call_remote({
              agent: agentToCall,
              zome: "sample",
              fn_name: "sample_fn",
              cap: null,
              payload: null,
            });
          },
          arguments: [{ type: "AgentPubKey", name: "agentToCall" }],
        },
      },
    },
  ],
};
const workflowsToDisplay = [WorkflowType.CALL_ZOME];
const newtorkRequestToDisplay = [NetworkRequestType.CALL_REMOTE];

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

async function demo(conductors) {
  const alice = conductors[0];
  const aliceCellId = alice.getAllCells()[0].cellId;
  const bob = conductors[1];
  const bobCellId = bob.getAllCells()[0].cellId;
  
  await sleep(1000);

  const r = await alice.callZomeFn({
    cellId: aliceCellId,
    zome: "sample",
    fnName: "sample_fn",
    payload: null,
    cap: null,
  });
}

export const Demo = () => html` <holochain-playground-container
  id="container"
  .numberOfSimulatedConductors=${2}
  .simulatedDnaTemplate=${dna}
  @ready=${(e) => demo(e.detail.conductors)}
>
  <holochain-playground-dht-cells
    style="height: 600px; width: 100%"
    .workflowsToDisplay=${workflowsToDisplay}
    .networkRequestsToDisplay=${newtorkRequestToDisplay}
  ></holochain-playground-dht-cells>
</holochain-playground-container>`;
```

## Subconsious flow

When a zome function call is received, holochain's subconscious does these checks:

- Is the called signed by the agent that sent it? (The signing is done automatically by the sender)
  - If not, return unauthorized error
- Is the public key of the agent the same one than the one of the cell we are trying to call?
  - If so, skip all other checks
- Do I have an unrevoked capability grant for this zome function, that contains the secret and the ?
  - If not, return unauthorized error

## HDK actions

- `generate_cap_secret`: creates a new random capability secret
- `create_cap_grant`: creates a capability grant with the given access configuration
- `create_cap_claim`: creates a capability to store the secret that allows the agent to call that zome function
- `update_cap_grant`: updates the given capability grant
- `delete_cap_grant`: revokes the given capability grant, so new calls with that secret or agent will fail

## Data structures

```rust
/// The entry for the ZomeCall capability grant.
/// This data is committed to the callee's source chain as a private entry.
/// The remote calling agent must provide a secret and we source their pubkey from the active
/// network connection. This must match the strictness of the CapAccess.
pub struct CapabilityGrant {
    /// A string by which to later query for saved grants.
    /// This does not need to be unique within a source chain.
    pub tag: String,
    /// Specifies who may claim this capability, and by what means
    pub access: CapAccess,
    /// Set of functions to which this capability grants ZomeCall access
    pub functions: GrantedFunctions,
    // @todo the payloads to curry to the functions
    // pub curry_payloads: CurryPayloads,
}

/// Represents access requirements for capability grants.
enum CapAccess {
    /// No restriction: callable by anyone.
    Unrestricted,
    /// Callable by anyone who can provide the secret.
    Transferable {
        /// The secret.
        secret: CapSecret,
    },
    /// Callable by anyone in the list of assignees who possesses the secret.
    Assigned {
        /// The secret.
        secret: CapSecret,
        /// Agents who can use this grant.
        assignees: HashSet<AgentPubKey>,
    },
}

/// System entry to hold a capability token claim for use as a caller.
/// Stored by a claimant so they can remember what's necessary to exercise
/// this capability by sending the secret to the grantor.
 struct CapabilityClaim {
    /// A string by which to later query for saved claims.
    /// This does not need to be unique within a source chain.
    tag: String,
    /// AgentPubKey of agent who authored the corresponding CapGrant.
    grantor: AgentPubKey,
    /// The secret needed to exercise this capability.
    /// This is the only bit sent over the wire to attempt a remote call.
    /// Note that the grantor may have revoked the corresponding grant since we received the claim
    /// so claims are only ever a 'best effort' basis.
    secret: CapSecret,
}

```
