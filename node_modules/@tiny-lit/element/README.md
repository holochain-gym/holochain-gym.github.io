# @tiny-lit/element

# Usage

### Custom element

```js
import { html } from '@tiny-lit/core';
import { Element, withElement } from '@tiny-lit/element';

class Clock extends Element {
    connectedCallback() {
        setInterval(
            () =>
                this.setState({
                    time: new Date().toLocaleTimeString()
                }),
            1000
        );
    }

    render() {
        return html`
            <div>${this.state.time}</div>
        `;
    }
}
customElement.define('my-clock', Clock);

class Select extends withElement(HTMLSelectElement) {
    render() {
        return html`
            ${this.state.options.map(option =>
                html`
                    <option value=${option.value}>
                        ${option.label}
                    </option>
                `.withKey(option.value)
            )}
        `;
    }
}
customElement.define('my-select', Select);
```

```html
<my-clock></my-clock>
```

#### Observed props

You can define properties for your elements by defining an static getter named `properties`. 

This getter must return an object where the keys represent the property names and the values can either a function, which is used for deserializing the attribute value, or a property descriptor object.
Each of the defined property is mapped automatically to an attribute. The name of the attribute is obtained by converting the camelCase name of the property to kebab-case. (eg. myProp becames my-prop)

```js
import { html } from '@tiny-lit/core';
import { Element, withProps } from '@tiny-lit/element';

class Clock extends Element {
    title = 'My clock';

    static get properties() {
        return {
            title: String
        };
    }

    connectedCallback() {
        setInterval(
            () =>
                this.setState({
                    time: new Date().toLocaleTimeString()
                }),
            1000
        );
    }

    render() {
        return html`
            <h1>${this.title}</h1>
            <div>${this.state.time}</div>
        `;
    }
}
customElement.define('my-clock', Clock);
```

```html
<my-clock id="clock"></my-clock>

<script>
    const clock = document.querySelector('#clock');
    clock.title = 'The clock';
</script>
```

#### Property descriptor
The property descriptors are object used to define the properties. 

- **type** _(serializedValue: string) => any_ | A function used to deserialize the attribute value to the corresponding property.
- **onChange** _Boolean | (newValue: any, oldValue: any) => void_ | A function triggered every time the property changes. It can be set also to `true`, in that case a default method, based on the property name, is called (eg. myProp -> onMyPropChanged)

#### Extend properties

To extend the properties you can just define new getters/setters on your class, but don't forget to call the super getter/setter, otherwise it could break your component.

```js
class Clock extends Element {
    title = 'My clock';
    intervalId = null;

    static get properties() {
        return {
            title: String,
            disabled: {
                type: Boolean,
                onChange: true
            }
        };
    }

    tick = () => {
        this.setState({
                time: new Date().toLocaleTimeString()
        });
    }

    connectedCallback() {
        this.intervalId = setInterval(this.tick);
    }

    onDisabledChange(value) {
        if (value) {
            this.addAttribute('disabled', '');
            clearInterval(this.intervalId);
        } else {
            this.removeAttribute('disabled');
            this.intervalId = setInterval(this.tick);
        }
    }

    render() {
        return html`
            <h1>${this.title}</h1>
            <div>${this.state.time}</div>
        `;
    }
}
```

### Lifecycle callbacks

```js
class Clock extends Element {
    title = 'My clock';

    static get properties() {
        return {
            title: String
        };
    }

    connectedCallback() {
        setInterval(
            () =>
                this.setState({
                    time: new Date().toLocaleTimeString()
                }),
            1000
        );
    }

    beforeUpdate() {
        console.log("beforeUpdate");
    }

    firstUpdated() {
        console.log("firstUpdated");
    }

    updated() {
        console.log("updated");
    }

    render() {
        return html`
            <h1>${this.title}</h1>
            <div>${this.state.time}</div>
        `;
    }
}
```

#### beforeUpdate

Called before the element will be rendered

#### firstUpdated

Called when the element is rendered for the first time

#### updated

Called when the element has been rendered
