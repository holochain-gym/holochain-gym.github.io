# Requirements >> Setup ||10

If you haven't, install `nix-shell` following the instructions of the Holochain [getting started guide](https://developer.holochain.org/docs/install/). **Note that to complete the exercises you only need `nix-shell` installed**, since they will already contain the necessary files to get you set up with Holochain RSM itself.

To setup the code exercises that follow along the sections of this page, clone the [developer-exercises repository](https://github.com/holochain-gym/developer-exercises). Every exercise will define its own `default.nix` file, which you will use to get the appropriate Holochain version.

We recommend using [VSCode](https://code.visualstudio.com/) with the [rust-analyzer](https://rust-analyzer.github.io/) extension while coding rust.

You can access the exercises with the menu at the left. Every exercise will have some kind of interactive playground, some documentation or sample code and instructions.

To finish an exercise, you must replace all `unimplemented` functions with working implementations, and **make all the tests pass**.

```js script
import "@rocket/launch/inline-notification/inline-notification.js";
```

<inline-notification type="warning" title="Order of exercises">

It's better to be following the exercises from start to end, since earlier concepts are needed to understand the following ones.

</inline-notification>

<inline-notification type="tip" title="Solutions">

If you get stuck with some exercise, the developer-exercises has a [solution branch](https://github.com/holochain-gym/developer-exercises/tree/solution) that you can look at for complete working solutions. Try not to use this too much though!

</inline-notification>

## Basic Holochain DNA (optional)

If you want to familiarize yourself with a sample Holochain project, clone the [Holochain DNA Build Tutorial](https://github.com/holochain/holochain-dna-build-tutorial).

- Look at the folder structure:
  - `zomes` contains various zomes (holochain modules), each zome is a normal rust crate.
  - `workdir` contains important Holochain files, defining your DNAs and hApp.
  - `tests` contains the tests for the DNA.
  - `default.nix`: this file is really important, as it defines which holochain binaries should be used with this happ.
- Enter the `nix-shell` for this repository by running `nix-shell .` in the root folder.
- Compile the DNA with:

```bash
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
hc dna pack workdir/dna
hc app pack workdir/happ
```

- After compiling, run the tests with:

```bash
cd tests
npm install
npm test`
```

You can look at the files of the project, and also play around with all the various commands that `hc sandbox` offers.
