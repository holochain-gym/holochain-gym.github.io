# @tiny-lit/core

Just another JavaScript library for building user interfaces using template literals

# Usage

### Html template
```js
import { html, render } from '@tiny-lit/core';

const quote = message => html`
    <div>
        <blockquote>
            ${message}
        </blockquote>
    </div>
`;

render(
    quote(
        `
        Neque porro quisquam est 
        qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit
        `
    ),
    document.body
);
```

### List of templates

```js
import { html, render } from '@tiny-lit/core';

const listItem = item => (
    html`<li>${item}</li>`.withKey(item)
);

const list = items => (
    html`
        <ul>
            ${items.map(listItem)}
        </ul>
    `
);

render(
    list(['pippo', 'pluto', 'paperino']),
    document.body
);
```