define(["jquery","knockout","config/config","service","underscore"],function(n,e,t,c,o){function s(){var t=this,o=a();t.types=e.observable(v),t.selectedType=e.observable(o.vpn_type),t.vpnServiceIp=e.observable(o.vpn_server_ip),t.vpnL2TPPassword=e.observable(o.vpn_l2tp_passwd),t.vpnUserName=e.observable(o.vpn_account),t.vpnPassword=e.observable(o.vpn_passwd),t.vpnAutoSettings=e.observable(void 0==o.vpn_auto_start||""==o.vpn_auto_start?"0":o.vpn_auto_start),t.vpnConnectStatus=e.observable(o.vpn_conn_status),t.enableFlag=e.observable(!0),t.vpnRemoteIp=e.observable(o.vpn_remote_ip),t.vpnLocalIp=e.observable(o.vpn_local_ip),t.transText=e.dependentObservable(function(){return checkVpnConnectedStatus(t.vpnConnectStatus())?"disconnect":"connect"}),t.connectStatusText=e.dependentObservable(function(){return checkVpnConnectedStatus(t.vpnConnectStatus())?n.i18n.prop("disconnect"):n.i18n.prop("connect")}),t.vpnConnectStatusText=e.dependentObservable(function(){return"connected"==t.vpnConnectStatus()?n.i18n.prop("connect"):"connecting"==t.vpnConnectStatus()?n.i18n.prop("connecting"):"disconnecting"==t.vpnConnectStatus()?n.i18n.prop("disconnecting"):n.i18n.prop("disconnected")}),t.checkEnable=function(n){c.getStatusInfo();"connecting"==n||"disconnecting"==n?t.enableFlag(!1):t.enableFlag(!0)},t.clear=function(){r()},t.save=function(){showLoading();var n={};n.vpn_type=t.selectedType(),n.vpn_l2tp_passwd=t.vpnL2TPPassword(),n.vpn_account=t.vpnUserName(),n.vpn_passwd=t.vpnPassword(),n.vpn_server_ip=t.vpnServiceIp(),n.vpn_auto_start=t.vpnAutoSettings(),c.setVPNClientSetting(n,function(n){"success"==n.result?(t.clear(),successOverlay()):errorOverlay()})},t.selectVPNAuto=function(){if(!n("#vpnAutoBtn").hasClass("disable")){var e=n("#AllowVPNAuto:checked");e&&0==e.length?t.vpnAutoSettings("1"):t.vpnAutoSettings("0")}},t.connectHandler=function(){checkVpnConnectedStatus(t.vpnConnectStatus())?(showLoading("disconnecting"),c.vpnDisconnect({},function(n){n.result?(successOverlay(),r()):errorOverlay()})):p()}}function a(){return c.getVPNClientSetting()}function p(){showLoading("connecting"),c.vpnConnect({},function(n){n.result?(successOverlay(),r()):errorOverlay()})}function r(){var t=n("#container");e.cleanNode(t[0]);var o=new s;e.applyBindings(o,t[0]),n("#VPNClientForm").validate({submitHandler:function(){o.save()},rules:{txtIpAddress:"url_filter_check",txtUserName:"ppp_username_check",txtPassword:"ppp_password_check"}}),addInterval(function(){var n=c.getStatusInfo();o.vpnConnectStatus(n.vpn_conn_status),o.checkEnable(n.vpn_conn_status)},1e3)}var v=o.map(t.VPN_TYPE_MODES,function(n){return new Option(n.name,n.value)});return{init:r}});
//# sourceMappingURL=../../sourcemaps/firewall/vpn_client.js.map
