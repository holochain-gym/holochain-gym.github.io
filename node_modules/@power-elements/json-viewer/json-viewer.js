const compose =
  (...fns) =>
    fns.reduce((f, g) =>
      (...args) =>
        f(g(...args)));

const isString =
  x =>
    typeof x === 'string';

const trim =
  s =>
    s.trim();

const isObject =
  x =>
    x !== null &&
    `${x}` === '[object Object]';

const replace =
  (...args) => s =>
    s.replace(...args);

const isAllStrings =
  xs =>
    Array.isArray(xs) &&
    xs.every(isString);

const fromEntries =
  xs =>
      Object.fromEntries ? Object.fromEntries(xs)
    : xs.reduce((o, [k, v]) => ({ [k]: v, ...o }), {});

const flatMap =
  f => xs =>
  'flatMap' in Array.prototype ?
    xs.flatMap(f)
    : xs.reduce((acc, x) => acc.concat(f(x)), []);

const pick =
  (keys, element) =>
    keys.reduce((pojo, key) =>
      Object.assign(pojo, { [key]: element[key] }), {});

const stripUndefinedVals =
  flatMap(([k, v]) => v === undefined ? [] : [[k, v]]);

const stripUndefined =
  compose(fromEntries, stripUndefinedVals, Object.entries);

const mark = x =>
    x instanceof Element ? `<mark part='string'>${x.outerHTML.replace(/</g, '&lt;').replace(/"/g, '\'')}</mark>`
  : isObject(x) || Array.isArray(x) ? x
  : `<mark part='${x === null ? 'null' : typeof x}'>${x}</mark>`;

const replacer =
  (k, v) =>
    k === '' ? v : mark(v);

const pretty =
  o =>
    JSON.stringify(o, replacer, 2);

const markKeys =
  replace(/"(.*)":/g, (_, key) =>
    `<mark part="key">"${key}"</mark>:`);

const wrapStrings =
  replace(/"<mark(.*)>(.*)<\/mark>"/g, (_, attrs, content) =>
    `<mark${attrs}>${attrs.includes('string') ? `"${content}"` : content}</mark>`);

const json =
  compose(wrapStrings, markKeys, pretty, stripUndefined);

const toStringList =
  string =>
    (string || '')
      .split(',')
      .map(trim)
      .filter(Boolean);

const css = /* css */`
[hidden],
:host([hidden]) {
  display: none !important;
}

:host {
  display: block;
  position: relative;
  color: var(--json-viewer-color, currentColor);
}

code { white-space: pre; }
mark { background: none; }

@media (prefers-color-scheme: dark), (prefers-color-scheme: no-preference) {
  :host { background: var(--json-viewer-background, #212529); }
  [part="key"] { color: var(--json-viewer-key-color, #ff922b); }
  [part="boolean"] { color: var(--json-viewer-boolean-color, #22b8cf); }
  [part="number"] { color: var(--json-viewer-number-color, #51cf66); }
  [part="null"] { color: var(--json-viewer-null-color, #ff6b6b); }
  [part="string"] { color: var(--json-viewer-string-color, #22b8cf); }
}

@media (prefers-color-scheme: light) {
  :host { background: var(--json-viewer-background, white); }
  [part="key"] { color: var(--json-viewer-key-color, #f76707); }
  [part="boolean"] { color: var(--json-viewer-boolean-color, #0c8599); }
  [part="number"] { color: var(--json-viewer-number-color, #0ca678); }
  [part="null"] { color: var(--json-viewer-null-color, #e03131); }
  [part="string"] { color: var(--json-viewer-string-color, #0c8599); }
}
`;

const template =
  document.createElement('template');

template.innerHTML =
  `<code hidden part="code"></code>`;

const AL_ATTR = 'allowlist';
const OBJECT_ATTR = 'object';

/**
 * Custom Element that shows a JavaScript object's properties as syntax-highlighted JSON.
 *
 * The element will respect `prefers-color-scheme` by default, but if you use the
 * CSS Custom Properties listed below, you should customize both light and dark themes.
 *
 * ❤️ Proudly uses [open-wc](https://open-wc.org) tools and recommendations.
 *
 * @example
 * ```javascript
 * import '/path/to/json-viewer.js';

 * const viewer = document.createElement('json-viewer');
 *       viewer.allowlist = ['foo', 'bar'];
 *       viewer.object = {
 *         foo: 'foo',
 *         bar: 'bar',
 *         baz: 'baz',
 *       };
 * ```
 *
 * @example
 * ```html
 * <script type="module" src="/path/to/json-viewer.js"></script>
 *
 * <json-viewer allowlist="meenie,minie">
 *   <script type="application/json">
 *     {
 *       "eenie": 1,
 *       "meenie": true,
 *       "minie": [{ "mo": "catch a tiger by the toe" }]
 *     }
 *   </script>
 * </json-viewer>
 * ```
 *
 * ![Example Markup](example.png)
 *
 * @cssprop --json-viewer-color - Color for generic text. Light white, Dark #212121
 * @cssprop --json-viewer-background - Color for generic text. Light #212121, Dark white
 * @cssprop --json-viewer-key-color - Color for keys. Light #f76707, Dark #ff922b
 * @cssprop --json-viewer-boolean-color - Color for booleans. Light #f76707, Dark #22b8cf
 * @cssprop --json-viewer-number-color - Color for numbers. Light #0ca678, Dark #51cf66
 * @cssprop --json-viewer-null-color - Color for nulls. Light #e03131, Dark #ff6b6b
 * @cssprop --json-viewer-string-color - Color for strings. Light #0c8599, Dark #22b8cf
 *
 * @csspart code - the wrapping `<code>` element
 *
 * @csspart key - property keys
 * @csspart boolean - boolean property values
 * @csspart number - number property values
 * @csspart null - null property values
 * @csspart string - string property values
 *
 * @fires json-parse-error when JSON parse fails
 *
 * @slot - JSON scripts or JSON strings appended as text nodes will be parsed and displayed
 */
export class JsonViewer extends HTMLElement {
  static get is() {
    return 'json-viewer';
  }

  static get observedAttributes() {
    return [AL_ATTR, OBJECT_ATTR];
  }

  /**
   * JavaScript Object to display
   * Setting this property will override `<script type="application/json">` children
   *
   * @type {string|object}
   * @attr
   */
  get object() {
    return this.__object;
  }

  set object(val) {
    if (val && typeof val === 'string')
      val = this.tryParse(val);
    this.__object = val;
    this.render();
  }

  /**
   * User-defined allowlist of top-level keys for the object.
   * Optional for plain objects,
   * Required when setting `object` to a non-serializable object (e.g. an HTMLElement)
   * Property is an Array of strings
   * Attribute is a comma-separated string
   *
   * @type {string[]}
   * @attr
   */
  get allowlist() {
    return this.__allowlist;
  }

  set allowlist(val) {
    if (!isAllStrings(val))
      throw new Error('allowlist must be an array of strings');

    this.__allowlist = val;
    const attr = val.join(',');
    if (attr)
      this.setAttribute(AL_ATTR, attr);
    this.render();
  }

  /**
   * JSON.parse error
   *
   * @type {Error}
   */
  get error() {
    return this.__error;
  }

  set error(error) {
    this.__error = error;
    if (error instanceof Error)
      this.dispatchEvent(new CustomEvent('json-parse-error'));
  }

  constructor() {
    super();
    this.__error = null;
    this.__allowlist = [];
    this.__mo = new MutationObserver(this.parse.bind(this));
    this.__mo.observe(this, { subtree: true, characterData: true, childList: true });
    this.attachShadow({ mode: 'open' });
    if ('adoptedStyleSheets' in Document.prototype) {
      const styles = new CSSStyleSheet();
      // @ts-expect-error: proposal spec
      styles.replaceSync(css);
      // @ts-expect-error: proposal spec
      this.shadowRoot.adoptedStyleSheets = [styles];
    } else
      this.shadowRoot.innerHTML = `<style>${css}</style>`;

    this.shadowRoot.append(template.content.cloneNode(true));
  }

  /** @private */
  connectedCallback() {
    this.parse();
    if (this.object && this.shadowRoot.querySelector('code').hidden)
      this.render();
  }

  /**
   * @private
   * @param {string} name
   * @param {string} oldVal
   * @param {string} newVal
   * @return {void}
   */
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case AL_ATTR: return this.allowlistAttrChanged(newVal, oldVal);
      case OBJECT_ATTR: return this.objectAttrChanged(newVal, oldVal);
    }
  }

  /**
   * @private
   * @param {string} allowlist new value of allowlist.
   * @param {string} [oldVal] previous value of allowlist.
   */
  allowlistAttrChanged(allowlist, oldVal) {
    const previous = this.allowlist;
    const next = allowlist;
    if (previous.join(',') === next) return;
    this.allowlist = toStringList(next);
  }

  /**
   * @private
   * @param {string} objectAttr
   * @param {string} oldVal
   */
  objectAttrChanged(objectAttr, oldVal) {
    if (objectAttr !== oldVal)
      this.object = this.tryParse(objectAttr);
  }

  /**
   * @private
   * @return {string} syntax-highlighted HTML string
   */
  getHighlightedDomString() {
    const { allowlist, object } = this;
    if (object === undefined) return '';
    const hasAllowList = Array.isArray(allowlist) && allowlist.length;
    const objectToRender = hasAllowList ? pick(allowlist, object) : object;
    return json(objectToRender);
  }

  /** @private */
  render() {
    const highlighted = this.getHighlightedDomString();
    this.shadowRoot.querySelector('code').hidden = !highlighted;
    this.shadowRoot.querySelector('code').innerHTML = highlighted;
  }

  /** @private */
  parse() {
    const parent =
      this.querySelector('script[type="application/json"]') ||
      this.querySelector('script[type="application/ld+json"]') ||
      this;
    const { textContent = '' } = parent;
    if (!textContent.trim()) return;
    this.object = this.tryParse(textContent);
  }

  /**
   * @private
   * @param {string} string string to parse
   * @return {object}
   */
  tryParse(string) {
    let object;
    try {
      object = JSON.parse(string);
    } catch (error) {
      const { name, message } = error;
      object = { name, message, string };
      this.error = error;
    }
    return object;
  }
}

customElements.define(JsonViewer.is, JsonViewer);
