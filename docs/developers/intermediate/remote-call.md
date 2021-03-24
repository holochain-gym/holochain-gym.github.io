# Intermediate >> Remote Call 

**Remote Calls** are a method for calling a zome function of another agent in a Holochain DHT network. This remote function exection happens in p2p and relies heavily on capability tokens for the security model.
Remote calls are useful for the purposes of allowing other agents to create entries in your chain (private or public) on your behalf. This has many applications and could be used in things such as: shared authoring of posts or synchronous p2p communication!

Note the example of synchronous communication vs asynchronous. Remote calls require that the target be online in order to properly execute. If the target agent is not online then the call will fail with a network error. 

Remote calls have deep ties with Capability Tokens. Not only do you need a Capability Tokens secret to send a remote call, but agents should also receive these secrets via remote calls to their own conductor!

## HDK actions

Lets take a look at the hdk function and detail each parameter of the function call, that will help give us a clearer picture of how it works and what is expected from us.

```rust
pub fn call_remote<I>(
    agent: AgentPubKey, 
    zome: ZomeName, 
    fn_name: FunctionName, 
    cap_secret: Option<CapSecret>, 
    payload: I
) -> ExternResult<ZomeCallResponse> 
where
    I: Serialize + Debug, 
```

**agent**: The first thing we need to pass is the `AgentPubKey`. This is the public key of the agent you wish to send the remote call to. You should already be familiar about the role of agent keys in holochain, but if not check out some of the previous exercises. <br>
**zome**: Name of zome that contains the function that we want to remote execute. <br>
**fn_name**: Name of the actual function that we want to evoke. <br>
**cap_secret**: The secret from the cabability token that the target agent authored and shared. It is possible to send `None` here but that will result in a authentification error unless the target zome function has been marked by the target agent as having `Unrestricted` Capability Access. <br>
**payload**: The data that will be passed into the zome function of the remote agent.

## Exercise

### Problem statement

We need to code a small zome that has the following abilities:

 - Create and share a post with another agent; p2p
 - Have the post persist so agent can read their incoming messages
    - Provide a method of getting posts an agent has received
 - Allow the receiving of cap token secrets from other agents