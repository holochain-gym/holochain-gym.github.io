# Beginner >> Paths ||11

```js script
import { html } from "lit-html";
```

Paths are the replacement of anchors in RSM. They fill the same role but add a lot more flexibility and dimensionality, and allow you to create complex indexes to query faster the DHT very easily.

The content of each path is a string with segments separated by a dot, for example: `all_tasks.project1.finished`. This path will create these entries:

- `all_tasks`
- `all_tasks.project`
- `all_tasks.project1.finished`

Here, you can see that the root parent of the path is `all_tasks`, which has `all_tasks.project1` as child. Each of these entries has a hash in the DHT like any other entry. Also, every parent will have a link pointing to all its children.

The basic mechanism for which these entries are useful is to attach links to them. If you attach a link to the `all_tasks.project1.finished` that points to all tasks related with `project1` that have finished, now you can do a `get_links` on that path to get only those.

If, on the contrary, you want to get all tasks within the project regardless of status, you can get all the children paths from `all_tasks.project1`, which will give you for example `all_tasks.project1.todo`, `all_tasks.project1.doing` and `all_tasks.project1.finished`, and then do a `get_links` to tasks on those.

Keep in mind that paths are already incorporated in the core hdk, so you don't need to import them from an external library. Although it is necessary to define them as an entry definition in your zome like this:

```rust
entry_defs![
    Path::entry_def(),
    ...
];
```

Here is an example code on how to use them:

```rust
/**
 * Creates a new calendar event, linking from the creator's public key path
 */
pub fn create_calendar_event(
    calendar_event_input: CreateCalendarEventInput,
) -> ExternResult<CalendarEventOutput> {
    let agent_info = agent_info!()?;

    let calendar_event = CalendarEvent {
        ...
    };

    create_entry!(calendar_event.clone())?;

    let calendar_event_hash = hash_entry!(calendar_event.clone())?;

    let path = calendar_events_path_for_agent(agent_info.agent_latest_pubkey)?;

    // Here we are creating all paths entries and links between them
    path.ensure()?;

    // Here we get the hash of the child path
    let path_hash = path.hash()?;

    // And we link the calendar event from it
    create_link!(path_hash, calendar_event_hash.clone())?;

    Ok(calendar_event_hash)
}

/**
 * Returns the calendar in which the agent is the creator or is an invitee
 */
pub fn get_calendar_events_for_agent(agent: AgentPubKey) -> ExternResult<Vec<CalendarEventOutput>> {
    let path = calendar_events_path_for_agent(agent)?;

    let links = get_links!(path.hash()?)?;

    links
        .into_inner()
        .iter()
        .map(|link| {
            utils::try_get_and_convert::<CalendarEvent>(link.target.clone())
                .map(|(entry_hash, entry)| CalendarEventOutput { entry_hash, entry })
        })
        .collect()
}

fn calendar_events_path_for_agent(public_key: AgentPubKey) -> Path {
    Path::from(format!("calendar_events.{:?}", public_key))
}
```

You can imagine different types of indexes built on top of paths, with multidimensional properties. Experiment a little with them and have fun!
