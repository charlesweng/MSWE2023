if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let f={};const o=e=>s(e,t),c={module:{uri:t},exports:f,require:o};i[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),f)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"48f441fda3fbf9da27fac9bf5e4973f8"},{url:"main.css",revision:"3d8d5c77c465fbc48f3f7dfd2c046e1f"},{url:"main.js",revision:"b74b003ebaf5323312c89b1833e87b29"},{url:"main.js.LICENSE.txt",revision:"a3a66a244f594d7e179c65efc84500c0"}],{})}));