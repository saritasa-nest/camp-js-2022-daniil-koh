/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr=function(t){const e=[];let i=0;for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);s<128?e[i++]=s:s<2048?(e[i++]=s>>6|192,e[i++]=s&63|128):(s&64512)==55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)==56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++n)&1023),e[i++]=s>>18|240,e[i++]=s>>12&63|128,e[i++]=s>>6&63|128,e[i++]=s&63|128):(e[i++]=s>>12|224,e[i++]=s>>6&63|128,e[i++]=s&63|128)}return e},Rr=function(t){const e=[];let i=0,n=0;for(;i<t.length;){const s=t[i++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[i++];e[n++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[i++],o=t[i++],a=t[i++],h=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[n++]=String.fromCharCode(55296+(h>>10)),e[n++]=String.fromCharCode(56320+(h&1023))}else{const r=t[i++],o=t[i++];e[n++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},kr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const i=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,h=s+2<t.length,c=h?t[s+2]:0,f=r>>2,g=(r&3)<<4|a>>4;let y=(a&15)<<2|c>>6,R=c&63;h||(R=64,o||(y=64)),n.push(i[f],i[g],i[y],i[R])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Sr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Rr(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const i=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<t.length;){const r=i[t.charAt(s++)],a=s<t.length?i[t.charAt(s)]:0;++s;const c=s<t.length?i[t.charAt(s)]:64;++s;const g=s<t.length?i[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||g==null)throw Error();const y=r<<2|a>>4;if(n.push(y),c!==64){const R=a<<4&240|c>>2;if(n.push(R),g!==64){const D=c<<6&192|g;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Or=function(t){try{return kr.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}wrapCallback(e){return(i,n)=>{i?this.reject(i):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(i):e(i,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Cr(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(A())}function Nr(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Dr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pr(){const t=A();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr="FirebaseError";class oe extends Error{constructor(e,i,n){super(i);this.code=e,this.customData=n,this.name=Lr,Object.setPrototypeOf(this,oe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_e.prototype.create)}}class _e{constructor(e,i,n){this.service=e,this.serviceName=i,this.errors=n}create(e,...i){const n=i[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Mr(r,n):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new oe(s,a,n)}}function Mr(t,e){return t.replace(Ur,(i,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Ur=/\{\$([^}]+)}/g;function Fr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ye(t,e){if(t===e)return!0;const i=Object.keys(t),n=Object.keys(e);for(const s of i){if(!n.includes(s))return!1;const r=t[s],o=e[s];if(fn(r)&&fn(o)){if(!Ye(r,o))return!1}else if(r!==o)return!1}for(const s of n)if(!i.includes(s))return!1;return!0}function fn(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(t){const e=[];for(const[i,n]of Object.entries(t))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(i)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(i)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Ee(t){const e={};return t.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,r]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function Te(t){const e=t.indexOf("?");if(!e)return"";const i=t.indexOf("#",e);return t.substring(e,i>0?i:void 0)}function xr(t,e){const i=new jr(t,e);return i.subscribe.bind(i)}class jr{constructor(e,i){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=i,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(i=>{i.next(e)})}error(e){this.forEachObserver(i=>{i.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,i,n){let s;if(e===void 0&&i===void 0&&n===void 0)throw new Error("Missing Observer.");$r(e,["next","error","complete"])?s=e:s={next:e,error:i,complete:n},s.next===void 0&&(s.next=Bt),s.error===void 0&&(s.error=Bt),s.complete===void 0&&(s.complete=Bt);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let i=0;i<this.observers.length;i++)this.sendOne(i,e)}sendOne(e,i){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{i(this.observers[e])}catch(n){typeof console!="undefined"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $r(t,e){if(typeof t!="object"||t===null)return!1;for(const i of e)if(i in t&&typeof t[i]=="function")return!0;return!1}function Bt(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(t){return t&&t._delegate?t._delegate:t}class ae{constructor(e,i,n){this.name=e,this.instanceFactory=i,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,i){this.name=e,this.container=i,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const i=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(i)){const n=new br;if(this.instancesDeferred.set(i,n),this.isInitialized(i)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:i});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(i).promise}getImmediate(e){var i;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(i=e==null?void 0:e.optional)!==null&&i!==void 0?i:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Vr(e))try{this.getOrInitializeService({instanceIdentifier:Q})}catch{}for(const[i,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(i);try{const r=this.getOrInitializeService({instanceIdentifier:s});n.resolve(r)}catch{}}}}clearInstance(e=Q){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(i=>"INTERNAL"in i).map(i=>i.INTERNAL.delete()),...e.filter(i=>"_delete"in i).map(i=>i._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Q){return this.instances.has(e)}getOptions(e=Q){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:i={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:i});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);n===a&&o.resolve(s)}return s}onInit(e,i){var n;const s=this.normalizeInstanceIdentifier(i),r=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,i){const n=this.onInitCallbacks.get(i);if(!!n)for(const s of n)try{s(e,i)}catch{}}getOrInitializeService({instanceIdentifier:e,options:i={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Br(e),options:i}),this.instances.set(e,n),this.instancesOptions.set(e,i),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Q){return this.component?this.component.multipleInstances?e:Q:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Br(t){return t===Q?void 0:t}function Vr(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const i=this.getProvider(e.name);if(i.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);i.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const i=new Hr(e,this);return this.providers.set(e,i),i}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var m;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(m||(m={}));const Wr={debug:m.DEBUG,verbose:m.VERBOSE,info:m.INFO,warn:m.WARN,error:m.ERROR,silent:m.SILENT},Gr=m.INFO,Kr={[m.DEBUG]:"log",[m.VERBOSE]:"log",[m.INFO]:"info",[m.WARN]:"warn",[m.ERROR]:"error"},qr=(t,e,...i)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),s=Kr[e];if(s)console[s](`[${n}]  ${t.name}:`,...i);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Vt{constructor(e){this.name=e,this._logLevel=Gr,this._logHandler=qr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in m))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,m.DEBUG,...e),this._logHandler(this,m.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,m.VERBOSE,...e),this._logHandler(this,m.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,m.INFO,...e),this._logHandler(this,m.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,m.WARN,...e),this._logHandler(this,m.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,m.ERROR,...e),this._logHandler(this,m.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(i=>{if(Jr(i)){const n=i.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(i=>i).join(" ")}}function Jr(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const zt="@firebase/app",pn="0.7.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt=new Vt("@firebase/app"),Yr="@firebase/app-compat",Qr="@firebase/analytics-compat",Zr="@firebase/analytics",eo="@firebase/app-check-compat",to="@firebase/app-check",io="@firebase/auth",no="@firebase/auth-compat",so="@firebase/database",ro="@firebase/database-compat",oo="@firebase/functions",ao="@firebase/functions-compat",ho="@firebase/installations",co="@firebase/installations-compat",lo="@firebase/messaging",uo="@firebase/messaging-compat",fo="@firebase/performance",po="@firebase/performance-compat",go="@firebase/remote-config",mo="@firebase/remote-config-compat",vo="@firebase/storage",yo="@firebase/storage-compat",_o="@firebase/firestore",Io="@firebase/firestore-compat",Eo="firebase",To="9.4.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn="[DEFAULT]",wo={[zt]:"fire-core",[Yr]:"fire-core-compat",[Zr]:"fire-analytics",[Qr]:"fire-analytics-compat",[to]:"fire-app-check",[eo]:"fire-app-check-compat",[io]:"fire-auth",[no]:"fire-auth-compat",[so]:"fire-rtdb",[ro]:"fire-rtdb-compat",[oo]:"fire-fn",[ao]:"fire-fn-compat",[ho]:"fire-iid",[co]:"fire-iid-compat",[lo]:"fire-fcm",[uo]:"fire-fcm-compat",[fo]:"fire-perf",[po]:"fire-perf-compat",[go]:"fire-rc",[mo]:"fire-rc-compat",[vo]:"fire-gcs",[yo]:"fire-gcs-compat",[_o]:"fire-fst",[Io]:"fire-fst-compat","fire-js":"fire-js",[Eo]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Map,Gt=new Map;function Ao(t,e){try{t.container.addComponent(e)}catch(i){Wt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,i)}}function Ae(t){const e=t.name;if(Gt.has(e))return Wt.debug(`There were multiple attempts to register component ${e}.`),!1;Gt.set(e,t);for(const i of Qe.values())Ao(i,t);return!0}function Kt(t,e){return t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function."},Ze=new _e("app","Firebase",So);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,i,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},i),this._name=i.name,this._automaticDataCollectionEnabled=i.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ae("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ze.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se=To;function Uc(t,e={}){typeof e!="object"&&(e={name:e});const i=Object.assign({name:gn,automaticDataCollectionEnabled:!1},e),n=i.name;if(typeof n!="string"||!n)throw Ze.create("bad-app-name",{appName:String(n)});const s=Qe.get(n);if(s){if(Ye(t,s.options)&&Ye(i,s.config))return s;throw Ze.create("duplicate-app",{appName:n})}const r=new zr(n);for(const a of Gt.values())r.addComponent(a);const o=new Ro(t,i,r);return Qe.set(n,o),o}function mn(t=gn){const e=Qe.get(t);if(!e)throw Ze.create("no-app",{appName:t});return e}function V(t,e,i){var n;let s=(n=wo[t])!==null&&n!==void 0?n:t;i&&(s+=`-${i}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Wt.warn(a.join(" "));return}Ae(new ae(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(t){Ae(new ae("platform-logger",e=>new Xr(e),"PRIVATE")),V(zt,pn,t),V(zt,pn,"esm2017"),V("fire-js","")}ko("");var Oo=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},l,qt=qt||{},u=Oo||self;function et(){}function Xt(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function Re(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function bo(t){return Object.prototype.hasOwnProperty.call(t,Jt)&&t[Jt]||(t[Jt]=++Co)}var Jt="closure_uid_"+(1e9*Math.random()>>>0),Co=0;function No(t,e,i){return t.call.apply(t.bind,arguments)}function Do(t,e,i){if(!t)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,n),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function E(t,e,i){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?E=No:E=Do,E.apply(null,arguments)}function tt(t,e){var i=Array.prototype.slice.call(arguments,1);return function(){var n=i.slice();return n.push.apply(n,arguments),t.apply(this,n)}}function T(t,e){function i(){}i.prototype=e.prototype,t.Z=e.prototype,t.prototype=new i,t.prototype.constructor=t,t.Vb=function(n,s,r){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(n,o)}}function z(){this.s=this.s,this.o=this.o}var Po=0,Lo={};z.prototype.s=!1;z.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),Po!=0)){var t=bo(this);delete Lo[t]}};z.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const vn=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let i=0;i<t.length;i++)if(i in t&&t[i]===e)return i;return-1},yn=Array.prototype.forEach?function(t,e,i){Array.prototype.forEach.call(t,e,i)}:function(t,e,i){const n=t.length,s=typeof t=="string"?t.split(""):t;for(let r=0;r<n;r++)r in s&&e.call(i,s[r],r,t)};function Mo(t){e:{var e=Ra;const i=t.length,n=typeof t=="string"?t.split(""):t;for(let s=0;s<i;s++)if(s in n&&e.call(void 0,n[s],s,t)){e=s;break e}e=-1}return 0>e?null:typeof t=="string"?t.charAt(e):t[e]}function _n(t){return Array.prototype.concat.apply([],arguments)}function Yt(t){const e=t.length;if(0<e){const i=Array(e);for(let n=0;n<e;n++)i[n]=t[n];return i}return[]}function it(t){return/^[\s\xa0]*$/.test(t)}var In=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function k(t,e){return t.indexOf(e)!=-1}function Qt(t,e){return t<e?-1:t>e?1:0}var O;e:{var En=u.navigator;if(En){var Tn=En.userAgent;if(Tn){O=Tn;break e}}O=""}function Zt(t,e,i){for(const n in t)e.call(i,t[n],n,t)}function wn(t){const e={};for(const i in t)e[i]=t[i];return e}var An="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Sn(t,e){let i,n;for(let s=1;s<arguments.length;s++){n=arguments[s];for(i in n)t[i]=n[i];for(let r=0;r<An.length;r++)i=An[r],Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}}function ei(t){return ei[" "](t),t}ei[" "]=et;function Uo(t){var e=jo;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var Fo=k(O,"Opera"),ke=k(O,"Trident")||k(O,"MSIE"),Rn=k(O,"Edge"),ti=Rn||ke,kn=k(O,"Gecko")&&!(k(O.toLowerCase(),"webkit")&&!k(O,"Edge"))&&!(k(O,"Trident")||k(O,"MSIE"))&&!k(O,"Edge"),xo=k(O.toLowerCase(),"webkit")&&!k(O,"Edge");function On(){var t=u.document;return t?t.documentMode:void 0}var ii;e:{var ni="",si=function(){var t=O;if(kn)return/rv:([^\);]+)(\)|;)/.exec(t);if(Rn)return/Edge\/([\d\.]+)/.exec(t);if(ke)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(xo)return/WebKit\/(\S+)/.exec(t);if(Fo)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(si&&(ni=si?si[1]:""),ke){var ri=On();if(ri!=null&&ri>parseFloat(ni)){ii=String(ri);break e}}ii=ni}var jo={};function $o(){return Uo(function(){let t=0;const e=In(String(ii)).split("."),i=In("9").split("."),n=Math.max(e.length,i.length);for(let o=0;t==0&&o<n;o++){var s=e[o]||"",r=i[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],s[0].length==0&&r[0].length==0)break;t=Qt(s[1].length==0?0:parseInt(s[1],10),r[1].length==0?0:parseInt(r[1],10))||Qt(s[2].length==0,r[2].length==0)||Qt(s[2],r[2]),s=s[3],r=r[3]}while(t==0)}return 0<=t})}u.document&&ke&&On();var Ho=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{u.addEventListener("test",et,e),u.removeEventListener("test",et,e)}catch{}return t}();function S(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}S.prototype.h=function(){this.defaultPrevented=!0};function Oe(t,e){if(S.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var i=this.type=t.type,n=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(kn){e:{try{ei(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else i=="mouseover"?e=t.fromElement:i=="mouseout"&&(e=t.toElement);this.relatedTarget=e,n?(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Bo[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Oe.Z.h.call(this)}}T(Oe,S);var Bo={2:"touch",3:"pen",4:"mouse"};Oe.prototype.h=function(){Oe.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var be="closure_listenable_"+(1e6*Math.random()|0),Vo=0;function zo(t,e,i,n,s){this.listener=t,this.proxy=null,this.src=e,this.type=i,this.capture=!!n,this.ia=s,this.key=++Vo,this.ca=this.fa=!1}function nt(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function st(t){this.src=t,this.g={},this.h=0}st.prototype.add=function(t,e,i,n,s){var r=t.toString();t=this.g[r],t||(t=this.g[r]=[],this.h++);var o=ai(t,e,n,s);return-1<o?(e=t[o],i||(e.fa=!1)):(e=new zo(e,this.src,r,!!n,s),e.fa=i,t.push(e)),e};function oi(t,e){var i=e.type;if(i in t.g){var n=t.g[i],s=vn(n,e),r;(r=0<=s)&&Array.prototype.splice.call(n,s,1),r&&(nt(e),t.g[i].length==0&&(delete t.g[i],t.h--))}}function ai(t,e,i,n){for(var s=0;s<t.length;++s){var r=t[s];if(!r.ca&&r.listener==e&&r.capture==!!i&&r.ia==n)return s}return-1}var hi="closure_lm_"+(1e6*Math.random()|0),ci={};function bn(t,e,i,n,s){if(n&&n.once)return Nn(t,e,i,n,s);if(Array.isArray(e)){for(var r=0;r<e.length;r++)bn(t,e[r],i,n,s);return null}return i=fi(i),t&&t[be]?t.N(e,i,Re(n)?!!n.capture:!!n,s):Cn(t,e,i,!1,n,s)}function Cn(t,e,i,n,s,r){if(!e)throw Error("Invalid event type");var o=Re(s)?!!s.capture:!!s,a=ui(t);if(a||(t[hi]=a=new st(t)),i=a.add(e,i,n,o,r),i.proxy)return i;if(n=Wo(),i.proxy=n,n.src=t,n.listener=i,t.addEventListener)Ho||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),n,s);else if(t.attachEvent)t.attachEvent(Pn(e.toString()),n);else if(t.addListener&&t.removeListener)t.addListener(n);else throw Error("addEventListener and attachEvent are unavailable.");return i}function Wo(){function t(i){return e.call(t.src,t.listener,i)}var e=Go;return t}function Nn(t,e,i,n,s){if(Array.isArray(e)){for(var r=0;r<e.length;r++)Nn(t,e[r],i,n,s);return null}return i=fi(i),t&&t[be]?t.O(e,i,Re(n)?!!n.capture:!!n,s):Cn(t,e,i,!0,n,s)}function Dn(t,e,i,n,s){if(Array.isArray(e))for(var r=0;r<e.length;r++)Dn(t,e[r],i,n,s);else n=Re(n)?!!n.capture:!!n,i=fi(i),t&&t[be]?(t=t.i,e=String(e).toString(),e in t.g&&(r=t.g[e],i=ai(r,i,n,s),-1<i&&(nt(r[i]),Array.prototype.splice.call(r,i,1),r.length==0&&(delete t.g[e],t.h--)))):t&&(t=ui(t))&&(e=t.g[e.toString()],t=-1,e&&(t=ai(e,i,n,s)),(i=-1<t?e[t]:null)&&li(i))}function li(t){if(typeof t!="number"&&t&&!t.ca){var e=t.src;if(e&&e[be])oi(e.i,t);else{var i=t.type,n=t.proxy;e.removeEventListener?e.removeEventListener(i,n,t.capture):e.detachEvent?e.detachEvent(Pn(i),n):e.addListener&&e.removeListener&&e.removeListener(n),(i=ui(e))?(oi(i,t),i.h==0&&(i.src=null,e[hi]=null)):nt(t)}}}function Pn(t){return t in ci?ci[t]:ci[t]="on"+t}function Go(t,e){if(t.ca)t=!0;else{e=new Oe(e,this);var i=t.listener,n=t.ia||t.src;t.fa&&li(t),t=i.call(n,e)}return t}function ui(t){return t=t[hi],t instanceof st?t:null}var di="__closure_events_fn_"+(1e9*Math.random()>>>0);function fi(t){return typeof t=="function"?t:(t[di]||(t[di]=function(e){return t.handleEvent(e)}),t[di])}function I(){z.call(this),this.i=new st(this),this.P=this,this.I=null}T(I,z);I.prototype[be]=!0;I.prototype.removeEventListener=function(t,e,i,n){Dn(this,t,e,i,n)};function w(t,e){var i,n=t.I;if(n)for(i=[];n;n=n.I)i.push(n);if(t=t.P,n=e.type||e,typeof e=="string")e=new S(e,t);else if(e instanceof S)e.target=e.target||t;else{var s=e;e=new S(n,t),Sn(e,s)}if(s=!0,i)for(var r=i.length-1;0<=r;r--){var o=e.g=i[r];s=rt(o,n,!0,e)&&s}if(o=e.g=t,s=rt(o,n,!0,e)&&s,s=rt(o,n,!1,e)&&s,i)for(r=0;r<i.length;r++)o=e.g=i[r],s=rt(o,n,!1,e)&&s}I.prototype.M=function(){if(I.Z.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var i=t.g[e],n=0;n<i.length;n++)nt(i[n]);delete t.g[e],t.h--}}this.I=null};I.prototype.N=function(t,e,i,n){return this.i.add(String(t),e,!1,i,n)};I.prototype.O=function(t,e,i,n){return this.i.add(String(t),e,!0,i,n)};function rt(t,e,i,n){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,r=0;r<e.length;++r){var o=e[r];if(o&&!o.ca&&o.capture==i){var a=o.listener,h=o.ia||o.src;o.fa&&oi(t.i,o),s=a.call(h,n)!==!1&&s}}return s&&!n.defaultPrevented}var pi=u.JSON.stringify;function Ko(){var t=Mn;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class qo{constructor(){this.h=this.g=null}add(e,i){const n=Ln.get();n.set(e,i),this.h?this.h.next=n:this.g=n,this.h=n}}var Ln=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new Xo,t=>t.reset());class Xo{constructor(){this.next=this.g=this.h=null}set(e,i){this.h=e,this.g=i,this.next=null}reset(){this.next=this.g=this.h=null}}function Jo(t){u.setTimeout(()=>{throw t},0)}function gi(t,e){mi||Yo(),vi||(mi(),vi=!0),Mn.add(t,e)}var mi;function Yo(){var t=u.Promise.resolve(void 0);mi=function(){t.then(Qo)}}var vi=!1,Mn=new qo;function Qo(){for(var t;t=Ko();){try{t.h.call(t.g)}catch(i){Jo(i)}var e=Ln;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}vi=!1}function ot(t,e){I.call(this),this.h=t||1,this.g=e||u,this.j=E(this.kb,this),this.l=Date.now()}T(ot,I);l=ot.prototype;l.da=!1;l.S=null;l.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),w(this,"tick"),this.da&&(yi(this),this.start()))}};l.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function yi(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}l.M=function(){ot.Z.M.call(this),yi(this),delete this.g};function _i(t,e,i){if(typeof t=="function")i&&(t=E(t,i));else if(t&&typeof t.handleEvent=="function")t=E(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:u.setTimeout(t,e||0)}function Un(t){t.g=_i(()=>{t.g=null,t.i&&(t.i=!1,Un(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class Zo extends z{constructor(e,i){super();this.m=e,this.j=i,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Un(this)}M(){super.M(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ce(t){z.call(this),this.h=t,this.g={}}T(Ce,z);var Fn=[];function xn(t,e,i,n){Array.isArray(i)||(i&&(Fn[0]=i.toString()),i=Fn);for(var s=0;s<i.length;s++){var r=bn(e,i[s],n||t.handleEvent,!1,t.h||t);if(!r)break;t.g[r.key]=r}}function jn(t){Zt(t.g,function(e,i){this.g.hasOwnProperty(i)&&li(e)},t),t.g={}}Ce.prototype.M=function(){Ce.Z.M.call(this),jn(this)};Ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function at(){this.g=!0}at.prototype.Aa=function(){this.g=!1};function ea(t,e,i,n,s,r){t.info(function(){if(t.g)if(r)for(var o="",a=r.split("&"),h=0;h<a.length;h++){var c=a[h].split("=");if(1<c.length){var f=c[0];c=c[1];var g=f.split("_");o=2<=g.length&&g[1]=="type"?o+(f+"="+c+"&"):o+(f+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+n+") [attempt "+s+"]: "+e+`
`+i+`
`+o})}function ta(t,e,i,n,s,r,o){t.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+s+"]: "+e+`
`+i+`
`+r+" "+o})}function he(t,e,i,n){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+na(t,i)+(n?" "+n:"")})}function ia(t,e){t.info(function(){return"TIMEOUT: "+e})}at.prototype.info=function(){};function na(t,e){if(!t.g)return e;if(!e)return null;try{var i=JSON.parse(e);if(i){for(t=0;t<i.length;t++)if(Array.isArray(i[t])){var n=i[t];if(!(2>n.length)){var s=n[1];if(Array.isArray(s)&&!(1>s.length)){var r=s[0];if(r!="noop"&&r!="stop"&&r!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return pi(i)}catch{return e}}var ce={},$n=null;function Ii(){return $n=$n||new I}ce.Ma="serverreachability";function Hn(t){S.call(this,ce.Ma,t)}T(Hn,S);function Ne(t){const e=Ii();w(e,new Hn(e,t))}ce.STAT_EVENT="statevent";function Bn(t,e){S.call(this,ce.STAT_EVENT,t),this.stat=e}T(Bn,S);function b(t){const e=Ii();w(e,new Bn(e,t))}ce.Na="timingevent";function Vn(t,e){S.call(this,ce.Na,t),this.size=e}T(Vn,S);function De(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){t()},e)}var Ei={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},sa={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Ti(){}Ti.prototype.h=null;function zn(t){return t.h||(t.h=t.i())}var ht={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function wi(){S.call(this,"d")}T(wi,S);function Ai(){S.call(this,"c")}T(Ai,S);var Si;function ct(){}T(ct,Ti);ct.prototype.g=function(){return new XMLHttpRequest};ct.prototype.i=function(){return{}};Si=new ct;function Pe(t,e,i,n){this.l=t,this.j=e,this.m=i,this.X=n||1,this.V=new Ce(this),this.P=ra,t=ti?125:void 0,this.W=new ot(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Wn}function Wn(){this.i=null,this.g="",this.h=!1}var ra=45e3,Ri={},lt={};l=Pe.prototype;l.setTimeout=function(t){this.P=t};function ki(t,e,i){t.K=1,t.v=gt(x(e)),t.s=i,t.U=!0,Gn(t,null)}function Gn(t,e){t.F=Date.now(),Le(t),t.A=x(t.v);var i=t.A,n=t.X;Array.isArray(n)||(n=[String(n)]),ts(i.h,"t",n),t.C=0,i=t.l.H,t.h=new Wn,t.g=As(t.l,i?e:null,!t.s),0<t.O&&(t.L=new Zo(E(t.Ia,t,t.g),t.O)),xn(t.V,t.g,"readystatechange",t.gb),e=t.H?wn(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Ne(1),ea(t.j,t.u,t.A,t.m,t.X,t.s)}l.gb=function(t){t=t.target;const e=this.L;e&&j(t)==3?e.l():this.Ia(t)};l.Ia=function(t){try{if(t==this.g)e:{const f=j(this.g);var e=this.g.Da();const g=this.g.ba();if(!(3>f)&&(f!=3||ti||this.g&&(this.h.h||this.g.ga()||fs(this.g)))){this.I||f!=4||e==7||(e==8||0>=g?Ne(3):Ne(2)),ut(this);var i=this.g.ba();this.N=i;t:if(Kn(this)){var n=fs(this.g);t="";var s=n.length,r=j(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Z(this),Me(this);var o="";break t}this.h.i=new u.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(n[e],{stream:r&&e==s-1});n.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=i==200,ta(this.j,this.u,this.A,this.m,this.X,f,i),this.i){if(this.$&&!this.J){t:{if(this.g){var a,h=this.g;if((a=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!it(a)){var c=a;break t}}c=null}if(i=c)he(this.j,this.m,i,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Oi(this,i);else{this.i=!1,this.o=3,b(12),Z(this),Me(this);break e}}this.U?(qn(this,f,o),ti&&this.i&&f==3&&(xn(this.V,this.W,"tick",this.fb),this.W.start())):(he(this.j,this.m,o,null),Oi(this,o)),f==4&&Z(this),this.i&&!this.I&&(f==4?Is(this.l,this):(this.i=!1,Le(this)))}else i==400&&0<o.indexOf("Unknown SID")?(this.o=3,b(12)):(this.o=0,b(13)),Z(this),Me(this)}}}catch{}finally{}};function Kn(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Ba:!1}function qn(t,e,i){let n=!0,s;for(;!t.I&&t.C<i.length;)if(s=oa(t,i),s==lt){e==4&&(t.o=4,b(14),n=!1),he(t.j,t.m,null,"[Incomplete Response]");break}else if(s==Ri){t.o=4,b(15),he(t.j,t.m,i,"[Invalid Chunk]"),n=!1;break}else he(t.j,t.m,s,null),Oi(t,s);Kn(t)&&s!=lt&&s!=Ri&&(t.h.g="",t.C=0),e!=4||i.length!=0||t.h.h||(t.o=1,b(16),n=!1),t.i=t.i&&n,n?0<i.length&&!t.aa&&(t.aa=!0,e=t.l,e.g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+i.length),ji(e),e.L=!0,b(11))):(he(t.j,t.m,i,"[Invalid Chunked Response]"),Z(t),Me(t))}l.fb=function(){if(this.g){var t=j(this.g),e=this.g.ga();this.C<e.length&&(ut(this),qn(this,t,e),this.i&&t!=4&&Le(this))}};function oa(t,e){var i=t.C,n=e.indexOf(`
`,i);return n==-1?lt:(i=Number(e.substring(i,n)),isNaN(i)?Ri:(n+=1,n+i>e.length?lt:(e=e.substr(n,i),t.C=n+i,e)))}l.cancel=function(){this.I=!0,Z(this)};function Le(t){t.Y=Date.now()+t.P,Xn(t,t.P)}function Xn(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=De(E(t.eb,t),e)}function ut(t){t.B&&(u.clearTimeout(t.B),t.B=null)}l.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(ia(this.j,this.A),this.K!=2&&(Ne(3),b(17)),Z(this),this.o=2,Me(this)):Xn(this,this.Y-t)};function Me(t){t.l.G==0||t.I||Is(t.l,t)}function Z(t){ut(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,yi(t.W),jn(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function Oi(t,e){try{var i=t.l;if(i.G!=0&&(i.g==t||Ni(i.i,t))){if(i.I=t.N,!t.J&&Ni(i.i,t)&&i.G==3){try{var n=i.Ca.g.parse(e)}catch{n=null}if(Array.isArray(n)&&n.length==3){var s=n;if(s[0]==0)e:if(!i.u){if(i.g)if(i.g.F+3e3<t.F)Tt(i),It(i);else break e;xi(i),b(18)}else i.ta=s[1],0<i.ta-i.U&&37500>s[2]&&i.N&&i.A==0&&!i.v&&(i.v=De(E(i.ab,i),6e3));if(1>=ss(i.i)&&i.ka){try{i.ka()}catch{}i.ka=void 0}}else ie(i,11)}else if((t.J||i.g==t)&&Tt(i),!it(e))for(s=i.Ca.g.parse(e),e=0;e<s.length;e++){let c=s[e];if(i.U=c[0],c=c[1],i.G==2)if(c[0]=="c"){i.J=c[1],i.la=c[2];const f=c[3];f!=null&&(i.ma=f,i.h.info("VER="+i.ma));const g=c[4];g!=null&&(i.za=g,i.h.info("SVER="+i.za));const y=c[5];y!=null&&typeof y=="number"&&0<y&&(n=1.5*y,i.K=n,i.h.info("backChannelRequestTimeoutMs_="+n)),n=i;const R=t.g;if(R){const D=R.g?R.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(D){var r=n.i;!r.g&&(k(D,"spdy")||k(D,"quic")||k(D,"h2"))&&(r.j=r.l,r.g=new Set,r.h&&(Di(r,r.h),r.h=null))}if(n.D){const re=R.g?R.g.getResponseHeader("X-HTTP-Session-Id"):null;re&&(n.sa=re,v(n.F,n.D,re))}}i.G=3,i.j&&i.j.xa(),i.$&&(i.O=Date.now()-t.F,i.h.info("Handshake RTT: "+i.O+"ms")),n=i;var o=t;if(n.oa=ws(n,n.H?n.la:null,n.W),o.J){rs(n.i,o);var a=o,h=n.K;h&&a.setTimeout(h),a.B&&(ut(a),Le(a)),n.g=o}else ys(n);0<i.l.length&&Et(i)}else c[0]!="stop"&&c[0]!="close"||ie(i,7);else i.G==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?ie(i,7):Ui(i):c[0]!="noop"&&i.j&&i.j.wa(c),i.A=0)}}Ne(4)}catch{}}function aa(t){if(t.R&&typeof t.R=="function")return t.R();if(typeof t=="string")return t.split("");if(Xt(t)){for(var e=[],i=t.length,n=0;n<i;n++)e.push(t[n]);return e}e=[],i=0;for(n in t)e[i++]=t[n];return e}function bi(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(Xt(t)||typeof t=="string")yn(t,e,void 0);else{if(t.T&&typeof t.T=="function")var i=t.T();else if(t.R&&typeof t.R=="function")i=void 0;else if(Xt(t)||typeof t=="string"){i=[];for(var n=t.length,s=0;s<n;s++)i.push(s)}else for(s in i=[],n=0,t)i[n++]=s;n=aa(t),s=n.length;for(var r=0;r<s;r++)e.call(void 0,n[r],i&&i[r],t)}}function le(t,e){this.h={},this.g=[],this.i=0;var i=arguments.length;if(1<i){if(i%2)throw Error("Uneven number of arguments");for(var n=0;n<i;n+=2)this.set(arguments[n],arguments[n+1])}else if(t)if(t instanceof le)for(i=t.T(),n=0;n<i.length;n++)this.set(i[n],t.get(i[n]));else for(n in t)this.set(n,t[n])}l=le.prototype;l.R=function(){Ci(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t};l.T=function(){return Ci(this),this.g.concat()};function Ci(t){if(t.i!=t.g.length){for(var e=0,i=0;e<t.g.length;){var n=t.g[e];ee(t.h,n)&&(t.g[i++]=n),e++}t.g.length=i}if(t.i!=t.g.length){var s={};for(i=e=0;e<t.g.length;)n=t.g[e],ee(s,n)||(t.g[i++]=n,s[n]=1),e++;t.g.length=i}}l.get=function(t,e){return ee(this.h,t)?this.h[t]:e};l.set=function(t,e){ee(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e};l.forEach=function(t,e){for(var i=this.T(),n=0;n<i.length;n++){var s=i[n],r=this.get(s);t.call(e,r,s,this)}};function ee(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var Jn=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function ha(t,e){if(t){t=t.split("&");for(var i=0;i<t.length;i++){var n=t[i].indexOf("="),s=null;if(0<=n){var r=t[i].substring(0,n);s=t[i].substring(n+1)}else r=t[i];e(r,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function te(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof te){this.g=e!==void 0?e:t.g,dt(this,t.j),this.s=t.s,ft(this,t.i),pt(this,t.m),this.l=t.l,e=t.h;var i=new xe;i.i=e.i,e.g&&(i.g=new le(e.g),i.h=e.h),Yn(this,i),this.o=t.o}else t&&(i=String(t).match(Jn))?(this.g=!!e,dt(this,i[1]||"",!0),this.s=Ue(i[2]||""),ft(this,i[3]||"",!0),pt(this,i[4]),this.l=Ue(i[5]||"",!0),Yn(this,i[6]||"",!0),this.o=Ue(i[7]||"")):(this.g=!!e,this.h=new xe(null,this.g))}te.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Fe(e,Qn,!0),":");var i=this.i;return(i||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Fe(e,Qn,!0),"@"),t.push(encodeURIComponent(String(i)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i=this.m,i!=null&&t.push(":",String(i))),(i=this.l)&&(this.i&&i.charAt(0)!="/"&&t.push("/"),t.push(Fe(i,i.charAt(0)=="/"?fa:da,!0))),(i=this.h.toString())&&t.push("?",i),(i=this.o)&&t.push("#",Fe(i,ga)),t.join("")};function x(t){return new te(t)}function dt(t,e,i){t.j=i?Ue(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function ft(t,e,i){t.i=i?Ue(e,!0):e}function pt(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Yn(t,e,i){e instanceof xe?(t.h=e,ma(t.h,t.g)):(i||(e=Fe(e,pa)),t.h=new xe(e,t.g))}function v(t,e,i){t.h.set(e,i)}function gt(t){return v(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function ca(t){return t instanceof te?x(t):new te(t,void 0)}function la(t,e,i,n){var s=new te(null,void 0);return t&&dt(s,t),e&&ft(s,e),i&&pt(s,i),n&&(s.l=n),s}function Ue(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Fe(t,e,i){return typeof t=="string"?(t=encodeURI(t).replace(e,ua),i&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function ua(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Qn=/[#\/\?@]/g,da=/[#\?:]/g,fa=/[#\?]/g,pa=/[#\?@]/g,ga=/#/g;function xe(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function W(t){t.g||(t.g=new le,t.h=0,t.i&&ha(t.i,function(e,i){t.add(decodeURIComponent(e.replace(/\+/g," ")),i)}))}l=xe.prototype;l.add=function(t,e){W(this),this.i=null,t=ue(this,t);var i=this.g.get(t);return i||this.g.set(t,i=[]),i.push(e),this.h+=1,this};function Zn(t,e){W(t),e=ue(t,e),ee(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,t=t.g,ee(t.h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&Ci(t)))}function es(t,e){return W(t),e=ue(t,e),ee(t.g.h,e)}l.forEach=function(t,e){W(this),this.g.forEach(function(i,n){yn(i,function(s){t.call(e,s,n,this)},this)},this)};l.T=function(){W(this);for(var t=this.g.R(),e=this.g.T(),i=[],n=0;n<e.length;n++)for(var s=t[n],r=0;r<s.length;r++)i.push(e[n]);return i};l.R=function(t){W(this);var e=[];if(typeof t=="string")es(this,t)&&(e=_n(e,this.g.get(ue(this,t))));else{t=this.g.R();for(var i=0;i<t.length;i++)e=_n(e,t[i])}return e};l.set=function(t,e){return W(this),this.i=null,t=ue(this,t),es(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};l.get=function(t,e){return t?(t=this.R(t),0<t.length?String(t[0]):e):e};function ts(t,e,i){Zn(t,e),0<i.length&&(t.i=null,t.g.set(ue(t,e),Yt(i)),t.h+=i.length)}l.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),i=0;i<e.length;i++){var n=e[i],s=encodeURIComponent(String(n));n=this.R(n);for(var r=0;r<n.length;r++){var o=s;n[r]!==""&&(o+="="+encodeURIComponent(String(n[r]))),t.push(o)}}return this.i=t.join("&")};function ue(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function ma(t,e){e&&!t.j&&(W(t),t.i=null,t.g.forEach(function(i,n){var s=n.toLowerCase();n!=s&&(Zn(this,n),ts(this,s,i))},t)),t.j=e}var va=class{constructor(t,e){this.h=t,this.g=e}};function is(t){this.l=t||ya,u.PerformanceNavigationTiming?(t=u.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(u.g&&u.g.Ea&&u.g.Ea()&&u.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var ya=10;function ns(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function ss(t){return t.h?1:t.g?t.g.size:0}function Ni(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Di(t,e){t.g?t.g.add(e):t.h=e}function rs(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}is.prototype.cancel=function(){if(this.i=os(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function os(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const i of t.g.values())e=e.concat(i.D);return e}return Yt(t.i)}function Pi(){}Pi.prototype.stringify=function(t){return u.JSON.stringify(t,void 0)};Pi.prototype.parse=function(t){return u.JSON.parse(t,void 0)};function _a(){this.g=new Pi}function Ia(t,e,i){const n=i||"";try{bi(t,function(s,r){let o=s;Re(s)&&(o=pi(s)),e.push(n+r+"="+encodeURIComponent(o))})}catch(s){throw e.push(n+"type="+encodeURIComponent("_badmap")),s}}function Ea(t,e){const i=new at;if(u.Image){const n=new Image;n.onload=tt(mt,i,n,"TestLoadImage: loaded",!0,e),n.onerror=tt(mt,i,n,"TestLoadImage: error",!1,e),n.onabort=tt(mt,i,n,"TestLoadImage: abort",!1,e),n.ontimeout=tt(mt,i,n,"TestLoadImage: timeout",!1,e),u.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=t}else e(!1)}function mt(t,e,i,n,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(n)}catch{}}function vt(t){this.l=t.$b||null,this.j=t.ib||!1}T(vt,Ti);vt.prototype.g=function(){return new yt(this.l,this.j)};vt.prototype.i=function(t){return function(){return t}}({});function yt(t,e){I.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Li,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}T(yt,I);var Li=0;l=yt.prototype;l.open=function(t,e){if(this.readyState!=Li)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,$e(this)};l.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||u).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))};l.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,je(this)),this.readyState=Li};l.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,$e(this)),this.g&&(this.readyState=3,$e(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof u.ReadableStream!="undefined"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;as(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))};function as(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}l.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?je(this):$e(this),this.readyState==3&&as(this)}};l.Ua=function(t){this.g&&(this.response=this.responseText=t,je(this))};l.Ta=function(t){this.g&&(this.response=t,je(this))};l.ha=function(){this.g&&je(this)};function je(t){t.readyState=4,t.l=null,t.j=null,t.A=null,$e(t)}l.setRequestHeader=function(t,e){this.v.append(t,e)};l.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};l.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var i=e.next();!i.done;)i=i.value,t.push(i[0]+": "+i[1]),i=e.next();return t.join(`\r
`)};function $e(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(yt.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var Ta=u.JSON.parse;function _(t){I.call(this),this.headers=new le,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=hs,this.K=this.L=!1}T(_,I);var hs="",wa=/^https?$/i,Aa=["POST","PUT"];l=_.prototype;l.ea=function(t,e,i,n){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Si.g(),this.C=this.u?zn(this.u):zn(Si),this.g.onreadystatechange=E(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(r){cs(this,r);return}t=i||"";const s=new le(this.headers);n&&bi(n,function(r,o){s.set(o,r)}),n=Mo(s.T()),i=u.FormData&&t instanceof u.FormData,!(0<=vn(Aa,e))||n||i||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach(function(r,o){this.g.setRequestHeader(o,r)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{ds(this),0<this.B&&((this.K=Sa(this.g))?(this.g.timeout=this.B,this.g.ontimeout=E(this.pa,this)):this.A=_i(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(r){cs(this,r)}};function Sa(t){return ke&&$o()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}function Ra(t){return t.toLowerCase()=="content-type"}l.pa=function(){typeof qt!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,w(this,"timeout"),this.abort(8))};function cs(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,ls(t),_t(t)}function ls(t){t.D||(t.D=!0,w(t,"complete"),w(t,"error"))}l.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,w(this,"complete"),w(this,"abort"),_t(this))};l.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),_t(this,!0)),_.Z.M.call(this)};l.Fa=function(){this.s||(this.F||this.v||this.l?us(this):this.cb())};l.cb=function(){us(this)};function us(t){if(t.h&&typeof qt!="undefined"&&(!t.C[1]||j(t)!=4||t.ba()!=2)){if(t.v&&j(t)==4)_i(t.Fa,0,t);else if(w(t,"readystatechange"),j(t)==4){t.h=!1;try{const a=t.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var i;if(!(i=e)){var n;if(n=a===0){var s=String(t.H).match(Jn)[1]||null;if(!s&&u.self&&u.self.location){var r=u.self.location.protocol;s=r.substr(0,r.length-1)}n=!wa.test(s?s.toLowerCase():"")}i=n}if(i)w(t,"complete"),w(t,"success");else{t.m=6;try{var o=2<j(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.ba()+"]",ls(t)}}finally{_t(t)}}}}function _t(t,e){if(t.g){ds(t);const i=t.g,n=t.C[0]?et:null;t.g=null,t.C=null,e||w(t,"ready");try{i.onreadystatechange=n}catch{}}}function ds(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(u.clearTimeout(t.A),t.A=null)}function j(t){return t.g?t.g.readyState:0}l.ba=function(){try{return 2<j(this)?this.g.status:-1}catch{return-1}};l.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};l.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),Ta(e)}};function fs(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case hs:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}l.Da=function(){return this.m};l.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function ka(t){let e="";return Zt(t,function(i,n){e+=n,e+=":",e+=i,e+=`\r
`}),e}function Mi(t,e,i){e:{for(n in i){var n=!1;break e}n=!0}n||(i=ka(i),typeof t=="string"?i!=null&&encodeURIComponent(String(i)):v(t,e,i))}function He(t,e,i){return i&&i.internalChannelParams&&i.internalChannelParams[t]||e}function ps(t){this.za=0,this.l=[],this.h=new at,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=He("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=He("baseRetryDelayMs",5e3,t),this.$a=He("retryDelaySeedMs",1e4,t),this.Ya=He("forwardChannelMaxRetries",2,t),this.ra=He("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new is(t&&t.concurrentRequestLimit),this.Ca=new _a,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||t.Xb!==!1}l=ps.prototype;l.ma=8;l.G=1;function Ui(t){if(gs(t),t.G==3){var e=t.V++,i=x(t.F);v(i,"SID",t.J),v(i,"RID",e),v(i,"TYPE","terminate"),Be(t,i),e=new Pe(t,t.h,e,void 0),e.K=2,e.v=gt(x(i)),i=!1,u.navigator&&u.navigator.sendBeacon&&(i=u.navigator.sendBeacon(e.v.toString(),"")),!i&&u.Image&&(new Image().src=e.v,i=!0),i||(e.g=As(e.l,null),e.g.ea(e.v)),e.F=Date.now(),Le(e)}Ts(t)}l.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch{}};function It(t){t.g&&(ji(t),t.g.cancel(),t.g=null)}function gs(t){It(t),t.u&&(u.clearTimeout(t.u),t.u=null),Tt(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&u.clearTimeout(t.m),t.m=null)}function Fi(t,e){t.l.push(new va(t.Za++,e)),t.G==3&&Et(t)}function Et(t){ns(t.i)||t.m||(t.m=!0,gi(t.Ha,t),t.C=0)}function Oa(t,e){return ss(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.l=e.D.concat(t.l),!0):t.G==1||t.G==2||t.C>=(t.Xa?0:t.Ya)?!1:(t.m=De(E(t.Ha,t,e),Es(t,t.C)),t.C++,!0)}l.Ha=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const s=new Pe(this,this.h,t,void 0);let r=this.s;if(this.P&&(r?(r=wn(r),Sn(r,this.P)):r=this.P),this.o===null&&(s.H=r),this.ja)e:{for(var e=0,i=0;i<this.l.length;i++){t:{var n=this.l[i];if("__data__"in n.g&&(n=n.g.__data__,typeof n=="string")){n=n.length;break t}n=void 0}if(n===void 0)break;if(e+=n,4096<e){e=i;break e}if(e===4096||i===this.l.length-1){e=i+1;break e}}e=1e3}else e=1e3;e=vs(this,s,e),i=x(this.F),v(i,"RID",t),v(i,"CVER",22),this.D&&v(i,"X-HTTP-Session-Id",this.D),Be(this,i),this.o&&r&&Mi(i,this.o,r),Di(this.i,s),this.Ra&&v(i,"TYPE","init"),this.ja?(v(i,"$req",e),v(i,"SID","null"),s.$=!0,ki(s,i,null)):ki(s,i,e),this.G=2}}else this.G==3&&(t?ms(this,t):this.l.length==0||ns(this.i)||ms(this))};function ms(t,e){var i;e?i=e.m:i=t.V++;const n=x(t.F);v(n,"SID",t.J),v(n,"RID",i),v(n,"AID",t.U),Be(t,n),t.o&&t.s&&Mi(n,t.o,t.s),i=new Pe(t,t.h,i,t.C+1),t.o===null&&(i.H=t.s),e&&(t.l=e.D.concat(t.l)),e=vs(t,i,1e3),i.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Di(t.i,i),ki(i,n,e)}function Be(t,e){t.j&&bi({},function(i,n){v(e,n,i)})}function vs(t,e,i){i=Math.min(t.l.length,i);var n=t.j?E(t.j.Oa,t.j,t):null;e:{var s=t.l;let r=-1;for(;;){const o=["count="+i];r==-1?0<i?(r=s[0].h,o.push("ofs="+r)):r=0:o.push("ofs="+r);let a=!0;for(let h=0;h<i;h++){let c=s[h].h;const f=s[h].g;if(c-=r,0>c)r=Math.max(0,s[h].h-100),a=!1;else try{Ia(f,o,"req"+c+"_")}catch{n&&n(f)}}if(a){n=o.join("&");break e}}}return t=t.l.splice(0,i),e.D=t,n}function ys(t){t.g||t.u||(t.Y=1,gi(t.Ga,t),t.A=0)}function xi(t){return t.g||t.u||3<=t.A?!1:(t.Y++,t.u=De(E(t.Ga,t),Es(t,t.A)),t.A++,!0)}l.Ga=function(){if(this.u=null,_s(this),this.$&&!(this.L||this.g==null||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=De(E(this.bb,this),t)}};l.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,b(10),It(this),_s(this))};function ji(t){t.B!=null&&(u.clearTimeout(t.B),t.B=null)}function _s(t){t.g=new Pe(t,t.h,"rpc",t.Y),t.o===null&&(t.g.H=t.s),t.g.O=0;var e=x(t.oa);v(e,"RID","rpc"),v(e,"SID",t.J),v(e,"CI",t.N?"0":"1"),v(e,"AID",t.U),Be(t,e),v(e,"TYPE","xmlhttp"),t.o&&t.s&&Mi(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var i=t.g;t=t.la,i.K=1,i.v=gt(x(e)),i.s=null,i.U=!0,Gn(i,t)}l.ab=function(){this.v!=null&&(this.v=null,It(this),xi(this),b(19))};function Tt(t){t.v!=null&&(u.clearTimeout(t.v),t.v=null)}function Is(t,e){var i=null;if(t.g==e){Tt(t),ji(t),t.g=null;var n=2}else if(Ni(t.i,e))i=e.D,rs(t.i,e),n=1;else return;if(t.I=e.N,t.G!=0){if(e.i)if(n==1){i=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;n=Ii(),w(n,new Vn(n,i,e,s)),Et(t)}else ys(t);else if(s=e.o,s==3||s==0&&0<t.I||!(n==1&&Oa(t,e)||n==2&&xi(t)))switch(i&&0<i.length&&(e=t.i,e.i=e.i.concat(i)),s){case 1:ie(t,5);break;case 4:ie(t,10);break;case 3:ie(t,6);break;default:ie(t,2)}}}function Es(t,e){let i=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(i*=2),i*e}function ie(t,e){if(t.h.info("Error code "+e),e==2){var i=null;t.j&&(i=null);var n=E(t.jb,t);i||(i=new te("//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||dt(i,"https"),gt(i)),Ea(i.toString(),n)}else b(2);t.G=0,t.j&&t.j.va(e),Ts(t),gs(t)}l.jb=function(t){t?(this.h.info("Successfully pinged google.com"),b(2)):(this.h.info("Failed to ping google.com"),b(1))};function Ts(t){t.G=0,t.I=-1,t.j&&((os(t.i).length!=0||t.l.length!=0)&&(t.i.i.length=0,Yt(t.l),t.l.length=0),t.j.ua())}function ws(t,e,i){let n=ca(i);if(n.i!="")e&&ft(n,e+"."+n.i),pt(n,n.m);else{const s=u.location;n=la(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,i)}return t.aa&&Zt(t.aa,function(s,r){v(n,r,s)}),e=t.D,i=t.sa,e&&i&&v(n,e,i),v(n,"VER",t.ma),Be(t,n),n}function As(t,e,i){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=i&&t.Ba&&!t.qa?new _(new vt({ib:!0})):new _(t.qa),e.L=t.H,e}function Ss(){}l=Ss.prototype;l.xa=function(){};l.wa=function(){};l.va=function(){};l.ua=function(){};l.Oa=function(){};function N(t,e){I.call(this),this.g=new ps(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!it(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!it(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new de(this)}T(N,I);N.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,i=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),gi(E(t.hb,t,e))),b(0),t.W=e,t.aa=i||{},t.N=t.X,t.F=ws(t,null,t.W),Et(t)};N.prototype.close=function(){Ui(this.g)};N.prototype.u=function(t){if(typeof t=="string"){var e={};e.__data__=t,Fi(this.g,e)}else this.v?(e={},e.__data__=pi(t),Fi(this.g,e)):Fi(this.g,t)};N.prototype.M=function(){this.g.j=null,delete this.j,Ui(this.g),delete this.g,N.Z.M.call(this)};function Rs(t){wi.call(this);var e=t.__sm__;if(e){e:{for(const i in e){t=i;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}T(Rs,wi);function ks(){Ai.call(this),this.status=1}T(ks,Ai);function de(t){this.g=t}T(de,Ss);de.prototype.xa=function(){w(this.g,"a")};de.prototype.wa=function(t){w(this.g,new Rs(t))};de.prototype.va=function(t){w(this.g,new ks(t))};de.prototype.ua=function(){w(this.g,"b")};N.prototype.send=N.prototype.u;N.prototype.open=N.prototype.m;N.prototype.close=N.prototype.close;Ei.NO_ERROR=0;Ei.TIMEOUT=8;Ei.HTTP_ERROR=6;sa.COMPLETE="complete";ht.OPEN="a";ht.CLOSE="b";ht.ERROR="c";ht.MESSAGE="d";I.prototype.listen=I.prototype.N;_.prototype.listenOnce=_.prototype.O;_.prototype.getLastError=_.prototype.La;_.prototype.getLastErrorCode=_.prototype.Da;_.prototype.getStatus=_.prototype.ba;_.prototype.getResponseJson=_.prototype.Qa;_.prototype.getResponseText=_.prototype.ga;_.prototype.send=_.prototype.ea;const Os="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}C.UNAUTHENTICATED=new C(null),C.GOOGLE_CREDENTIALS=new C("google-credentials-uid"),C.FIRST_PARTY=new C("first-party-uid"),C.MOCK_USER=new C("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wt="9.4.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const At=new Vt("@firebase/firestore");function G(t,...e){if(At.logLevel<=m.DEBUG){const i=e.map(bs);At.debug(`Firestore (${wt}): ${t}`,...i)}}function $i(t,...e){if(At.logLevel<=m.ERROR){const i=e.map(bs);At.error(`Firestore (${wt}): ${t}`,...i)}}function bs(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(t="Unexpected state"){const e=`FIRESTORE (${wt}) INTERNAL ASSERTION FAILED: `+t;throw $i(e),new Error(e)}function Hi(t,e){t||Cs()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Error{constructor(e,i){super(i),this.code=e,this.message=i,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(){this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,i){this.user=i,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${e}`}}class Ca{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,i){e.enqueueRetryable(()=>i(C.UNAUTHENTICATED))}shutdown(){}}class Na{constructor(e){this.t=e,this.currentUser=C.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,i){let n=this.i;const s=h=>this.i!==n?(n=this.i,i(h)):Promise.resolve();let r=new fe;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new fe,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const h=r;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},a=h=>{G("FirebaseCredentialsProvider","Auth detected"),this.auth=h,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(h=>a(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?a(h):(G("FirebaseCredentialsProvider","Auth not yet detected"),r.resolve(),r=new fe)}},0),o()}getToken(){const e=this.i,i=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(i).then(n=>this.i!==e?(G("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(Hi(typeof n.accessToken=="string"),new ba(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return Hi(e===null||typeof e=="string"),new C(e)}}class Da{constructor(e,i,n){this.h=e,this.l=i,this.m=n,this.type="FirstParty",this.user=C.FIRST_PARTY}get authHeaders(){const e={"X-Goog-AuthUser":this.l},i=this.h.auth.getAuthHeaderValueForFirstParty([]);return i&&(e.Authorization=i),this.m&&(e["X-Goog-Iam-Authorization-Token"]=this.m),e}}class Pa{constructor(e,i,n){this.h=e,this.l=i,this.m=n}getToken(){return Promise.resolve(new Da(this.h,this.l,this.m))}start(e,i){e.enqueueRetryable(()=>i(C.FIRST_PARTY))}shutdown(){}invalidateToken(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La(t){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),i=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(i);else for(let n=0;n<t;n++)i[n]=Math.floor(256*Math.random());return i}class Ma{static I(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=La(40);for(let r=0;r<s.length;++r)n.length<20&&s[r]<i&&(n+=e.charAt(s[r]%e.length))}return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ns,p;(p=Ns||(Ns={}))[p.OK=0]="OK",p[p.CANCELLED=1]="CANCELLED",p[p.UNKNOWN=2]="UNKNOWN",p[p.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",p[p.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",p[p.NOT_FOUND=5]="NOT_FOUND",p[p.ALREADY_EXISTS=6]="ALREADY_EXISTS",p[p.PERMISSION_DENIED=7]="PERMISSION_DENIED",p[p.UNAUTHENTICATED=16]="UNAUTHENTICATED",p[p.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",p[p.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",p[p.ABORTED=10]="ABORTED",p[p.OUT_OF_RANGE=11]="OUT_OF_RANGE",p[p.UNIMPLEMENTED=12]="UNIMPLEMENTED",p[p.INTERNAL=13]="INTERNAL",p[p.UNAVAILABLE=14]="UNAVAILABLE",p[p.DATA_LOSS=15]="DATA_LOSS";function Ds(t){return t.name==="IndexedDbTransactionError"}function Bi(){return typeof document!="undefined"?document:null}class Ua{constructor(e,i,n=1e3,s=1.5,r=6e4){this.Oe=e,this.timerId=i,this.Qi=n,this.Wi=s,this.Gi=r,this.zi=0,this.Hi=null,this.Ji=Date.now(),this.reset()}reset(){this.zi=0}Yi(){this.zi=this.Gi}Xi(e){this.cancel();const i=Math.floor(this.zi+this.Zi()),n=Math.max(0,Date.now()-this.Ji),s=Math.max(0,i-n);s>0&&G("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.zi} ms, delay with jitter: ${i} ms, last attempt: ${n} ms ago)`),this.Hi=this.Oe.enqueueAfterDelay(this.timerId,s,()=>(this.Ji=Date.now(),e())),this.zi*=this.Wi,this.zi<this.Qi&&(this.zi=this.Qi),this.zi>this.Gi&&(this.zi=this.Gi)}tr(){this.Hi!==null&&(this.Hi.skipDelay(),this.Hi=null)}cancel(){this.Hi!==null&&(this.Hi.cancel(),this.Hi=null)}Zi(){return(Math.random()-.5)*this.zi}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,i,n,s,r){this.asyncQueue=e,this.timerId=i,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new fe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,i,n,s,r){const o=Date.now()+n,a=new Vi(e,i,o,s,r);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Fa(t,e){if($i("AsyncQueue",`${e}: ${t}`),Ds(t))return new M(L.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,i,n){this.credentials=e,this.asyncQueue=i,this.databaseInfo=n,this.user=C.UNAUTHENTICATED,this.clientId=Ma.I(),this.credentialListener=()=>Promise.resolve(),this.credentials.start(i,async s=>{G("FirestoreClient","Received user=",s.uid),await this.credentialListener(s),this.user=s})}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.credentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new M(L.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new fe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.shutdown(),e.resolve()}catch(i){const n=Fa(i,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}class ja{constructor(e,i,n,s,r,o,a,h){this.databaseId=e,this.appId=i,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=h}}class St{constructor(e,i){this.projectId=e,this.database=i||"(default)"}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof St&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps=new Map;function $a(t,e,i,n){if(e===!0&&n===!0)throw new M(L.INVALID_ARGUMENT,`${t} and ${i} cannot be used together.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e){var i;if(e.host===void 0){if(e.ssl!==void 0)throw new M(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(i=e.ssl)===null||i===void 0||i;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new M(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,$a("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,i){this._credentials=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ls({}),this._settingsFrozen=!1,e instanceof St?this._databaseId=e:(this._app=e,this._databaseId=function(n){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new M(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new St(n.options.projectId)}(e))}get app(){if(!this._app)throw new M(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new M(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ls(e),e.credentials!==void 0&&(this._credentials=function(i){if(!i)return new Ca;switch(i.type){case"gapi":const n=i.client;return Hi(!(typeof n!="object"||n===null||!n.auth||!n.auth.getAuthHeaderValueForFirstParty)),new Pa(n,i.sessionIndex||"0",i.iamToken||null);case"provider":return i.client;default:throw new M(L.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const i=Ps.get(e);i&&(G("ComponentProvider","Removing Datastore"),Ps.delete(e),i.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(){this._c=Promise.resolve(),this.mc=[],this.gc=!1,this.yc=[],this.Tc=null,this.Ec=!1,this.Ic=!1,this.Ac=[],this.ar=new Ua(this,"async_queue_retry"),this.Rc=()=>{const i=Bi();i&&G("AsyncQueue","Visibility state changed to "+i.visibilityState),this.ar.tr()};const e=Bi();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Rc)}get isShuttingDown(){return this.gc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.bc(),this.Pc(e)}enterRestrictedMode(e){if(!this.gc){this.gc=!0,this.Ic=e||!1;const i=Bi();i&&typeof i.removeEventListener=="function"&&i.removeEventListener("visibilitychange",this.Rc)}}enqueue(e){if(this.bc(),this.gc)return new Promise(()=>{});const i=new fe;return this.Pc(()=>this.gc&&this.Ic?Promise.resolve():(e().then(i.resolve,i.reject),i.promise)).then(()=>i.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.mc.push(e),this.vc()))}async vc(){if(this.mc.length!==0){try{await this.mc[0](),this.mc.shift(),this.ar.reset()}catch(e){if(!Ds(e))throw e;G("AsyncQueue","Operation failed with retryable error: "+e)}this.mc.length>0&&this.ar.Xi(()=>this.vc())}}Pc(e){const i=this._c.then(()=>(this.Ec=!0,e().catch(n=>{this.Tc=n,this.Ec=!1;const s=function(r){let o=r.message||"";return r.stack&&(o=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),o}(n);throw $i("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.Ec=!1,n))));return this._c=i,i}enqueueAfterDelay(e,i,n){this.bc(),this.Ac.indexOf(e)>-1&&(i=0);const s=Vi.createAndSchedule(this,e,i,n,r=>this.Vc(r));return this.yc.push(s),s}bc(){this.Tc&&Cs()}verifyOperationInProgress(){}async Sc(){let e;do e=this._c,await e;while(e!==this._c)}Dc(e){for(const i of this.yc)if(i.timerId===e)return!0;return!1}Cc(e){return this.Sc().then(()=>{this.yc.sort((i,n)=>i.targetTimeMs-n.targetTimeMs);for(const i of this.yc)if(i.skipDelay(),e!=="all"&&i.timerId===e)break;return this.Sc()})}Nc(e){this.Ac.push(e)}Vc(e){const i=this.yc.indexOf(e);this.yc.splice(i,1)}}class Va extends Ha{constructor(e,i){super(e,i),this.type="firestore",this._queue=new Ba,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||za(this),this._firestoreClient.terminate()}}function Fc(t=mn()){return Kt(t,"firestore").getImmediate()}function za(t){var e;const i=t._freezeSettings(),n=function(s,r,o,a){return new ja(s,r,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._firestoreClient=new xa(t._credentials,t._queue,n)}(function(t,e=!0){(function(i){wt=i})(Se),Ae(new ae("firestore",(i,{options:n})=>{const s=i.getProvider("app").getImmediate(),r=new Va(s,new Na(i.getProvider("auth-internal")));return n=Object.assign({useFetchStreams:e},n),r._setSettings(n),r},"PUBLIC")),V(Os,"3.3.0",t),V(Os,"3.3.0","esm2017")})();/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function zi(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(i[n[s]]=t[n[s]]);return i}function Ms(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Wa=Ms,Us=new _e("auth","Firebase",Ms());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=new Vt("@firebase/auth");function Rt(t,...e){Fs.logLevel<=m.ERROR&&Fs.error(`Auth (${Se}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(t,...e){throw Wi(t,...e)}function U(t,...e){return Wi(t,...e)}function Ga(t,e,i){const n=Object.assign(Object.assign({},Wa()),{[e]:i});return new _e("auth","Firebase",n).create(e,{appName:t.name})}function Wi(t,...e){if(typeof t!="string"){const i=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=t.name),t._errorFactory.create(i,...n)}return Us.create(t,...e)}function d(t,e,...i){if(!t)throw Wi(e,...i)}function $(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Rt(e),new Error(e)}function H(t,e){t||$(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=new Map;function B(t){H(t instanceof Function,"Expected a class definition");let e=xs.get(t);return e?(H(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,xs.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ka(t,e){const i=Kt(t,"auth");if(i.isInitialized()){const s=i.getImmediate(),r=i.getOptions();if(Ye(r,e!=null?e:{}))return s;P(s,"already-initialized")}return i.initialize({options:e})}function qa(t,e){const i=(e==null?void 0:e.persistence)||[],n=(Array.isArray(i)?i:[i]).map(B);(e==null?void 0:e.errorMap)&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Xa(){return js()==="http:"||js()==="https:"}function js(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xa()||Nr()||"connection"in navigator)?navigator.onLine:!0}function Ya(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,i){this.shortDelay=e,this.longDelay=i,H(i>e,"Short delay should be less than long delay!"),this.isMobile=Cr()||Dr()}get(){return Ja()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(t,e){H(t.emulator,"Emulator should always be set here");const{url:i}=t.emulator;return e?`${i}${e.startsWith("/")?e.slice(1):e}`:i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{static initialize(e,i,n){this.fetchImpl=e,i&&(this.headersImpl=i),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;$("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;$("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;$("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Za=new Ve(3e4,6e4);function kt(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ze(t,e,i,n,s={}){return $s(t,s,()=>{let r={},o={};n&&(e==="GET"?o=n:r={body:JSON.stringify(n)});const a=Ie(Object.assign({key:t.config.apiKey},o)).slice(1),h=new(qi.headers());return h.set("Content-Type","application/json"),h.set("X-Client-Version",t._getSdkClientVersion()),t.languageCode&&h.set("X-Firebase-Locale",t.languageCode),qi.fetch()(Hs(t,t.config.apiHost,i,a),Object.assign({method:e,headers:h,referrerPolicy:"no-referrer"},r))})}async function $s(t,e,i){t._canInitEmulator=!1;const n=Object.assign(Object.assign({},Qa),e);try{const s=new eh(t),r=await Promise.race([i(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Xi(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[h,c]=a.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Xi(t,"credential-already-in-use",o);if(h==="EMAIL_EXISTS")throw Xi(t,"email-already-in-use",o);const f=n[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Ga(t,f,c);P(t,f)}}catch(s){if(s instanceof oe)throw s;P(t,"network-request-failed")}}async function Ot(t,e,i,n,s={}){const r=await ze(t,e,i,n,s);return"mfaPendingCredential"in r&&P(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Hs(t,e,i,n){const s=`${e}${i}?${n}`;return t.config.emulator?Ki(t.config,s):`${t.config.apiScheme}://${s}`}class eh{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((i,n)=>{this.timer=setTimeout(()=>n(U(this.auth,"timeout")),Za.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Xi(t,e,i){const n={appName:t.name};i.email&&(n.email=i.email),i.phoneNumber&&(n.phoneNumber=i.phoneNumber);const s=U(t,e,n);return s.customData._tokenResponse=i,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function th(t,e){return ze(t,"POST","/v1/accounts:delete",e)}async function ih(t,e){return ze(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function nh(t,e=!1){const i=we(t),n=await i.getIdToken(e),s=Yi(n);d(s&&s.exp&&s.auth_time&&s.iat,i.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:n,authTime:We(Ji(s.auth_time)),issuedAtTime:We(Ji(s.iat)),expirationTime:We(Ji(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Ji(t){return Number(t)*1e3}function Yi(t){const[e,i,n]=t.split(".");if(e===void 0||i===void 0||n===void 0)return Rt("JWT malformed, contained fewer than 3 sections"),null;try{const s=Or(i);return s?JSON.parse(s):(Rt("Failed to decode base64 JWT payload"),null)}catch(s){return Rt("Caught error parsing JWT payload as JSON",s),null}}function sh(t){const e=Yi(t);return d(e,"internal-error"),d(typeof e.exp!="undefined","internal-error"),d(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ge(t,e,i=!1){if(i)return e;try{return await e}catch(n){throw n instanceof oe&&rh(n)&&t.auth.currentUser===t&&await t.auth.signOut(),n}}function rh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var i;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=((i=this.user.stsTokenManager.expirationTime)!==null&&i!==void 0?i:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const i=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},i)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,i){this.createdAt=e,this.lastLoginAt=i,this._initializeTime()}_initializeTime(){this.lastSignInTime=We(this.lastLoginAt),this.creationTime=We(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bt(t){var e;const i=t.auth,n=await t.getIdToken(),s=await Ge(t,ih(i,{idToken:n}));d(s==null?void 0:s.users.length,i,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const o=((e=r.providerUserInfo)===null||e===void 0?void 0:e.length)?ch(r.providerUserInfo):[],a=hh(t.providerData,o),h=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a==null?void 0:a.length),f=h?c:!1,g={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Bs(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(t,g)}async function ah(t){const e=we(t);await bt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hh(t,e){return[...t.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function ch(t){return t.map(e=>{var{providerId:i}=e,n=zi(e,["providerId"]);return{providerId:i,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lh(t,e){const i=await $s(t,{},()=>{const n=Ie({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=Hs(t,s,"/v1/token",`key=${r}`);return qi.fetch()(o,{method:"POST",headers:{"X-Client-Version":t._getSdkClientVersion(),"Content-Type":"application/x-www-form-urlencoded"},body:n})});return{accessToken:i.access_token,expiresIn:i.expires_in,refreshToken:i.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){d(e.idToken,"internal-error"),d(typeof e.idToken!="undefined","internal-error"),d(typeof e.refreshToken!="undefined","internal-error");const i="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):sh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,i)}async getToken(e,i=!1){return d(!this.accessToken||this.refreshToken,e,"user-token-expired"),!i&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,i){const{accessToken:n,refreshToken:s,expiresIn:r}=await lh(e,i);this.updateTokensAndExpiration(n,s,Number(r))}updateTokensAndExpiration(e,i,n){this.refreshToken=i||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,i){const{refreshToken:n,accessToken:s,expirationTime:r}=i,o=new Ke;return n&&(d(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(d(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(d(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ke,this.toJSON())}_performRefresh(){return $("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(t,e){d(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class ne{constructor(e){var{uid:i,auth:n,stsTokenManager:s}=e,r=zi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new oh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=i,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.metadata=new Bs(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const i=await Ge(this,this.stsTokenManager.getToken(this.auth,e));return d(i,this.auth,"internal-error"),this.accessToken!==i&&(this.accessToken=i,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),i}getIdTokenResult(e){return nh(this,e)}reload(){return ah(this)}_assign(e){this!==e&&(d(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(i=>Object.assign({},i)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new ne(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){d(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,i=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),i&&await bt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Ge(this,th(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,i){var n,s,r,o,a,h,c,f;const g=(n=i.displayName)!==null&&n!==void 0?n:void 0,y=(s=i.email)!==null&&s!==void 0?s:void 0,R=(r=i.phoneNumber)!==null&&r!==void 0?r:void 0,D=(o=i.photoURL)!==null&&o!==void 0?o:void 0,re=(a=i.tenantId)!==null&&a!==void 0?a:void 0,xt=(h=i._redirectEventId)!==null&&h!==void 0?h:void 0,hn=(c=i.createdAt)!==null&&c!==void 0?c:void 0,cn=(f=i.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:jt,emailVerified:ln,isAnonymous:un,providerData:$t,stsTokenManager:dn}=i;d(jt&&dn,e,"internal-error");const wr=Ke.fromJSON(this.name,dn);d(typeof jt=="string",e,"internal-error"),K(g,e.name),K(y,e.name),d(typeof ln=="boolean",e,"internal-error"),d(typeof un=="boolean",e,"internal-error"),K(R,e.name),K(D,e.name),K(re,e.name),K(xt,e.name),K(hn,e.name),K(cn,e.name);const Ht=new ne({uid:jt,auth:e,email:y,emailVerified:ln,displayName:g,isAnonymous:un,photoURL:D,phoneNumber:R,tenantId:re,stsTokenManager:wr,createdAt:hn,lastLoginAt:cn});return $t&&Array.isArray($t)&&(Ht.providerData=$t.map(Ar=>Object.assign({},Ar))),xt&&(Ht._redirectEventId=xt),Ht}static async _fromIdTokenResponse(e,i,n=!1){const s=new Ke;s.updateFromServerResponse(i);const r=new ne({uid:i.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await bt(r),r}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,i){this.storage[e]=i}async _get(e){const i=this.storage[e];return i===void 0?null:i}async _remove(e){delete this.storage[e]}_addListener(e,i){}_removeListener(e,i){}}Vs.type="NONE";const zs=Vs;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(t,e,i){return`firebase:${t}:${e}:${i}`}class pe{constructor(e,i,n){this.persistence=e,this.auth=i,this.userKey=n;const{config:s,name:r}=this.auth;this.fullUserKey=Ct(this.userKey,s.apiKey,r),this.fullPersistenceKey=Ct("persistence",s.apiKey,r),this.boundEventHandler=i._onStorageEvent.bind(i),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ne._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const i=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,i)return this.setCurrentUser(i)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,i,n="authUser"){if(!i.length)return new pe(B(zs),e,n);const s=(await Promise.all(i.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||B(zs);const o=Ct(n,e.config.apiKey,e.name);let a=null;for(const c of i)try{const f=await c._get(o);if(f){const g=ne._fromJSON(e,f);c!==r&&(a=g),r=c;break}}catch{}const h=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!h.length?new pe(r,e,n):(r=h[0],a&&await r._set(o,a.toJSON()),await Promise.all(i.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new pe(r,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qs(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Gs(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Js(e))return"Blackberry";if(Ys(e))return"Webos";if(Qi(e))return"Safari";if((e.includes("chrome/")||Ks(e))&&!e.includes("edge/"))return"Chrome";if(Xs(e))return"Android";{const i=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(i);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Gs(t=A()){return/firefox\//i.test(t)}function Qi(t=A()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ks(t=A()){return/crios\//i.test(t)}function qs(t=A()){return/iemobile/i.test(t)}function Xs(t=A()){return/android/i.test(t)}function Js(t=A()){return/blackberry/i.test(t)}function Ys(t=A()){return/webos/i.test(t)}function Nt(t=A()){return/iphone|ipad|ipod/i.test(t)}function uh(t=A()){var e;return Nt(t)&&!!((e=window.navigator)===null||e===void 0?void 0:e.standalone)}function dh(){return Pr()&&document.documentMode===10}function Qs(t=A()){return Nt(t)||Xs(t)||Ys(t)||Js(t)||/windows phone/i.test(t)||qs(t)}function fh(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(t,e=[]){let i;switch(t){case"Browser":i=Ws(A());break;case"Worker":i=`${Ws(A())}-${t}`;break;default:i=t}const n=e.length?e.join(","):"FirebaseCore-web";return`${i}/JsCore/${Se}/${n}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(e,i){this.app=e,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new er(this),this.idTokenSubscription=new er(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Us,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,i){return i&&(this._popupRedirectResolver=B(i)),this._initializationPromise=this.queue(async()=>{var n,s;this._deleted||(this.persistenceManager=await pe.create(this,e),!this._deleted&&(((n=this._popupRedirectResolver)===null||n===void 0?void 0:n._shouldInitProactively)&&await this._popupRedirectResolver._initialize(this),await this.initializeCurrentUser(i),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)))}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e)}}async initializeCurrentUser(e){var i;let n=await this.assertedPersistence.getCurrentUser();if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId,r=n==null?void 0:n._redirectEventId,o=await this.tryRedirectSignIn(e);(!s||s===r)&&(o==null?void 0:o.user)&&(n=o.user)}return n?n._redirectEventId?(d(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)):this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}async tryRedirectSignIn(e){let i=null;try{i=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return i}async reloadAndSetCurrentUserOrClear(e){try{await bt(e)}catch(i){if(i.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ya()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const i=e?we(e):null;return i&&d(i.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(i&&i._clone(this))}async _updateCurrentUser(e){if(!this._deleted)return e&&d(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(B(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new _e("auth","Firebase",e())}onAuthStateChanged(e,i,n){return this.registerStateListener(this.authStateSubscription,e,i,n)}onIdTokenChanged(e,i,n){return this.registerStateListener(this.idTokenSubscription,e,i,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,i){const n=await this.getOrInitRedirectPersistenceManager(i);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const i=e&&B(e)||this._popupRedirectResolver;d(i,this,"argument-error"),this.redirectPersistenceManager=await pe.create(this,[B(i._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var i,n;return this._isInitialized&&await this.queue(async()=>{}),((i=this._currentUser)===null||i===void 0?void 0:i._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,i;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(i=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&i!==void 0?i:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,i,n,s){if(this._deleted)return()=>{};const r=typeof i=="function"?i:i.next.bind(i),o=this._isInitialized?Promise.resolve():this._initializationPromise;return d(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof i=="function"?e.addObserver(i,n,s):e.addObserver(i)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return d(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getSdkClientVersion(){return this.clientVersion}}function Zi(t){return we(t)}class er{constructor(e){this.auth=e,this.observer=null,this.addObserver=xr(i=>this.observer=i)}get next(){return d(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,i){this.providerId=e,this.signInMethod=i}toJSON(){return $("not implemented")}_getIdTokenResponse(e){return $("not implemented")}_linkToIdToken(e,i){return $("not implemented")}_getReauthenticationResolver(e){return $("not implemented")}}async function gh(t,e){return ze(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mh(t,e){return Ot(t,"POST","/v1/accounts:signInWithPassword",kt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vh(t,e){return Ot(t,"POST","/v1/accounts:signInWithEmailLink",kt(t,e))}async function yh(t,e){return Ot(t,"POST","/v1/accounts:signInWithEmailLink",kt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe extends en{constructor(e,i,n,s=null){super("password",n);this._email=e,this._password=i,this._tenantId=s}static _fromEmailAndPassword(e,i){return new qe(e,i,"password")}static _fromEmailAndCode(e,i,n=null){return new qe(e,i,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const i=typeof e=="string"?JSON.parse(e):e;if((i==null?void 0:i.email)&&(i==null?void 0:i.password)){if(i.signInMethod==="password")return this._fromEmailAndPassword(i.email,i.password);if(i.signInMethod==="emailLink")return this._fromEmailAndCode(i.email,i.password,i.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return mh(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return vh(e,{email:this._email,oobCode:this._password});default:P(e,"internal-error")}}async _linkToIdToken(e,i){switch(this.signInMethod){case"password":return gh(e,{idToken:i,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return yh(e,{idToken:i,email:this._email,oobCode:this._password});default:P(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ge(t,e){return Ot(t,"POST","/v1/accounts:signInWithIdp",kt(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="http://localhost";class se extends en{constructor(){super(...arguments);this.pendingToken=null}static _fromParams(e){const i=new se(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(i.idToken=e.idToken),e.accessToken&&(i.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(i.nonce=e.nonce),e.pendingToken&&(i.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(i.accessToken=e.oauthToken,i.secret=e.oauthTokenSecret):P("argument-error"),i}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const i=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s}=i,r=zi(i,["providerId","signInMethod"]);if(!n||!s)return null;const o=new se(n,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const i=this.buildRequest();return ge(e,i)}_linkToIdToken(e,i){const n=this.buildRequest();return n.idToken=i,ge(e,n)}_getReauthenticationResolver(e){const i=this.buildRequest();return i.autoCreate=!1,ge(e,i)}buildRequest(){const e={requestUri:_h,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const i={};this.idToken&&(i.id_token=this.idToken),this.accessToken&&(i.access_token=this.accessToken),this.secret&&(i.oauth_token_secret=this.secret),i.providerId=this.providerId,this.nonce&&!this.pendingToken&&(i.nonce=this.nonce),e.postBody=Ie(i)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Eh(t){const e=Ee(Te(t)).link,i=e?Ee(Te(e)).deep_link_id:null,n=Ee(Te(t)).deep_link_id;return(n?Ee(Te(n)).link:null)||n||i||e||t}class tn{constructor(e){var i,n,s,r,o,a;const h=Ee(Te(e)),c=(i=h.apiKey)!==null&&i!==void 0?i:null,f=(n=h.oobCode)!==null&&n!==void 0?n:null,g=Ih((s=h.mode)!==null&&s!==void 0?s:null);d(c&&f&&g,"argument-error"),this.apiKey=c,this.operation=g,this.code=f,this.continueUrl=(r=h.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=h.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=h.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const i=Eh(e);try{return new tn(i)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(){this.providerId=me.PROVIDER_ID}static credential(e,i){return qe._fromEmailAndPassword(e,i)}static credentialWithLink(e,i){const n=tn.parseLink(i);return d(n,"argument-error"),qe._fromEmailAndCode(e,n.code,n.tenantId)}}me.PROVIDER_ID="password";me.EMAIL_PASSWORD_SIGN_IN_METHOD="password";me.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends tr{constructor(){super(...arguments);this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q extends Xe{constructor(){super("facebook.com")}static credential(e){return se._fromParams({providerId:q.PROVIDER_ID,signInMethod:q.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return q.credentialFromTaggedObject(e)}static credentialFromError(e){return q.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return q.credential(e.oauthAccessToken)}catch{return null}}}q.FACEBOOK_SIGN_IN_METHOD="facebook.com";q.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X extends Xe{constructor(){super("google.com");this.addScope("profile")}static credential(e,i){return se._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:i})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:i,oauthAccessToken:n}=e;if(!i&&!n)return null;try{return X.credential(i,n)}catch{return null}}}X.GOOGLE_SIGN_IN_METHOD="google.com";X.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J extends Xe{constructor(){super("github.com")}static credential(e){return se._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return J.credential(e.oauthAccessToken)}catch{return null}}}J.GITHUB_SIGN_IN_METHOD="github.com";J.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y extends Xe{constructor(){super("twitter.com")}static credential(e,i){return se._fromParams({providerId:Y.PROVIDER_ID,signInMethod:Y.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:i})}static credentialFromResult(e){return Y.credentialFromTaggedObject(e)}static credentialFromError(e){return Y.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:i,oauthTokenSecret:n}=e;if(!i||!n)return null;try{return Y.credential(i,n)}catch{return null}}}Y.TWITTER_SIGN_IN_METHOD="twitter.com";Y.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,i,n,s=!1){const r=await ne._fromIdTokenResponse(e,n,s),o=ir(n);return new ve({user:r,providerId:o,_tokenResponse:n,operationType:i})}static async _forOperation(e,i,n){await e._updateTokensIfNecessary(n,!0);const s=ir(n);return new ve({user:e,providerId:s,_tokenResponse:n,operationType:i})}}function ir(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends oe{constructor(e,i,n,s){var r;super(i.code,i.message);this.operationType=n,this.user=s,Object.setPrototypeOf(this,Dt.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:i.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,i,n,s){return new Dt(e,i,n,s)}}function nr(t,e,i,n){return(e==="reauthenticate"?i._getReauthenticationResolver(t):i._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Dt._fromErrorAndOperation(t,r,e,n):r})}async function Th(t,e,i=!1){const n=await Ge(t,e._linkToIdToken(t.auth,await t.getIdToken()),i);return ve._forOperation(t,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wh(t,e,i=!1){const{auth:n}=t,s="reauthenticate";try{const r=await Ge(t,nr(n,s,e,t),i);d(r.idToken,n,"internal-error");const o=Yi(r.idToken);d(o,n,"internal-error");const{sub:a}=o;return d(t.uid===a,n,"user-mismatch"),ve._forOperation(t,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&P(n,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sr(t,e,i=!1){const n="signIn",s=await nr(t,n,e),r=await ve._fromIdTokenResponse(t,n,s);return i||await t._updateCurrentUser(r.user),r}async function Ah(t,e){return sr(Zi(t),e)}function xc(t,e,i){return Ah(we(t),me.credential(e,i))}const Pt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,i){this.storageRetriever=e,this.type=i}_isAvailable(){try{return this.storage?(this.storage.setItem(Pt,"1"),this.storage.removeItem(Pt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,i){return this.storage.setItem(e,JSON.stringify(i)),Promise.resolve()}_get(e){const i=this.storage.getItem(e);return Promise.resolve(i?JSON.parse(i):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sh(){const t=A();return Qi(t)||Nt(t)}const Rh=1e3,kh=10;class or extends rr{constructor(){super(()=>window.localStorage,"LOCAL");this.boundEventHandler=(e,i)=>this.onStorageEvent(e,i),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Sh()&&fh(),this.fallbackToPolling=Qs(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const i of Object.keys(this.listeners)){const n=this.storage.getItem(i),s=this.localCache[i];n!==s&&e(i,s,n)}}onStorageEvent(e,i=!1){if(!e.key){this.forAllChangedKeys((o,a,h)=>{this.notifyListeners(o,h)});return}const n=e.key;if(i?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(n);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!i)return}const s=()=>{const o=this.storage.getItem(n);!i&&this.localCache[n]===o||this.notifyListeners(n,o)},r=this.storage.getItem(n);dh()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,kh):s()}notifyListeners(e,i){this.localCache[e]=i;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(i&&JSON.parse(i))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,i,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:i,newValue:n}),!0)})},Rh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,i){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(i)}_removeListener(e,i){this.listeners[e]&&(this.listeners[e].delete(i),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,i){await super._set(e,i),this.localCache[e]=JSON.stringify(i)}async _get(e){const i=await super._get(e);return this.localCache[e]=JSON.stringify(i),i}async _remove(e){await super._remove(e),delete this.localCache[e]}}or.type="LOCAL";const Oh=or;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends rr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,i){}_removeListener(e,i){}}ar.type="SESSION";const hr=ar;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(t){return Promise.all(t.map(async e=>{try{const i=await e;return{fulfilled:!0,value:i}}catch(i){return{fulfilled:!1,reason:i}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const i=this.receivers.find(s=>s.isListeningto(e));if(i)return i;const n=new Lt(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const i=e,{eventId:n,eventType:s,data:r}=i.data,o=this.handlersMap[s];if(!(o==null?void 0:o.size))return;i.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const a=Array.from(o).map(async c=>c(i.origin,r)),h=await bh(a);i.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:h})}_subscribe(e,i){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(i)}_unsubscribe(e,i){this.handlersMap[e]&&i&&this.handlersMap[e].delete(i),(!i||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Lt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(t="",e=10){let i="";for(let n=0;n<e;n++)i+=Math.floor(Math.random()*10);return t+i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,i,n=50){const s=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,h)=>{const c=nn("",20);s.port1.start();const f=setTimeout(()=>{h(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(g){const y=g;if(y.data.eventId===c)switch(y.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(y.data.response);break;default:clearTimeout(f),clearTimeout(r),h(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:i},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(){return window}function Nh(t){F().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(){return typeof F().WorkerGlobalScope!="undefined"&&typeof F().importScripts=="function"}async function Dh(){if(!(navigator==null?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ph(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Lh(){return cr()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lr="firebaseLocalStorageDb",Mh=1,Mt="firebaseLocalStorage",ur="fbase_key";class Je{constructor(e){this.request=e}toPromise(){return new Promise((e,i)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{i(this.request.error)})})}}function Ut(t,e){return t.transaction([Mt],e?"readwrite":"readonly").objectStore(Mt)}function Uh(){const t=indexedDB.deleteDatabase(lr);return new Je(t).toPromise()}function sn(){const t=indexedDB.open(lr,Mh);return new Promise((e,i)=>{t.addEventListener("error",()=>{i(t.error)}),t.addEventListener("upgradeneeded",()=>{const n=t.result;try{n.createObjectStore(Mt,{keyPath:ur})}catch(s){i(s)}}),t.addEventListener("success",async()=>{const n=t.result;n.objectStoreNames.contains(Mt)?e(n):(n.close(),await Uh(),e(await sn()))})})}async function dr(t,e,i){const n=Ut(t,!0).put({[ur]:e,value:i});return new Je(n).toPromise()}async function Fh(t,e){const i=Ut(t,!1).get(e),n=await new Je(i).toPromise();return n===void 0?null:n.value}function fr(t,e){const i=Ut(t,!0).delete(e);return new Je(i).toPromise()}const xh=800,jh=3;class pr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await sn(),this.db)}async _withRetries(e){let i=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(i++>jh)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Lt._getInstance(Lh()),this.receiver._subscribe("keyChanged",async(e,i)=>({keyProcessed:(await this._poll()).includes(i.key)})),this.receiver._subscribe("ping",async(e,i)=>["keyChanged"])}async initializeSender(){var e,i;if(this.activeServiceWorker=await Dh(),!this.activeServiceWorker)return;this.sender=new Ch(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);!n||((e=n[0])===null||e===void 0?void 0:e.fulfilled)&&((i=n[0])===null||i===void 0?void 0:i.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ph()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await sn();return await dr(e,Pt,"1"),await fr(e,Pt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,i){return this._withPendingWrite(async()=>(await this._withRetries(n=>dr(n,e,i)),this.localCache[e]=i,this.notifyServiceWorker(e)))}async _get(e){const i=await this._withRetries(n=>Fh(n,e));return this.localCache[e]=i,i}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(i=>fr(i,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Ut(s,!1).getAll();return new Je(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const i=[],n=new Set;for(const{fbase_key:s,value:r}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),i.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),i.push(s));return i}notifyListeners(e,i){this.localCache[e]=i;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(i)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,i){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(i)}_removeListener(e,i){this.listeners[e]&&(this.listeners[e].delete(i),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pr.type="LOCAL";const $h=pr;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hh(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Bh(t){return new Promise((e,i)=>{const n=document.createElement("script");n.setAttribute("src",t),n.onload=e,n.onerror=s=>{const r=U("internal-error");r.customData=s,i(r)},n.type="text/javascript",n.charset="UTF-8",Hh().appendChild(n)})}function Vh(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Ve(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(t,e){return e?B(e):(d(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends en{constructor(e){super("custom","custom");this.params=e}_getIdTokenResponse(e){return ge(e,this._buildIdpRequest())}_linkToIdToken(e,i){return ge(e,this._buildIdpRequest(i))}_getReauthenticationResolver(e){return ge(e,this._buildIdpRequest())}_buildIdpRequest(e){const i={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(i.idToken=e),i}}function Wh(t){return sr(t.auth,new rn(t),t.bypassAuthState)}function Gh(t){const{auth:e,user:i}=t;return d(i,e,"internal-error"),wh(i,new rn(t),t.bypassAuthState)}async function Kh(t){const{auth:e,user:i}=t;return d(i,e,"internal-error"),Th(i,new rn(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,i,n,s,r=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(i)?i:[i]}execute(){return new Promise(async(e,i)=>{this.pendingPromise={resolve:e,reject:i};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:i,sessionId:n,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const h={auth:this.auth,requestUri:i,sessionId:n,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(h))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wh;case"linkViaPopup":case"linkViaRedirect":return Kh;case"reauthViaPopup":case"reauthViaRedirect":return Gh;default:P(this.auth,"internal-error")}}resolve(e){H(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){H(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh=new Ve(2e3,1e4);class ye extends gr{constructor(e,i,n,s,r){super(e,i,s,r);this.provider=n,this.authWindow=null,this.pollId=null,ye.currentPopupAction&&ye.currentPopupAction.cancel(),ye.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return d(e,this.auth,"internal-error"),e}async onExecution(){H(this.filter.length===1,"Popup operations only handle one event");const e=nn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(i=>{this.reject(i)}),this.resolver._isIframeWebStorageSupported(this.auth,i=>{i||this.reject(U(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(U(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ye.currentPopupAction=null}pollUserCancellation(){const e=()=>{var i,n;if((n=(i=this.authWindow)===null||i===void 0?void 0:i.window)===null||n===void 0?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(U(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,qh.get())};e()}}ye.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="pendingRedirect",on=new Map;class Jh extends gr{constructor(e,i,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],i,void 0,n);this.eventId=null}async execute(){let e=on.get(this.auth._key());if(!e){try{const n=await Yh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(i){e=()=>Promise.reject(i)}on.set(this.auth._key(),e)}return this.bypassAuthState||on.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const i=await this.auth._redirectUserForId(e.eventId);if(i)return this.user=i,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Yh(t,e){const i=Zh(e),n=Qh(t);if(!await n._isAvailable())return!1;const s=await n._get(i)==="true";return await n._remove(i),s}function Qh(t){return B(t._redirectPersistence)}function Zh(t){return Ct(Xh,t.config.apiKey,t.name)}async function ec(t,e,i=!1){const n=Zi(t),s=zh(n,e),o=await new Jh(n,s,i).execute();return o&&!i&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc=10*60*1e3;class ic{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let i=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(i=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nc(e)||(this.hasHandledPotentialRedirect=!0,i||(this.queuedRedirectEvent=e,i=!0)),i}sendToConsumer(e,i){var n;if(e.error&&!vr(e)){const s=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";i.onError(U(this.auth,s))}else i.onAuthEvent(e)}isEventForConsumer(e,i){const n=i.eventId===null||!!e.eventId&&e.eventId===i.eventId;return i.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=tc&&this.cachedEventUids.clear(),this.cachedEventUids.has(mr(e))}saveEventToCache(e){this.cachedEventUids.add(mr(e)),this.lastProcessedEventTime=Date.now()}}function mr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function vr({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function nc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return vr(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sc(t,e={}){return ze(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,oc=/^https?/;async function ac(t){if(t.config.emulator)return;const{authorizedDomains:e}=await sc(t);for(const i of e)try{if(hc(i))return}catch{}P(t,"unauthorized-domain")}function hc(t){const e=Gi(),{protocol:i,hostname:n}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&n===""?i==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):i==="chrome-extension:"&&o.hostname===n}if(!oc.test(i))return!1;if(rc.test(t))return n===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=new Ve(3e4,6e4);function yr(){const t=F().___jsl;if(t==null?void 0:t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let i=0;i<t.CP.length;i++)t.CP[i]=null}}function lc(t){return new Promise((e,i)=>{var n,s,r;function o(){yr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{yr(),i(U(t,"network-request-failed"))},timeout:cc.get()})}if((s=(n=F().gapi)===null||n===void 0?void 0:n.iframes)===null||s===void 0?void 0:s.Iframe)e(gapi.iframes.getContext());else if((r=F().gapi)===null||r===void 0?void 0:r.load)o();else{const a=Vh("iframefcb");return F()[a]=()=>{gapi.load?o():i(U(t,"network-request-failed"))},Bh(`https://apis.google.com/js/api.js?onload=${a}`)}}).catch(e=>{throw Ft=null,e})}let Ft=null;function uc(t){return Ft=Ft||lc(t),Ft}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dc=new Ve(5e3,15e3),fc="__/auth/iframe",pc="emulator/auth/iframe",gc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vc(t){const e=t.config;d(e.authDomain,t,"auth-domain-config-required");const i=e.emulator?Ki(e,pc):`https://${t.config.authDomain}/${fc}`,n={apiKey:e.apiKey,appName:t.name,v:Se},s=mc.get(t.config.apiHost);s&&(n.eid=s);const r=t._getFrameworks();return r.length&&(n.fw=r.join(",")),`${i}?${Ie(n).slice(1)}`}async function yc(t){const e=await uc(t),i=F().gapi;return d(i,t,"internal-error"),e.open({where:document.body,url:vc(t),messageHandlersFilter:i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gc,dontclear:!0},n=>new Promise(async(s,r)=>{await n.restyle({setHideOnLeave:!1});const o=U(t,"network-request-failed"),a=F().setTimeout(()=>{r(o)},dc.get());function h(){F().clearTimeout(a),s(n)}n.ping(h).then(h,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ic=500,Ec=600,Tc="_blank",wc="http://localhost";class _r{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ac(t,e,i,n=Ic,s=Ec){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let a="";const h=Object.assign(Object.assign({},_c),{width:n.toString(),height:s.toString(),top:r,left:o}),c=A().toLowerCase();i&&(a=Ks(c)?Tc:i),Gs(c)&&(e=e||wc,h.scrollbars="yes");const f=Object.entries(h).reduce((y,[R,D])=>`${y}${R}=${D},`,"");if(uh(c)&&a!=="_self")return Sc(e||"",a),new _r(null);const g=window.open(e||"",a,f);d(g,t,"popup-blocked");try{g.focus()}catch{}return new _r(g)}function Sc(t,e){const i=document.createElement("a");i.href=t,i.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),i.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc="__/auth/handler",kc="emulator/auth/handler";function Ir(t,e,i,n,s,r){d(t.config.authDomain,t,"auth-domain-config-required"),d(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:i,redirectUrl:n,v:Se,eventId:s};if(e instanceof tr){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Fr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,c]of Object.entries(r||{}))o[h]=c}if(e instanceof Xe){const h=e.getScopes().filter(c=>c!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];return`${Oc(t)}?${Ie(a).slice(1)}`}function Oc({config:t}){return t.emulator?Ki(t,kc):`https://${t.authDomain}/${Rc}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an="webStorageSupport";class bc{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hr,this._completeRedirectFn=ec}async _openPopup(e,i,n,s){var r;H((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=Ir(e,i,n,Gi(),s);return Ac(e,o,nn())}async _openRedirect(e,i,n,s){return await this._originValidation(e),Nh(Ir(e,i,n,Gi(),s)),new Promise(()=>{})}_initialize(e){const i=e._key();if(this.eventManagers[i]){const{manager:s,promise:r}=this.eventManagers[i];return s?Promise.resolve(s):(H(r,"If manager is not set, promise should be"),r)}const n=this.initAndGetManager(e);return this.eventManagers[i]={promise:n},n}async initAndGetManager(e){const i=await yc(e),n=new ic(e);return i.register("authEvent",s=>(d(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=i,n}_isIframeWebStorageSupported(e,i){this.iframes[e._key()].send(an,{type:an},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[an];o!==void 0&&i(!!o),P(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const i=e._key();return this.originValidationPromises[i]||(this.originValidationPromises[i]=ac(e)),this.originValidationPromises[i]}get _shouldInitProactively(){return Qs()||Qi()||Nt()}}const Cc=bc;var Er="@firebase/auth",Tr="0.19.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const i=this.auth.onIdTokenChanged(n=>{var s;e(((s=n)===null||s===void 0?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,i),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const i=this.internalListeners.get(e);!i||(this.internalListeners.delete(e),i(),this.updateProactiveRefresh())}assertAuthConfigured(){d(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Pc(t){Ae(new ae("auth",(e,{options:i})=>{const n=e.getProvider("app").getImmediate(),{apiKey:s,authDomain:r}=n.options;return(o=>{d(s&&!s.includes(":"),"invalid-api-key",{appName:o.name}),d(!(r==null?void 0:r.includes(":")),"argument-error",{appName:o.name});const a={apiKey:s,authDomain:r,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zs(t)},h=new ph(o,a);return qa(h,i),h})(n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,i,n)=>{e.getProvider("auth-internal").initialize()})),Ae(new ae("auth-internal",e=>{const i=Zi(e.getProvider("auth").getImmediate());return(n=>new Nc(n))(i)},"PRIVATE").setInstantiationMode("EXPLICIT")),V(Er,Tr,Dc(t)),V(Er,Tr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(t=mn()){const e=Kt(t,"auth");return e.isInitialized()?e.getImmediate():Ka(t,{popupRedirectResolver:Cc,persistence:[$h,Oh,hr]})}Pc("Browser");var Lc="firebase",Mc="9.4.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */V(Lc,Mc,"app");export{Fc as O,jc as g,Uc as i,xc as s};
