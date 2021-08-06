# Requirements >> Setup ||10

## Install Nix

You need the nix-shell to build the exercises and run the tests. And to get the nix-shell you need to install the nix package manager.

### Linux

To install the package manager you run this command:

```bash
sh <(curl -L https://nixos.org/nix/install)
```

After installing Nix, run the following command so you do not have to log in and out again:

```bash
. ~/.nix-profile/etc/profile.d/nix.sh
```

### Windows

Native development on Windows is not supported at the moment. But if you run Linux using WSL2 or a VM you can use the Linux instructions.

### MacOS

Make sure you have the `Command Line Tools for XCode` installed, then on  

**macOS 10.15 Catalina and later**  
```bash
sh <(curl -L https://nixos.org/nix/install) --darwin-use-unencrypted-nix-store-volume
```

**macOS 10.14 Mojave and earlier**  

```bash
sh <(curl -L https://nixos.org/nix/install)
```

After installing Nix, run the following command so you do not have to log in and out again:

```bash
. ~/.nix-profile/etc/profile.d/nix.sh
```


## Clone repo

The next step is to clone the github repository.

```bash
git clone https://github.com/holochain-gym/developer-exercises.git
```

After that jump in to the base folder of the repository

```bash
cd developer-exercises
```



## Check
Before diving into the nix-shell, you should check if everything is setup properly.

Check if nix-shell is installed correctly:

```bash
nix-shell --version
```
This should print out the version of the nix-shell.
Next, check if you have a `default.nix` file in the base folder of the cloned repository.

```bash
ls default.nix
```

## Nix-shell

Now you are about to run the `nix-shell` command. This command will look for a default.nix file and build a complete development environment with all the necessary tools and dependencies with all the right versions.
But... because Holochain development is still in a fast-paced alpha state, you cannot download everything as binary files. That means you have to build Holochain and some of its dependencies on your machine. And that means that **running the nix-shell command for the first time will take somewhere between 20 to 80 minutes**.
It only takes this long the very first time or when we upgrade the Holochain version. **After that it will take a few seconds.** In the future, once Holochain is ready to release regular versions, we can skip the long build.

So go ahead and run

```bash
nix-shell
```
If you have no idea what to do in the meantime...
- go for a long walk in nature
- call a friend you have not been in contact with for a long time
- bake some [cookies](https://www.bbcgoodfood.com/recipes/basic-cookies) and share them with your neighbors

or if you want to stay on topic, you can read a bit more about why the Holochain projects use Nix [in this article](https://developer.holochain.org/docs/install-advanced/#more-info-on-nix).

## Devtools

We recommend using [VSCode](https://code.visualstudio.com/) with the [rust-analyzer](https://rust-analyzer.github.io/) extension while coding rust.

## Start

Next up you have 3 options:
- If you don't know much about core concepts of Holochain, you can check out the [Docs](/developers/requirements/documentation/) section to start reading up. Or if you want a more hands-on approach start in the [Concepts](/concepts/) section of our gym.
- If you are new to Rust you can look [here](/developers/requirements/rust/) to find out what you need to learn and where you can learn it.
- If you are ready to start the first exercise, it is a good idea to read about the [anatomy of an exercise](/developers/requirements/anatomy/), so you understand the folder structure and specific files. After that jump right into [the first exercise](/developers/basic/entries/). You can access all the exercises in the menu on the left. Every exercise will have some kind of interactive playground, some documentation or sample code and instructions. Each exercise has its own README file. It will tell you how to build the exercises and run the tests.

