# Holochain Gym

Go to the [gym](https://holochain-gym.github.io).

## Contributor Setup

First, you need to be running node v14. An easy way to do this is to enter the nix-shell:

```bash
nix-shell -p nodejs-14_x
```

Install the dependencies for the project:

```bash
npm install
```

## Starting

```bash
npm start
```

This will start a server with hot reload that should open automatically.

## Deploying to github pages

```bash
npm run gh-pages
```

