(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(l){if(l.ep)return;l.ep=!0;const i=t(l);fetch(l.href,i)}})();const Q=(e,n)=>e===n,U={equals:Q};let M=W;const g=1,v=2,q={owned:null,cleanups:null,context:null,owner:null};var d=null;let L=null,f=null,c=null,p=null,$=0;function X(e,n){const t=f,s=d,l=e.length===0,i=l?q:{owned:null,cleanups:null,context:null,owner:n===void 0?s:n},r=l?e:()=>e(()=>S(()=>N(i)));d=i,f=null;try{return m(r,!0)}finally{f=t,d=s}}function J(e,n){n=n?Object.assign({},U,n):U;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=l=>(typeof l=="function"&&(l=l(t.value)),G(t,l));return[z.bind(t),s]}function B(e,n,t){const s=R(e,n,!1,g);T(s)}function Y(e,n,t){M=te;const s=R(e,n,!1,g);(!t||!t.render)&&(s.user=!0),p?p.push(s):T(s)}function S(e){if(f===null)return e();const n=f;f=null;try{return e()}finally{f=n}}function Z(e){Y(()=>S(e))}function z(){if(this.sources&&this.state)if(this.state===g)T(this);else{const e=c;c=null,m(()=>x(this),!1),c=e}if(f){const e=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(e)):(f.sources=[this],f.sourceSlots=[e]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function G(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&m(()=>{for(let l=0;l<e.observers.length;l+=1){const i=e.observers[l],r=L&&L.running;r&&L.disposed.has(i),(r?!i.tState:!i.state)&&(i.pure?c.push(i):p.push(i),i.observers&&H(i)),r||(i.state=g)}if(c.length>1e6)throw c=[],new Error},!1)),n}function T(e){if(!e.fn)return;N(e);const n=d,t=f,s=$;f=d=e,k(e,e.value,s),f=t,d=n}function k(e,n,t){let s;try{s=e.fn(n)}catch(l){return e.pure&&(e.state=g,e.owned&&e.owned.forEach(N),e.owned=null),e.updatedAt=t+1,V(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?G(e,s):e.value=s,e.updatedAt=t)}function R(e,n,t,s=g,l){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:d,context:null,pure:t};return d===null||d!==q&&(d.owned?d.owned.push(i):d.owned=[i]),i}function E(e){if(e.state===0)return;if(e.state===v)return x(e);if(e.suspense&&S(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<$);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===g)T(e);else if(e.state===v){const s=c;c=null,m(()=>x(e,n[0]),!1),c=s}}function m(e,n){if(c)return e();let t=!1;n||(c=[]),p?t=!0:p=[],$++;try{const s=e();return ee(t),s}catch(s){t||(p=null),c=null,V(s)}}function ee(e){if(c&&(W(c),c=null),e)return;const n=p;p=null,n.length&&m(()=>M(n),!1)}function W(e){for(let n=0;n<e.length;n++)E(e[n])}function te(e){let n,t=0;for(n=0;n<e.length;n++){const s=e[n];s.user?e[t++]=s:E(s)}for(n=0;n<t;n++)E(e[n])}function x(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const l=s.state;l===g?s!==n&&(!s.updatedAt||s.updatedAt<$)&&E(s):l===v&&x(s,n)}}}function H(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=v,t.pure?c.push(t):p.push(t),t.observers&&H(t))}}function N(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const i=l.pop(),r=t.observerSlots.pop();s<l.length&&(i.sourceSlots[r]=s,l[s]=i,t.observerSlots[s]=r)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)N(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function V(e){throw e}function ne(e,n){return S(()=>e(n||{}))}function se(e,n,t){let s=t.length,l=n.length,i=s,r=0,o=0,u=n[l-1].nextSibling,h=null;for(;r<l||o<i;){if(n[r]===t[o]){r++,o++;continue}for(;n[l-1]===t[i-1];)l--,i--;if(l===r){const a=i<s?o?t[o-1].nextSibling:t[i-o]:u;for(;o<i;)e.insertBefore(t[o++],a)}else if(i===o)for(;r<l;)(!h||!h.has(n[r]))&&n[r].remove(),r++;else if(n[r]===t[i-1]&&t[o]===n[l-1]){const a=n[--l].nextSibling;e.insertBefore(t[o++],n[r++].nextSibling),e.insertBefore(t[--i],a),n[l]=t[i]}else{if(!h){h=new Map;let y=o;for(;y<i;)h.set(t[y],y++)}const a=h.get(n[r]);if(a!=null)if(o<a&&a<i){let y=r,_=1,D;for(;++y<l&&y<i&&!((D=h.get(n[y]))==null||D!==a+_);)_++;if(_>a-o){const K=n[r];for(;o<a;)e.insertBefore(t[o++],K)}else e.replaceChild(t[o++],n[r++])}else r++;else n[r++].remove()}}}const j="_$DX_DELEGATE";function le(e,n,t,s={}){let l;return X(i=>{l=i,n===document?e():re(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{l(),n.textContent=""}}function ie(e,n,t){let s;const l=()=>{const r=document.createElement("template");return r.innerHTML=e,t?r.content.firstChild.firstChild:r.content.firstChild},i=n?()=>S(()=>document.importNode(s||(s=l()),!0)):()=>(s||(s=l())).cloneNode(!0);return i.cloneNode=i,i}function oe(e,n=window.document){const t=n[j]||(n[j]=new Set);for(let s=0,l=e.length;s<l;s++){const i=e[s];t.has(i)||(t.add(i),n.addEventListener(i,fe))}}function re(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return C(e,n,s,t);B(l=>C(e,n(),l,t),s)}function fe(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const s=t[n];if(s&&!t.disabled){const l=t[`${n}Data`];if(l!==void 0?s.call(t,l,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function C(e,n,t,s,l){for(;typeof t=="function";)t=t();if(n===t)return t;const i=typeof n,r=s!==void 0;if(e=r&&t[0]&&t[0].parentNode||e,i==="string"||i==="number")if(i==="number"&&(n=n.toString()),r){let o=t[0];o&&o.nodeType===3?o.data=n:o=document.createTextNode(n),t=b(e,t,s,o)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||i==="boolean")t=b(e,t,s);else{if(i==="function")return B(()=>{let o=n();for(;typeof o=="function";)o=o();t=C(e,o,t,s)}),()=>t;if(Array.isArray(n)){const o=[],u=t&&Array.isArray(t);if(I(o,n,t,l))return B(()=>t=C(e,o,t,s,!0)),()=>t;if(o.length===0){if(t=b(e,t,s),r)return t}else u?t.length===0?F(e,o,s):se(e,t,o):(t&&b(e),F(e,o));t=o}else if(n.nodeType){if(Array.isArray(t)){if(r)return t=b(e,t,s,n);b(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}else console.warn("Unrecognized value. Skipped inserting",n)}return t}function I(e,n,t,s){let l=!1;for(let i=0,r=n.length;i<r;i++){let o=n[i],u=t&&t[i],h;if(!(o==null||o===!0||o===!1))if((h=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))l=I(e,o,u)||l;else if(h==="function")if(s){for(;typeof o=="function";)o=o();l=I(e,Array.isArray(o)?o:[o],Array.isArray(u)?u:[u])||l}else e.push(o),l=!0;else{const a=String(o);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return l}function F(e,n,t=null){for(let s=0,l=n.length;s<l;s++)e.insertBefore(n[s],t)}function b(e,n,t,s){if(t===void 0)return e.textContent="";const l=s||document.createTextNode("");if(n.length){let i=!1;for(let r=n.length-1;r>=0;r--){const o=n[r];if(l!==o){const u=o.parentNode===e;!i&&!r?u?e.replaceChild(l,o):e.insertBefore(l,t):u&&o.remove()}else i=!0}}else e.insertBefore(l,t);return[l]}const ue=ie('<div id="_b14702"><div id="_7cfa11"><label for="_fa78a8">Nhảy trang: </label><input type="number" id="_fa78a8"><button>Goto Slide</button></div><button>Trang tiếp');let O=null,P=null,A=null,w=null;const ce=()=>{const[e,n]=J(null);Z(()=>{const l=setInterval(()=>{(!P||!O)&&(w=document.querySelector("iframe#stream-frame.ng-isolate-scope"),O=w?.contentWindow?.cp,P=w?.contentWindow?.cpAPIInterface,clearInterval(l))},1e3);setInterval(()=>{if(w&&(A=w.contentDocument.querySelector("#btnArrest"),A)){if(A.style.visibility==="hidden")return;A.style.visibility="hidden"}},1e3)});const t=()=>{e()&&P?.gotoSlide(e())},s=()=>{O?.jumpToNextSlide()};return(()=>{const l=ue(),i=l.firstChild,r=i.firstChild,o=r.nextSibling,u=o.nextSibling,h=i.nextSibling;return o.addEventListener("change",a=>{n(a.target.value)}),u.$$click=t,h.$$click=s,l})()};oe(["click"]);const ae=document.getElementById("hbl_tool");le(()=>ne(ce,{}),ae);
