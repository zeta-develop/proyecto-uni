if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>n(e,i),r={module:{uri:i},exports:c,require:o};s[i]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d0e56511f87966cfd983527b798922af"},{url:"/_next/static/6RyREyoBfdHlZt-7u5xwG/_buildManifest.js",revision:"8e4e5915a7da413760a38befb528ddd8"},{url:"/_next/static/6RyREyoBfdHlZt-7u5xwG/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/173-0b57a1cd8a75f36e.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/289-1b91ecdb87f7531e.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/437-20841ded7e44bc2d.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/4bd1b696-50c3a6f151747428.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/517-4afa1a634071b53d.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/749-2dd2a4697664cde5.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/860-d5b65b4712f764e4.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/_not-found/page-de0b6a8a7cb06fb5.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/chat/page-2e406ec54feddac5.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/configuracion/page-0d5acc3fd2970668.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/groups/page-c133189097a3f7ce.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/layout-e26d890916fd9b30.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/login/page-7d74b9fce54cf47c.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/page-2d8099a6e66ed070.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/register/page-409f1a5558caa5ec.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/app/tasks/page-047c05d9513fa7ce.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/main-app-35ea4262c010fd19.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/main-ecd615a9318f36f1.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-da945b3ac04fc682.js",revision:"6RyREyoBfdHlZt-7u5xwG"},{url:"/_next/static/css/3d1a73e36c2fa1de.css",revision:"3d1a73e36c2fa1de"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"a04a46d3b35e26b5538a195dc74f44d4"},{url:"/icon512_rounded.png",revision:"dd45923d8b2b3cdde9ef91524de8ab5f"},{url:"/manifest.json",revision:"10efcd2afeca6297bdd139f46ba8d47b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
