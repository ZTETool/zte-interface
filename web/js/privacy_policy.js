define(["jquery","service","knockout","config/config","status/statusBar","home"],function(t,o,e,n,a,i){function c(){var e=this,i=o.getStatusInfo();e.clickAllowAutoUpdate=function(){var o=t("#chkAutoUpdatePermission:checked");o&&0==o.length?e.allowAutoUpdate("1"):e.allowAutoUpdate("0"),e.apply()},e.apply=function(){var t={updateMode:e.allowAutoUpdate(),updateIntervalDay:"7",allowRoamingUpdate:e.allowRoamingUpdate()};showLoading(),o.setOTAUpdateSetting(t,function(t){t&&t.result})},e.setDialMode=function(){o.setConnectionMode({connectionMode:"auto_dial",isAllowedRoaming:"off"==i.roam_setting_option?"off":"on"},function(t){"success"==t.result&&(checkConnectedStatus(i.connectStatus)||"modem_init_complete"!=i.simStatus||e.connectNetwork())})},e.connectNetwork=function(){showLoading("connecting"),o.connect({},function(t){t.result?successOverlay():errorOverlay()})},e.setReadPrivacyNote=function(){var t={privacy_read_flag:"1"};o.setHaveReadPrivacyNote(t,function(t){t&&"success"==t.result&&(hidePopupModifyFotaSetWindow(),n.HAS_USER_IMPROVEMENT?showModifyFotaWindow("change_mode","user_improv","user_improv",700,400,function(){}):(a.setRedirectTips(!0),"#change_password"==window.location.hash&&d()))})},e.rejectPrivacyNote=function(){-1==n.DEVICE.toLowerCase().indexOf("datacard")?o.logout({},function(){window.location="index.html"}):window.location.hash="#dataCardReject"}}function d(){showLoading();var t=o.getWifiModuleSwitchStatus();"0"!=t.WiFiModuleSwitch&&"1"!=t.WiFiModuleSwitch?addTimeout(d,1e3):hideLoading()}function u(){var o=t("#fotaSetContainer")[0];e.cleanNode(o);var n=new c;e.applyBindings(n,o),t("#frmOTAUpdate").validate({submitHandler:function(){n.setReadPrivacyNote()}})}return{init:u}});
//# sourceMappingURL=../sourcemaps/privacy_policy.js.map