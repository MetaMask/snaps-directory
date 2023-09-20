"use strict";(self.webpackChunk_metamask_snaps_directory=self.webpackChunk_metamask_snaps_directory||[]).push([[691],{4221:function(e,t,n){function s(e){return Array.isArray?Array.isArray(e):"[object Array]"===d(e)}n.r(t),n.d(t,{default:function(){return Q}});const r=1/0;function i(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-r?"-0":t}(e)}function o(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return!0===e||!1===e||function(e){return l(e)&&null!==e}(e)&&"[object Boolean]"==d(e)}function l(e){return"object"==typeof e}function h(e){return null!=e}function u(e){return!e.trim().length}function d(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const f=e=>`Missing ${e} property in key`,p=e=>`Property 'weight' in key '${e}' must be a positive integer`,g=Object.prototype.hasOwnProperty;class m{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=y(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function y(e){let t=null,n=null,r=null,i=1,a=null;if(o(e)||s(e))r=e,t=x(e),n=v(e);else{if(!g.call(e,"name"))throw new Error(f("name"));const s=e.name;if(r=s,g.call(e,"weight")&&(i=e.weight,i<=0))throw new Error(p(s));t=x(s),n=v(s),a=e.getFn}return{path:t,id:n,weight:i,src:r,getFn:a}}function x(e){return s(e)?e:e.split(".")}function v(e){return s(e)?e.join("."):e}var M={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...{useExtendedSearch:!1,getFn:function(e,t){let n=[],r=!1;const l=(e,t,u)=>{if(h(e))if(t[u]){const d=e[t[u]];if(!h(d))return;if(u===t.length-1&&(o(d)||a(d)||c(d)))n.push(i(d));else if(s(d)){r=!0;for(let e=0,n=d.length;e<n;e+=1)l(d[e],t,u+1)}else t.length&&l(d,t,u+1)}else n.push(e)};return l(e,o(t)?t.split("."):t,0),r?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1}};const b=/[^ ]+/g;class k{constructor({getFn:e=M.getFn,fieldNormWeight:t=M.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,s=Math.pow(10,t);return{get(t){const r=t.match(b).length;if(n.has(r))return n.get(r);const i=1/Math.pow(r,.5*e),o=parseFloat(Math.round(i*s)/s);return n.set(r,o),o},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,o(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();o(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!h(e)||u(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,r)=>{let i=t.getFn?t.getFn(e):this.getFn(e,t.path);if(h(i))if(s(i)){let e=[];const t=[{nestedArrIndex:-1,value:i}];for(;t.length;){const{nestedArrIndex:n,value:r}=t.pop();if(h(r))if(o(r)&&!u(r)){let t={v:r,i:n,n:this.norm.get(r)};e.push(t)}else s(r)&&r.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[r]=e}else if(o(i)&&!u(i)){let e={v:i,n:this.norm.get(i)};n.$[r]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function _(e,t,{getFn:n=M.getFn,fieldNormWeight:s=M.fieldNormWeight}={}){const r=new k({getFn:n,fieldNormWeight:s});return r.setKeys(e.map(y)),r.setSources(t),r.create(),r}function C(e,{errors:t=0,currentLocation:n=0,expectedLocation:s=0,distance:r=M.distance,ignoreLocation:i=M.ignoreLocation}={}){const o=t/e.length;if(i)return o;const a=Math.abs(s-n);return r?o+a/r:a?1:o}const j=32;function S(e,t,n,{location:s=M.location,distance:r=M.distance,threshold:i=M.threshold,findAllMatches:o=M.findAllMatches,minMatchCharLength:a=M.minMatchCharLength,includeMatches:c=M.includeMatches,ignoreLocation:l=M.ignoreLocation}={}){if(t.length>j)throw new Error(`Pattern length exceeds max of ${j}.`);const h=t.length,u=e.length,d=Math.max(0,Math.min(s,u));let f=i,p=d;const g=a>1||c,m=g?Array(u):[];let y;for(;(y=e.indexOf(t,p))>-1;){let e=C(t,{currentLocation:y,expectedLocation:d,distance:r,ignoreLocation:l});if(f=Math.min(e,f),p=y+h,g){let e=0;for(;e<h;)m[y+e]=1,e+=1}}p=-1;let x=[],v=1,b=h+u;const k=1<<h-1;for(let M=0;M<h;M+=1){let s=0,i=b;for(;s<i;){C(t,{errors:M,currentLocation:d+i,expectedLocation:d,distance:r,ignoreLocation:l})<=f?s=i:b=i,i=Math.floor((b-s)/2+s)}b=i;let a=Math.max(1,d-i+1),c=o?u:Math.min(d+i,u)+h,y=Array(c+2);y[c+1]=(1<<M)-1;for(let o=c;o>=a;o-=1){let s=o-1,i=n[e.charAt(s)];if(g&&(m[s]=+!!i),y[o]=(y[o+1]<<1|1)&i,M&&(y[o]|=(x[o+1]|x[o])<<1|1|x[o+1]),y[o]&k&&(v=C(t,{errors:M,currentLocation:s,expectedLocation:d,distance:r,ignoreLocation:l}),v<=f)){if(f=v,p=s,p<=d)break;a=Math.max(1,2*d-p)}}if(C(t,{errors:M+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:l})>f)break;x=y}const _={isMatch:p>=0,score:Math.max(.001,v)};if(g){const e=function(e=[],t=M.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let o=e.length;i<o;i+=1){let o=e[i];o&&-1===s?s=i:o||-1===s||(r=i-1,r-s+1>=t&&n.push([s,r]),s=-1)}return e[i-1]&&i-s>=t&&n.push([s,i-1]),n}(m,a);e.length?c&&(_.indices=e):_.isMatch=!1}return _}function I(e){let t={};for(let n=0,s=e.length;n<s;n+=1){const r=e.charAt(n);t[r]=(t[r]||0)|1<<s-n-1}return t}class w{constructor(e,{location:t=M.location,threshold:n=M.threshold,distance:s=M.distance,includeMatches:r=M.includeMatches,findAllMatches:i=M.findAllMatches,minMatchCharLength:o=M.minMatchCharLength,isCaseSensitive:a=M.isCaseSensitive,ignoreLocation:c=M.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:c},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(e,t)=>{this.chunks.push({pattern:e,alphabet:I(e),startIndex:t})},h=this.pattern.length;if(h>j){let e=0;const t=h%j,n=h-t;for(;e<n;)l(this.pattern.substr(e,j),e),e+=j;if(t){const e=h-j;l(this.pattern.substr(e),e)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:s,distance:r,threshold:i,findAllMatches:o,minMatchCharLength:a,ignoreLocation:c}=this.options;let l=[],h=0,u=!1;this.chunks.forEach((({pattern:t,alphabet:d,startIndex:f})=>{const{isMatch:p,score:g,indices:m}=S(e,t,d,{location:s+f,distance:r,threshold:i,findAllMatches:o,minMatchCharLength:a,includeMatches:n,ignoreLocation:c});p&&(u=!0),h+=g,p&&m&&(l=[...l,...m])}));let d={isMatch:u,score:u?h/this.chunks.length:1};return u&&n&&(d.indices=l),d}}class E{constructor(e){this.pattern=e}static isMultiMatch(e){return L(e,this.multiRegex)}static isSingleMatch(e){return L(e,this.singleRegex)}search(){}}function L(e,t){const n=e.match(t);return n?n[1]:null}class R extends E{constructor(e,{location:t=M.location,threshold:n=M.threshold,distance:s=M.distance,includeMatches:r=M.includeMatches,findAllMatches:i=M.findAllMatches,minMatchCharLength:o=M.minMatchCharLength,isCaseSensitive:a=M.isCaseSensitive,ignoreLocation:c=M.ignoreLocation}={}){super(e),this._bitapSearch=new w(e,{location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class N extends E{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const s=[],r=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+r,s.push([t,n-1]);const i=!!s.length;return{isMatch:i,score:i?0:1,indices:s}}}const F=[class extends E{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},N,class extends E{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends E{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends E{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends E{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends E{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},R],O=F.length,A=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;const $=new Set([R.type,N.type]);class P{constructor(e,{isCaseSensitive:t=M.isCaseSensitive,includeMatches:n=M.includeMatches,minMatchCharLength:s=M.minMatchCharLength,ignoreLocation:r=M.ignoreLocation,findAllMatches:i=M.findAllMatches,location:o=M.location,threshold:a=M.threshold,distance:c=M.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:i,ignoreLocation:r,location:o,threshold:a,distance:c},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(A).filter((e=>e&&!!e.trim())),s=[];for(let r=0,i=n.length;r<i;r+=1){const e=n[r];let i=!1,o=-1;for(;!i&&++o<O;){const n=F[o];let r=n.isMultiMatch(e);r&&(s.push(new n(r,t)),i=!0)}if(!i)for(o=-1;++o<O;){const n=F[o];let r=n.isSingleMatch(e);if(r){s.push(new n(r,t));break}}}return s}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let r=0,i=[],o=0;for(let a=0,c=t.length;a<c;a+=1){const s=t[a];i.length=0,r=0;for(let t=0,a=s.length;t<a;t+=1){const a=s[t],{isMatch:c,indices:l,score:h}=a.search(e);if(!c){o=0,r=0,i.length=0;break}if(r+=1,o+=h,n){const e=a.constructor.type;$.has(e)?i=[...i,...l]:i.push(l)}}if(r){let e={isMatch:!0,score:o/r};return n&&(e.indices=i),e}}return{isMatch:!1,score:1}}}const W=[];function q(e,t){for(let n=0,s=W.length;n<s;n+=1){let s=W[n];if(s.condition(e,t))return new s(e,t)}return new w(e,t)}const T="$and",z="$or",K="$path",D="$val",B=e=>!(!e[T]&&!e[z]),G=e=>({[T]:Object.keys(e).map((t=>({[t]:e[t]})))});function Z(e,t,{auto:n=!0}={}){const r=e=>{let i=Object.keys(e);const a=(e=>!!e[K])(e);if(!a&&i.length>1&&!B(e))return r(G(e));if((e=>!s(e)&&l(e)&&!B(e))(e)){const s=a?e[K]:i[0],r=a?e[D]:e[s];if(!o(r))throw new Error((e=>`Invalid value for key ${e}`)(s));const c={keyId:v(s),pattern:r};return n&&(c.searcher=q(r,t)),c}let c={children:[],operator:i[0]};return i.forEach((t=>{const n=e[t];s(n)&&n.forEach((e=>{c.children.push(r(e))}))})),c};return B(e)||(e=G(e)),r(e)}function H(e,t){const n=e.matches;t.matches=[],h(n)&&n.forEach((e=>{if(!h(e.indices)||!e.indices.length)return;const{indices:n,value:s}=e;let r={indices:n,value:s};e.key&&(r.key=e.key.src),e.idx>-1&&(r.refIndex=e.idx),t.matches.push(r)}))}function J(e,t){t.score=e.score}class Q{constructor(e,t={},n){this.options={...M,...t},this.options.useExtendedSearch,this._keyStore=new m(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof k))throw new Error("Incorrect 'index' type");this._myIndex=t||_(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){h(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:r,sortFn:i,ignoreFieldNorm:c}=this.options;let l=o(e)?o(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=M.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:s,score:r})=>{const i=e?e.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(t?1:s))})),e.score=n}))}(l,{ignoreFieldNorm:c}),r&&l.sort(i),a(t)&&t>-1&&(l=l.slice(0,t)),function(e,t,{includeMatches:n=M.includeMatches,includeScore:s=M.includeScore}={}){const r=[];return n&&r.push(H),s&&r.push(J),e.map((e=>{const{idx:n}=e,s={item:t[n],refIndex:n};return r.length&&r.forEach((t=>{t(e,s)})),s}))}(l,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){const t=q(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:e,i:n,n:r})=>{if(!h(e))return;const{isMatch:i,score:o,indices:a}=t.searchIn(e);i&&s.push({item:e,idx:n,matches:[{score:o,value:e,norm:r,indices:a}]})})),s}_searchLogical(e){const t=Z(e,this.options),n=(e,t,s)=>{if(!e.children){const{keyId:n,searcher:r}=e,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:r});return i&&i.length?[{idx:s,item:t,matches:i}]:[]}const r=[];for(let i=0,o=e.children.length;i<o;i+=1){const o=e.children[i],a=n(o,t,s);if(a.length)r.push(...a);else if(e.operator===T)return[]}return r},s=this._myIndex.records,r={},i=[];return s.forEach((({$:e,i:s})=>{if(h(e)){let o=n(t,e,s);o.length&&(r[s]||(r[s]={idx:s,item:e,matches:[]},i.push(r[s])),o.forEach((({matches:e})=>{r[s].matches.push(...e)})))}})),i}_searchObjectList(e){const t=q(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:e,i:s})=>{if(!h(e))return;let i=[];n.forEach(((n,s)=>{i.push(...this._findMatches({key:n,value:e[s],searcher:t}))})),i.length&&r.push({idx:s,item:e,matches:i})})),r}_findMatches({key:e,value:t,searcher:n}){if(!h(t))return[];let r=[];if(s(t))t.forEach((({v:t,i:s,n:i})=>{if(!h(t))return;const{isMatch:o,score:a,indices:c}=n.searchIn(t);o&&r.push({score:a,key:e,value:t,idx:s,norm:i,indices:c})}));else{const{v:s,n:i}=t,{isMatch:o,score:a,indices:c}=n.searchIn(s);o&&r.push({score:a,key:e,value:s,norm:i,indices:c})}return r}}Q.version="6.6.2",Q.createIndex=_,Q.parseIndex=function(e,{getFn:t=M.getFn,fieldNormWeight:n=M.fieldNormWeight}={}){const{keys:s,records:r}=e,i=new k({getFn:t,fieldNormWeight:n});return i.setKeys(s),i.setIndexRecords(r),i},Q.config=M,Q.parseQuery=Z,function(...e){W.push(...e)}(P)},1298:function(e,t,n){n.r(t),n.d(t,{Head:function(){return he},default:function(){return ue}});var s=n(5785),r=n(4361),i=n(9555),o=n(2338),a=n(3717),c=n(7747),l=n(2757),h=n(1293),u=n(2883),d=n(9653),f=n(5227),p=n(2495),g=n(6554),m=n(7440),y=n(3179),x=n(8702),v=n(5432),M=n(7052),b=n(7294),k=n(5893),[_,C]=(0,f.k)({name:"InputGroupStylesContext",errorMessage:"useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<InputGroup />\" "}),j=(0,g.G)((function(e,t){const n=(0,m.jC)("Input",e),{children:s,className:r,...i}=(0,y.Lr)(e),o=(0,v.cx)("chakra-input__group",r),a={},c=(0,p.W)(s),l=n.field;c.forEach((e=>{var t,s;n&&(l&&"InputLeftElement"===e.type.id&&(a.paddingStart=null!=(t=l.height)?t:l.h),l&&"InputRightElement"===e.type.id&&(a.paddingEnd=null!=(s=l.height)?s:l.h),"InputRightAddon"===e.type.id&&(a.borderEndRadius=0),"InputLeftAddon"===e.type.id&&(a.borderStartRadius=0))}));const h=c.map((t=>{var n,s;const r=(0,M.o)({size:(null==(n=t.props)?void 0:n.size)||e.size,variant:(null==(s=t.props)?void 0:s.variant)||e.variant});return"Input"!==t.type.id?(0,b.cloneElement)(t,r):(0,b.cloneElement)(t,Object.assign(r,a,t.props))}));return(0,k.jsx)(x.m.div,{className:o,ref:t,__css:{width:"100%",display:"flex",position:"relative",isolation:"isolate",...n.group},"data-group":!0,...i,children:(0,k.jsx)(_,{value:n,children:h})})}));j.displayName="InputGroup";var S=(0,x.m)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0",zIndex:2}}),I=(0,g.G)((function(e,t){var n,s;const{placement:r="left",...i}=e,o=C(),a=o.field,c={["left"===r?"insetStart":"insetEnd"]:"0",width:null!=(n=null==a?void 0:a.height)?n:null==a?void 0:a.h,height:null!=(s=null==a?void 0:a.height)?s:null==a?void 0:a.h,fontSize:null==a?void 0:a.fontSize,...o.element};return(0,k.jsx)(S,{ref:t,__css:c,...i})}));I.id="InputElement",I.displayName="InputElement";var w=(0,g.G)((function(e,t){const{className:n,...s}=e,r=(0,v.cx)("chakra-input__left-element",n);return(0,k.jsx)(I,{ref:t,placement:"left",className:r,...s})}));w.id="InputLeftElement",w.displayName="InputLeftElement";var E=(0,g.G)((function(e,t){const{className:n,...s}=e,r=(0,v.cx)("chakra-input__right-element",n);return(0,k.jsx)(I,{ref:t,placement:"right",className:r,...s})}));E.id="InputRightElement",E.displayName="InputRightElement";var L=n(1103),[R,N]=(0,f.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[F,O]=(0,f.k)({strict:!1,name:"FormControlContext"});function A(e){const{isDisabled:t,isInvalid:n,isReadOnly:s,isRequired:r,...i}=function(e){var t,n,s;const r=O(),{id:i,disabled:o,readOnly:a,required:c,isRequired:l,isInvalid:h,isReadOnly:u,isDisabled:d,onFocus:f,onBlur:p,...g}=e,m=e["aria-describedby"]?[e["aria-describedby"]]:[];(null==r?void 0:r.hasFeedbackText)&&(null==r?void 0:r.isInvalid)&&m.push(r.feedbackId);(null==r?void 0:r.hasHelpText)&&m.push(r.helpTextId);return{...g,"aria-describedby":m.join(" ")||void 0,id:null!=i?i:null==r?void 0:r.id,isDisabled:null!=(t=null!=o?o:d)?t:null==r?void 0:r.isDisabled,isReadOnly:null!=(n=null!=a?a:u)?n:null==r?void 0:r.isReadOnly,isRequired:null!=(s=null!=c?c:l)?s:null==r?void 0:r.isRequired,isInvalid:null!=h?h:null==r?void 0:r.isInvalid,onFocus:(0,v.v0)(null==r?void 0:r.onFocus,f),onBlur:(0,v.v0)(null==r?void 0:r.onBlur,p)}}(e);return{...i,disabled:t,readOnly:s,required:r,"aria-invalid":(0,v.Qm)(n),"aria-required":(0,v.Qm)(r),"aria-readonly":(0,v.Qm)(s)}}(0,g.G)((function(e,t){const n=(0,m.jC)("Form",e),s=(0,y.Lr)(e),{getRootProps:r,htmlProps:i,...o}=function(e){const{id:t,isRequired:n,isInvalid:s,isDisabled:r,isReadOnly:i,...o}=e,a=(0,b.useId)(),c=t||`field-${a}`,l=`${c}-label`,h=`${c}-feedback`,u=`${c}-helptext`,[d,f]=(0,b.useState)(!1),[p,g]=(0,b.useState)(!1),[m,y]=(0,b.useState)(!1),x=(0,b.useCallback)(((e={},t=null)=>({id:u,...e,ref:(0,L.lq)(t,(e=>{e&&g(!0)}))})),[u]),M=(0,b.useCallback)(((e={},t=null)=>({...e,ref:t,"data-focus":(0,v.PB)(m),"data-disabled":(0,v.PB)(r),"data-invalid":(0,v.PB)(s),"data-readonly":(0,v.PB)(i),id:void 0!==e.id?e.id:l,htmlFor:void 0!==e.htmlFor?e.htmlFor:c})),[c,r,m,s,i,l]),k=(0,b.useCallback)(((e={},t=null)=>({id:h,...e,ref:(0,L.lq)(t,(e=>{e&&f(!0)})),"aria-live":"polite"})),[h]),_=(0,b.useCallback)(((e={},t=null)=>({...e,...o,ref:t,role:"group"})),[o]),C=(0,b.useCallback)(((e={},t=null)=>({...e,ref:t,role:"presentation","aria-hidden":!0,children:e.children||"*"})),[]);return{isRequired:!!n,isInvalid:!!s,isReadOnly:!!i,isDisabled:!!r,isFocused:!!m,onFocus:()=>y(!0),onBlur:()=>y(!1),hasFeedbackText:d,setHasFeedbackText:f,hasHelpText:p,setHasHelpText:g,id:c,labelId:l,feedbackId:h,helpTextId:u,htmlProps:o,getHelpTextProps:x,getErrorMessageProps:k,getRootProps:_,getLabelProps:M,getRequiredIndicatorProps:C}}(s),a=(0,v.cx)("chakra-form-control",e.className);return(0,k.jsx)(F,{value:o,children:(0,k.jsx)(R,{value:n,children:(0,k.jsx)(x.m.div,{...r({},t),className:a,__css:n.container})})})})).displayName="FormControl",(0,g.G)((function(e,t){const n=O(),s=N(),r=(0,v.cx)("chakra-form__helper-text",e.className);return(0,k.jsx)(x.m.div,{...null==n?void 0:n.getHelpTextProps(e,t),__css:s.helperText,className:r})})).displayName="FormHelperText";var $=(0,g.G)((function(e,t){const{htmlSize:n,...s}=e,r=(0,m.jC)("Input",s),i=A((0,y.Lr)(s)),o=(0,v.cx)("chakra-input",e.className);return(0,k.jsx)(x.m.input,{size:n,...i,__css:r.field,ref:t,className:o})}));$.displayName="Input",$.id="Input";var P=n(3366),W=n(7462),q=n(7326),T=n(4578),z=n(9864),K=n(8679),D=n.n(K);function B(e,t){if(!e){var n=new Error("loadable: "+t);throw n.framesToPop=1,n.name="Invariant Violation",n}}var G=b.createContext();var Z={initialChunks:{}},H="PENDING",J="REJECTED";var Q=function(e){return e};function V(e){var t=e.defaultResolveComponent,n=void 0===t?Q:t,s=e.render,r=e.onLoad;function i(e,t){void 0===t&&(t={});var i=function(e){return"function"==typeof e?{requireAsync:e,resolve:function(){},chunkName:function(){}}:e}(e),o={};function a(e){return t.cacheKey?t.cacheKey(e):i.resolve?i.resolve(e):"static"}function c(e,s,r){var i=t.resolveComponent?t.resolveComponent(e,s):n(e);if(t.resolveComponent&&!(0,z.isValidElementType)(i))throw new Error("resolveComponent returned something that is not a React component!");return D()(r,i,{preload:!0}),i}var l,h,u=function(e){var t=a(e),n=o[t];return n&&n.status!==J||((n=i.requireAsync(e)).status=H,o[t]=n,n.then((function(){n.status="RESOLVED"}),(function(t){console.error("loadable-components: failed to asynchronously load component",{fileName:i.resolve(e),chunkName:i.chunkName(e),error:t?t.message:t}),n.status=J}))),n},d=function(e){function n(n){var s;return(s=e.call(this,n)||this).state={result:null,error:null,loading:!0,cacheKey:a(n)},B(!n.__chunkExtractor||i.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),n.__chunkExtractor?(!1===t.ssr||(i.requireAsync(n).catch((function(){return null})),s.loadSync(),n.__chunkExtractor.addChunk(i.chunkName(n))),(0,q.Z)(s)):(!1!==t.ssr&&(i.isReady&&i.isReady(n)||i.chunkName&&Z.initialChunks[i.chunkName(n)])&&s.loadSync(),s)}(0,T.Z)(n,e),n.getDerivedStateFromProps=function(e,t){var n=a(e);return(0,W.Z)({},t,{cacheKey:n,loading:t.loading||t.cacheKey!==n})};var l=n.prototype;return l.componentDidMount=function(){this.mounted=!0;var e=this.getCache();e&&e.status===J&&this.setCache(),this.state.loading&&this.loadAsync()},l.componentDidUpdate=function(e,t){t.cacheKey!==this.state.cacheKey&&this.loadAsync()},l.componentWillUnmount=function(){this.mounted=!1},l.safeSetState=function(e,t){this.mounted&&this.setState(e,t)},l.getCacheKey=function(){return a(this.props)},l.getCache=function(){return o[this.getCacheKey()]},l.setCache=function(e){void 0===e&&(e=void 0),o[this.getCacheKey()]=e},l.triggerOnLoad=function(){var e=this;r&&setTimeout((function(){r(e.state.result,e.props)}))},l.loadSync=function(){if(this.state.loading)try{var e=c(i.requireSync(this.props),this.props,p);this.state.result=e,this.state.loading=!1}catch(t){console.error("loadable-components: failed to synchronously load component, which expected to be available",{fileName:i.resolve(this.props),chunkName:i.chunkName(this.props),error:t?t.message:t}),this.state.error=t}},l.loadAsync=function(){var e=this,t=this.resolveAsync();return t.then((function(t){var n=c(t,e.props,p);e.safeSetState({result:n,loading:!1},(function(){return e.triggerOnLoad()}))})).catch((function(t){return e.safeSetState({error:t,loading:!1})})),t},l.resolveAsync=function(){var e=this.props,t=(e.__chunkExtractor,e.forwardedRef,(0,P.Z)(e,["__chunkExtractor","forwardedRef"]));return u(t)},l.render=function(){var e=this.props,n=e.forwardedRef,r=e.fallback,i=(e.__chunkExtractor,(0,P.Z)(e,["forwardedRef","fallback","__chunkExtractor"])),o=this.state,a=o.error,c=o.loading,l=o.result;if(t.suspense&&(this.getCache()||this.loadAsync()).status===H)throw this.loadAsync();if(a)throw a;var h=r||t.fallback||null;return c?h:s({fallback:h,result:l,options:t,props:(0,W.Z)({},i,{ref:n})})},n}(b.Component),f=(h=function(e){return b.createElement(G.Consumer,null,(function(t){return b.createElement(l,Object.assign({__chunkExtractor:t},e))}))},(l=d).displayName&&(h.displayName=l.displayName+"WithChunkExtractor"),h),p=b.forwardRef((function(e,t){return b.createElement(f,Object.assign({forwardedRef:t},e))}));return p.displayName="Loadable",p.preload=function(e){p.load(e)},p.load=function(e){return u(e)},p}return{loadable:i,lazy:function(e,t){return i(e,(0,W.Z)({},t,{suspense:!0}))}}}var U=V({defaultResolveComponent:function(e){return e.__esModule?e.default:e.default||e},render:function(e){var t=e.result,n=e.props;return b.createElement(t,n)}}),X=U.loadable,Y=U.lazy,ee=V({onLoad:function(e,t){e&&t.forwardedRef&&("function"==typeof t.forwardedRef?t.forwardedRef(e):t.forwardedRef.current=e)},render:function(e){var t=e.result,n=e.props;return n.children?n.children(t):null}}),te=ee.loadable,ne=ee.lazy;var se=X;se.lib=te,Y.lib=ne;var re=se,ie=n(9053),oe=n(9605),ae=n(3055),ce=n(9126);const le=re((async()=>n.e(485).then(n.bind(n,7485))),{fallback:(0,k.jsx)(ae.Dl,{})});const he=e=>{let{data:t}=e;const n=""+t.site.siteMetadata.siteUrl+oe.Z;return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("html",{lang:"en"}),(0,k.jsx)("title",{children:t.site.siteMetadata.title}),(0,k.jsx)("meta",{name:"description",content:t.site.siteMetadata.description}),(0,k.jsx)("meta",{property:"og:title",content:t.site.siteMetadata.title}),(0,k.jsx)("meta",{property:"og:description",content:t.site.siteMetadata.description}),(0,k.jsx)("meta",{property:"og:type",content:"website"}),(0,k.jsx)("meta",{name:"og:image",content:n}),(0,k.jsx)("meta",{name:"og:image:width",content:"1200"}),(0,k.jsx)("meta",{name:"og:image:height",content:"630"}),(0,k.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,k.jsx)("meta",{name:"twitter:creator",content:t.site.siteMetadata.author}),(0,k.jsx)("meta",{name:"twitter:title",content:t.site.siteMetadata.title}),(0,k.jsx)("meta",{name:"twitter:description",content:t.site.siteMetadata.description}),(0,k.jsx)("meta",{name:"twitter:image",content:n})]})};var ue=e=>{let{data:t}=e;const{0:n,1:f}=(0,b.useState)(""),p=(0,ie.useGatsbyPluginFusejs)(n,t.fusejs,{threshold:.3}),{snaps:g}=(0,ce.JD)(),{0:m,1:y}=(0,b.useState)(Object.keys(ae.xK)),x=(0,ce.j)(),v=(0,b.useMemo)((()=>function(e){let{snaps:t,categories:n,searchQuery:s,searchResults:r,installedSnaps:i}=e;const o=t.sort(((e,t)=>{const n=Boolean(i[e.snapId]),s=Boolean(i[t.snapId]);return Number(s)-Number(n)})),a=s.length>0?r.map((e=>o.find((t=>{let{snapId:n}=t;return e.item.snapId===n})))).filter(Boolean):o;return 0===n.length||n.length===Object.keys(ae.pN).length?a:a.filter((e=>n.includes(null==e?void 0:e.category)))}({snaps:x,categories:m,searchQuery:n,searchResults:p,installedSnaps:g})),[x,g,m,n,p]);return(0,k.jsxs)(o.W,{maxWidth:"container.xl",paddingTop:"0",marginTop:{base:4,md:20},children:[(0,k.jsxs)(a.k,{direction:["column",null,"row"],justifyContent:"space-between",marginBottom:{base:4,md:6},gap:"4",children:[(0,k.jsxs)(c.xu,{maxWidth:"500px",width:"100%",children:[(0,k.jsx)(l.X,{as:"h2",fontSize:"2xl",marginBottom:"1",children:(0,k.jsx)(r.cC,{id:"Zz9JdM"})}),(0,k.jsx)(h.x,{children:(0,k.jsx)(r.cC,{id:"xEHOF6",components:{0:(0,k.jsx)(u.r,{href:"https://metamask.io/snaps/",isExternal:!0}),1:(0,k.jsx)(u.r,{href:"https://support.metamask.io/hc/en-us/articles/18245938714395",isExternal:!0})}})})]}),(0,k.jsxs)(d.K,{direction:"row",maxWidth:["100%",null,"400px"],width:"100%",marginTop:"auto",children:[(0,k.jsx)(ae.MD,{selectedCategories:m,onToggle:e=>m.includes(e)?y(m.filter((t=>t!==e))):y([].concat((0,s.Z)(m),[e]))}),(0,k.jsxs)(j,{background:"white",borderRadius:"full",children:[(0,k.jsx)(w,{pointerEvents:"none",children:(0,k.jsx)(ae.JO,{icon:"search",width:"20px"})}),(0,k.jsx)($,{type:"search",borderRadius:"full",placeholder:i.ag._({id:"TxmrEa"}),value:n,onChange:e=>{f(e.target.value)}})]})]})]}),(0,k.jsx)(c.xu,{children:(0,k.jsx)(le,{snaps:v})})]})}},9605:function(e,t,n){t.Z=n.p+"static/home-3da7273f125d0f7c0add3b849d33e152.png"},9053:function(e,t,n){var s,r=Object.create,i=Object.defineProperty,o=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,c=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,h=(e,t,n,s)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let r of a(t))l.call(e,r)||r===n||i(e,r,{get:()=>t[r],enumerable:!(s=o(t,r))||s.enumerable});return e},u={};((e,t)=>{for(var n in t)i(e,n,{get:t[n],enumerable:!0})})(u,{default:()=>m,useFusejs:()=>p,useGatsbyPluginFusejs:()=>g}),e.exports=(s=u,h(i({},"__esModule",{value:!0}),s));var d=((e,t,n)=>(n=null!=e?r(c(e)):{},h(!t&&e&&e.__esModule?n:i(n,"default",{value:e,enumerable:!0}),e)))(n(4221)),f=n(7294);function p(e,t,n,s,r,i){const[o,a]=(0,f.useState)(null);return(0,f.useEffect)((()=>{if(!t||!n)return void a(null);const e=new d.default(t,s,d.default.parseIndex(n,r));a(e)}),[t,n]),(0,f.useMemo)((()=>e&&o&&o?.search(e,i)||[]),[e,o])}function g(e,t,n,s,r){const[i,o]=(0,f.useState)(null);return(0,f.useEffect)((()=>{if(!t?.data||!t?.index)return void o(null);const e=new d.default(t.data,n,d.default.parseIndex(JSON.parse(t.index),s));o(e)}),[t]),(0,f.useMemo)((()=>e&&i&&i?.search(e,r)||[]),[e,i])}var m=p}}]);
//# sourceMappingURL=component---src-pages-index-tsx-b7bb9017775e42b36f4a.js.map