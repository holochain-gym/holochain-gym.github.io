import { LitElement, html } from "lit-element";
import { ProviderMixin } from "../../src/context";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import Input from "./input";

export default class App extends ScopedElementsMixin(ProviderMixin(LitElement)) {
    constructor() {
        super();

        this.name = "hello";
        this.setName = (value) => {
            this.name = value;
        };
    }

    static get properties() {
        return {
            name: String,
            setName: Function,
        };
    }

    static get provide() {
        return ["name", "setName"];
    }

    static get scopedElements() {
        return {
            "input-component": Input,
        };
    }

    render() {
        return html`
            <div>
                <h1>Lit-element context</h1>
                <p>Current name: ${this.name}</p>
                <input-component></input-component>
            </div>
        `;
    }
}
