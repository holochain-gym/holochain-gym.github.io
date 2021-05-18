# Requirements >> Anatomy || 40

## Anatomy of an exercise

Each exercise will have two folders:
* exercise
* solution

The solution folder contains a complete and working version of the exercise folder. After you solved the exercise you can compare your solution with our solution. Or if you are really lost, you can take a quick look...

The structure inside the exercise and solution folder very similar to a real holochain application. So let us review what you see when you open the entries exercise.

![](/_assets/folder_gym_exercise.png)

The best place to start if you are lost is to read the **README** file again. It briefly states what you need to do to compile and test the exercise.

The exercise is a [Cargo workspace](https://doc.rust-lang.org/book/ch14-03-cargo-workspaces.html). Cargo, is the build system for Rust. And a workspace is place in which you can define one or more Rust projects. **Cargo.toml** contains the configuration of the workspace. Open the file and you will see that is has one member `zomes/exercise`.
Our gym exercise only contain one member, but holochain app will typically have multiple members.

**Cargo.lock** contains a snapshot of all the rust dependencies. It works much like `package-lock.json` in node projects. You should commit this file to the git repository if you are working with several people on the same project.

The heart of the exercise lies withing **zomes/exercise**. This is a pure and simple Rust project and contains its own `Cargo.toml` and `Cargo.lock` file. You start adding Rust code in `src/lib.rs`

Once you are done adding code you need to compile your Rust code to a [WASM](https://webassembly.org/) binary and package it in a DNA, a holochain specific format. The result will be stored in **workdir**.

To make your live easy we put together a simple script that checks if you are running in the nix-shell and builds the code. To build your zome you only need to run **./run_build.sh**.

The **tests** folder contains a full node/typescript project, complete with `package.json`,`package-lock.json`,`tsconfig.json` and a `src` folder. These tests can be viewed as integration tests. They actually run your compiled DNA in a real holochain [conductor](https://developer.holochain.org/docs/glossary/#conductor). The tests call your code, just like a regular web app would do.

For running the tests we also provided a simple script that checks if you are running in the nix-shell and runs the tests. You only need to call **./run_tests.sh**.

The folders **.cargo** & **target** will only show when you try to build the project. You usually exclude these when committing code to a repository.

Now you know enough to start the [first exercise](/developers/basic/entries) or better yet explore the main [concepts](/developers/concepts) of holochain in a hands-on way. Except for a few minor differences the holochain-gym exercises look and act just like real holochain app projects.
If want to start working on your own holochain apps, separate from the holochain-gym, you can read the next section.

## Building your own Holochain app (optional)

If you want to familiarize yourself with a sample Holochain project, clone the [Holochain DNA Build Tutorial](https://github.com/holochain/holochain-dna-build-tutorial).

- Look at the folder structure:
  - `zomes` contains various zomes (holochain modules), each zome is a normal rust crate.
  - `workdir` contains important Holochain files, defining your DNAs and hApp.
  - `tests` contains the tests for the DNA.
  - `default.nix`: this file is really important, as it defines which holochain binaries should be used with this happ. *Difference with holochain-gym*: In the gym we placed this file at the root of the repository, so you can work on all exercises in the same terminal.
- Enter the `nix-shell` for this repository by running `nix-shell .` in the root folder.
- Compile the DNA with:

```bash
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
hc dna pack workdir/dna
hc app pack workdir/happ
```
*Difference with holochain-gym*: In the gym we provide a simple build script `run_build.sh` that checks you are running inside a nix-shell and if so, runs the above steps.

- After compiling, run the tests with:

```bash
cd tests
npm install
npm test
```

*Difference with holochain-gym*: In the gym we provide a simple test script `run_tests.sh` that checks you are running inside a nix-shell and if so, runs tests.

You can look at the files of the project, and also play around with all the various commands that `hc sandbox` offers.
