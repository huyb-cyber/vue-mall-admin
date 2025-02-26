(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224d40"],{e296:function(e,i,s){"use strict";s.r(i);var t=function(){var e=this,i=e.$createElement,s=e._self._c||i;return s("div",[s("el-table",{staticStyle:{"margin-bottom":"20px"},attrs:{border:"",data:e.menuPermissionList,"expand-row-keys":e.expandKeys,"row-key":"id"}},[s("el-table-column",{attrs:{prop:"name",label:"名称"}}),s("el-table-column",{attrs:{prop:"code",label:"权限值"}}),s("el-table-column",{attrs:{prop:"toCode",label:"跳转权限值"}}),s("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(i){var t=i.row;return[s("HintButton",{attrs:{disabled:4===t.level,type:"primary",icon:"el-icon-plus",size:"mini",title:e.getAddTitle(t.level)},on:{click:function(i){return e.toAddPermission(t)}}}),s("HintButton",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini",disabled:1===t.level,title:4===t.level?"修改功能":"修改菜单"},on:{click:function(i){return e.toUpdatePermission(t)}}}),s("HintButton",{attrs:{disabled:1===t.level,type:"danger",icon:"el-icon-delete",size:"mini",title:"删除"},on:{click:function(i){return e.removePermission(t)}}})]}}])})],1),s("el-dialog",{attrs:{visible:e.dialogPermissionVisible,title:e.dialogTitle},on:{"update:visible":function(i){e.dialogPermissionVisible=i},close:e.resetData}},[s("el-form",{ref:"permission",attrs:{model:e.permission,rules:e.permissionRules,"label-width":"120px"}},[e.permission.level>2&&!e.permission.id?s("el-form-item",{attrs:{label:"父级名称"}},[s("el-input",{attrs:{value:e.permission.pname,disabled:""}})],1):e._e(),s("el-form-item",{attrs:{label:"名称",prop:"name"}},[s("el-input",{model:{value:e.permission.name,callback:function(i){e.$set(e.permission,"name",i)},expression:"permission.name"}})],1),s("el-form-item",{attrs:{label:"功能权限值",prop:"code"}},[s("el-input",{model:{value:e.permission.code,callback:function(i){e.$set(e.permission,"code",i)},expression:"permission.code"}})],1),4===e.permission.level?s("el-form-item",{attrs:{label:"跳转路由权限值",prop:"toCode"}},[s("el-input",{model:{value:e.permission.toCode,callback:function(i){e.$set(e.permission,"toCode",i)},expression:"permission.toCode"}})],1):e._e()],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.resetData}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.addOrUpdatePermission}},[e._v("确 定")])],1)],1)],1)},n=[];s("a4d3"),s("caad"),s("2532");function r(e,i){if(null==e)return{};var s={};for(var t in e)if({}.hasOwnProperty.call(e,t)){if(i.includes(t))continue;s[t]=e[t]}return s}function o(e,i){if(null==e)return{};var s,t,n=r(e,i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)s=o[t],i.includes(s)||{}.propertyIsEnumerable.call(e,s)&&(n[s]=e[s])}return n}var a=s("5530"),l=s("c7eb"),c=s("1da1"),m=(s("b0c0"),["pname"]),u={name:[{required:!0,message:"名称必须输入"}],code:[{required:!0,message:"权限值必须输入"}]},d={name:[{required:!0,message:"名称必须输入"}],code:[{required:!0,trigger:"blur",message:"功能权限值必须输入"}]},p={name:"PermissionList",data:function(){return{menuPermissionList:[],expandKeys:[],dialogPermissionVisible:!1,permission:{level:0,name:"",code:"",toCode:""}}},computed:{dialogTitle:function(){var e=this.permission,i=e.id,s=e.level;return i?4===s?"修改功能":"修改菜单":4===s?"添加功能":"添加".concat(2===s?"一级":"二级","菜单")},permissionRules:function(){return 4===this.permission.level?d:u}},mounted:function(){this.fetchPermissionList()},methods:{getAddTitle:function(e){return 1===e||2===e?"添加菜单":3===e?"添加功能":void 0},fetchPermissionList:function(){var e=this;return Object(c["a"])(Object(l["a"])().mark((function i(){var s;return Object(l["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,e.$API.permission.getPermissionList();case 2:s=i.sent,e.menuPermissionList=s.data.children,e.expandKeys=[e.menuPermissionList[0].id];case 5:case"end":return i.stop()}}),i)})))()},toAddPermission:function(e){var i=this;this.dialogPermissionVisible=!0,this.permission.pid=e.id,this.permission.level=e.level+1,this.permission.type=4===this.permission.level?2:1,this.permission.pname=e.name,this.$nextTick((function(){return i.$refs.permission.clearValidate()}))},toUpdatePermission:function(e){var i=this;this.dialogPermissionVisible=!0,this.permission=Object(a["a"])({},e),this.permission.type=4===this.permission.level?2:1,this.$nextTick((function(){return i.$refs.permission.clearValidate()}))},removePermission:function(e){var i=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{type:"warning"}).then(Object(c["a"])(Object(l["a"])().mark((function s(){var t;return Object(l["a"])().wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,i.$API.permission.removePermission(e.id);case 2:t=s.sent,i.$message.success(t.message||"删除成功!"),i.fetchPermissionList();case 5:case"end":return s.stop()}}),s)})))).catch((function(e){"cancel"===e&&i.$message({type:"info",message:"已取消删除"})}))},addOrUpdatePermission:function(){var e=this;this.$refs.permission.validate(function(){var i=Object(c["a"])(Object(l["a"])().mark((function i(s){var t,n,r;return Object(l["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!s){i.next=8;break}return t=e.permission,t.pname,n=o(t,m),i.next=4,e.$API.permission[n.id?"updatePermission":"addPermission"](n);case 4:r=i.sent,e.$message.success(r.message||"".concat(n.id?"修改":"添加","成功!")),e.resetData(),e.fetchPermissionList();case 8:case"end":return i.stop()}}),i)})));return function(e){return i.apply(this,arguments)}}())},resetData:function(){this.dialogPermissionVisible=!1,this.permission={level:0,name:"",code:"",toCode:""}}}},f=p,b=s("2877"),v=Object(b["a"])(f,t,n,!1,null,null,null);i["default"]=v.exports}}]);