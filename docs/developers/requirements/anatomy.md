# Requirements >> Anatomy || 40

The [`developer-exercises`](https://github.com/holochain-gym/developer-exercises) repository contains exercises for each of the lessons presented here in the Gym.

The repository itself is a cargo workspace, and each of the exercises consists of two separate crates, one for the exercise itself and another for the solution to the exercise.

It is also an NPM workspace, since we are using tryorama for the tests.

## Anatomy of an exercise

Each exercise will have two folders:
* exercise
* solution

The solution folder contains a complete and working version of the exercise folder. After you solved the exercise you can compare your solution with our solution. Or if you are really lost, you can take a quick look...

The structure inside the exercise and solution folder very similar to a real holochain application. So let us review what you see when you open the entries exercise.

The best place to start if you are lost is to read the **README** file again. It briefly states what you need to do to compile and test the exercise.

The heart of the exercise lies withing **zomes/exercise**. This is a pure and simple Rust project and contains its own `Cargo.toml` and `Cargo.lock` file. You start adding Rust code in `src/lib.rs`

Once you are done adding code you need to compile your Rust code to a [WASM](https://webassembly.org/) binary and package it in a DNA, a holochain specific format. The result will be stored in **workdir**.

To make your live easy we put together a npm script in the `tests/package.json` that checks if you are running in the nix-shell and builds the code. To build your zome you only need to run **npm run build** inside the `tests` folder.

The **tests** folder contains a full node/typescript project, complete with `package.json`,`tsconfig.json` and a `src` folder. These tests can be viewed as integration tests. They actually run your compiled DNA in a real holochain [conductor](https://developer.holochain.org/docs/glossary/#conductor). The tests call your code, just like a regular web app would do.

For running the tests we also provided another npm script that checks if you are running in the nix-shell and runs the tests. You only need to call **npm test** inside the `tests` folder.

Now you know enough to start the [first exercise](/developers/basic/entries/) or better yet explore the main [concepts](/concepts/) of holochain in a hands-on way. Except for a few minor differences the holochain-gym exercises look and act just like real holochain app projects.
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
