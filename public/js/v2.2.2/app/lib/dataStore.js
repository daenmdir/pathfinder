define([],()=>{"use strict";return class DataStore{constructor(){this._store=new WeakMap}set(t,e,s){return this._store.has(t)||this._store.set(t,new Map),this._store.get(t).set(e,s),t}get(t,e){return this._store.has(t)&&(e?this._store.get(t).get(e):this._store.get(t))}has(t,e){return this._store.has(t)&&this._store.get(t).has(e)}remove(t,e){let s=!1;return this._store.has(t)&&(s=this._store.get(t).delete(e),this._store.get(t).size||this._store.delete(t)),s}}});
//# sourceMappingURL=dataStore.js.map
