import"./e47816b7.js";import{h as n}from"./ba1498b4.js";import{H as s,E as a,a as t,C as p,Z as o,S as e,D as c}from"./6a33e11e.js";import"./962426a7.js";let u,l,i=n=>n;customElements.define("holochain-playground-container",s),customElements.define("entry-graph",a),customElements.define("entry-contents",t),customElements.define("call-zome-fns",p),customElements.define("zome-fns-results",o),customElements.define("source-chain",e),customElements.define("dht-cells",c);const k={zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],zome_functions:{register_snacking:{call:({create_entry:n,hash_entry:s})=>async({content:s})=>n({content:s,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]}}}]},r={zomes:[{name:"snacking_journal",entry_defs:[{id:"snacking_log",visibility:"Public"}],zome_functions:{register_snacking:{call:({create_entry:n,hash_entry:s})=>async({content:s})=>n({content:s,entry_def_id:"snacking_log"}),arguments:[{name:"content",type:"String"}]},get_by_entry_hash:{call:({get:n})=>({hash:s})=>n(s),arguments:[{name:"hash",type:"EntryHash"}]},get_by_header_hash:{call:({get:n})=>({hash:s})=>n(s),arguments:[{name:"hash",type:"HeaderHash"}]}}}]},g=document,m=[{key:"Sim0",story:()=>n(u||(u=i`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 720px; margin-right: 20px;"> </source-chain>
        <entry-contents style="flex-basis: 550px; height: 720px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,k,(n=>{const s=n.detail.conductors[0],a=s.getAllCells()[0];n.target.activeAgentPubKey=a.cellId[1],s.callZomeFn({cellId:a.cellId,zome:"snacking_journal",fnName:"register_snacking",payload:{content:"april 1: gummi bears"},cap:null})})),code:'<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> simulatedDna0 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  zomes<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">"snacking_journal"</span><span class="token punctuation">,</span>\n      entry_defs<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n          id<span class="token punctuation">:</span> <span class="token string">"snacking_log"</span><span class="token punctuation">,</span>\n          visibility<span class="token punctuation">:</span> <span class="token string">"Public"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">]</span><span class="token punctuation">,</span>\n      zome_functions<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        register_snacking<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token function-variable function">call</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> create_entry<span class="token punctuation">,</span> hash_entry <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">create_entry</span><span class="token punctuation">(</span><span class="token punctuation">{</span> content<span class="token punctuation">,</span> entry_def_id<span class="token punctuation">:</span> <span class="token string">"snacking_log"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          arguments<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"content"</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">"String"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword module">export</span> <span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Sim0</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> html<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token html language-html">\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>holochain-playground-container</span>\n      <span class="token attr-name">.numberOfSimulatedConductors</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span></span>\n      <span class="token attr-name">.simulatedDnaTemplate</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>simulatedDna0<span class="token interpolation-punctuation punctuation">}</span></span></span>\n      <span class="token attr-name">@ready</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> conductor <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token property-access">detail</span><span class="token punctuation">.</span><span class="token property-access">conductors</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">const</span> cell <span class="token operator">=</span> conductor<span class="token punctuation">.</span><span class="token method function property-access">getAllCells</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        e<span class="token punctuation">.</span><span class="token property-access">target</span><span class="token punctuation">.</span><span class="token property-access">activeAgentPubKey</span> <span class="token operator">=</span> cell<span class="token punctuation">.</span><span class="token property-access">cellId</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        conductor<span class="token punctuation">.</span><span class="token method function property-access">callZomeFn</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n          cellId<span class="token punctuation">:</span> cell<span class="token punctuation">.</span><span class="token property-access">cellId</span><span class="token punctuation">,</span>\n          zome<span class="token punctuation">:</span> <span class="token string">"snacking_journal"</span><span class="token punctuation">,</span>\n          fnName<span class="token punctuation">:</span> <span class="token string">"register_snacking"</span><span class="token punctuation">,</span>\n          payload<span class="token punctuation">:</span> <span class="token punctuation">{</span> content<span class="token punctuation">:</span> <span class="token string">"april 1: gummi bears"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          cap<span class="token punctuation">:</span> <span class="token keyword null nil">null</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token interpolation-punctuation punctuation">}</span></span>}</span>\n    <span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>div</span><span class="token style-attr language-css"><span class="token attr-name">\n        <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span> <span class="token property">align-items</span><span class="token punctuation">:</span> start<span class="token punctuation">;</span> <span class="token property">margin-bottom</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span>\n      <span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>source-chain</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">flex</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">720</span><span class="token unit">px</span><span class="token punctuation">;</span> <span class="token property">margin-right</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>source-chain</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>entry-contents</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">flex-basis</span><span class="token punctuation">:</span> <span class="token number">550</span><span class="token unit">px</span><span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">720</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>entry-contents</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>holochain-playground-container</span><span class="token punctuation">></span></span>\n  </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>'},{key:"Sim1",story:()=>n(l||(l=i`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedDnaTemplate=${0}
      @ready=${0}
    >
      <div
        style="display: flex; height: 400px; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px; height: 100%;"
          hide-agent-pub-key
        >
        </call-zome-fns>

        <zome-fns-results style="flex: 1; height: 100%;"></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; align-items: start; margin-bottom: 20px;"
      >
        <source-chain style="flex: 1; height: 600px; margin-right: 20px;"> </source-chain>
        <entry-contents style="flex-basis: 500px; height: 600px;">
        </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,r,(n=>{const s=n.detail.conductors[0].getAllCells()[0];n.target.activeAgentPubKey=s.cellId[1]})),code:'<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> simulatedDna1 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  zomes<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      name<span class="token punctuation">:</span> <span class="token string">"snacking_journal"</span><span class="token punctuation">,</span>\n      entry_defs<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n          id<span class="token punctuation">:</span> <span class="token string">"snacking_log"</span><span class="token punctuation">,</span>\n          visibility<span class="token punctuation">:</span> <span class="token string">"Public"</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">]</span><span class="token punctuation">,</span>\n      zome_functions<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        register_snacking<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token function-variable function">call</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> create_entry<span class="token punctuation">,</span> hash_entry <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> content <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token function">create_entry</span><span class="token punctuation">(</span><span class="token punctuation">{</span> content<span class="token punctuation">,</span> entry_def_id<span class="token punctuation">:</span> <span class="token string">"snacking_log"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          arguments<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"content"</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">"String"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        get_by_entry_hash<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token function-variable function">call</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> hash <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">get</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          arguments<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"hash"</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">"EntryHash"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        get_by_header_hash<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          <span class="token function-variable function">call</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> hash <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">get</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          arguments<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">"hash"</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">"HeaderHash"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword module">export</span> <span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Sim1</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> html<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token html language-html">\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>holochain-playground-container</span>\n      <span class="token attr-name">.numberOfSimulatedConductors</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span></span>\n      <span class="token attr-name">.simulatedDnaTemplate</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>simulatedDna1<span class="token interpolation-punctuation punctuation">}</span></span></span>\n      <span class="token attr-name">@ready</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> conductor1 <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token property-access">detail</span><span class="token punctuation">.</span><span class="token property-access">conductors</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">const</span> cell1 <span class="token operator">=</span> conductor1<span class="token punctuation">.</span><span class="token method function property-access">getAllCells</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n        e<span class="token punctuation">.</span><span class="token property-access">target</span><span class="token punctuation">.</span><span class="token property-access">activeAgentPubKey</span> <span class="token operator">=</span> cell1<span class="token punctuation">.</span><span class="token property-access">cellId</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token interpolation-punctuation punctuation">}</span></span></span>\n    <span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>div</span><span class="token style-attr language-css"><span class="token attr-name">\n        <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">400</span><span class="token unit">px</span><span class="token punctuation">;</span> <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span> <span class="token property">align-items</span><span class="token punctuation">:</span> start<span class="token punctuation">;</span> <span class="token property">margin-bottom</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span>\n      <span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>call-zome-fns</span>\n          <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>call-zome<span class="token punctuation">"</span></span><span class="token style-attr language-css"><span class="token attr-name">\n          <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">flex</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token property">margin-right</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span><span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100</span><span class="token unit">%</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span>\n          <span class="token attr-name">hide-agent-pub-key</span>\n        <span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>call-zome-fns</span><span class="token punctuation">></span></span>\n\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>zome-fns-results</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">flex</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">100</span><span class="token unit">%</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>zome-fns-results</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>div</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>div</span><span class="token style-attr language-css"><span class="token attr-name">\n        <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token property">flex-direction</span><span class="token punctuation">:</span> row<span class="token punctuation">;</span> <span class="token property">align-items</span><span class="token punctuation">:</span> start<span class="token punctuation">;</span> <span class="token property">margin-bottom</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span>\n      <span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>source-chain</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">flex</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">600</span><span class="token unit">px</span><span class="token punctuation">;</span> <span class="token property">margin-right</span><span class="token punctuation">:</span> <span class="token number">20</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>source-chain</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>entry-contents</span><span class="token style-attr language-css"><span class="token attr-name"> <span class="token attr-name">style</span></span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">flex-basis</span><span class="token punctuation">:</span> <span class="token number">500</span><span class="token unit">px</span><span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> <span class="token number">600</span><span class="token unit">px</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>entry-contents</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>holochain-playground-container</span><span class="token punctuation">></span></span>\n  </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>'}];for(const n of m){const s=g.querySelector(`[mdjs-story-name="${n.key}"]`);s.codeHasHtml=!0,s.story=n.story,s.code=n.code}customElements.get("mdjs-preview")||import("./af5231aa.js"),customElements.get("mdjs-story")||import("./24f48d72.js");