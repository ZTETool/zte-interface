define(["service","configPath"],function(i,t){function s(){var t=(i.getParams({nv:"wifi_onoff_wifi5g_by_n79_mutex"}).wifi_onoff_wifi5g_by_n79_mutex,r());f=t.wpsFlag;var s=i.getWifiModuleSwitchStatus();D=s.WiFiModuleSwitch,e(t),n(t),g=S(t),l.val("PIN"==t.WpsMode_1?"PIN":"PBC").trigger("change"),w.val("PIN"==t.WpsMode_2?"PIN":"PBC").trigger("change")}function e(i){"1"==i.AccessPointSwitchStatus_1_1&&b.append('<option value="SSID24g" data-trans="wifi_ssid1"></option>'),"1"==i.AccessPointSwitchStatus_2_1&&"1"!=wifi_onoff_wifi5g_by_n79_mutex&&b.append('<option value="SSID5g" data-trans="wifi_ssid2"></option>'),b.translate()}function n(i){I.append('<option value="SSID24g">'+i.ssid_1_1+"</option>"),A.append('<option value="SSID5g">'+i.ssid_2_1+"</option>"),"1"==i.AccessPointSwitchStatus_1_2&&I.append('<option value="SSID24g_2">'+i.ssid_1_2+"</option>"),"1"==i.AccessPointSwitchStatus_2_2&&A.append('<option value="SSID5g_2">'+i.ssid_2_2+"</option>")}function o(){"SSID24g"==b.val()||"SSID24g_2"==b.val()?a():c()}function a(){var t=r();if("0"==i.getWifiModuleSwitchStatus().WiFiModuleSwitch)return void showAlert("wps_wifi_off");if("1"==t.WpsStatus_1)return showAlert("wps_on_info"),!0;g=I.val();var s;if("SSID24g"==g?(g=t.ssid,s=0):(g=t.multiSSID,s=1),0==s){if("1"==t.ApBroadcastDisabled_1_1)return void showAlert("wps_ssid_broadcast_disable")}else if(1==s&&"1"==t.ApBroadcastDisabled_1_2)return void showAlert("wps_ssid_broadcast_disable");showLoading();var e={};e.ChipIndex="0",e.WpsMode=l.val(),e.WpsPin=d(h.val()),e.wpsSSID=g,e.ActiveWpsAccessPointIndex=s,i.setWifiWpsStart(e,function(i){"success"==i.result?(h.val(""),clearValidateMsg(),successOverlay()):errorOverlay()})}function c(){var t=r();if("0"==i.getWifiModuleSwitchStatus().WiFiModuleSwitch)return void showAlert("wps_wifi_off");if("1"==t.WpsStatus_2)return showAlert("wps_on_info"),!0;P=A.val();var s;if("SSID5g"==P?(P=t.multiSSID,s=0):(P=t.multiSSID,s=1),0==s){if("1"==t.ApBroadcastDisabled_2_1)return void showAlert("wps_ssid_broadcast_disable")}else if(1==s&&"1"==t.ApBroadcastDisabled_2_2)return void showAlert("wps_ssid_broadcast_disable");showLoading();var e={};e.ChipIndex="1",e.WpsMode=w.val(),e.WpsPin=d(v.val()),e.wpsSSID=P,e.ActiveWpsAccessPointIndex=s,i.setWifiWpsStart(e,function(i){"success"==i.result?(h.val(""),clearValidateMsg(),successOverlay()):errorOverlay()})}function d(i){return 9==i.length?i.substring(0,4)+i.substring(5):i}function S(i){return"2"==i.ActiveWpsAccessPointIndex_1?"SSID24g":"SSID5g"}function p(){b.off("change").on("change",function(){"SSID24g"==$(this).val()||"SSID24g_2"==$(this).val()?(x.show(),E.hide()):(x.hide(),E.show())})}function r(){var s={},e=i.getWifiWpsStatus(),n=i.getWifiAccessPointInfo();return _.filter(e,function(i,e){i.ChipIndex==t.WIFICHIPINDEX.FIRST?(s.ChipIndex_1=i.ChipIndex,s.ActiveWpsAccessPointIndex_1=i.ActiveWpsAccessPointIndex,s.WpsStatus_1=i.WpsStatus,s.WpsMode_1=i.WpsMode):i.ChipIndex==t.WIFICHIPINDEX.SECOND&&(s.ChipIndex_2=i.ChipIndex,s.ActiveWpsAccessPointIndex_2=i.ActiveWpsAccessPointIndex,s.WpsStatus_2=i.WpsStatus,s.WpsMode_2=i.WpsMode)}),_.filter(n,function(i,e){i.ChipIndex==t.WIFICHIPINDEX.FIRST&&i.AccessPointIndex==t.ACCESSPOINTINDEX.FIRST?(s.AccessPointSwitchStatus_1_1=i.AccessPointSwitchStatus,s.AuthMode_1_1=i.AuthMode,s.EncrypType_1_1=i.EncrypType,s.ssid_1_1=i.SSID,s.ApBroadcastDisabled_1_1=i.ApBroadcastDisabled):i.ChipIndex==t.WIFICHIPINDEX.FIRST&&i.AccessPointIndex==t.ACCESSPOINTINDEX.SECOND?(s.AccessPointSwitchStatus_1_2=i.AccessPointSwitchStatus,s.AuthMode_1_2=i.AuthMode,s.EncrypType_1_2=i.EncrypType,s.ssid_1_2=i.SSID,s.ApBroadcastDisabled_1_2=i.ApBroadcastDisabled):i.ChipIndex==t.WIFICHIPINDEX.SECOND&&i.AccessPointIndex==t.ACCESSPOINTINDEX.FIRST?(s.AccessPointSwitchStatus_2_1=i.AccessPointSwitchStatus,s.AuthMode_2_1=i.AuthMode,s.EncrypType_2_1=i.EncrypType,s.ssid_2_1=i.SSID,s.ApBroadcastDisabled_2_1=i.ApBroadcastDisabled,s.ssid2Enable_2_1=i.AccessPointSwitchStatus):i.ChipIndex==t.WIFICHIPINDEX.SECOND&&i.AccessPointIndex==t.ACCESSPOINTINDEX.SECOND&&(s.AccessPointSwitchStatus_2_2=i.AccessPointSwitchStatus,s.AuthMode_2_2=i.AuthMode,s.EncrypType_2_2=i.EncrypType,s.ssid_2_2=i.SSID,s.ApBroadcastDisabled_2_2=i.ApBroadcastDisabled,s.ssid2Enable_2_2=i.AccessPointSwitchStatus)}),s}function u(){b=$("#ssidType"),l=$("#wpsMode"),h=$("#txtPin"),w=$("#wpsMode_5g"),v=$("#txtPin_5g"),I=$("#multiSSID"),A=$("#multiSSID_5g"),W=$("#multiSSIDContainer"),C=$("#multiSSIDContainer_5g"),x=$("#wpsSetting24g"),E=$("#wpsSetting5g"),t.HAS_MULTI_SSID?(W.show(),C.show()):(W.hide(),C.hide()),l.off("change").on("change",function(){var i=$(this).val(),t=$("#pinContainer");"PIN"==i?t.show():t.hide()}),w.off("change").on("change",function(){var i=$(this).val(),t=$("#pinContainer_5g");"PIN"==i?t.show():t.hide()}),s(),p();var i=$("#frmWps");$("#wpsSave").click(function(){i.submit()}),i.validate({submitHandler:function(){o()},rules:{txtPin:{wps_pin_validator:!0}}})}var I,l,h,f,A,w,v,D,g,P,W,C,b,x,E;return{init:u}});
//# sourceMappingURL=../../../sourcemaps/m/wifi/wps.js.map