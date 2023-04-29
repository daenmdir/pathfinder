(function(){"use strict";var t=this.Farahey={};"undefined"!=typeof exports&&(exports.Farahey=t);var n=this.Biltong,e=function(t,n,e){var i=function(t,n,e){for(var i=0,r=t.length,o=-1,u=0;i<r;)if((u=e(t[o=parseInt((i+r)/2)],n))<0)i=o+1;else{if(!(u>0))return o;r=o}return i}(t,n,e);t.splice(i,0,n)},i=[function(t,n){return t.x+t.w-n.x},function(t,n){return t.x-(n.x+n.w)}],r=[function(t,n){return t.y+t.h-n.y},function(t,n){return t.y-(n.y+n.h)}],o=[null,[i[0],r[1]],[i[0],r[0]],[i[1],r[0]],[i[1],r[1]]],u=t.calculateSpacingAdjustment=function(t,e){var i=t.center||[t.x+t.w/2,t.y+t.h/2],r=e.center||[e.x+e.w/2,e.y+e.h/2],u=n.gradient(i,r),a=n.quadrant(i,r);return function(t,n,e,i,r){isNaN(e)&&(e=0);var u,a,c,s,f,l,h=n.y+n.h,p=e==1/0||e==-1/0?n.x+n.w/2:(h-i)/e,d=Math.atan(e);return f="w",l=p,(c=n)[s="x"]<=l&&l<=c[s]+c[f]?{left:a=(u=o[r][1](t,n))/Math.sin(d)*Math.cos(d),top:u}:{left:a=o[r][0](t,n),top:u=a/Math.cos(d)*Math.sin(d)}}(t,e,u,u==1/0||u==-1/0||isNaN(u)?0:i[1]-u*i[0],a)},a=t.paddedRectangle=function(t,n,e){return{x:t[0]-e[0],y:t[1]-e[1],w:n[0]+2*e[0],h:n[1]+2*e[1]}},c=function(t){if(null==t)return null;if("[object Array]"===Object.prototype.toString.call(t)){var n=[];return n.push.apply(n,t),n}var e=[];for(var i in t)e.push(t[i]);return e},s=function(t){var i,r,o=t.getPosition,s=t.getSize,f=t.getId,l=t.setPosition,h=t.padding||[20,20],p=t.constrain||function(t,n,e){return e},d=[],g={},v={},x=c(t.elements||[]),y=t.origin||[0,0],m=t.executeNow,w=(this.getOrigin=function(){return y},t.filter||function(t){return!0}),M=t.exclude||function(t){return!1},E=t.orderByDistanceFromOrigin,O=new function(t,e){var i=t,r={},o=function(t){if(!r[t[1]]){var n=e(t[2]);r[t[1]]={l:t[0][0],t:t[0][1],w:n[0],h:n[1],center:[t[0][0]+n[0]/2,t[0][1]+n[1]/2]}}return r[t[1]]};this.setOrigin=function(t){i=t,r={}},this.compare=function(t,e){var r=n.lineLength(i,o(t).center),u=n.lineLength(i,o(e).center);return r<u?-1:r==u?0:1}}(y,s),b=t.updateOnStep,A=t.stepInterval||350,C=t.debug,F=function(t){E&&0!=d.length?e(d,t,O.compare):d.push(t)},N=function(){return O.setOrigin(y),d=[],g={},v={},function(t){var n,e,i,r;n=e=1/0,i=r=-1/0;for(var u=0;u<t.length;u++){var a=o(t[u]),c=s(t[u]),l=f(t[u]);g[l]=[a.left,a.top],F([[a.left,a.top],l,t[u]]),v[l]=c,n=Math.min(n,a.left),e=Math.min(e,a.top),i=Math.max(i,a.left+c[0]),r=Math.max(r,a.top+c[1])}return[n,i,e,r]}(x)},I=function(t){if(x.length>1){var e=(t=t||{}).filter||w,i=t.padding||h,r=t.iterations,o=t.exclude||M,c=t.excludeFocus,s=function(t,e,i,r,o,c,s,f,l,h,p,d,g){c=c||[0,0],h=h||function(){},p=p||2;var v,x,y=a(c,[1,1],r),m=1,w=!0,M={},E=function(t,n,e,i){M[t]=!0,n[0]+=e,n[1]+=i},O=function(){for(var c=0;c<t.length;c++)if(!d(t[c][1],t[c][2])){var M=e[t[c][1]],b=t[c][1],A=(t[c][2],i[t[c][1]]),C=a(M,A,r);!g&&s(t[c][1],t[c][2])&&n.intersects(y,C)&&(v=u(y,C),x=o(t[c][1],M,v),E(b,M,x.left,x.top)),C=a(M,A,r);for(var F=0;F<t.length;F++)if(c!=F){if(d(t[F][1],t[F][2]))continue;if(s(t[F][1],t[F][2])){var N=e[t[F][1]],I=i[t[F][1]],P=a(N,I,r);n.intersects(C,P)&&(w=!0,v=u(C,P),x=o(t[F][1],N,v),E(t[F][1],N,x.left,x.top))}}}f&&h(),w&&m<p&&(w=!1,m++,f?window.setTimeout(O,l):O())};return O(),M}(d,g,v,i,p,y,e,b,A,P,r,o,c);P(s)}},P=function(t){for(var n=0;n<x.length;n++){var e=f(x[n]);t[e]&&l(x[n],{left:g[e][0],top:g[e][1]})}},S=function(t){null!=t&&(y=t,O.setOrigin(t))};return this.execute=function(t,n){S(t),N(),I(n)},this.executeAtCenter=function(t){var n=N();S([(n[0]+n[1])/2,(n[2]+n[3])/2]),I(t)},this.executeAtEvent=function(n,e){var r=t.container,o=t.getContainerPosition(r),u=n.pageX-o.left+r.scrollLeft,a=n.pageY-o.top+r.scrollTop;C&&(i.style.left=n.pageX+"px",i.style.top=n.pageY+"px"),this.execute([u,a],e)},this.setElements=function(t){return x=c(t),this},this.addElement=function(t,n){return null==t||!n&&-1!==x.indexOf(t)||x.push(t),this},this.addElements=function(t,n){if(n)Array.prototype.push.apply(x,t);else for(var e=0;e<t.length;e++)this.addElement(t[e]);return this},this.getElements=function(){return x},this.removeElement=function(t){for(var n=-1,e=0;e<x.length;e++)if(x[e]==t){n=e;break}return-1!=n&&x.splice(n,1),this},this.setPadding=function(t){h=t},this.setConstrain=function(t){p=t},this.setFilter=function(t){w=t},this.reset=function(){x.length=0},C&&((r=document.createElement("div")).style.position="absolute",r.style.width="10px",r.style.height="10px",r.style.backgroundColor="red",document.body.appendChild(r),i=r),m&&this.execute(),this};t.getInstance=function(t){return new s(t)}}).call("undefined"!=typeof window?window:this);
//# sourceMappingURL=farahey.js.map
