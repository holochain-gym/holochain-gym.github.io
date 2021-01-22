# Holochain Playground

Visit the [playground](https://holochain-open-dev.github.io/holochain-playground/).

This is an experimental ongoing effort to build a holochain playground simulation. It's trying to follow as accurately as possible the internal mechanisms of holochain, displaying the DHT and enabling detailed inspection.

This package is distributed as an [NPM package component library](https://npmjs.com/package/holochain-playground), in the form of a collection of web-components build with the [Custom Elements](https://developers.google.com/web/fundamentals/web-components/customelements) API.

## Library Usage

1. Install the package with `npm i holochain-playground` .
2. Import the `holochain-playground-provider` in your application like this:

``` js
import "holochain-playground/elements/holochain-playground-provider";
```

3. Declare the `<holochain-playground-provider></holochain-playground-provider>` element:

``` html
<body>
    <holochain-playground-provider id="playground"></holochain-playground-provider>
</body>
```

This is the fundamental element for the playground to work, as it provides the state for all other elements you declare inside it.

4. Import any elements you want from the library, and declare them inside the `holochain-playground-provider` :

``` js
import 'holochain-playground/elements/holochain-playground-dht-graph'
```

``` html
<body>
    <holochain-playground-provider id="playground">
        <holochain-playground-dht-graph></holochain-playground-dht-graph>
    </holochain-playground-provider>
</body>
```

5. Optionally, set the conductor urls to the nodes you want to bind the playground to:

``` html
<body>
    <holochain-playground-provider id="playground"></holochain-playground-provider>

    <script>
        const playground = document.getElementById("playground");
        playground.initialPlayground = {
            conductorUrls: ["ws://localhost:33000"];
        };
    </script>
</body>
```

## Elements Library

In the future, this will be shown with storybook.

### Technical data display

- `holochain-playground-dht-graph`
- `holochain-playground-dht-stats`
- `holochain-playground-dht-shard`
- `holochain-playground-entry-detail`
- `holochain-playground-entry-graph`
- `holochain-playground-source-chain`

### Utilities
- `holochain-playground-conductor-detail`
- `holochain-playground-create-entries`
- `holochain-playground-import-export`
- `holochain-playground-connect-to-nodes`
- `holochain-playground-select-dna`