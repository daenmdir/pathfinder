define(["jquery","app/init","app/util","bootbox","app/map/util","app/map/magnetizing"],(e,t,s,a,l,o)=>{"use strict";let i={newSystemOffset:{x:130,y:0},systemHeadInfoClass:"pf-system-head-info",systemHeadInfoLeftClass:"pf-system-head-info-left",systemHeadInfoRightClass:"pf-system-head-info-right",systemHeadRegionClass:"pf-system-head-region",systemTooltipInnerIdPrefix:"pf-system-tooltip-inner-",systemTooltipInnerClass:"pf-system-tooltip-inner",dialogSystemId:"pf-system-dialog",dialogSystemSelectClass:"pf-system-dialog-select",dialogSystemStatusSelectId:"pf-system-dialog-status-select",dialogSystemLockId:"pf-system-dialog-lock",dialogSystemRallyId:"pf-system-dialog-rally",dialogSystemSectionInfoId:"pf-system-dialog-section-info",dialogSystemSectionInfoStatusId:"pf-system-dialog-section-info-status",dialogSystemAliasId:"pf-system-dialog-alias",dialogSystemSignaturesId:"pf-system-dialog-signatures",dialogSystemDescriptionId:"pf-system-dialog-description",dialogSystemCreatedId:"pf-system-dialog-created",dialogSystemUpdatedId:"pf-system-dialog-updated",dialogRallyId:"pf-rally-dialog",dialogRallyPokeDesktopId:"pf-rally-dialog-poke-desktop",dialogRallyPokeSlackId:"pf-rally-dialog-poke-slack",dialogRallyPokeDiscordId:"pf-rally-dialog-poke-discord",dialogRallyPokeMailId:"pf-rally-dialog-poke-mail",dialogRallyMessageId:"pf-rally-dialog-message",dialogRallyMessageDefault:"I need some help!\n\n- Potential PvP options around\n- DPS and Logistic ships needed"};e.fn.showRallyPointDialog=(o=>{let n=o.data("mapid"),d=o.data("id"),r=s.getCurrentMapData(n);requirejs(["text!templates/dialog/system_rally.html","mustache"],function(c,m){let g=t=>{t.each(function(){e(this).on("change",function(){let s=!0;t.each(function(){this.checked&&(s=!1)});let a=e("#"+i.dialogRallyMessageId);s?a.prop("disabled",!0):a.prop("disabled",!1)})})},y=(a,l)=>{l.rallyDialog.find(".modal-content").showLoadingAnimation(),e.ajax({type:"POST",url:t.path.pokeRally,data:a,dataType:"json",context:l}).done(function(e){}).fail(function(e,t,a){let l=t+" "+a;s.showNotify({title:e.status+": sendPoke",text:l,type:"warning"})}).always(function(){this.rallyDialog.find(".modal-content").hideLoadingAnimation()})},p={id:i.dialogRallyId,dialogRallyPokeDesktopId:i.dialogRallyPokeDesktopId,dialogRallyPokeSlackId:i.dialogRallyPokeSlackId,dialogRallyPokeDiscordId:i.dialogRallyPokeDiscordId,dialogRallyPokeMailId:i.dialogRallyPokeMailId,dialogRallyMessageId:i.dialogRallyMessageId,desktopRallyEnabled:!0,slackRallyEnabled:Boolean(s.getObjVal(r,"config.logging.slackRally")),discordRallyEnabled:Boolean(s.getObjVal(r,"config.logging.discordRally")),mailRallyEnabled:Boolean(s.getObjVal(r,"config.logging.mailRally")),dialogRallyMessageDefault:i.dialogRallyMessageDefault,systemUrl:l.getMapDeeplinkUrl(n,d),systemId:d},f=m.render(c,p),h=a.dialog({message:f,title:'Set rally point in "'+o.getSystemInfo(["alias"])+'"',buttons:{close:{label:"cancel",className:"btn-default"},success:{label:'<i class="fas fa-fw fa-volume-up"></i> set rally point',className:"btn-success",callback:function(){let t=e("#"+i.dialogRallyId).find("form").getFormValues();o.setSystemRally(1,{poke:Boolean(t.pokeDesktop)}),l.markAsChanged(o),y(t,{rallyDialog:this})}}}});h.initTooltips(),h.on("shown.bs.modal",function(e){g(h.find(":checkbox"))})})}),e.fn.showDeleteSystemDialog=((t,l=[])=>{let o=e(t.getContainer()),i=[],n=0;for(let t of l){let s=e(t);s.data("mapid")!==o.data("id")||s.data("locked")||(i.push(t),n+=s.data("userCount")?parseInt(s.data("userCount")):0)}if(i.length){let o="";if(1===i.length){let t=e(i[0]),s=t.data("name"),a=t.getSystemInfo(["alias"]),l=s===a?'"'+s+'"':'"'+a+'" ('+s+")";o="Delete system "+(l='<span class="txt-color txt-color-warning">'+l+"</span>")+" and all its connections?"}else o="Delete "+i.length+" selected systems and their connections?";n>0&&(o+=' <span class="txt-color txt-color-warning">Warning: '+n+" active characters</span>");let r=a.confirm(o,a=>{a&&d(t,i,t=>{if(r.modal("hide"),t.length!==i.length){let e=i.length-t.length;s.showNotify({title:"Failed to delete systems",text:"("+e+"/"+i.length+") systems could not be deleted",type:"warning"})}else 1===t.length?s.showNotify({title:"System deleted",text:e(t[0]).data("name"),type:"success"}):s.showNotify({title:l.length+" systems deleted",type:"success"})})})}else s.showNotify({title:"No systems selected",type:"warning"});return this}),e.fn.toggleSystemTooltip=function(t,a){let l={good:{colorClass:"txt-color-green",iconClass:"fa-caret-up"},bad:{colorClass:"txt-color-red",iconClass:"fa-caret-down"}},o=e=>s.getObjVal(l,e+".colorClass")||"",d=(e,t)=>'<i class="fas '+(e=>s.getObjVal(l,e+".iconClass")||"")(t)+'"></i>&nbsp;'+e;return this.each(function(){let l=e(this);switch(t){case"destroy":l.tooltip("destroy").removeAttr("title data-original-title");break;case"hide":l.tooltip("hide");break;case"show":let r=!l.hasClass("jsPlumb_dragged");if(l.data("bs.tooltip")){if(a.hasOwnProperty("userCount")&&a.hasOwnProperty("highlight")){let e=l.attr("data-original-title"),t=d(a.userCount,a.highlight);if(e!==t){let e=l.attr("title",t).tooltip("fixTitle").data("bs.tooltip").$tip.find(".tooltip-inner");e.html(t);let s=o(a.highlight);e.hasClass(s)||e.removeClass(o("good")+" "+o("bad")).addClass(s)}}!l.data("bs.tooltip").tip().hasClass("in")&&r&&(l.data("bs.tooltip").options.placement=n(l),l.tooltip("show"))}else if(a.hasOwnProperty("systemId")&&a.hasOwnProperty("userCount")&&a.hasOwnProperty("highlight")){let t=i.systemTooltipInnerIdPrefix+a.systemId,c='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div id="'+t+'" class="tooltip-inner txt-color '+i.systemTooltipInnerClass+'"></div></div>',m={trigger:"manual",placement:n(l),html:!0,animation:!0,template:c,container:l.closest("."+s.config.mapClass)};l.attr("title",d(a.userCount,a.highlight)),l.tooltip(m),l.one("shown.bs.tooltip",function(){e("#"+this.innerTooltipId).addClass(this.highlightClass)}.bind({highlightClass:o(a.highlight),innerTooltipId:t})),r&&l.tooltip("show")}}})};let n=e=>{let t=e.parent().offset();return e.offset().top-t.top<27?"bottom":"top"},d=(t,a=[],l=(e=>{}))=>{let o=e(t.getContainer()),i=a.map(t=>e(t).data("id"));s.request("DELETE","System",i,{mapId:o.data("id")},{map:t,systems:a}).then(t=>{let s=t.context.systems.filter(function(t){return-1!==this.indexOf(e(t).data("id"))},t.data);r(t.context.map,s),l(s)},s.handleAjaxErrorResponse)},r=(a,i)=>{let n=e=>{a.remove(e)};for(let d of i){d=e(d);let i=parseInt(d.data("mapid"))||0;if(d.hasClass(l.config.systemActiveClass)){s.deleteCurrentSystemData(i);let t=l.getTabContentElementByMapElement(d);e(t).trigger("pf:removeSystemModules")}a.deleteConnectionsForElement(d,{fireEvent:!1}),o.removeElement(i,d[0]),d.toggleSystemTooltip("destroy",{}),d.destroyPopover(!0),d.velocity("transition.whirlOut",{duration:t.animationSpeed.mapDeleteSystem,complete:n})}},c=e=>{let t=0,s=0,a=l.newSystemPositionBySystem(e);if(a.length)t=a[0].left,s=a[0].top;else{let a=e.css("left"),l=e.css("top");a=parseInt(a.substring(0,a.length-2)),l=parseInt(l.substring(0,l.length-2)),t=a+i.newSystemOffset.x,s=l+i.newSystemOffset.y}return{x:t,y:s}};return{showNewSystemDialog:(o,n,d)=>{let r=e(o.getContainer()),m=r.data("id"),g=(e,t=null)=>{let a='<span class="editable-empty">empty</span>',l='<span class="editable-empty">unknown</span>',o="fadeOut",n="hide",d=a,r=!1,c=a,m=0,g=a,y=l,p=l;if(t){o="fadeIn",n="show",d='<span class="txt-color txt-color-success">loaded</span>',r=parseInt(s.getObjVal(t,"status.id"))||r,c=t.alias.length?s.htmlEncode(t.alias):c,m=(s.getObjVal(t,"signatures")||[]).length,g=t.description.length?t.description:g;let e=new Date(1e3*t.created.created),a=new Date(1e3*t.updated.updated),l=s.convertDateToUTC(e),i=s.convertDateToUTC(a);y=s.convertDateToString(l),p=s.convertDateToString(i)}else null===t&&(o="fadeIn");e.find("#"+i.dialogSystemSectionInfoStatusId).html(d),!1!==r&&e.find("#"+i.dialogSystemStatusSelectId).val(r).trigger("change"),e.find("#"+i.dialogSystemAliasId).html(c),e.find("#"+i.dialogSystemSignaturesId).toggleClass("txt-color-green",m>0).html(m),e.find("#"+i.dialogSystemDescriptionId).html(g),e.find("#"+i.dialogSystemCreatedId).html('<i class="fas fa-fw fa-plus"></i>&nbsp'+y),e.find("#"+i.dialogSystemUpdatedId).html('<i class="fas fa-fw fa-pen"></i>&nbsp'+p),e.find('[data-target="#'+i.dialogSystemSectionInfoId+'"]').velocity("stop").velocity(o,{duration:120}),e.find('[data-type="spinner"]').removeClass("in"),e.find("#"+i.dialogSystemSectionInfoId).collapse(n)},y=(e,t,a)=>{e.find('[data-type="spinner"]').addClass("in"),s.request("GET","System",a,{mapId:t,isCcpId:1},{dialogElement:e}).then(e=>g(e.context.dialogElement,e.data)).catch(e=>g(e.context.dialogElement))},p=[{id:0,text:"auto"}],f=r.getMapDataFromClient(["hasId"]).data.systems,h=f.length,u=r.data("typeName"),S=t.mapTypes[u].defaultConfig.max_systems;if(h>=S)return void s.showNotify({title:"Max system count exceeded",text:"Limit of "+S+" systems reached",type:"warning"});let I,C=f.map(e=>e.systemId),b={id:i.dialogSystemId,select2Class:s.config.select2Class,systemSelectClass:i.dialogSystemSelectClass,statusSelectId:i.dialogSystemStatusSelectId,lockId:i.dialogSystemLockId,rallyId:i.dialogSystemRallyId,sectionInfoId:i.dialogSystemSectionInfoId,sectionInfoStatusId:i.dialogSystemSectionInfoStatusId,aliasId:i.dialogSystemAliasId,signaturesId:i.dialogSystemSignaturesId,descriptionId:i.dialogSystemDescriptionId,createdId:i.dialogSystemCreatedId,updatedId:i.dialogSystemUpdatedId,statusData:p};if(n.systemData)I=n.systemData;else{let e=s.getCurrentCharacterData("log");!1!==e&&(I=s.getObjVal(e,"system"))}-1===C.indexOf(s.getObjVal(I,"id"))&&(b.currentSystem=I),requirejs(["text!templates/dialog/system.html","mustache"],(f,h)=>{let u=h.render(f,b),S=a.dialog({title:"Add new system",message:u,show:!1,buttons:{close:{label:"cancel",className:"btn-default"},success:{label:'<i class="fas fa-fw fa-check"></i> save',className:"btn-success",callback:function(t){let i,g=this.find("form"),y=e(g).getFormValues();if(g.validator("validate"),!1===g.isValidForm())return!1;let p=null,f=null;return void 0!==n.sourceSystem?(p=n.sourceSystem,f=n.connectionData||null,i=c(p)):i=n.position?{x:n.position.x,y:n.position.y}:l.newSystemPositionsByMapOffset(r)[0],y.position=i,y.mapId=m,this.find(".modal-content").showLoadingAnimation(),s.request("PUT","System",[],y,{systemDialog:S,formElement:g,map:o,sourceSystem:p,connectionData:f},e=>{e.systemDialog.find(".modal-content").hideLoadingAnimation()}).then(e=>{s.showNotify({title:"New system",text:e.data.name,type:"success"}),d(e.context.map,e.data,e.context.sourceSystem,e.context.connectionData),a.hideAll()},s.handleAjaxErrorResponse),!1}}}});S.on("show.bs.modal",function(s){let a=e(this);for(let[e,s]of Object.entries(t.systemStatus))p.push({id:s.id,text:s.label,class:s.class});a.find("#"+i.dialogSystemStatusSelectId).initStatusSelect({data:p,iconClass:"fa-tag"});let l=parseInt(a.find("."+i.dialogSystemSelectClass).val())||0;l&&y(a,m,l)}),S.on("shown.bs.modal",function(t){let s=e(this);g(s,!1),s.initTooltips(),s.find("."+i.dialogSystemSelectClass).delay(240).initSystemSelect({key:"id",disabledOptions:C,onChange:e=>{e?y(s,m,e):g(s,!1)}})}),S.modal("show")})},deleteSystems:d,removeSystems:r,getHeadInfoElement:e=>{let a,o=[],n=[];if(e.drifter&&o.push(Object.assign(document.createElement("i"),{className:`fas fa-fw fa-wave-square ${s.getSecurityClassForSystem(e.security)}`,title:"drifter"})),e.shattered&&o.push(Object.assign(document.createElement("i"),{className:`fas fa-fw fa-chart-pie ${s.getSecurityClassForSystem("SH")}`,title:"shattered"})),2===e.type.id&&o.push(Object.assign(document.createElement("span"),{className:i.systemHeadRegionClass,textContent:e.region.name})),e.statics&&e.statics.length)for(let a of e.statics){let e=Object.assign({},t.wormholes[a]),o=Object.assign(document.createElement("span"),{className:[s.getSecurityClassForSystem(e.security),s.config.popoverTriggerClass].join(" "),textContent:l.getSystemSecurityForDisplay(e.security).toLowerCase()});o.dataset.name=e.name,n.push(o)}if(o.length||n.length){let e=Object.assign(document.createElement("div"),{className:i.systemHeadInfoLeftClass});e.append(...o);let t=Object.assign(document.createElement("div"),{className:i.systemHeadInfoRightClass});t.append(...n),(a=Object.assign(document.createElement("div"),{className:i.systemHeadInfoClass})).append(e,t)}return a}}});
//# sourceMappingURL=system.js.map
