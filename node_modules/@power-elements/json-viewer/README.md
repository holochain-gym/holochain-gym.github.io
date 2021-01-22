# json-viewer

Custom Element that shows a JavaScript object's properties as syntax-highlighted JSON.

The element will respect `prefers-color-scheme` by default, but if you use the
CSS Custom Properties listed below, you should customize both light and dark themes.

❤️ Proudly uses [open-wc](https://open-wc.org) tools and recommendations.

## Examples

```javascript
import '/path/to/json-viewer.js';
const viewer = document.createElement('json-viewer');
      viewer.allowlist = ['foo', 'bar'];
      viewer.object = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz',
      };
```

```html
<script type="module" src="/path/to/json-viewer.js"></script>

<json-viewer allowlist="meenie,minie">
  <script type="application/json">
    {
      "eenie": 1,
      "meenie": true,
      "minie": [{ "mo": "catch a tiger by the toe" }]
    }
  </script>
</json-viewer>
```

## Properties

| Property    | Attribute   | Type             | Description                                      |
|-------------|-------------|------------------|--------------------------------------------------|
| `allowlist` | `allowlist` | `string[]`       | User-defined allowlist of top-level keys for the object.<br />Optional for plain objects,<br />Required when setting `object` to a non-serializable object (e.g. an HTMLElement)<br />Property is an Array of strings<br />Attribute is a comma-separated string |
| `error`     |             | `Error`          | JSON.parse error                                 |
| `object`    | `object`    | `string\|object` | JavaScript Object to display<br />Setting this property will override `<script type="application/json">` children |

## Events

| Event              | Type               | Description           |
|--------------------|--------------------|-----------------------|
| `json-parse-error` | `CustomEvent<any>` | when JSON parse fails |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | JSON scripts or JSON strings appended as text nodes will be parsed and displayed |

## CSS Shadow Parts

| Part      | Description                   |
|-----------|-------------------------------|
| `boolean` | boolean property values       |
| `code`    | the wrapping `<code>` element |
| `key`     | property keys                 |
| `null`    | null property values          |
| `number`  | number property values        |
| `string`  | string property values        |

## CSS Custom Properties

| Property                      | Description                                      |
|-------------------------------|--------------------------------------------------|
| `--json-viewer-background`    | Color for generic text. Light #212121, Dark white |
| `--json-viewer-boolean-color` | Color for booleans. Light #f76707, Dark #22b8cf  |
| `--json-viewer-color`         | Color for generic text. Light white, Dark #212121 |
| `--json-viewer-key-color`     | Color for keys. Light #f76707, Dark #ff922b      |
| `--json-viewer-null-color`    | Color for nulls. Light #e03131, Dark #ff6b6b     |
| `--json-viewer-number-color`  | Color for numbers. Light #0ca678, Dark #51cf66   |
| `--json-viewer-string-color`  | Color for strings. Light #0c8599, Dark #22b8cf   |
