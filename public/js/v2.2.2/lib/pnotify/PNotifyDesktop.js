var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e(require("./PNotify")):"function"==typeof define&&define.amd?define("PNotifyDesktop",["./PNotify"],e):t.PNotifyDesktop=e(PNotify)}(this,function(t){"use strict";t=t&&t.__esModule?t.default:t;var e=void 0,i=window.Notification,n=function(t,e,o,s){return(n="Notification"in window?function(t,e,n,o){var s=new i(t,e);return"NotificationEvent"in window?(s.addEventListener("notificationclick",n),s.addEventListener("close",o)):"addEventListener"in s?(s.addEventListener("click",n),s.addEventListener("close",o)):(s.onclick=n,s.onclose=o),s}:"mozNotification"in navigator?function(t,e,i,n){var o=navigator.mozNotification.createNotification(t,e.body,e.icon).show();return o.onclick=i,o.onclose=n,o}:"webkitNotifications"in window?function(t,e,i,n){var o=window.webkitNotifications.createNotification(e.icon,t,e.body);return o.onclick=i,o.onclose=n,o}:function(t,e,i,n){return null})(t,e,o,s)};var o,s={initModule:function(i){var n=this;this.set(i);var o=this.get()._notice;this.set({_oldAnimation:o.get().animation}),o.on("state",function(t){var i=t.changed,s=t.current,A=t.previous;i.animation&&(void 0===A.animation||"none"!==s.animation||"none"===A.animation&&s.animation!==n.get()._oldAnimation)&&n.set({_oldAnimation:s.animation}),i._animatingClass&&(""===s._animatingClass||0!==e&&n.get().fallback||!n.get().desktop||o.set({_animatingClass:""}))}),this.get().desktop&&(0===(e=t.modules.Desktop.checkPermission())?(o.set({animation:"none"}),o.addModuleClass("ui-pnotify-desktop-hide"),this.genNotice()):this.get().fallback||o.set({autoDisplay:!1}))},update:function(){var t=this.get()._notice;if(0!==e&&this.get().fallback||!this.get().desktop)return t.set({animation:this.get()._oldAnimation}),void t.removeModuleClass("ui-pnotify-desktop-hide");t.set({animation:"none"}),t.addModuleClass("ui-pnotify-desktop-hide"),this.genNotice()},beforeOpen:function(){if(this.get().desktop&&0!==e&&t.modules.Desktop.permission(),(0===e||!this.get().fallback)&&this.get().desktop){var i=this.get()._desktop;i&&"show"in i&&(this.get()._notice.set({_moduleIsNoticeOpen:!0}),i.show())}},beforeClose:function(){if((0===e||!this.get().fallback)&&this.get().desktop){var t=this.get()._desktop;t&&"close"in t&&(t.close(),this.get()._notice.set({_moduleIsNoticeOpen:!1}))}},genNotice:function(){var t=this.get(),e=t._notice,i=t.icon;if(null===i)switch(e.get().type){case"error":this.set({_icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATQg7e6HvQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABr0lEQVRYw8WXu0oDQRSGv7hRSFYrLTTWKihaqUgUJO+gphBLL1jYpPSCVcAggpWthYhC7Ows9An0IbSPkMRCw8ZmFuI6yczs9cAPuzNz5v92brtrESxGARtokkCcAg2hk7jNl4G2R/m4zFPAiwTgWdRFHnmJuaulOAAaPQDqUZvv9DB3tR0lwIcGwHtU5uca5q4qYZvngJbHpAZ8CtU8dS1gLEyAisegBGTFKWiL65KnzVlY5uOSId6VtNuTtMupOu/TAHiQlNmSskHNXCOAGWBeUp7VhFoApoMAXAOWJoCszBJ9+ALY6vL0JiPgjsKmKUAaOOoBZwIAcNxlJLsCrAOTIQJMAWu62y4LOIqT7lGS96TIcYCMDkBZ46h1gB+PHI28ssq8X/G6DaqG8Piz2DrjVjGXbtSBy46F5QAHwJAizwZugKKscs7gSaqS/KpB/qxsFxwafhf6Odb/eblJi8BGwJdW26BtURxQpMU83hmaDQsNiPtvYMSwj3tgAqDgYzU7wJdHjo9+CgBvEW47lV5Tgj5DMtG0xIfESkIAF+522gdWxTzGEX3i9+6KpOMXF5UBt0NKJCAAAAAASUVORK5CYII="});break;case"success":this.set({_icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATQPRj+65AAAAdBJREFUWMPtlzsvRFEQx3+7HmEjoiYKolVJJDRqnS8ggvVIVEQhCIUsEYJGCEH2E4h4FPREaLTbEo1IEJXHrmY2GTf33nPuY7ud5OTenTMz//89Z86ZWShLWf5LB3AOfACFiOMF2AkC3qOc88BXxFEAxlX8ftGdaNCEen8H6oFHYBR4FocwkpTngzzHgF01fwL0aYcp9fVtMW/rsMcWXWijK1Hexgye9smRT6CxaHgjytMYwccNSXqoja9FeVbiZS+OVaeDiUBLAPAJA/i2m5MXgRSQk7llC/DBMOBeBGqAe0eAjQhfvurH3EmgQk6EW6CVEHt+ZFo6J4EU8OoTcF35jhnAl2wSx20LFgyB1yyOWtY2c72ScMAAkPeZy6g4zUBdGAIAcyEq4Z7y7xbdTFgCACMBwPVJqVDHeNqvaplkH5i0sNuUwmaNkQxww20ZSOy7gFvX7SAk0i76jPQQlJoAwAEwq35ngfmwVatSdUMArZZ+K9JQ1Bp6iGqgSt7f/AIOqSzujLEn6AV+JG6zm4HuCZ+AJuAbWAQu5aIJu7JDck0ngDugC/j1c2qPqR13jpxuvWyS8liY/kQcean/lX6ACQ99DdAQYe+Lf0zylMUgf7qDKgzv284QAAAAAElFTkSuQmCC"});break;case"info":this.set({_icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATQ09zRTwAAAAdxJREFUWMPtl88rRFEUxz8zBolRCgsrpOym8TMSO2WplLKwUrKi/B0W7JSFmhVLNlhSlLKx8CtRGpEsJpofpZk3Nkc9b968e++8mdlw6vTeu/edc773nl/3wl+ngOH/zUAf0AN0AmEgB7wCD8AtcFMJoM3ADpAHLHk62RIwL8B0uQwHgXVRnDfkS2DSj/EW4K0Ew05eLMV4O/CuUJwEUvJUgdgwMd4IpBUKl13kVG6aL+ZjJ20DDQqQXy5jKYVMDBhVrb5f069LLrKfGnInqh040HRTvsTAHgei9oGQ7X0YaNNUNCdFKChgQvKtQ1vAkNvEahlSToez9oXad2BCA30ceHZxRxMQMShuvZLmv+hOA32/h+KUwS7MugVhqwb6Go+5nEEwht0ABDUEzyXdFsrQYwqMJjTbdxio9Qkg6QbgvkpnkLw0uQIAZ1UCYNkXawdw4qPCmVBcuADAMZCpAoCVYr3AKtYyHZSWauakjMx50TWwrzJw6lFARjQOt3se8jM6W9TloSCqIb9bRHbN5Fg+KkEZcow/Ak+KFBsD6h3jR8CUabAMlqn7xfxEbAdwWKLhhO3sGPCbOsNSvSyF0Z/5TaCuEleziLhmAOiWG1NWrmZXwIVU1A/+SZO+AcgLC4wt0zD3AAAAAElFTkSuQmCC"});break;case"notice":default:this.set({_icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQJATM4scOJLAAAAcxJREFUWMPtljtLA0EQx3+J0QRfnYqCiCA+MERBrIwgFtoFbMTOR61i5QcQBdEihZWNoEWwsNAvkMJeBLHRQtHC0iIP4utOmw2cx97d7l2SRgcGbufmv/Pf2dmdhb8uIR+YJqAPaBff30AeeAHuxLgqMgRkgS/AAEybGuLfEdBcycCTwKVYmY5mgO6gwdd8BLaqAST9Bs8EDG7VTd3gex4TbgEjwKjQOHDugZlRDb7sMZEJpCS4bYVMJOygsG1cB+wqHN0Gib1RYXFpLwL74nx7Sb3EFlXATQNjTgRagA3FbZIRiCliT5wITGgUaRACA0CPjMC4xtUcDUAgDAzLCCQ0MhALQCAE9MoIdGkQCJIBgE4ZgWiNMvDL10qgUMMMFGQEnjQmkLXbVg38s8y4qtFcTCAnHiJ5oKiJnSoHjVgIXAmHkGIl5yy+YcWruIy9dvqpupIDCfZWEXvh1gsWFVfxIbG9a3RbRwJnYiuqJYfAqxsBgBWFiQyJzfTAlIB1uzEicbwBFoBTl8lSwINoSuXKjrv4F4FBh61zlKUKvgn7/e5ZEngMEDgLdFSieHaAT42LpgTMVbqC24B54Bi4twV9E6cnDcw6PFj+RSo/l6rlSlldhx4AAAAASUVORK5CYII="})}else!1===i?this.set({_icon:null}):this.set({_icon:i});var o=this.get().tag;this.get()._tag&&null===o||this.set({_tag:null===o?"PNotify-"+Math.round(1e6*Math.random()):o});var s={body:this.get().text||e.get().text,tag:this.get()._tag};e.get().hide||(s.requireInteraction=!0),null!==this.get()._icon&&(s.icon=this.get()._icon),Object.apply(s,this.get().options);var A=n(this.get().title||e.get().title,s,function(){e.fire("click",{target:A})},function(){e.close()});e.set({_moduleIsNoticeOpen:!0}),this.set({_desktop:A}),!("close"in A)&&"cancel"in A&&(A.close=function(){A.cancel()})}};function A(){var t,e,i,n=(t="style",document.createElement(t));n.id="svelte-xbgnx4-style",n.textContent="[ui-pnotify].ui-pnotify-desktop-hide.ui-pnotify{left:-10000px !important;display:none !important}",e=document.head,i=n,e.appendChild(i)}function a(e){!function(t,e){t._handlers=l(),t._slots=l(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}(this,e),this._state=c(_extends({_notice:null,_options:{}},t.modules.Desktop.defaults),e.data),this._intro=!0,document.getElementById("svelte-xbgnx4-style")||A(),this._fragment=(this._state,{c:r,m:r,p:r,d:r}),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor))}function r(){}function c(t,e){for(var i in e)t[i]=e[i];return t}function l(){return Object.create(null)}function g(t){for(;t&&t.length;)t.shift()()}return c(a.prototype,{destroy:function(t){this.destroy=r,this.fire("destroy"),this.set=r,this._fragment.d(!1!==t),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var i=t in this._handlers&&this._handlers[t].slice();if(!i)return;for(var n=0;n<i.length;n+=1){var o=i[n];if(!o.__calling)try{o.__calling=!0,o.call(this,e)}finally{o.__calling=!1}}},on:function(t,e){var i=this._handlers[t]||(this._handlers[t]=[]);return i.push(e),{cancel:function(){var t=i.indexOf(e);~t&&i.splice(t,1)}}},set:function(t){if(this._set(c({},t)),this.root._lock)return;e=this.root,e._lock=!0,g(e._beforecreate),g(e._oncreate),g(e._aftercreate),e._lock=!1;var e},_set:function(t){var e=this._state,i={},n=!1;for(var o in t=c(this._staged,t),this._staged={},t)this._differs(t[o],e[o])&&(i[o]=n=!0);if(!n)return;this._state=c(c({},e),t),this._recompute(i,this._state),this._bind&&this._bind(i,this._state);this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:e}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:e}))},_stage:function(t){c(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"===(void 0===t?"undefined":_typeof(t))||"function"==typeof t}}),c(a.prototype,s),a.prototype._recompute=r,(o=a).key="Desktop",o.defaults={desktop:!1,fallback:!0,icon:null,tag:null,title:null,text:null,options:{}},o.init=function(t){return new o({target:document.body})},o.permission=function(){void 0!==i&&"requestPermission"in i?i.requestPermission():"webkitNotifications"in window&&window.webkitNotifications.requestPermission()},o.checkPermission=function(){return void 0!==i&&"permission"in i?"granted"===i.permission?0:1:"webkitNotifications"in window&&0==window.webkitNotifications.checkPermission()?0:1},e=o.checkPermission(),t.modules.Desktop=o,a});
//# sourceMappingURL=PNotifyDesktop.js.map
