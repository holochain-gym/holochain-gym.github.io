
# LitContext &middot; ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![npm version](https://img.shields.io/npm/v/lit-context.svg?style=flat) ![Build Status](https://travis-ci.org/doriandres/lit-context.svg?branch=master) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

LitContext is a JavaScript library for dealing with data context with LitElement components.

## Installation

Coming soon

```bash
npm install lit-context
```

## Getting started

### Providing properties

```javascript
import { LitElement, html, customElement, property } from 'lit-element';
import { createContext } from "lit-context";

// Create a context
// Context creation will define a custom element provider with the given name <message-provider>
const { consume: consumeMessage } = createContext('message');


// Create a consumer custom element
@customElement("simple-message")
@consumeMessage()
class SimpleMessage extends LitElement {
  @property({ type: String })
  message = "";
  
  render() {
    return html`      
      <p>${this.message}</p>
    `;
  }
}

// Provide the context

// Provide the context
@customElement("main-app")
class MainApp extends LitElement {
  @property({ type : Number })
  counter = 0;

  get providerValue(){
    return { 
      message: `The values is ${this.counter}` 
    };
  }
  
  increase = () => {
    this.value += 1;
  }
  
  render() {    
    return html`      
      <button @click=${this.increase}>Add</button>
      <br/>      
      <!-- All providers have only a value property -->
      <message-provider .value=${this.providerValue}>
          <!-- All consumers under the provider (light or shadow dom) will get updates (even if they are slotted or inside another custom element) -->
          <simple-message></simple-message>
      </message-provider>
    `;
  }
}  

```


### Dependency Injection like behavior

```javascript
import { LitElement, html, customElement, property } from 'lit-element';
import { createContext } from "lit-context";

const { consume: consumeHttp } = createContext('http', {
  httpGet: async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
});

@customElement("some-list")
@consumeHttp()
class SomeList extends LitElement {
  @property({ type: Array })
  items = [];
  
  async loadItems(){
    this.items = this.httpGet('https://someapi.com/api/v1/items');
  }
  
  firstUpdated(){
    this.loadItems();
  }
  
  render() {
    return html`      
      <ul>
        ${this.items.map(item => html`
          <li>${item}</li>
        `)}
      </ul>
    `;
  }
}


@customElement("main-app")
class MainApp extends LitElement {
  render() {    
    return html`      
      <http-provider>
        <some-list></some-list>
      </http-provider>
    `;
  }
}

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/doriandres"><img src="https://avatars0.githubusercontent.com/u/19631146?v=4" width="100px;" alt=""/><br /><sub><b>Dorian Andrés</b></sub></a><br /><a href="https://github.com/doriandres/lit-context/commits?author=doriandres" title="Code">💻</a> <a href="#ideas-doriandres" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/doriandres/lit-context/commits?author=doriandres" title="Documentation">📖</a> <a href="#maintenance-doriandres" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/garyvh2"><img src="https://avatars1.githubusercontent.com/u/21265830?v=4" width="100px;" alt=""/><br /><sub><b>Gary Valverde Hampton</b></sub></a><br /><a href="https://github.com/doriandres/lit-context/commits?author=garyvh2" title="Code">💻</a> <a href="#ideas-garyvh2" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-garyvh2" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
