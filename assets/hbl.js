(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();const Y=(e,n)=>e===n,U={equals:Y};let R=K;const y=1,E=2,q={owned:null,cleanups:null,context:null,owner:null};var d=null;let D=null,f=null,a=null,g=null,N=0;function Z(e,n){const t=f,s=d,l=e.length===0,i=l?q:{owned:null,cleanups:null,context:null,owner:n===void 0?s:n},r=l?e:()=>e(()=>m(()=>I(i)));d=i,f=null;try{return A(r,!0)}finally{f=t,d=s}}function j(e,n){n=n?Object.assign({},U,n):U;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=l=>(typeof l=="function"&&(l=l(t.value)),W(t,l));return[k.bind(t),s]}function C(e,n,t){const s=H(e,n,!1,y);_(s)}function G(e,n,t){R=ne;const s=H(e,n,!1,y);(!t||!t.render)&&(s.user=!0),g?g.push(s):_(s)}function m(e){if(f===null)return e();const n=f;f=null;try{return e()}finally{f=n}}function z(e){G(()=>m(e))}function k(){if(this.sources&&this.state)if(this.state===y)_(this);else{const e=a;a=null,A(()=>L(this),!1),a=e}if(f){const e=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(e)):(f.sources=[this],f.sourceSlots=[e]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function W(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&A(()=>{for(let l=0;l<e.observers.length;l+=1){const i=e.observers[l],r=D&&D.running;r&&D.disposed.has(i),(r?!i.tState:!i.state)&&(i.pure?a.push(i):g.push(i),i.observers&&V(i)),r||(i.state=y)}if(a.length>1e6)throw a=[],new Error},!1)),n}function _(e){if(!e.fn)return;I(e);const n=d,t=f,s=N;f=d=e,ee(e,e.value,s),f=t,d=n}function ee(e,n,t){let s;try{s=e.fn(n)}catch(l){return e.pure&&(e.state=y,e.owned&&e.owned.forEach(I),e.owned=null),e.updatedAt=t+1,Q(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?W(e,s):e.value=s,e.updatedAt=t)}function H(e,n,t,s=y,l){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:d,context:null,pure:t};return d===null||d!==q&&(d.owned?d.owned.push(i):d.owned=[i]),i}function $(e){if(e.state===0)return;if(e.state===E)return L(e);if(e.suspense&&m(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<N);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===y)_(e);else if(e.state===E){const s=a;a=null,A(()=>L(e,n[0]),!1),a=s}}function A(e,n){if(a)return e();let t=!1;n||(a=[]),g?t=!0:g=[],N++;try{const s=e();return te(t),s}catch(s){t||(g=null),a=null,Q(s)}}function te(e){if(a&&(K(a),a=null),e)return;const n=g;g=null,n.length&&A(()=>R(n),!1)}function K(e){for(let n=0;n<e.length;n++)$(e[n])}function ne(e){let n,t=0;for(n=0;n<e.length;n++){const s=e[n];s.user?e[t++]=s:$(s)}for(n=0;n<t;n++)$(e[n])}function L(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const l=s.state;l===y?s!==n&&(!s.updatedAt||s.updatedAt<N)&&$(s):l===E&&L(s,n)}}}function V(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=E,t.pure?a.push(t):g.push(t),t.observers&&V(t))}}function I(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const i=l.pop(),r=t.observerSlots.pop();s<l.length&&(i.sourceSlots[r]=s,l[s]=i,t.observerSlots[s]=r)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)I(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function Q(e){throw e}function se(e,n){return m(()=>e(n||{}))}function le(e,n,t){let s=t.length,l=n.length,i=s,r=0,o=0,u=n[l-1].nextSibling,h=null;for(;r<l||o<i;){if(n[r]===t[o]){r++,o++;continue}for(;n[l-1]===t[i-1];)l--,i--;if(l===r){const c=i<s?o?t[o-1].nextSibling:t[i-o]:u;for(;o<i;)e.insertBefore(t[o++],c)}else if(i===o)for(;r<l;)(!h||!h.has(n[r]))&&n[r].remove(),r++;else if(n[r]===t[i-1]&&t[o]===n[l-1]){const c=n[--l].nextSibling;e.insertBefore(t[o++],n[r++].nextSibling),e.insertBefore(t[--i],c),n[l]=t[i]}else{if(!h){h=new Map;let p=o;for(;p<i;)h.set(t[p],p++)}const c=h.get(n[r]);if(c!=null)if(o<c&&c<i){let p=r,w=1,v;for(;++p<l&&p<i&&!((v=h.get(n[p]))==null||v!==c+w);)w++;if(w>c-o){const J=n[r];for(;o<c;)e.insertBefore(t[o++],J)}else e.replaceChild(t[o++],n[r++])}else r++;else n[r++].remove()}}}const F="_$DX_DELEGATE";function ie(e,n,t,s={}){let l;return Z(i=>{l=i,n===document?e():X(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{l(),n.textContent=""}}function oe(e,n,t){let s;const l=()=>{const r=document.createElement("template");return r.innerHTML=e,t?r.content.firstChild.firstChild:r.content.firstChild},i=n?()=>m(()=>document.importNode(s||(s=l()),!0)):()=>(s||(s=l())).cloneNode(!0);return i.cloneNode=i,i}function re(e,n=window.document){const t=n[F]||(n[F]=new Set);for(let s=0,l=e.length;s<l;s++){const i=e[s];t.has(i)||(t.add(i),n.addEventListener(i,fe))}}function X(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return T(e,n,s,t);C(l=>T(e,n(),l,t),s)}function fe(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const s=t[n];if(s&&!t.disabled){const l=t[`${n}Data`];if(l!==void 0?s.call(t,l,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function T(e,n,t,s,l){for(;typeof t=="function";)t=t();if(n===t)return t;const i=typeof n,r=s!==void 0;if(e=r&&t[0]&&t[0].parentNode||e,i==="string"||i==="number")if(i==="number"&&(n=n.toString()),r){let o=t[0];o&&o.nodeType===3?o.data=n:o=document.createTextNode(n),t=b(e,t,s,o)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||i==="boolean")t=b(e,t,s);else{if(i==="function")return C(()=>{let o=n();for(;typeof o=="function";)o=o();t=T(e,o,t,s)}),()=>t;if(Array.isArray(n)){const o=[],u=t&&Array.isArray(t);if(B(o,n,t,l))return C(()=>t=T(e,o,t,s,!0)),()=>t;if(o.length===0){if(t=b(e,t,s),r)return t}else u?t.length===0?M(e,o,s):le(e,t,o):(t&&b(e),M(e,o));t=o}else if(n.nodeType){if(Array.isArray(t)){if(r)return t=b(e,t,s,n);b(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}else console.warn("Unrecognized value. Skipped inserting",n)}return t}function B(e,n,t,s){let l=!1;for(let i=0,r=n.length;i<r;i++){let o=n[i],u=t&&t[i],h;if(!(o==null||o===!0||o===!1))if((h=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))l=B(e,o,u)||l;else if(h==="function")if(s){for(;typeof o=="function";)o=o();l=B(e,Array.isArray(o)?o:[o],Array.isArray(u)?u:[u])||l}else e.push(o),l=!0;else{const c=String(o);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return l}function M(e,n,t=null){for(let s=0,l=n.length;s<l;s++)e.insertBefore(n[s],t)}function b(e,n,t,s){if(t===void 0)return e.textContent="";const l=s||document.createTextNode("");if(n.length){let i=!1;for(let r=n.length-1;r>=0;r--){const o=n[r];if(l!==o){const u=o.parentNode===e;!i&&!r?u?e.replaceChild(l,o):e.insertBefore(l,t):u&&o.remove()}else i=!0}}else e.insertBefore(l,t);return[l]}const ue=oe('<div id="_b14702"><h3>Trạng thái tool: </h3><div id="_7cfa11"><label for="_fa78a8">Nhảy trang: </label><input type="number" id="_fa78a8"><button>Goto Slide</button></div><button>Trang tiếp');let O=null,P=null,x=null,S=null;const ce=()=>{const[e,n]=j(null),[t,s]=j(!1);G(()=>{const r=t();console.info("🟠 src/App.tsx	Line:15	ID:1766ae",r)}),z(()=>{console.info("🟠 src/App.tsx	Line:13	ID:7c1b5d");const r=setInterval(()=>{!P||!O?(S=document.querySelector("iframe#stream-frame.ng-isolate-scope"),O=S?.contentWindow?.cp,P=S?.contentWindow?.cpAPIInterface,console.info("🟠 src/App.tsx	Line:26	ID:70038a"),s(!0),clearInterval(r)):(console.info("🟠 src/App.tsx	Line:31	ID:f8f9ea"),s(!0))},200);setInterval(()=>{if(S&&(x=S.contentDocument.querySelector("#btnArrest"),x)){if(x.style.visibility==="hidden")return;x.style.visibility="hidden"}},1e3)});const l=()=>{e()&&(P?.gotoSlide(e()),n(void 0))},i=()=>{console.info("🟠 src/App.tsx	Line:41	ID:ec074b"),O?.jumpToNextSlide()};return(()=>{const r=ue(),o=r.firstChild;o.firstChild;const u=o.nextSibling,h=u.firstChild,c=h.nextSibling,p=c.nextSibling,w=u.nextSibling;return X(o,()=>t()?"Sẵn sàng":"Không dùng được",null),c.addEventListener("change",v=>{n(v.target.value)}),p.$$click=l,w.$$click=i,C(()=>c.value=e()),r})()};re(["click"]);const ae=document.getElementById("hbl_tool");ie(()=>se(ce,{}),ae);
