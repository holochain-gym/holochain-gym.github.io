import { LitElement, html } from "lit-element";
import { ConsumerMixin } from "../../src/context";

export default class Input extends ConsumerMixin(LitElement) {
    static get properties() {
        return {
            name: String,
            setName: Function,
        };
    }

    static get inject() {
        return ["name", "setName"];
    }

    render() {
        return html`
            <div>
                <label>Name:</label>
                <input .value=${this.name} @input=${(event) => this.setName(event.target.value)} />
            </div>
        `;
    }
}
