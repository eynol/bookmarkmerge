import{S as Qe,i as xe,s as et,a as tt,e as B,c as nt,b as H,g as he,t as F,d as me,f as J,h as G,j as rt,o as Se,k as at,l as st,m as ot,n as ke,p as q,q as it,r as lt,u as ct,v as X,w as Z,x as je,y as Q,z as x,A as Ge}from"./chunks/index-2c132837.js";import{g as Ke,f as ze,s as M,a as Oe,b as ft,i as ut}from"./chunks/singletons-810a5747.js";function dt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function pt(r){return r.split("%25").map(decodeURI).join("%25")}function ht(r){for(const e in r)r[e]=decodeURIComponent(r[e]);return r}const mt=["href","pathname","search","searchParams","toString","toJSON"];function gt(r,e){const n=new URL(r);for(const i of mt){let s=n[i];Object.defineProperty(n,i,{get(){return e(),s},enumerable:!0,configurable:!0})}return _t(n),n}function _t(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const wt="/__data.json";function yt(r){return r.replace(/\/$/,"")+wt}function bt(r){let e=5381;if(typeof r=="string"){let n=r.length;for(;n;)e=e*33^r.charCodeAt(--n)}else if(ArrayBuffer.isView(r)){const n=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let i=n.length;for(;i;)e=e*33^n[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const ge=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const i=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;pe.delete(i)}return ge(r,e)};const pe=new Map;function vt(r,e,n){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;(n==null?void 0:n.body)&&(typeof n.body=="string"||ArrayBuffer.isView(n.body))&&(s+=`[data-hash="${bt(n.body)}"]`);const p=document.querySelector(s);if(p!=null&&p.textContent){const{body:t,...f}=JSON.parse(p.textContent),g=p.getAttribute("data-ttl");return g&&pe.set(e,{body:t,init:f,ttl:1e3*Number(g)}),Promise.resolve(new Response(t,f))}return ge(r,n)}function Et(r,e){const n=pe.get(r);if(n){if(performance.now()<n.ttl)return new Response(n.body,n.init);pe.delete(r)}return ge(r,e)}const kt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Rt(r){const e=[],n=[],i=[];let s=!0;return{pattern:r==="/"?/^\/$/:new RegExp(`^${Ot(r).map((t,f,g)=>{const d=decodeURIComponent(t),_=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(d);if(_)return e.push(_[1]),n.push(_[2]),i.push(!1),"(?:/(.*))?";const w=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(d);if(w)return e.push(w[1]),n.push(w[2]),i.push(!0),"(?:/([^/]+))?";const O=f===g.length-1;return d?"/"+d.split(/\[(.+?)\](?!\])/).map((L,V)=>{if(V%2){const T=kt.exec(L);if(!T)throw new Error(`Invalid param: ${L}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,ee,W,oe,te]=T;return e.push(oe),n.push(te),i.push(!!ee),W?"(.*?)":ee?"([^/]*)?":"([^/]+?)"}return O&&L.includes(".")&&(s=!1),L.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join(""):void 0}).join("")}${s?"/?":""}$`),names:e,types:n,optional:i}}function St(r){return!/^\([^)]+\)$/.test(r)}function Ot(r){return r.slice(1).split("/").filter(St)}function $t(r,{names:e,types:n,optional:i},s){const p={};for(let t=0;t<e.length;t+=1){const f=e[t],g=n[t];let d=r[t+1];if(d||!i[t]){if(g){const _=s[g];if(!_)throw new Error(`Missing "${g}" param matcher`);if(!_(d))return}p[f]=d!=null?d:""}}return p}function Lt(r,e,n,i){const s=new Set(e);return Object.entries(n).map(([f,[g,d,_]])=>{const{pattern:w,names:O,types:K,optional:z}=Rt(f),L={id:f,exec:V=>{const T=w.exec(V);if(T)return $t(T,{names:O,types:K,optional:z},i)},errors:[1,..._||[]].map(V=>r[V]),layouts:[0,...d||[]].map(t),leaf:p(g)};return L.errors.length=L.layouts.length=Math.max(L.errors.length,L.layouts.length),L});function p(f){const g=f<0;return g&&(f=~f),[g,r[f]]}function t(f){return f===void 0?f:[s.has(f),r[f]]}}function It(r){let e,n,i;var s=r[0][0];function p(t){return{props:{data:t[2],form:t[1]}}}return s&&(e=X(s,p(r))),{c(){e&&Z(e.$$.fragment),n=B()},l(t){e&&je(e.$$.fragment,t),n=B()},m(t,f){e&&Q(e,t,f),H(t,n,f),i=!0},p(t,f){const g={};if(f&4&&(g.data=t[2]),f&2&&(g.form=t[1]),s!==(s=t[0][0])){if(e){he();const d=e;F(d.$$.fragment,1,0,()=>{x(d,1)}),me()}s?(e=X(s,p(t)),Z(e.$$.fragment),J(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else s&&e.$set(g)},i(t){i||(e&&J(e.$$.fragment,t),i=!0)},o(t){e&&F(e.$$.fragment,t),i=!1},d(t){t&&G(n),e&&x(e,t)}}}function jt(r){let e,n,i;var s=r[0][0];function p(t){return{props:{data:t[2],$$slots:{default:[At]},$$scope:{ctx:t}}}}return s&&(e=X(s,p(r))),{c(){e&&Z(e.$$.fragment),n=B()},l(t){e&&je(e.$$.fragment,t),n=B()},m(t,f){e&&Q(e,t,f),H(t,n,f),i=!0},p(t,f){const g={};if(f&4&&(g.data=t[2]),f&523&&(g.$$scope={dirty:f,ctx:t}),s!==(s=t[0][0])){if(e){he();const d=e;F(d.$$.fragment,1,0,()=>{x(d,1)}),me()}s?(e=X(s,p(t)),Z(e.$$.fragment),J(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else s&&e.$set(g)},i(t){i||(e&&J(e.$$.fragment,t),i=!0)},o(t){e&&F(e.$$.fragment,t),i=!1},d(t){t&&G(n),e&&x(e,t)}}}function At(r){let e,n,i;var s=r[0][1];function p(t){return{props:{data:t[3],form:t[1]}}}return s&&(e=X(s,p(r))),{c(){e&&Z(e.$$.fragment),n=B()},l(t){e&&je(e.$$.fragment,t),n=B()},m(t,f){e&&Q(e,t,f),H(t,n,f),i=!0},p(t,f){const g={};if(f&8&&(g.data=t[3]),f&2&&(g.form=t[1]),s!==(s=t[0][1])){if(e){he();const d=e;F(d.$$.fragment,1,0,()=>{x(d,1)}),me()}s?(e=X(s,p(t)),Z(e.$$.fragment),J(e.$$.fragment,1),Q(e,n.parentNode,n)):e=null}else s&&e.$set(g)},i(t){i||(e&&J(e.$$.fragment,t),i=!0)},o(t){e&&F(e.$$.fragment,t),i=!1},d(t){t&&G(n),e&&x(e,t)}}}function Me(r){let e,n=r[5]&&He(r);return{c(){e=at("div"),n&&n.c(),this.h()},l(i){e=st(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var s=ot(e);n&&n.l(s),s.forEach(G),this.h()},h(){ke(e,"id","svelte-announcer"),ke(e,"aria-live","assertive"),ke(e,"aria-atomic","true"),q(e,"position","absolute"),q(e,"left","0"),q(e,"top","0"),q(e,"clip","rect(0 0 0 0)"),q(e,"clip-path","inset(50%)"),q(e,"overflow","hidden"),q(e,"white-space","nowrap"),q(e,"width","1px"),q(e,"height","1px")},m(i,s){H(i,e,s),n&&n.m(e,null)},p(i,s){i[5]?n?n.p(i,s):(n=He(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&G(e),n&&n.d()}}}function He(r){let e;return{c(){e=it(r[6])},l(n){e=lt(n,r[6])},m(n,i){H(n,e,i)},p(n,i){i&64&&ct(e,n[6])},d(n){n&&G(e)}}}function Pt(r){let e,n,i,s,p;const t=[jt,It],f=[];function g(_,w){return _[0][1]?0:1}e=g(r),n=f[e]=t[e](r);let d=r[4]&&Me(r);return{c(){n.c(),i=tt(),d&&d.c(),s=B()},l(_){n.l(_),i=nt(_),d&&d.l(_),s=B()},m(_,w){f[e].m(_,w),H(_,i,w),d&&d.m(_,w),H(_,s,w),p=!0},p(_,[w]){let O=e;e=g(_),e===O?f[e].p(_,w):(he(),F(f[O],1,1,()=>{f[O]=null}),me(),n=f[e],n?n.p(_,w):(n=f[e]=t[e](_),n.c()),J(n,1),n.m(i.parentNode,i)),_[4]?d?d.p(_,w):(d=Me(_),d.c(),d.m(s.parentNode,s)):d&&(d.d(1),d=null)},i(_){p||(J(n),p=!0)},o(_){F(n),p=!1},d(_){f[e].d(_),_&&G(i),d&&d.d(_),_&&G(s)}}}function Nt(r,e,n){let{stores:i}=e,{page:s}=e,{components:p}=e,{form:t}=e,{data_0:f=null}=e,{data_1:g=null}=e;rt(i.page.notify);let d=!1,_=!1,w=null;return Se(()=>{const O=i.page.subscribe(()=>{d&&(n(5,_=!0),n(6,w=document.title||"untitled page"))});return n(4,d=!0),O}),r.$$set=O=>{"stores"in O&&n(7,i=O.stores),"page"in O&&n(8,s=O.page),"components"in O&&n(0,p=O.components),"form"in O&&n(1,t=O.form),"data_0"in O&&n(2,f=O.data_0),"data_1"in O&&n(3,g=O.data_1)},r.$$.update=()=>{r.$$.dirty&384&&i.page.set(s)},[p,t,f,g,d,_,w,i,s]}class Ut extends Qe{constructor(e){super(),xe(this,e,Nt,Pt,et,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Tt=function(){const e=document.createElement("link").relList;return e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}(),Dt=function(r,e){return new URL(r,e).href},We={},ce=function(e,n,i){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(p=>{if(p=Dt(p,i),p in We)return;We[p]=!0;const t=p.endsWith(".css"),f=t?'[rel="stylesheet"]':"";if(!!i)for(let _=s.length-1;_>=0;_--){const w=s[_];if(w.href===p&&(!t||w.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${f}`))return;const d=document.createElement("link");if(d.rel=t?"stylesheet":Tt,t||(d.as="script",d.crossOrigin=""),d.href=p,document.head.appendChild(d),t)return new Promise((_,w)=>{d.addEventListener("load",_),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${p}`)))})})).then(()=>e())},Vt={},_e=[()=>ce(()=>import("./chunks/0-fa82086a.js"),["./chunks/0-fa82086a.js","./components/pages/_layout.svelte-88dbbf1f.js","./chunks/index-2c132837.js","./chunks/stores-a3a5f098.js","./chunks/singletons-810a5747.js","./chunks/index-ba6e7fea.js","./assets/_layout-8e06cf29.css","./assets/Header-388519e7.css"],import.meta.url),()=>ce(()=>import("./chunks/1-bfd45445.js"),["./chunks/1-bfd45445.js","./components/error.svelte-4812ce1d.js","./chunks/index-2c132837.js","./chunks/stores-a3a5f098.js","./chunks/singletons-810a5747.js","./chunks/index-ba6e7fea.js"],import.meta.url),()=>ce(()=>import("./chunks/2-e2ed48b3.js"),["./chunks/2-e2ed48b3.js","./chunks/_page-2723c2d1.js","./components/pages/_page.svelte-98c21637.js","./chunks/index-2c132837.js","./chunks/index-ba6e7fea.js","./assets/_page-02b11333.css","./assets/Header-388519e7.css"],import.meta.url),()=>ce(()=>import("./chunks/3-aa783488.js"),["./chunks/3-aa783488.js","./chunks/_page-4fd03e1a.js","./components/pages/about/_page.svelte-58028e82.js","./chunks/index-2c132837.js"],import.meta.url)],qt=[],Ct={"/":[2],"/about":[3]},Bt={handleError:({error:r})=>{console.error(r)}};class $e{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Ye{constructor(e,n){this.status=e,this.location=n}}async function Ft(r){var e;for(const n in r)if(typeof((e=r[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([i,s])=>[i,await s])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Jt=-1,Gt=-2,Kt=-3,zt=-4,Mt=-5,Ht=-6;function Wt(r){if(typeof r=="number")return i(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const e=r,n=Array(e.length);function i(s,p=!1){if(s===Jt)return;if(s===Kt)return NaN;if(s===zt)return 1/0;if(s===Mt)return-1/0;if(s===Ht)return-0;if(p)throw new Error("Invalid input");if(s in n)return n[s];const t=e[s];if(!t||typeof t!="object")n[s]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[s]=new Date(t[1]);break;case"Set":const g=new Set;n[s]=g;for(let w=1;w<t.length;w+=1)g.add(i(t[w]));break;case"Map":const d=new Map;n[s]=d;for(let w=1;w<t.length;w+=2)d.set(i(t[w]),i(t[w+1]));break;case"RegExp":n[s]=new RegExp(t[1],t[2]);break;case"Object":n[s]=Object(t[1]);break;case"BigInt":n[s]=BigInt(t[1]);break;case"null":const _=Object.create(null);n[s]=_;for(let w=1;w<t.length;w+=2)_[t[w]]=i(t[w+1]);break}else{const f=new Array(t.length);n[s]=f;for(let g=0;g<t.length;g+=1){const d=t[g];d!==Gt&&(f[g]=i(d))}}else{const f={};n[s]=f;for(const g in t){const d=t[g];f[g]=i(d)}}return n[s]}return i(0)}const Ze="sveltekit:scroll",C="sveltekit:index",fe=Lt(_e,qt,Ct,Vt),Le=_e[0],Ie=_e[1];Le();Ie();let se={};try{se=JSON.parse(sessionStorage[Ze])}catch{}function Re(r){se[r]=Oe()}function Yt({target:r,base:e,trailing_slash:n}){var Be;const i=[];let s=null;const p={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,g=!1,d=!0,_=!1,w=!1,O=!1,K=!1,z,L=(Be=history.state)==null?void 0:Be[C];L||(L=Date.now(),history.replaceState({...history.state,[C]:L},"",location.href));const V=se[L];V&&(history.scrollRestoration="manual",scrollTo(V.x,V.y));let T,ee,W;async function oe(){W=W||Promise.resolve(),await W,W=null;const a=new URL(location.href),l=be(a,!0);s=null,await Pe(l,a,[])}async function te(a,{noScroll:l=!1,replaceState:u=!1,keepFocus:o=!1,state:c={},invalidateAll:h=!1},m,v){return typeof a=="string"&&(a=new URL(a,Ke(document))),ve({url:a,scroll:l?Oe():null,keepfocus:o,redirect_chain:m,details:{state:c,replaceState:u},nav_token:v,accepted:()=>{h&&(K=!0)},blocked:()=>{},type:"goto"})}async function Ae(a){const l=be(a,!1);if(!l)throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${a}`);return s={id:l.id,promise:Te(l)},s.promise}async function Pe(a,l,u,o,c={},h){var v,E;ee=c;let m=a&&await Te(a);if(m||(m=await Ce(l,{id:null},ae(new Error(`Not found: ${l.pathname}`),{url:l,params:{},route:{id:null}}),404)),l=(a==null?void 0:a.url)||l,ee!==c)return!1;if(m.type==="redirect")if(u.length>10||u.includes(l.pathname))m=await ie({status:500,error:ae(new Error("Redirect loop"),{url:l,params:{},route:{id:null}}),url:l,route:{id:null}});else return te(new URL(m.location,l).href,{},[...u,l.pathname],c),!1;else((E=(v=m.props)==null?void 0:v.page)==null?void 0:E.status)>=400&&await M.updated.check()&&await le(l);if(i.length=0,K=!1,_=!0,o&&o.details){const{details:y}=o,b=y.replaceState?0:1;y.state[C]=L+=b,history[y.replaceState?"replaceState":"pushState"](y.state,"",l)}if(s=null,g){t=m.state,m.props.page&&(m.props.page.url=l);const y=de();z.$set(m.props),y()}else Ne(m);if(o){const{scroll:y,keepfocus:b}=o;if(!b){const R=document.body,A=R.getAttribute("tabindex");R.tabIndex=-1,R.focus({preventScroll:!0}),setTimeout(()=>{var $;($=getSelection())==null||$.removeAllRanges()}),A!==null?R.setAttribute("tabindex",A):R.removeAttribute("tabindex")}if(await Ge(),d){const R=l.hash&&document.getElementById(l.hash.slice(1));y?scrollTo(y.x,y.y):R?R.scrollIntoView():scrollTo(0,0)}}else await Ge();d=!0,m.props.page&&(T=m.props.page),h&&h(),_=!1}function Ne(a){var c,h;t=a.state;const l=document.querySelector("style[data-sveltekit]");l&&l.remove(),T=a.props.page;const u=de();z=new Ut({target:r,props:{...a.props,stores:M},hydrate:!0}),u();const o={from:null,to:ue("to",{params:t.params,route:{id:(h=(c=t.route)==null?void 0:c.id)!=null?h:null},url:new URL(location.href)}),willUnload:!1,type:"enter"};p.after_navigate.forEach(m=>m(o)),g=!0}async function ne({url:a,params:l,branch:u,status:o,error:c,route:h,form:m}){var A;const v=u.filter(Boolean),E={type:"loaded",state:{url:a,params:l,branch:u,error:c,route:h},props:{components:v.map($=>$.node.component)}};m!==void 0&&(E.props.form=m);let y={},b=!T;for(let $=0;$<v.length;$+=1){const N=v[$];y={...y,...N.data},(b||!t.branch.some(U=>U===N))&&(E.props[`data_${$}`]=y,b=b||Object.keys((A=N.data)!=null?A:{}).length>0)}if(b||(b=Object.keys(T.data).length!==Object.keys(y).length),!t.url||a.href!==t.url.href||t.error!==c||m!==void 0||b){E.props.page={error:c,params:l,route:h,status:o,url:a,form:m,data:b?y:T.data};const $=(N,U)=>{Object.defineProperty(E.props.page,N,{get:()=>{throw new Error(`$page.${N} has been replaced by $page.url.${U}`)}})};$("origin","origin"),$("path","pathname"),$("query","searchParams")}return E}async function we({loader:a,parent:l,url:u,params:o,route:c,server_data_node:h}){var y,b,R,A,$;let m=null;const v={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},E=await a();if((y=E.shared)!=null&&y.load){let N=function(...S){for(const D of S){const{href:k}=new URL(D,u);v.dependencies.add(k)}};const U={route:{get id(){return v.route=!0,c.id}},params:new Proxy(o,{get:(S,D)=>(v.params.add(D),S[D])}),data:(b=h==null?void 0:h.data)!=null?b:null,url:gt(u,()=>{v.url=!0}),async fetch(S,D){let k;S instanceof Request?(k=S.url,D={body:S.method==="GET"||S.method==="HEAD"?void 0:await S.blob(),cache:S.cache,credentials:S.credentials,headers:S.headers,integrity:S.integrity,keepalive:S.keepalive,method:S.method,mode:S.mode,redirect:S.redirect,referrer:S.referrer,referrerPolicy:S.referrerPolicy,signal:S.signal,...D}):k=S;const I=new URL(k,u).href;return N(I),g?Et(I,D):vt(k,I,D)},setHeaders:()=>{},depends:N,parent(){return v.parent=!0,l()}};Object.defineProperties(U,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},routeId:{get(){throw new Error("routeId has been replaced by route.id")},enumerable:!1}}),m=(R=await E.shared.load.call(null,U))!=null?R:null,m=m?await Ft(m):null}return{node:E,loader:a,server:h,shared:(A=E.shared)!=null&&A.load?{type:"data",data:m,uses:v}:null,data:($=m!=null?m:h==null?void 0:h.data)!=null?$:null}}function Ue(a,l,u,o,c){if(K)return!0;if(!o)return!1;if(o.parent&&a||o.route&&l||o.url&&u)return!0;for(const h of o.params)if(c[h]!==t.params[h])return!0;for(const h of o.dependencies)if(i.some(m=>m(new URL(h))))return!0;return!1}function ye(a,l){var u,o;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((u=a.uses.dependencies)!=null?u:[]),params:new Set((o=a.uses.params)!=null?o:[]),parent:!!a.uses.parent,route:!!a.uses.route,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&l!=null?l:null}async function Te({id:a,invalidating:l,url:u,params:o,route:c}){var D;if((s==null?void 0:s.id)===a)return s.promise;const{errors:h,layouts:m,leaf:v}=c,E=[...m,v];h.forEach(k=>k==null?void 0:k().catch(()=>{})),E.forEach(k=>k==null?void 0:k[1]().catch(()=>{}));let y=null;const b=t.url?a!==t.url.pathname+t.url.search:!1,R=t.route?a!==t.route.id:!1,A=E.reduce((k,I,P)=>{var re;const j=t.branch[P],Y=!!(I!=null&&I[0])&&((j==null?void 0:j.loader)!==I[1]||Ue(k.some(Boolean),R,b,(re=j.server)==null?void 0:re.uses,o));return k.push(Y),k},[]);if(A.some(Boolean)){try{y=await Xe(u,A)}catch(k){return ie({status:500,error:ae(k,{url:u,params:o,route:{id:c.id}}),url:u,route:c})}if(y.type==="redirect")return y}const $=y==null?void 0:y.nodes;let N=!1;const U=E.map(async(k,I)=>{var re;if(!k)return;const P=t.branch[I],j=$==null?void 0:$[I];if((!j||j.type==="skip")&&k[1]===(P==null?void 0:P.loader)&&!Ue(N,R,b,(re=P.shared)==null?void 0:re.uses,o))return P;if(N=!0,(j==null?void 0:j.type)==="error")throw j;return we({loader:k[1],url:u,params:o,route:c,parent:async()=>{var Je;const Fe={};for(let Ee=0;Ee<I;Ee+=1)Object.assign(Fe,(Je=await U[Ee])==null?void 0:Je.data);return Fe},server_data_node:ye(j===void 0&&k[0]?{type:"skip"}:j!=null?j:null,P==null?void 0:P.server)})});for(const k of U)k.catch(()=>{});const S=[];for(let k=0;k<E.length;k+=1)if(E[k])try{S.push(await U[k])}catch(I){if(I instanceof Ye)return{type:"redirect",location:I.location};let P=500,j;$!=null&&$.includes(I)?(P=(D=I.status)!=null?D:P,j=I.error):I instanceof $e?(P=I.status,j=I.body):j=ae(I,{params:o,url:u,route:{id:c.id}});const Y=await De(k,S,h);return Y?await ne({url:u,params:o,branch:S.slice(0,Y.idx).concat(Y.node),status:P,error:j,route:c}):await Ce(u,{id:c.id},j,P)}else S.push(void 0);return await ne({url:u,params:o,branch:S,status:200,error:null,route:c,form:l?void 0:null})}async function De(a,l,u){for(;a--;)if(u[a]){let o=a;for(;!l[o];)o-=1;try{return{idx:o+1,node:{node:await u[a](),loader:u[a],data:{},server:null,shared:null}}}catch{continue}}}async function ie({status:a,error:l,url:u,route:o}){var y;const c={},h=await Le();let m=null;if(h.server)try{const b=await Xe(u,[!0]);if(b.type!=="data"||b.nodes[0]&&b.nodes[0].type!=="data")throw 0;m=(y=b.nodes[0])!=null?y:null}catch{(u.origin!==location.origin||u.pathname!==location.pathname||f)&&await le(u)}const v=await we({loader:Le,url:u,params:c,route:o,parent:()=>Promise.resolve({}),server_data_node:ye(m)}),E={node:await Ie(),loader:Ie,shared:null,server:null,data:null};return await ne({url:u,params:c,branch:[v,E],status:a,error:l,route:null})}function be(a,l){if(Ve(a))return;const u=pt(a.pathname.slice(e.length)||"/");for(const o of fe){const c=o.exec(u);if(c){const h=new URL(a.origin+dt(a.pathname,n)+a.search+a.hash);return{id:h.pathname+h.search,invalidating:l,route:o,params:ht(c),url:h}}}}function Ve(a){return a.origin!==location.origin||!a.pathname.startsWith(e)}function qe({url:a,type:l,intent:u,delta:o}){var v,E,y,b,R;let c=!1;const h={from:ue("from",{params:t.params,route:{id:(E=(v=t.route)==null?void 0:v.id)!=null?E:null},url:t.url}),to:ue("to",{params:(y=u==null?void 0:u.params)!=null?y:null,route:{id:(R=(b=u==null?void 0:u.route)==null?void 0:b.id)!=null?R:null},url:a}),willUnload:!u,type:l};o!==void 0&&(h.delta=o);const m={...h,cancel:()=>{c=!0}};return p.before_navigate.forEach(A=>A(m)),c?null:h}async function ve({url:a,scroll:l,keepfocus:u,redirect_chain:o,details:c,type:h,delta:m,nav_token:v,accepted:E,blocked:y}){const b=be(a,!1),R=qe({url:a,type:h,delta:m,intent:b});if(!R){y();return}Re(L),E(),w=!0,g&&M.navigating.set(R),await Pe(b,a,o,{scroll:l,keepfocus:u,details:c},v,()=>{w=!1,p.after_navigate.forEach(A=>A(R)),M.navigating.set(null)})}async function Ce(a,l,u,o){return a.origin===location.origin&&a.pathname===location.pathname&&!f?await ie({status:o,error:u,url:a,route:l}):await le(a)}function le(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{Se(()=>(p.after_navigate.push(a),()=>{const l=p.after_navigate.indexOf(a);p.after_navigate.splice(l,1)}))},before_navigate:a=>{Se(()=>(p.before_navigate.push(a),()=>{const l=p.before_navigate.indexOf(a);p.before_navigate.splice(l,1)}))},disable_scroll_handling:()=>{(_||!g)&&(d=!1)},goto:(a,l={})=>{if("keepfocus"in l)throw new Error("`keepfocus` has been renamed to `keepFocus` (note the difference in casing)");if("noscroll"in l)throw new Error("`noscroll` has been renamed to `noScroll` (note the difference in casing)");return te(a,l,[])},invalidate:a=>{if(a===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof a=="function")i.push(a);else{const{href:l}=new URL(a,location.href);i.push(u=>u.href===l)}return oe()},invalidateAll:()=>(K=!0,oe()),prefetch:async a=>{const l=new URL(a,Ke(document));await Ae(l)},prefetch_routes:async a=>{const u=(a?fe.filter(o=>a.some(c=>o.exec(c))):fe).map(o=>Promise.all([...o.layouts,o.leaf].map(c=>c==null?void 0:c[1]())));await Promise.all(u)},apply_action:async a=>{if(a.type==="error"){const l=new URL(location.href),{branch:u,route:o}=t;if(!o)return;const c=await De(t.branch.length,u,o.errors);if(c){const h=await ne({url:l,params:t.params,branch:u.slice(0,c.idx).concat(c.node),status:500,error:a.error,route:o});t=h.state;const m=de();z.$set(h.props),m()}}else if(a.type==="redirect")te(a.location,{invalidateAll:!0},[]);else{const l={form:a.data,page:{...T,form:a.data,status:a.status}},u=de();z.$set(l),u()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var h,m;let c=!1;if(!w){const v={from:ue("from",{params:t.params,route:{id:(m=(h=t.route)==null?void 0:h.id)!=null?m:null},url:t.url}),to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};p.before_navigate.forEach(E=>E(v))}c?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Re(L);try{sessionStorage[Ze]=JSON.stringify(se)}catch{}}});const a=o=>{const{url:c,options:h}=ze(o);if(c&&h.prefetch){if(Ve(c))return;Ae(c)}};let l;const u=o=>{clearTimeout(l),l=setTimeout(()=>{var c;(c=o.target)==null||c.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",u),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const{a:c,url:h,options:m}=ze(o);if(!c||!h)return;const v=c instanceof SVGAElement;if(!v&&h.protocol!==location.protocol&&!(h.protocol==="https:"||h.protocol==="http:")||c.hasAttribute("download"))return;if((c.getAttribute("rel")||"").split(/\s+/).includes("external")||m.reload||(v?c.target.baseVal:c.target)){qe({url:h,type:"link"})||o.preventDefault(),w=!0;return}const[y,b]=h.href.split("#");if(b!==void 0&&y===location.href.split("#")[0]){O=!0,Re(L),t.url=h,M.page.set({...T,url:h}),M.page.notify();return}ve({url:h,scroll:m.noscroll?Oe():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:h.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),addEventListener("popstate",o=>{if(o.state){if(o.state[C]===L)return;const c=o.state[C]-L;ve({url:new URL(location.href),scroll:se[o.state[C]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{L=o.state[C]},blocked:()=>{history.go(-c)},type:"popstate",delta:c})}}),addEventListener("hashchange",()=>{O&&(O=!1,history.replaceState({...history.state,[C]:++L},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&M.navigating.set(null)})},_hydrate:async({status:a,error:l,node_ids:u,params:o,route:c,data:h,form:m})=>{var y;f=!0;const v=new URL(location.href);let E;try{const b=u.map(async(R,A)=>{const $=h[A];return we({loader:_e[R],url:v,params:o,route:c,parent:async()=>{const N={};for(let U=0;U<A;U+=1)Object.assign(N,(await b[U]).data);return N},server_data_node:ye($)})});E=await ne({url:v,params:o,branch:await Promise.all(b),status:a,error:l,form:m,route:(y=fe.find(({id:R})=>R===c.id))!=null?y:null})}catch(b){if(b instanceof Ye){await le(new URL(b.location,location.href));return}E=await ie({status:b instanceof $e?b.status:500,error:ae(b,{url:v,params:o,route:c}),url:v,route:c})}Ne(E)}}}async function Xe(r,e){var p;const n=new URL(r);n.pathname=yt(r.pathname);const i=await ge(n.href,{headers:{"x-sveltekit-invalidated":e.map(t=>t?"1":"").join(",")}}),s=await i.json();if(!i.ok)throw new Error(s);return(p=s.nodes)==null||p.forEach(t=>{var f,g;(t==null?void 0:t.type)==="data"&&(t.data=Wt(t.data),t.uses={dependencies:new Set((f=t.uses.dependencies)!=null?f:[]),params:new Set((g=t.uses.params)!=null?g:[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),s}function ae(r,e){var n;return r instanceof $e?r.body:(n=Bt.handleError({error:r,event:e}))!=null?n:{message:e.route.id!=null?"Internal Error":"Not Found"}}const Xt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function ue(r,e){for(const n of Xt)Object.defineProperty(e,n,{get(){throw new Error(`The navigation shape changed - ${r}.${n} should now be ${r}.url.${n}`)},enumerable:!1});return Object.defineProperty(e,"routeId",{get(){throw new Error(`The navigation shape changed - ${r}.routeId should now be ${r}.route.id`)},enumerable:!1}),e}function de(){return()=>{}}async function xt({env:r,hydrate:e,paths:n,target:i,trailing_slash:s}){ft(n);const p=Yt({target:i,base:n.base,trailing_slash:s});ut({client:p}),e?await p._hydrate(e):p.goto(location.href,{replaceState:!0}),p._start_router()}export{xt as start};
