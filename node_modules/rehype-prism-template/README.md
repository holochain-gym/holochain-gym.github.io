# rehype-prism-teplate

[![MIT License](https://img.shields.io/github/license/iamskok/rehype-prism-template.svg?style=flat)](https://github.com/imaskok/rehype-prism-template/blob/master/LICENSE)
![Minzipped Size](https://img.shields.io/bundlephobia/minzip/iamskok/rehype-prism-template.svg?style=flat)
[![NPM Version](https://img.shields.io/npm/v/iamskok/rehype-prism-template.svg?style=flat)](https://www.npmjs.com/package/rehype-prism-template/)
![Node Version](https://img.shields.io/node/v/rehype-prism-template.svg?style=flat)

[rehype](https://github.com/wooorm/rehype) plugin to highlight code blocks in HTML with [Prism] (via [refractor]) fork from [mapbox/rehype-prism](https://github.com/mapbox/rehype-prism).

(If you would like to highlight code blocks with [highlight.js](https://github.com/isagalaev/highlight.js), instead, check out [rehype-highlight](https://github.com/wooorm/rehype-highlight).)

## Installation

```bash
npm install rehype-prism-template
```

## API

`rehype().use(rehypePrism, [options])`

Syntax highlights `pre > code`.
Under the hood, it uses [refractor], which is a virtual version of [Prism].

The code language is configured by setting a `language-{name}` class on the `<code>` element.
You can use any [language supported by refractor].

If no `language-{name}` class is found on a `<code>` element, it will be skipped.

### options

#### options.ignoreMissing

Type: `boolean`.
Default: `false`.

By default, if `{name}` does not correspond to a [language supported by refractor] an error will be thrown.

If you would like to silently skip `<code>` elements with invalid languages, set this option to `true`.

#### options.langs

Type: `array`.
Default: `undefined`

By default, the full list of [languages supported by refractor] will be registered. 

If you would like to include specific languages, set this option to an array of languages.

## Usage

Use this package [as a rehype plugin](https://github.com/rehypejs/rehype/blob/master/doc/plugins.md#using-plugins).

Some examples of how you might do that:

```js
const rehype = require('rehype');
const rehypePrism = require('rehype-prism-template');

rehype()
  .use(rehypePrism)
  .process(/* some html */);
```

```js
const unified = require('unified');
const rehypeParse = require('rehype-parse');
const rehypePrism = require('rehype-prism-template');

unified()
  .use(rehypeParse)
  .use(rehypePrism)
  .processSync(/* some html */);
```

If you'd like to get syntax highlighting in Markdown, parse the Markdown (with remark-parse), convert it to rehype, then use this plugin.

```js
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkRehype = require('remark-rehype');
const rehypePrism = require('rehype-prism-template');

unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrism)
  .process(/* some markdown */);
```

## Registering languages

By default `rehype-prism-template` includes [all language definitions] from refractor, though it's possible to set your custom 
list of registered languages by generating a new template of `index.js`. It is as easy as going in the package's root 
directory and specifing a list of languages:

```bash
cd /node_modules/rehype-prism
yarn register python java ruby kotlin
```

To reset the template back where it registers all languages:

```bash
yarn register-all
```

## FAQ

<details>
  <summary>Why does rehype-prism copy the <code>language-</code> class to the <code>&lt;pre&gt;</code> tag?</summary>
  
  [Prism recommends](https://prismjs.com/#basic-usage) adding the `language-` class to the `<code>` tag like this:

  ```html
  <pre><code class="language-css">p { color: red }</code></pre>
  ```

  It bases this recommendation on the HTML5 spec. However, an undocumented behavior of their JavaScript is that, in the process of highlighting the code, they also copy the `language-` class to the `<pre>` tag:

  ```html
  <pre class="language-css"><code class="language-css"><span class="token selector">p</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> red <span class="token punctuation">}</span></code></pre>
  ```

  This resulted in many [Prism themes](https://github.com/PrismJS/prism-themes) relying on this behavior by using CSS selectors like `pre[class*="language-"]`. So in order for people using rehype-prism to get the most out of these themes, we decided to do the same.
</details>

[Prism]: http://prismjs.com/

[refractor]: https://github.com/wooorm/refractor

[language supported by refractor]: https://github.com/wooorm/refractor#syntaxes

[languages supported by refractor]: https://github.com/wooorm/refractor#syntaxes