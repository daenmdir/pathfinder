define(["jquery","app/init","app/util","app/render","app/counter","bootbox","app/map/util"],(e,t,a,n,l,s,o)=>{"use strict";let i={dialogNavigationClass:"pf-dialog-navigation-list",dialogMapInfoSummaryId:"pf-map-info-dialog-summary",dialogMapInfoUsersId:"pf-map-info-dialog-users",dialogMapInfoLogsId:"pf-map-info-dialog-logs",dialogMapInfoRefreshId:"pf-map-info-dialog-refresh",mapInfoId:"pf-map-info",mapInfoSystemsId:"pf-map-info-systems",mapInfoConnectionsId:"pf-map-info-connections",mapInfoUsersId:"pf-map-info-users",mapInfoLogsId:"pf-map-info-logs",mapInfoLifetimeCounterClass:"pf-map-info-lifetime-counter",systemInfoPlanetsClass:"pf-system-info-planets",tableId:"pf-info-table-",tableToolsClass:"pf-table-tools",tableCellImageClass:"pf-table-image-cell",tableCellImageSmallClass:"pf-table-image-small-cell",tableCellActionClass:"pf-table-action-cell",tableCellLinkClass:"pf-table-link-cell",tableCellCounterClass:"pf-table-counter-cell",tableCellEllipsisClass:"pf-table-cell-ellipses-auto",tableCellActionIconClass:"pf-table-action-icon-cell",tableCellUnknownDataClass:"pf-table-unknown-cell",textActionIconClass:"pf-module-icon-button",textActionIconCopyClass:"pf-module-icon-button-copy",loadingOptions:{icon:{size:"fa-2x"}}},r=()=>'<i class="fas fa-fw fa-id-card '+i.tableCellActionIconClass+'" title="open ingame" data-toggle="tooltip"></i>',d=e=>{let t="station"===e?"fa-home":"structure"===e?"fa-industry":"";return t.length?'<i class="fas fa-fw '+t+" "+i.tableCellActionIconClass+'" title="'+e+'" data-toggle="tooltip"></i>':""},c=()=>'<span class="'+i.tableCellUnknownDataClass+'">unknown</span>';e.fn.initMapInfoData=function(t){let n=e(this).empty();n.showLoadingAnimation(i.loadingOptions);let s=a.getCurrentMapData(t.config.id),r=t.data.systems.length,d=t.data.connections.length,c=o.getMapTypes().find(e=>e.id===t.config.type.id),p=100/c.defaultConfig.max_systems*r,f=p<90?"txt-color-success":p<100?"txt-color-warning":"txt-color-danger",g=e("<dl>",{class:"dl-horizontal",css:{float:"left"}}).append(e("<dt>").text("Icon")).append(e("<dd>").append(e("<i>",{class:["fas","fa-fw",t.config.icon].join(" ")}))).append(e("<dt>").text("Name")).append(e("<dd>").text(t.config.name)).append(e("<dt>").text("Type")).append(e("<dd>",{class:c.class}).text(c.name)).append(e("<dt>").text("Link")).append(e("<dd>",{class:[i.textActionIconClass,i.textActionIconCopyClass].join(" ")}).append(e("<span>",{title:"copy to clipboard"}).text(o.getMapDeeplinkUrl(t.config.id)+" ")).append(e("<i>",{class:["fas","fa-fw","fa-copy"].join(" ")})));n.append(g);let m=e("<dl>",{class:"dl-horizontal",css:{float:"right"}}).append(e("<dt>").text("Systems")).append(e("<dd>",{class:["txt-color",f].join(" ")}).text(r+" / "+c.defaultConfig.max_systems)).append(e("<dt>").text("Connections")).append(e("<dd>").text(d)).append(e("<dt>").text("Lifetime")).append(e("<dd>",{class:i.mapInfoLifetimeCounterClass,text:t.config.created})).append(e("<dt>").text("Created")).append(e("<dd>").text(a.getObjVal(s,"config.created.character.name")));n.append(m),l.initTimestampCounter(e("."+i.mapInfoLifetimeCounterClass)),n.find("."+i.textActionIconCopyClass).on("click",function(){let t=e(this).find("span").text().trim();a.copyToClipboard(t).then(e=>{e.data&&a.showNotify({title:"Copied to clipboard",text:t,type:"success"})})}),n.hideLoadingAnimation(),n.initTooltips({container:".modal"})},e.fn.initSystemInfoTable=function(n){let s=a.getDataTableInstance(i.tableId,n.config.id,"","systems");if(s)s.clear(),s.rows.add(n.data.systems),s.draw();else{let s=e(this),r=e("<table>",{id:a.getTableId(i.tableId,"systems",n.config.id),class:["compact","stripe","order-column","row-border"].join(" ")});s.append(r),s.showLoadingAnimation(i.loadingOptions);r.DataTable({pageLength:20,paging:!0,lengthMenu:[[5,10,20,50,-1],[5,10,20,50,"All"]],ordering:!0,order:[15,"desc"],hover:!1,data:n.data.systems,columnDefs:[],language:{emptyTable:"Map is empty",zeroRecords:"No systems found",lengthMenu:"Show _MENU_ systems",info:"Showing _START_ to _END_ of _TOTAL_ systems"},columns:[{name:"type",title:"type",width:25,className:["min-screen-l"].join(" "),data:"type",render:{_:(e,t,a,n)=>o.getSystemTypeInfo(e.id,"name")}},{name:"security",title:"",width:1,data:"security",render:{display:(e,t,n,l)=>{return'<span class="'+a.getSecurityClassForSystem(e)+'">'+e+"</span>"}}},{name:"trueSec",title:"sec",width:18,className:["text-center","min-screen-l"].join(" "),searchable:!1,data:"trueSec",render:{display:(e,t,n,l)=>{return'<span class="'+a.getTrueSecClassForSystem(e)+'">'+e.toFixed(1)+"</span>"}}},{name:"shattered",title:'<i class="fas fa-chart-pie" title="shattered" data-toggle="tooltip"></i>',width:10,className:["text-center","min-screen-l"].join(" "),searchable:!1,data:"shattered",render:{display:(e,t,n,l)=>{let s="";return e&&(s='<i class="fas fa-chart-pie fa-fw '+a.getSecurityClassForSystem("SH")+'"></i>'),s}}},{name:"name",title:"system",data:"name",className:[i.tableCellLinkClass].join(" "),createdCell:function(t,n,l,s,o){e(t).on("click",function(e){a.triggerMenuAction(a.getMapModule().getActiveMap(),"SelectSystem",{systemId:l.id})})}},{name:"alias",title:"alias",data:"alias",render:{_:(e,t,a,n)=>e===a.name?"":e}},{name:"region",title:"region",data:"region.name",className:"min-screen-l"},{name:"sovereignty",title:"sov.",width:30,className:"text-center",data:"sovereignty.alliance.ticker",defaultContent:"",render:{display:(e,t,a,n)=>{let l="";return e&&(l="&lt;"+e+"&gt;"),l}}},{name:"planets",title:'<i class="fas fa-circle" title="planets" data-toggle="tooltip"></i>',width:10,className:["text-right",i.systemInfoPlanetsClass,a.config.helpDefaultClass,a.config.popoverTriggerClass].join(" "),searchable:!1,orderSequence:["desc","asc"],data:"planets",render:{_:(e,t,a,n)=>e.length}},{name:"status",title:'<i class="far fa-square" title="system&nbsp;status" data-toggle="tooltip"></i>',width:10,className:"text-center",searchable:!1,data:"status.id",render:{display:(e,t,n,l)=>{let s="",o=a.getStatusInfoForSystem(e,"class");return""!==o&&(s='<i class="far fa-square fa-fw '+o+'"></i>'),s}}},{name:"effect",title:'<i class="fas fa-square" title="system&nbsp;effect" data-toggle="tooltip"></i>',width:10,className:"text-center",searchable:!1,data:"effect",defaultContent:"",render:{display:(e,t,a,n)=>{let l="",s=o.getEffectInfoForSystem(e,"class");return""!==s&&(l='<i class="fas fa-square fa-fw '+s+'"></i>'),l}}},{name:"statics",title:"statics",width:30,searchable:!1,data:"statics",render:{_:(e,a,n,l)=>{let s=[];if(Array.isArray(e))for(let a of e){let e=Object.assign({},t.wormholes[a]);s.push('<span class="'+e.class+'">'+e.security+"</span>")}return s.join("&nbsp;&nbsp;")}}},{name:"position",title:'<i class="fas fa-map-marker-alt" title="your&nbsp;position" data-toggle="tooltip"></i>',width:8,className:"text-center",searchable:!1,data:"currentUser",defaultContent:!1,render:{display:(e,t,a,n)=>{let l="";return!0===e&&(l='<i class="fas fa-map-marker-alt fa-fw"></i>'),l}}},{name:"userCount",title:'<i class="fas fa-plane" title="active&nbsp;pilots" data-toggle="tooltip"></i>',width:12,className:"text-center",searchable:!1,data:"userCount",render:{display:(e,t,a,n)=>{let l="";return e>0&&(l=e),l}}},{name:"locked",title:'<i class="fas fa-lock" title="system&nbsp;locked" data-toggle="tooltip"></i>',width:10,className:"text-center",searchable:!1,data:"locked",render:{display:(e,t,a,n)=>{let l="";return 1===e&&(l='<i class="fas fa-lock fa-fw"></i>'),l}}},{name:"updated",title:"updated",width:80,searchable:!1,className:["text-right",i.tableCellCounterClass].join(" "),data:"updated.updated",defaultContent:""},{name:"action",title:"",orderable:!1,searchable:!1,width:10,className:["text-center",i.tableCellActionClass].join(" "),data:null,defaultContent:'<i class="fas fa-times txt-color txt-color-redDark"></i>',createdCell:function(t,l,s,r,d){let c=this,p={placement:"left",title:"---",template:a.getConfirmationTemplate(null,{size:"small",noTitle:!0}),onConfirm:function(t,l){let r=e(l).parents("tr"),d=a.getMapModule().getActiveMap(),p=e("#"+o.getSystemId(n.config.id,s.id));p.length&&d.trigger("pf:deleteSystems",[{systems:[p[0]],callback:function(t){if(1===t.length){c.DataTable().rows(r).remove().draw(),a.showNotify({title:"System deleted",text:s.name,type:"success"});let t=e("#"+i.mapInfoConnectionsId),n=d.getMapDataFromClient(["hasId"]);t.initConnectionInfoTable(n)}else a.showNotify({title:"Failed to delete system",text:s.name,type:"error"})}}])}};e(t).confirmation(p)}}],initComplete:function(e){s.hideLoadingAnimation(),s.initTooltips({container:".modal"}),l.initTableCounter(this,["updated:name"])}})}},e.fn.initConnectionInfoTable=function(t){let n=a.getDataTableInstance(i.tableId,t.config.id,"","connections");if(n)n.clear(),n.rows.add(t.data.connections),n.draw();else{let n=e(this),s=e("<table>",{id:a.getTableId(i.tableId,"connections",t.config.id),class:["compact","stripe","order-column","row-border"].join(" ")});n.append(s),n.showLoadingAnimation(i.loadingOptions);s.dataTable({pageLength:20,paging:!0,lengthMenu:[[5,10,20,50,-1],[5,10,20,50,"All"]],ordering:!0,order:[6,"desc"],autoWidth:!1,hover:!1,data:t.data.connections,columnDefs:[],language:{emptyTable:"No connections",zeroRecords:"No connections found",lengthMenu:"Show _MENU_ connections",info:"Showing _START_ to _END_ of _TOTAL_ connections"},columns:[{name:"scope",title:"scope",width:50,orderable:!0,data:"scope",render:{display:(e,t,a,n)=>o.getScopeInfoForConnection(e,"label")}},{name:"sourceName",title:"source system",data:"sourceName",className:[i.tableCellLinkClass].join(" "),createdCell:function(t,n,l,s,o){e(t).on("click",function(e){a.triggerMenuAction(a.getMapModule().getActiveMap(),"SelectSystem",{systemId:l.source})})}},{name:"sourceBubble",title:'<i class="fas fa-globe" title="bubbled" data-toggle="tooltip"></i>',width:10,data:"endpoints.source",className:"text-right",render:{display:(e,t,a,n)=>{let l="";return e.types.includes("bubble")&&(l='<span class="pf-endpoint-bubble"></span>'),l}}},{name:"connection",title:"connection",width:80,className:"text-center",orderable:!1,searchable:!1,data:"type",render:{display:(e,t,a,n)=>{let l=o.getConnectionFakeClassesByTypes(e);return'<div class="'+(l=l.join(" "))+'"></div>'}}},{name:"targetBubble",title:'<i class="fas fa-globe" title="bubbled" data-toggle="tooltip"></i>',width:10,data:"endpoints.target",className:"text-left",render:{display:(e,t,a,n)=>{let l="";return e.types.includes("bubble")&&(l='<span class="pf-endpoint-bubble"></span>'),l}}},{name:"targetName",title:"target system",data:"targetName",className:[i.tableCellLinkClass].join(" "),createdCell:function(t,n,l,s,o){e(t).on("click",function(e){a.triggerMenuAction(a.getMapModule().getActiveMap(),"SelectSystem",{systemId:l.target})})}},{name:"updated",title:"updated",width:80,searchable:!1,className:["text-right",i.tableCellCounterClass].join(" "),data:"updated",createdCell:function(t,a,n,l,s){if("wh"===n.scope.scope_sort){let n=(new Date).getTime()-1e3*a;new Date(n).getUTCDate()>1&&e(t).addClass("txt-color txt-color-warning")}}},{name:"action",title:"",orderable:!1,searchable:!1,width:10,className:["text-center",i.tableCellActionClass].join(" "),data:null,defaultContent:'<i class="fas fa-times txt-color txt-color-redDark"></i>',createdCell:function(n,l,s,i,r){let d=this,c={placement:"left",title:"---",template:a.getConfirmationTemplate(null,{size:"small",noTitle:!0}),onConfirm:function(a,n){let l=e(n).parents("tr"),i=e().getConnectionById(t.config.id,s.id);o.deleteConnections([i],()=>{d.DataTable().rows(l).remove().draw()})}};e(n).confirmation(c)}}],initComplete:function(e){n.hideLoadingAnimation(),n.initTooltips({container:".modal"}),l.initTableCounter(this,["updated:name"])}})}},e.fn.initUsersInfoTable=function(t){let n=e(this).empty(),l=e("<table>",{class:["compact","stripe","order-column","row-border"].join(" ")});n.append(l),n.showLoadingAnimation(i.loadingOptions);let s=a.getCurrentMapUserData(t.config.id),p=[];if(s&&s.data&&s.data.systems)for(let e=0;e<s.data.systems.length;e++){let t=s.data.systems[e];for(let e=0;e<t.user.length;e++)p.push(t.user[e])}l.dataTable({pageLength:20,paging:!0,lengthMenu:[[5,10,20,50,-1],[5,10,20,50,"All"]],ordering:!0,order:[[3,"asc"]],hover:!1,data:p,language:{emptyTable:"No active pilots",zeroRecords:"No active pilots found",lengthMenu:"Show _MENU_ pilots",info:"Showing _START_ to _END_ of _TOTAL_ pilots"},columnDefs:[{targets:0,title:"",width:26,orderable:!1,searchable:!1,className:[a.config.helpDefaultClass,"text-center",i.tableCellImageClass].join(" "),data:"log.ship",defaultContent:"",render:{_:function(e,t,n,l){let s=e;return e&&"display"===t&&(s='<img src="'+a.eveImageUrl("types",s.typeId)+'" title="'+s.typeName+'" data-toggle="tooltip" />'),s}}},{targets:1,title:"ship name",width:100,orderable:!0,searchable:!0,data:"log.ship",defaultContent:c(),render:{_:function(e,t,n){let l=e;return e&&(l=e.name,"display"===t&&(l='<div class="'+o.config.tableCellEllipsisClass+" "+o.config.tableCellEllipsis100Class+'">'+a.unicodeToString(e.name)+"</div>")),l}}},{targets:2,title:"",width:26,orderable:!1,searchable:!1,className:[i.tableCellImageClass].join(" "),data:"id",render:{_:function(e,t,n,l){let s=e;return"display"===t&&(s='<img src="'+a.eveImageUrl("characters",s)+'"/>'),s}}},{targets:3,title:"pilot",orderable:!0,searchable:!0,className:[i.tableCellActionClass].join(" "),data:"name",render:{_:function(e,t,a,n){let l=e;return"display"===t&&(l+="&nbsp;"+r()),l}},createdCell:function(t,n,l,s,o){e(t).on("click",{tableApi:this.api(),rowIndex:s},function(e){let t=e.data.tableApi.row(e.data.rowIndex).data();a.openIngameWindow(t.id)})}},{targets:4,title:"",width:26,orderable:!1,searchable:!1,className:[i.tableCellImageClass,i.tableCellImageSmallClass,"min-screen-l"].join(" "),data:"corporation",render:{_:function(e,t,n,l){let s=e;return"display"===t&&(s='<img src="'+a.eveImageUrl("corporations",s.id)+'"/>'),s}}},{targets:5,title:"corporation",orderable:!0,searchable:!0,className:[i.tableCellActionClass,"min-screen-l"].join(" "),data:"corporation",render:{_:function(e,t,a,n){let l=e.name;return"display"===t&&(l+="&nbsp;"+r()),l}},createdCell:function(t,n,l,s,o){e(t).on("click",{tableApi:this.api()},function(e){let t=e.data.tableApi.cell(this).data();a.openIngameWindow(t.id)})}},{targets:6,title:"system",orderable:!0,searchable:!0,data:"log.system",defaultContent:c(),render:{_:function(e,t,a,n){let l=e;return e&&"display"===t&&(l=e.name),l}}},{targets:7,title:"docked",orderable:!0,searchable:!0,className:[i.tableCellActionClass].join(" "),data:"log",defaultContent:c(),render:{_:function(e,t,a,n){let l=e;return e&&(l=e.station&&e.station.id>0?e.station.name+"&nbsp;"+d("station"):e.structure&&e.structure.id>0?e.structure.name+"&nbsp;"+d("structure"):""),l}}},{targets:8,title:"role",width:30,orderable:!0,searchable:!0,className:["text-right","min-screen-l"].join(" "),data:"role",render:{_:function(e,t,n,l){let s=e.label;return"display"===t&&(s=a.getLabelByRole(e).prop("outerHTML")),s}}}],initComplete:function(e){n.hideLoadingAnimation(),n.initTooltips({container:".modal"})}})};let p=(t,n)=>{t.hoverIntent({over:function(t){let l=e(this),s=a.getDataTableInstance(i.tableId,n.config.id,"","systems").row(l.parents("tr")).data();l.addSystemPlanetsTooltip(s.planets,{trigger:"manual",placement:"left",show:!0})},out:function(t){e(this).destroyPopover()},selector:"td."+i.systemInfoPlanetsClass})};e.fn.initLogsInfoTable=function(l){let s=e(this).empty(),o=(n,l)=>{l.logsElement.showLoadingAnimation(i.loadingOptions),e.ajax({type:"POST",url:t.path.getMapLogData,data:n,dataType:"json",context:l}).done(function(e){this.callback(e,l)}).fail(function(e,t,n){let l=t+" "+n;a.showNotify({title:e.status+": loadLogs",text:l,type:"warning"})}).always(function(){this.logsElement.hideLoadingAnimation()})},d=(e,t)=>{let n=e.data.length;if(n>0){let l=t.tableApi.page.info();t.tableApi.rows.add(e.data).draw();let s=0;if(0===l.recordsDisplay)a.showNotify({title:"New logs loaded",text:n+" most recent logs added",type:"success"});else{let e=t.tableApi.page.info();s=Math.max(0,e.pages-1),a.showNotify({title:"More logs loaded",text:n+" older logs added",type:"info"})}t.tableApi.page(s).draw(!1)}else a.showNotify({title:"No logs found",text:"No more entries",type:"warning"})},c=e("<table>",{class:["compact","stripe","order-column","row-border","pf-table-fixed"].join(" ")});s.append(c);let p=a.getServerTime().setHours(0,0,0,0),f=c.DataTable({pageLength:25,paging:!0,lengthMenu:[[10,25,50,100],[10,25,50,100]],pagingType:"full_numbers",ordering:!1,autoWidth:!1,searching:!0,hover:!1,data:[],language:{emptyTable:"No logs available",zeroRecords:"No logs found",lengthMenu:"Show _MENU_ rows",info:"Showing _START_ to _END_ of _TOTAL_ rows"},columnDefs:[{targets:0,title:'<span title="action" data-toggle="tooltip">&nbsp;</span>',width:12,data:"context.tag",render:{_:function(e,t,a,n){let l=e;if("display"===t){l='<i class="fas fa-circle fa-fw txt-color '+("txt-color-"+e)+'"></i>'}return l}}},{targets:1,name:"timestamp",title:'<i class="far fa-fw fa-clock"></i>',width:100,className:["text-right"].join(" "),data:"datetime",render:{_:function(e,t,n,l){let s,o="";if("string"==typeof e&&e.length?s=e:e&&e.date&&(s=e.date),s){s=s.substring(0,19).replace(/-/g,"/").replace(/T/g," ");let e=new Date(s);o=a.convertDateToString(e,!0),e.setHours(0,0,0,0)===p&&(o="today"+o.substring(10))}return o}}},{targets:2,title:"level",width:40,data:"level_name"},{targets:3,title:"channel",className:[i.tableCellEllipsisClass].join(" "),width:40,data:"channel"},{targets:4,title:"message",width:115,data:"message",render:{_:function(e,t,n,l){let s=e;if("display"===t){let e="txt-color-";a.getObjVal(n,"context.tag")&&(e+=n.context.tag),s='<span class="txt-color '+e+'">'+s+"</span>"}return s}}},{targets:5,title:"",width:26,searchable:!1,className:[i.tableCellImageClass].join(" "),data:"context.data.character.id",render:{_:function(e,t,n,l){let s=e;return"display"===t&&(s='<img src="'+a.eveImageUrl("characters",s)+'"/>'),s}}},{targets:6,title:"pilot",width:110,className:[i.tableCellActionClass].join(" "),data:"context.data.character.name",render:{_:function(e,t,a,n){let l=e;return"display"===t&&(l+="&nbsp;"+r()),l}},createdCell:function(t,n,l,s,o){e(t).on("click",{tableApi:this.api(),rowIndex:s},function(e){let t=e.data.tableApi.row(e.data.rowIndex).data();a.openIngameWindow(t.context.data.character.id)})}},{targets:7,title:"context",className:[i.tableCellEllipsisClass].join(" "),data:"context.data.formatted"},{targets:8,title:'<i class="fas fa-code text-right"></i>',width:12,className:[i.tableCellActionClass].join(" "),data:"context.data",render:{_:function(e,t,a,n){let l=e;return"display"===t&&(l='<i class="fas fa-code '+i.tableCellActionIconClass+'"></i>'),l}},createdCell:function(t,a,l,s,o){e(t).on("mouseenter",function(t){let l=e(this);if(!l.data("bs.popover")){a.formatted&&delete(a=Object.assign({},a)).formatted;let e="<pre><code>"+n.highlightJson(a)+"</code></pre>";l.popover({placement:"left",html:!0,trigger:"hover",content:e,container:"body",title:"Raw data",delay:{show:180,hide:0}}),l.popover("show")}})}}],initComplete:function(e){let t=this.api();o({mapId:l.config.id},{tableApi:t,callback:d,logsElement:s})},drawCallback:function(t){let a=this.api(),n=a.page.info(),l=0===n.pages||n.page===n.pages-1;a.button(0).enable(l);let s=a.column("timestamp:name").header();a.cells(void 0,"timestamp:name",{page:"current",order:"current"}).render("display").reduce((e,t)=>!1===e&&!t.startsWith("today")||e,!1)?e(s).css({width:"100px"}):e(s).css({width:"80px"})}});s.append(e("<div>",{class:i.tableToolsClass}));new e.fn.dataTable.Buttons(f,{buttons:[{className:"btn btn-sm btn-default",text:'<i class="fas fa-fw fa-plus"></i>&nbsp;load more',enabled:!1,action:function(e,t,a,n){let i=t.page.info();o({mapId:l.config.id,limit:i.length,offset:i.recordsTotal},{tableApi:t,callback:d,logsElement:s})}}]});f.buttons().container().appendTo(e(this).find("."+i.tableToolsClass))},e.fn.showMapInfoDialog=function(t){let n=a.getMapModule().getActiveMap(),l=!!n&&n.getMapDataFromClient(["hasId"]);if(!1!==l){let o=a.getCurrentMapData(l.config.id);requirejs(["text!templates/dialog/map_info.html","mustache"],(r,d)=>{let c={dialogSummaryContainerId:i.dialogMapInfoSummaryId,dialogUsersContainerId:i.dialogMapInfoUsersId,dialogLogsContainerId:i.dialogMapInfoLogsId,dialogRefreshContainerId:i.dialogMapInfoRefreshId,dialogNavigationClass:i.dialogNavigationClass,mapInfoId:i.mapInfoId,mapInfoSystemsId:i.mapInfoSystemsId,mapInfoConnectionsId:i.mapInfoConnectionsId,mapInfoUsersId:i.mapInfoUsersId,mapInfoLogsId:i.mapInfoLogsId,logHistoryEnabled:Boolean(a.getObjVal(o,"config.logging.history")),openTabInformation:"information"===t.tab,openTabActivity:"activity"===t.tab,openTabLog:"log"===t.tab},f=d.render(r,c),g=s.dialog({title:"Map information",message:f,size:"large",buttons:{success:{label:"close",className:"btn-primary",callback:function(){e(g).modal("hide")}}}});g.on("shown.bs.modal",function(t){let a=e(this),s=e("#"+i.mapInfoId),r=e("#"+i.mapInfoSystemsId),d=e("#"+i.mapInfoConnectionsId),c=e("#"+i.mapInfoUsersId);e("#"+i.dialogMapInfoRefreshId).on("click",function(t){if("refresh"===e(this).attr("data-action")){let t=n.getMapDataFromClient(["hasId"]);e(this).parents(".navbar").find(".navbar-header.pull-left li.active a").attr("href")==="#"+i.dialogMapInfoLogsId&&e("#"+i.mapInfoLogsId).initLogsInfoTable(o),s.initMapInfoData(t),r.initSystemInfoTable(t),d.initConnectionInfoTable(t),c.initUsersInfoTable(t)}}),s.initMapInfoData(l),r.initSystemInfoTable(l),d.initConnectionInfoTable(l),c.initUsersInfoTable(l),p(a,l)}),g.find(".navbar a").on("shown.bs.tab",function(t){if(e(t.target).attr("href")==="#"+i.dialogMapInfoLogsId){let t=a.getCurrentMapData(l.config.id);e("#"+i.mapInfoLogsId).initLogsInfoTable(t)}})})}else a.showNotify({title:"Map data not found",text:"No map initialized at this point",type:"warning"})}});
//# sourceMappingURL=map_info.js.map
