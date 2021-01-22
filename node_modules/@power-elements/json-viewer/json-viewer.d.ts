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
    static get is(): string;
    static get observedAttributes(): string[];
    set object(arg: any);
    /**
     * JavaScript Object to display
     * Setting this property will override `<script type="application/json">` children
     *
     * @type {string|object}
     * @attr
     */
    get object(): any;
    __object: any;
    set allowlist(arg: string[]);
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
    get allowlist(): string[];
    __allowlist: any[];
    set error(arg: Error);
    /**
     * JSON.parse error
     *
     * @type {Error}
     */
    get error(): Error;
    __error: Error;
    __mo: MutationObserver;
    /** @private */
    private connectedCallback;
    /**
     * @private
     * @param {string} name
     * @param {string} oldVal
     * @param {string} newVal
     * @return {void}
     */
    private attributeChangedCallback;
    /**
     * @private
     * @param {string} allowlist new value of allowlist.
     * @param {string} [oldVal] previous value of allowlist.
     */
    private allowlistAttrChanged;
    /**
     * @private
     * @param {string} objectAttr
     * @param {string} oldVal
     */
    private objectAttrChanged;
    /**
     * @private
     * @return {string} syntax-highlighted HTML string
     */
    private getHighlightedDomString;
    /** @private */
    private render;
    /** @private */
    private parse;
    /**
     * @private
     * @param {string} string string to parse
     * @return {object}
     */
    private tryParse;
}
declare global { interface HTMLElementTagNameMap { 'json-viewer': JsonViewer; } }
