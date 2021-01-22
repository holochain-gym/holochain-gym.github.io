import{h as t}from"./1f529ce5.js";import{L as e,c as r}from"./daaff894.js";let o,s,i=t=>t;customElements.define("inline-notification",class extends e{static get properties(){return{type:{type:String,reflect:!0},title:{type:String}}}constructor(){super(),this.title="",this.type="tip"}static get styles(){return r(o||(o=i`
      :host {
        padding: 0.1rem 1.5rem;
        border-left-width: 0.5rem;
        border-left-style: solid;
        margin: 1rem 0;
        display: block;
      }

      h3 {
        font-weight: 600;
        margin-bottom: 7px;
        text-transform: uppercase;
      }

      :host([type='tip']) {
        background-color: rgba(221, 221, 221, 0.3);
        border-color: #42b983;
      }

      :host([type='warning']) {
        background-color: rgba(255, 229, 100, 0.2);
        border-color: #e7c000;
      }

      :host([type='warning']) h3 {
        color: #b29400;
      }

      :host([type='danger']) {
        background-color: rgba(192, 0, 0, 0.1);
        border-color: #c00;
      }

      :host([type='danger']) h3 {
        color: #900;
      }

      ::slotted(p) {
        line-height: 1.7;
      }
    `))}render(){return t(s||(s=i`
      <h3>${0}</h3>
      <slot></slot>
    `),this.title?this.title:this.type)}});
