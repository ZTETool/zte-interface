define(["service","configPath","status_check"],function(t,n,e){function i(){if(!a.isDoing){var n=t.getStatusInfo(),e=a.getConnectStatus(n.connectStatus);1==e?($("img","#connection_img").attr("src","./img/connected.png"),a.setData("connection_status",$.i18n.prop("connected")),a.setData("connection_desc",$.i18n.prop("click_to_disconnect"))):2==e?($("img","#connection_img").attr("src","./img/disconnecting.gif"),a.setData("connection_status",$.i18n.prop("disconnecting")),a.setData("connection_desc","")):3==e?($("img","#connection_img").attr("src","./img/connecting.gif"),a.setData("connection_status",$.i18n.prop("connecting")),a.setData("connection_desc","")):4==e&&($("img","#connection_img").attr("src","./img/disconnected.png"),a.setData("connection_status",$.i18n.prop("disconnected")),a.setData("connection_desc",$.i18n.prop("click_to_connect")))}}function o(){$("#img_connection").unbind("click").click(function(){if(a.isDoing)return!1;var e=t.getStatusInfo();if("modem_init_complete"!=e.simStatus)return!1;var i=e.networkType.toLowerCase();if(""!=i&&"limited service"!=i||(i="limited_service"),"no service"==i&&(i="no_service"),"limited_service"==i||"no_service"==i)return!1;if(checkConnectedStatus(e.connectStatus)&&n.AP_STATION_SUPPORT&&1==t.getAPStationBasic().ap_station_enable&&"auto_dial"==e.dialMode)return!1;if(n.AP_STATION_SUPPORT&&"connect"==e.connectWifiStatus&&"wifi_pref"==t.getAPStationBasic().ap_station_mode)return!1;a.isDoing=!0;var o=t.getStatusInfo(),e=a.getConnectStatus(o.connectStatus);if(1==e)a.disconnect();else if(4==e){if(n.AP_STATION_SUPPORT&&1==o.ap_station_enable)return showAlert("manual_connect_note"),a.isDoing=!1,!1;o.roamingStatus?(a.isDoing=!1,showConfirm("dial_roaming_connect",function(){a.isDoing=!0,a.connect()})):a.connect()}}),$("#password_div").unbind("click").click(function(t){"pwd_mask"==$(".ui-block-b:visible",$(this)).attr("id")?(a.hideElement("pwd_mask"),a.showElement("pwd")):(a.hideElement("pwd"),a.showElement("pwd_mask"))})}function c(){a.isDoing=!1,t.getConnectionMode({},function(t){a.setConnectionMode(t.connectionMode)}),t.getApnSettings({},function(t){var n="manual"==t.apnMode?"apn_manual_apn":"apn_auto_apn";a.setData("apnMode",$.i18n.prop(n)).attr("data-trans",n),a.setData("profileName",t.profileName),a.setData("pdpType","IP"==t.pdpType?"IPV4":t.pdpType),"IPV6"==t.pdpType.toUpperCase()?(a.setData("apn",t.wanApnV6),a.setData("authType",t.authModeV6),a.setData("user",t.usernameV6),a.setData("pwd",t.passwordV6)):(t.pdpType.toUpperCase(),a.setData("apn",t.wanApn),a.setData("authType",t.authMode),a.setData("user",t.username),a.setData("pwd",t.password)),a.setData("pwd_mask",leftInsert("",t.password.length,"*"))}),addInterval(function(){i()},1e3),o()}var a={cacheEle:{},getEle:function(t){return this.cacheEle.hasOwnProperty("id")?this.cacheEle[t]:(this.cacheEle[t]=$("#"+t),this.cacheEle[t])},setData:function(t,n){return this.getEle(t).html(n)},showElement:function(t){return this.getEle(t).show()},hideElement:function(t){return this.getEle(t).hide()},setConnectionMode:function(t){"auto_dial"==t?(this.setData("connection_mode",$.i18n.prop("auto_select")),this.getEle("connection_mode").attr("data-trans","auto_select")):(this.setData("connection_mode",$.i18n.prop("manual_select")),this.getEle("connection_mode").attr("data-trans","manual_select"))},getConnectStatus:function(t){return"ppp_connected"==t||"ipv6_connected"==t||"ipv4_ipv6_connected"==t?1:"ppp_disconnecting"==t?2:"ppp_connecting"==t?3:4},getTrafficResult:function(t){var n={showConfirm:!1,limitPercent:t.limitVolumePercent};if("1"==t.limitVolumeType){var e=parseInt(t.data_counter.monthlySent,10)+parseInt(t.data_counter.monthlyReceived,10);n.usedPercent=e/t.limitVolumeSize*100,n.usedPercent>n.limitPercent&&(n.showConfirm=!0,n.type="data")}else n.usedPercent=t.data_counter.monthlyConnectedTime/t.limitVolumeSize*100,n.usedPercent>n.limitPercent&&(n.showConfirm=!0,n.type="time");return n},isDoing:!1,doConnect:function(){$("img","#connection_img").attr("src","./img/connecting.gif"),a.setData("connection_status",$.i18n.prop("connecting")),a.setData("connection_desc",""),t.connect({},function(t){t.result?a.isDoing=!1:(errorOverlay(),a.isDoing=!1)})},connect:function(){var n=t.getStatusInfo(),i=this.getTrafficResult(n),o=this;if(n.limitVolumeEnable&&i.showConfirm){var c=null;i.usedPercent>100?(c={msg:"traffic_beyond_connect_msg"},e.setTrafficAlertPopuped(!0)):(c={msg:"traffic_limit_connect_msg",params:[i.limitPercent]},e.setTrafficAlert100Popuped(!1)),a.isDoing=!1,showConfirm(c,function(){a.isDoing=!0,o.doConnect()})}else this.doConnect()},disconnect:function(){$("img","#connection_img").attr("src","./img/disconnecting.gif"),a.setData("connection_status",$.i18n.prop("disconnecting")),a.setData("connection_desc",""),t.disconnect({},function(t){t.result?a.isDoing=!1:(errorOverlay(),a.isDoing=!1)})}};return{init:c}});
//# sourceMappingURL=../../../sourcemaps/m/network/view.js.map
