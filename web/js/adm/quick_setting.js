define(["jquery","knockout","config/config","service","underscore"],function(e,a,p,s,t){function r(){return t.map(p.APN_AUTH_MODES,function(e){return new Option(e.name,e.value)})}function n(){function t(e){for(var a=0;a<p.APN_AUTH_MODES.length;a++)if(e==p.APN_AUTH_MODES[a].value)return p.APN_AUTH_MODES[a].name}function n(){showLoading();var e={apnMode:h.apnMode(),Profile_Name:h.profileName(),APN_name:h.apn(),ppp_auth_mode:h.selectedAuthMode(),ppp_username:h.username(),ppp_passwd:h.password(),SSID_name:h.ssid(),SSID_Broadcast:h.broadcast(),Encryption_Mode_hid:h.selectedSecurityMode(),WPA_PreShared_Key:h.WPAKey(),security_shared_mode:"NONE",wep_default_key:0,WPA_ENCRYPTION_hid:"OPEN"==h.selectedSecurityMode()?"NONE":"WPA2PSK"==h.selectedSecurityMode()?1:2};s.setQuickSetting(e,h.callback)}function o(){showLoading();var e=p.IPV4V6_SUPPORT&&"IPv4v6"==h.currAPN().pdp_type,a={apn_index:m.apn_index,pdp_type:h.ipType(),apnMode:h.apnMode(),profile_name:h.profileName(),wan_apn:h.apn(),ppp_auth_mode:h.selectedAuthMode(),ppp_username:h.username(),ppp_passwd:h.password(),ipv6_wan_apn:e?h.apn():h.ipv6_apn(),ipv6_ppp_auth_mode:e?h.selectedAuthMode():h.ipv6_selectedAuthMode(),ipv6_ppp_username:e?h.username():h.ipv6_username(),ipv6_ppp_passwd:e?h.password():h.ipv6_password(),SSID_name:h.ssid(),SSID_Broadcast:h.broadcast(),Encryption_Mode_hid:h.selectedSecurityMode(),WPA_PreShared_Key:h.WPAKey(),security_shared_mode:"NONE",wep_default_key:0,WPA_ENCRYPTION_hid:"OPEN"==h.selectedSecurityMode()?"NONE":"WPA2PSK"==h.selectedSecurityMode()?1:2};s.setQuickSetting4IPv6(a,h.callback)}function l(a){a<d?a=d:a>u&&(a=u);var p=!0;if(a>h.currentStep()&&(p=v(a)),p){h.currentStep(a),e("td[id^='right_step_']").removeClass().addClass("step-left");e("td[id^='step_']").each(function(){var p=parseInt(e(this).attr("id").replace("step_",""));p==a?(e(this).text(e.i18n.prop("step_name_"+p)).attr("data-trans","step_name_"+p).removeClass().addClass("step-active-middle"),p==u?e("#right_step_"+p).removeClass().addClass("step-active-right-end"):e("#right_step_"+p).removeClass().addClass("step-active-right")):(e(this).text(e.i18n.prop("step_number_"+p)).attr("data-trans","step_number_"+p).removeClass().addClass("step-middle"),p==a-1?e("#right_step_"+p).removeClass().addClass("step-active-left"):p==u?e("#right_step_"+p).removeClass().addClass("step-right-end"):e("#right_step_"+p).removeClass().addClass("step-left"))})}return p}function v(e){switch(e){case 1:break;case 2:return P()!=_.wps_on}return!0}function P(){var e=s.getWpsInfo();return"1"==e.wpsFlag?(showAlert("wps_on_info"),_.wps_on):"0"==e.radioFlag?_.wifi_off:_.ok}var h=this,m=s.getQuickSettingInfo();h.supportIPv6=p.IPV6_SUPPORT,h.supportIpv4AndIpv6=p.IPV4_AND_V6_SUPPORT,h.currentStep=a.observable(d),h.currAPN=a.computed(function(){var e=m["APN_config"+m.apn_index],a=[];e&&(a=e.split("($)"));var p=m["ipv6_APN_config"+m.ipv6_apn_index],s=[];return p&&(s=p.split("($)")),{m_profile_name:a[0],wan_apn:a[1],pdp_type:a[7],ppp_auth_mode:a[4].toLowerCase(),ppp_username:a[5],ppp_passwd:a[6],ipv6_pdp_type:s[7],ipv6_wan_apn:s[1],ipv6_ppp_auth_mode:s[4].toLowerCase(),ipv6_ppp_username:s[5],ipv6_ppp_passwd:s[6]}}),h.ipType=a.observable("IP"==h.currAPN().pdp_type?"IP":h.currAPN().ipv6_pdp_type),h.wpsFlag=a.observable(m.WscModeOption),h.apnMode=a.observable(m.apn_mode),h.profileName=a.observable(h.currAPN().m_profile_name),h.apn=a.observable(h.currAPN().wan_apn),h.ipv6_apn=a.observable(h.currAPN().ipv6_wan_apn),h.apnDisabled=a.computed(function(){return m.apn_index<p.defaultApnSize||checkConnectedStatus(m.ppp_status)||"ppp_connecting"==m.ppp_status}),h.apnModeDisabled=a.computed(function(){return checkConnectedStatus(m.ppp_status)||"ppp_connecting"==m.ppp_status}),h.authModes=a.observableArray(r()),h.selectedAuthMode=a.observable(h.currAPN().ppp_auth_mode),h.username=a.observable(h.currAPN().ppp_username),h.password=a.observable(h.currAPN().ppp_passwd),h.ipv6_selectedAuthMode=a.observable(h.currAPN().ipv6_ppp_auth_mode),h.ipv6_username=a.observable(h.currAPN().ipv6_ppp_username),h.ipv6_password=a.observable(h.currAPN().ipv6_ppp_passwd),h.transAPN=a.observable("apn_ipv4_apn"),h.transAuthMode=a.observable("apn_authentication_ipv4"),h.transUserName=a.observable("apn_user_name_ipv4"),h.transPassword=a.observable("apn_password_ipv4"),h.transAPNIPv6=a.observable("apn_ipv6_apn"),h.transAuthModeIPv6=a.observable("apn_authentication_ipv6"),h.transUserNameIPv6=a.observable("apn_user_name_ipv6"),h.transPasswordIPv6=a.observable("apn_password_ipv6"),"IP"==h.ipType()||"IPv4"==h.ipType()?(h.showIPv4=!0,h.showIPv6=!1,h.transAPN("apn"),h.transAuthMode("apn_authentication"),h.transUserName("apn_user_name"),h.transPassword("apn_password")):"IPv6"==h.ipType()?(h.showIPv4=!1,h.showIPv6=!0,h.transAPNIPv6("apn"),h.transAuthModeIPv6("apn_authentication"),h.transUserNameIPv6("apn_user_name"),h.transPasswordIPv6("apn_password")):p.IPV4_AND_V6_SUPPORT&&"IPv4v6"==h.ipType()?(h.showIPv4=!0,h.showIPv6=!0):(h.showIPv4=!0,h.showIPv6=!1,h.transAPN("apn"),h.transAuthMode("apn_authentication"),h.transUserName("apn_user_name"),h.transPassword("apn_password")),h.wifiClosed="0"==m.RadioOff,h.ssid=a.observable(m.SSID1),h.broadcast=a.observable(m.HideSSID),h.securityModes=a.observableArray(c),h.selectedSecurityMode=a.observable(m.AuthMode),h.WPAKey=a.observable(m.WPAPSK1),h.apnMode_display=a.observable(""),h.apnMode_trans=a.computed(function(){return i.auto==h.apnMode()?(h.apnMode_display(e.i18n.prop("apn_auto_apn")),"apn_auto_apn"):(h.apnMode_display(e.i18n.prop("apn_manual_apn")),"apn_manual_apn")}),h.selectedAuthMode_display=a.computed(function(){return t(h.selectedAuthMode())}),h.ipv6_selectedAuthMode_display=a.computed(function(){return t(h.ipv6_selectedAuthMode())}),h.showWifiPassword=a.observable(!1),h.showWifiPasswordHandler=function(){e("#pwdWPAKey").parent().find(".error").hide();var a=e("#showWifiPassword:checked");a&&0==a.length?h.showWifiPassword(!0):h.showWifiPassword(!1)},h.broadcast_display=a.observable(""),h.broadcast_trans=a.computed(function(){return"0"==h.broadcast()?(h.broadcast_display(e.i18n.prop("enable")),"enable"):(h.broadcast_display(e.i18n.prop("disable")),"disable")}),h.selectedSecurityMode_display=a.observable(),h.selectedSecurityMode_trans=a.computed(function(){for(var a=h.selectedSecurityMode(),s=0;s<p.AUTH_MODES.length;s++)if(a==p.AUTH_MODES[s].value)return h.selectedSecurityMode_display(e.i18n.prop("security_mode_"+p.AUTH_MODES[s].value)),"security_mode_"+p.AUTH_MODES[s].value}),h.callback=function(e){"success"==e.result?(successOverlay(),location.hash="#net_select"):errorOverlay()},h.save=function(){var e=function(){p.USE_IPV6_INTERFACE?o():n()},a=P();a==_.ok?e():a==_.wifi_off&&showConfirm("quick_setting_wifi_off_confirm",e)},h.next=function(){var e=h.currentStep(),a=h.currentStep()+1;l(a)&&2==e&&h.apnMode()==i.auto&&(a=h.currentStep()+1,l(a))},h.previous=function(){var e=h.currentStep(),a=h.currentStep()-1;l(a)&&4==e&&h.apnMode()==i.auto&&(a=h.currentStep()-1,l(a))}}function o(){var p=e("#container");a.cleanNode(p[0]);var s=new n;a.applyBindings(s,p[0]),e("#quickSettingForm").validate({submitHandler:function(){s.currentStep()<6?s.next():s.save()},rules:{txtAPN:"apn_check",txtIPv6APN:"apn_check",txtSSID:"ssid",txtWPAKey:"wifi_password_check",pwdWPAKey:"wifi_password_check",txtUserName:"ppp_username_check",txtIPv6UserName:"ppp_username_check",txtPassword:"ppp_password_check",txtIPv6Password:"ppp_password_check"},errorPlacement:function(e,a){var p=a.attr("id");"txtWPAKey"==p||"pwdWPAKey"==p?e.insertAfter("#lblShowWifiPassword"):e.insertAfter(a)}})}var _={ok:0,wps_on:1,wifi_off:2},i={auto:"auto",manual:"manual"},d=1,u=6,c=t.map(p.AUTH_MODES,function(e){return new Option(e.name,e.value)});return{init:o}});
//# sourceMappingURL=../../sourcemaps/adm/quick_setting.js.map
