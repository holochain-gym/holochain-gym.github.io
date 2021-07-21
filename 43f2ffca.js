try{self["workbox:window:6.1.5"]&&_()}catch(n){}function n(n,e){return new Promise((function(t){var r=new MessageChannel;r.port1.onmessage=function(n){t(n.data)},n.postMessage(e,[r.port2])}))}function e(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function t(n,t){var r;if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(r=function(n,t){if(n){if("string"==typeof n)return e(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);return"Object"===r&&n.constructor&&(r=n.constructor.name),"Map"===r||"Set"===r?Array.from(n):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(n,t):void 0}}(n))||t&&n&&"number"==typeof n.length){r&&(n=r);var i=0;return function(){return i>=n.length?{done:!0}:{done:!1,value:n[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=n[Symbol.iterator]()).next.bind(r)}try{self["workbox:core:6.1.5"]&&_()}catch(n){}var r=function(){var n=this;this.promise=new Promise((function(e,t){n.resolve=e,n.reject=t}))};function i(n,e){var t=location.href;return new URL(n,t).href===new URL(e,t).href}var o=function(n,e){this.type=n,Object.assign(this,e)};function a(n,e,t){return t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)}function s(){}var c={type:"SKIP_WAITING"};function u(n,e){if(!e)return n&&n.then?n.then(s):Promise.resolve()}var v=function(e){var t,s;function v(n,t){var s,c;return void 0===t&&(t={}),(s=e.call(this)||this).nn={},s.tn=0,s.rn=new r,s.en=new r,s.on=new r,s.un=0,s.an=new Set,s.cn=function(){var n=s.fn,e=n.installing;s.tn>0||!i(e.scriptURL,s.sn)||performance.now()>s.un+6e4?(s.vn=e,n.removeEventListener("updatefound",s.cn)):(s.hn=e,s.an.add(e),s.rn.resolve(e)),++s.tn,e.addEventListener("statechange",s.ln)},s.ln=function(n){var e=s.fn,t=n.target,r=t.state,i=t===s.vn,a={sw:t,isExternal:i,originalEvent:n};!i&&s.mn&&(a.isUpdate=!0),s.dispatchEvent(new o(r,a)),"installed"===r?s.wn=self.setTimeout((function(){"installed"===r&&e.waiting===t&&s.dispatchEvent(new o("waiting",a))}),200):"activating"===r&&(clearTimeout(s.wn),i||s.en.resolve(t))},s.dn=function(n){var e=s.hn,t=e!==navigator.serviceWorker.controller;s.dispatchEvent(new o("controlling",{isExternal:t,originalEvent:n,sw:e,isUpdate:s.mn})),t||s.on.resolve(e)},s.gn=(c=function(n){var e=n.data,t=n.source;return a(s.getSW(),(function(){s.an.has(t)&&s.dispatchEvent(new o("message",{data:e,sw:t,originalEvent:n}))}))},function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];try{return Promise.resolve(c.apply(this,n))}catch(n){return Promise.reject(n)}}),s.sn=n,s.nn=t,navigator.serviceWorker.addEventListener("message",s.gn),s}s=e,(t=v).prototype=Object.create(s.prototype),t.prototype.constructor=t,t.__proto__=s;var f,h=v.prototype;return h.register=function(n){var e=(void 0===n?{}:n).immediate,t=void 0!==e&&e;try{var r=this;return function(n,e){var t=n();return t&&t.then?t.then(e):e()}((function(){if(!t&&"complete"!==document.readyState)return u(new Promise((function(n){return window.addEventListener("load",n)})))}),(function(){return r.mn=Boolean(navigator.serviceWorker.controller),r.yn=r.pn(),a(r.bn(),(function(n){r.fn=n,r.yn&&(r.hn=r.yn,r.en.resolve(r.yn),r.on.resolve(r.yn),r.yn.addEventListener("statechange",r.ln,{once:!0}));var e=r.fn.waiting;return e&&i(e.scriptURL,r.sn)&&(r.hn=e,Promise.resolve().then((function(){r.dispatchEvent(new o("waiting",{sw:e,wasWaitingBeforeRegister:!0}))})).then((function(){}))),r.hn&&(r.rn.resolve(r.hn),r.an.add(r.hn)),r.fn.addEventListener("updatefound",r.cn),navigator.serviceWorker.addEventListener("controllerchange",r.dn,{once:!0}),r.fn}))}))}catch(n){return Promise.reject(n)}},h.update=function(){try{return this.fn?u(this.fn.update()):void 0}catch(n){return Promise.reject(n)}},h.getSW=function(){return void 0!==this.hn?Promise.resolve(this.hn):this.rn.promise},h.messageSW=function(e){try{return a(this.getSW(),(function(t){return n(t,e)}))}catch(n){return Promise.reject(n)}},h.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&n(this.fn.waiting,c)},h.pn=function(){var n=navigator.serviceWorker.controller;return n&&i(n.scriptURL,this.sn)?n:void 0},h.bn=function(){try{var n=this;return function(n,e){try{var t=n()}catch(n){return e(n)}return t&&t.then?t.then(void 0,e):t}((function(){return a(navigator.serviceWorker.register(n.sn,n.nn),(function(e){return n.un=performance.now(),e}))}),(function(n){throw n}))}catch(n){return Promise.reject(n)}},(f=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&function(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}(v.prototype,f),v}(function(){function n(){this.Pn=new Map}var e=n.prototype;return e.addEventListener=function(n,e){this.Sn(n).add(e)},e.removeEventListener=function(n,e){this.Sn(n).delete(e)},e.dispatchEvent=function(n){n.target=this;for(var e,r=t(this.Sn(n.type));!(e=r()).done;)(0,e.value)(n)},e.Sn=function(n){return this.Pn.has(n)||this.Pn.set(n,new Set),this.Pn.get(n)},n}());export{v as Workbox,n as messageSW};