// @ts-check

import './json-viewer.js';
import { html, expect, fixture } from '@open-wc/testing';

describe('json-viewer', function() {
  it('instantiates without throwing', function() {
    expect(() => document.createElement('json-viewer')).not.to.throw;
  });

  describe('setting object property', function() {
    describe('as object', function() {
      const object = { one: 1, two: 'two', null: null, true: true };
      it('displays object properties', async function() {
        const element = await fixture(html`<json-viewer .object="${object}"></json-viewer>`);
        expect(element).shadowDom.to.equal(`
          <code part="code">
            {
              <mark class="key">"one"</mark>:
              <mark class="number">1</mark>,
              <mark class="key">"two"</mark>:
              <mark class="string">"two"</mark>,
              <mark class="key">"null"</mark>:
              <mark class="null">null</mark>,
              <mark class="key">"true"</mark>:
              <mark class="boolean">true</mark>
            }
          </code>
        `);
      });

      describe('with allowlist', function() {
        const element = document.createElement('json-viewer');
        element.setAttribute('allowlist', 'one');
        it('hides object properties not in allowlist', async function() {
          element.object = object;
          expect(element).shadowDom.to.equal(`
            <code part="code">
              {
              <mark class="key">
                "one"
              </mark>
              :
              <mark class="number">
                1
              </mark>
              }
            </code>
          `);
        });
      });
    });

    describe('as valid JSON string', function() {
      const object = '{ "one": 1, "two": "two", "null": null, "true": true }';

      it('does not throw', function() {
        const element = document.createElement('json-viewer');
        expect(() => element.object = object).to.not.throw();
      });

      it('displays object properties', async function() {
        const element = await fixture(html`<json-viewer .object="${object}"></json-viewer>`);
        expect(element).shadowDom.to.equal(`
          <code part="code">
            {
              <mark class="key">"one"</mark>:
              <mark class="number">1</mark>,
              <mark class="key">"two"</mark>:
              <mark class="string">"two"</mark>,
              <mark class="key">"null"</mark>:
              <mark class="null">null</mark>,
              <mark class="key">"true"</mark>:
              <mark class="boolean">true</mark>
            }
          </code>
        `);
      });

      it('hides object properties not in allowlist', async function() {
        const element = await fixture(html`<json-viewer allowlist="one" .object="${object}"></json-viewer>`);
        expect(element).shadowDom.to.equal(`
          <code part="code">
            {
            <mark class="key">
              "one"
            </mark>
            :
            <mark class="number">
              1
            </mark>
            }
          </code>
        `);
      });
    });

    describe('as invalid JSON string', function() {
      const object = '{ one: 1 }';

      let element;

      beforeEach(function() {
        element = document.createElement('json-viewer');
      });

      it('fires json-parse-error event', function(done) {
        element.addEventListener('json-parse-error', () => done());
        setTimeout(() => {
          element.object = object;
        });
      });

      it('sets error property', function() {
        element.object = object;
        expect(element.error).to.be.an.instanceof(Error);
      });

      it('renders the error', function() {
        element.object = object;
        expect(element.shadowRoot.querySelectorAll('mark.key').length).to.equal(3);
      });
    });
  });

  describe('setting object attribute', function() {
    describe('as invalid JSON string', function() {
      const object = '{ one: 1 }';

      let element;

      beforeEach(function() {
        element = document.createElement('json-viewer');
      });

      it('fires json-parse-error event', function(done) {
        element.addEventListener('json-parse-error', () => done());
        setTimeout(() => {
          element.object = object;
        });
      });

      it('sets error property', function() {
        element.object = object;
        expect(element.error).to.be.an.instanceof(Error);
      });

      it('renders the error', function() {
        element.object = object;
        expect(element.shadowRoot.querySelectorAll('mark.key').length).to.equal(3);
      });
    });

    describe('as valid JSON string', function() {
      const object = '{"foo":1}';
      let element;
      beforeEach(function() {
        element = document.createElement('json-viewer');
        element.object = object;
      });

      it('renders', function() {
        const element = document.createElement('json-viewer');
        element.setAttribute('object', object);
        expect(element).shadowDom.to.equal(`
          <code part="code">
            {
            <mark class="key">
              "foo"
            </mark>
            :
            <mark class="number">
              1
            </mark>
            }
          </code>
        `);
      });
    });
  });

  describe('with JSON script child', function() {
    it('displays object properties', async function() {
      const object = { one: 1 };
      const json = JSON.stringify(object, null, 2);
      const element = await fixture(html`
        <json-viewer>
          <script type="application/json">
            ${json}
          </script>
        </json-viewer>
      `);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          }
        </code>
      `);
    });
  });

  describe('with JSON-LD script child', function() {
    it('displays object properties', async function() {
      const object = {
        '@context': 'https://json-ld.org/contexts/person.jsonld',
        '@id': 'http://dbpedia.org/resource/John_Lennon',
        'name': 'John Lennon',
        'born': '1940-10-09',
        'spouse': 'http://dbpedia.org/resource/Cynthia_Lennon',
      };
      const json = JSON.stringify(object, null, 2);
      const element = await fixture(html`
        <json-viewer>
          <script type="application/ld+json">
            ${json}
          </script>
        </json-viewer>
      `);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "@context"
          </mark>
          :
          <mark class="string">
            "https://json-ld.org/contexts/person.jsonld"
          </mark>
          ,
          <mark class="key">
            "@id"
          </mark>
          :
          <mark class="string">
            "http://dbpedia.org/resource/John_Lennon"
          </mark>
          ,
          <mark class="key">
            "name"
          </mark>
          :
          <mark class="string">
            "John Lennon"
          </mark>
          ,
          <mark class="key">
            "born"
          </mark>
          :
          <mark class="string">
            "1940-10-09"
          </mark>
          ,
          <mark class="key">
            "spouse"
          </mark>
          :
          <mark class="string">
            "http://dbpedia.org/resource/Cynthia_Lennon"
          </mark>
          }
        </code>
      `);
    });
  });

  describe('with valid JSON string as textContent', function() {
    it('displays object properties', async function() {
      const object = { one: 1 };
      const json = JSON.stringify(object, null, 2);
      const element = await fixture(html`<json-viewer>${json}</json-viewer>`);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          }
        </code>

      `);
    });

    it('hides object properties not in allowlist', async function() {
      const object = { one: 1, two: 'two' };
      const json = JSON.stringify(object, null, 2);
      const element = await fixture(html`
        <json-viewer allowlist="one">
          <script type="application/json">
            ${json}
          </script>
        </json-viewer>
      `);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          }
        </code>
      `);
    });
  });

  describe('with Element as property of object', function() {
    it('stringifies element', async function() {
      const element = await fixture(html`
        <json-viewer .object="${{
          one: 1,
          el: document.createElement('json-viewer'),
        }}"></json-viewer>
      `);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          ,
          <mark class="key">
            "el"
          </mark>
          :
          <mark class="string">&lt;json-viewer&gt;&lt;/json-viewer&gt;""</mark>
          }
        </code>
      `);
    });
  });

  describe('with undefined property', function() {
    it('strips undefined', async function() {
      const object = { one: 1, undefined: undefined };
      const element = await fixture(html`<json-viewer .object="${object}"></json-viewer>`);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          }
        </code>
      `);
    });
  });

  describe('with deep properties', function() {
    it('recurses', async function() {
      const object = { one: 1, two: { three: ['four', 'five'] } };
      const element = await fixture(html`<json-viewer .object="${object}"></json-viewer>`);
      // bug in semantic-dom-diff requires weird spacing on closing `}`
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          ,
          <mark class="key">
            "two"
          </mark>
          : {
          <mark class="key">
            "three"
          </mark>
          : [
          <mark class="string">
            "four"
          </mark>
          ,
          <mark class="string">
            "five"
          </mark>
          ]
  }
}
        </code>
      `);
    });
  });

  describe('with invalid JSON string as script child', function() {
    let element;
    let error;
    const object = '{one: one}';

    beforeEach(async function() {
      element = document.createElement('json-viewer');
      element.addEventListener('json-parse-error', e => error = e);
      element.innerHTML = `<script type="application/json">${object}</script>`;
    });

    afterEach(function() {
      error = undefined;
    });

    it('fires json-parse-error event', function() {
      expect(error).to.be.an.instanceof(CustomEvent);
    });

    it('sets error property', function() {
      expect(element.error).to.be.an.instanceof(Error);
    });

    it('renders the error', function() {
      expect(element.shadowRoot.querySelectorAll('mark.key').length).to.equal(3);
    });
  });

  describe('with invalid JSON string as textContent', function() {
    let element;
    let error;
    const object = '{one: one}';

    beforeEach(async function() {
      element = document.createElement('json-viewer');
      element.addEventListener('json-parse-error', e => error = e);
      element.innerHTML = `<script type="application/json">${object}</script>`;
    });

    afterEach(function() {
      error = undefined;
    });

    it('fires json-parse-error event', function() {
      expect(error).to.be.an.instanceof(CustomEvent);
    });

    it('sets error property', function() {
      expect(element.error).to.be.an.instanceof(Error);
    });

    it('renders the error', function() {
      expect(element.shadowRoot.querySelectorAll('mark.key').length).to.equal(3);
    });
  });

  describe('setting allowlist attr', function() {
    let element;
    beforeEach(async function() {
      element = await fixture(html`<json-viewer allowlist="one, two,baz"></json-viewer>`);
    });

    it('sets allowlist property', function() {
      expect(element.allowlist).to.deep.equal(['one', 'two', 'baz']);
    });

    describe('then unsetting', function() {
      beforeEach(function() {
        element.removeAttribute('allowlist');
      });

      it('empties allowlist property', function() {
        expect(element.allowlist).to.be.empty;
      });
    });
  });

  describe('when setting invalid allowlist property', function() {
    it('sets allowlist property', function() {
      const element = document.createElement('json-viewer');
      // @ts-expect-error
      expect(() => element.allowlist = 'one').to.throw('allowlist must be an array of strings');
    });
  });

  describe('polyfills', function() {
    it('polyfills adoptedStyleSheets', async function() {
      // @ts-expect-error
      delete Document.prototype.adoptedStyleSheets;
      const element = await fixture(html`
        <json-viewer>
          <script type="application/json">
            {"one":"two"}
          </script>
        </json-viewer>
      `);
      const string = element.shadowRoot.querySelector('.string');
      expect(getComputedStyle(string).getPropertyValue('color')).to.equal('rgb(34, 184, 207)');
    });

    it('polyfills Object.fromEntries', async function() {
      // @ts-expect-error
      delete Object.fromEntries;
      const object = { one: 1, two: 'two' };
      const element = await fixture(html`
        <json-viewer allowlist="one" .object="${object}"></json-viewer>
      `);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          }
        </code>
      `);
    });

    it('polyfills Array#flatMap', async function() {
      // @ts-expect-error
      delete Array.prototype.flatMap;
      const object = { one: 1, two: 'two' };
      const element = await fixture(html`
        <json-viewer allowlist="one" .object="${object}"></json-viewer>
      `);
      expect(element).shadowDom.to.equal(`
        <code part="code">
          {
          <mark class="key">
            "one"
          </mark>
          :
          <mark class="number">
            1
          </mark>
          }
        </code>
      `);
    });
  });
});
