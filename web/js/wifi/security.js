define(["jquery","knockout","config/config","service","underscore"],function(e,r,n,s,a){function t(){var e=this,n=o();e.modes=r.observableArray(c),e.selectedMode=r.observable(n.AuthMode),e.passPhrase=r.observable(n.passPhrase),e.wpsFlag=r.observable(""),e.clear=function(){clearTimer(),u(),clearValidateMsg()},e.save=function(){if("1"==e.wpsFlag())return void showAlert("wps_on_info");showLoading();var r={};r.AuthMode=e.selectedMode(),r.passPhrase=e.passPhrase(),s.setSecurityInfo(r,function(r){"success"==r.result?(successOverlay(),e.clear()):errorOverlay()})},e.refreshStatus=function(){var r=i();e.wpsFlag(r.wpsFlag)},e.refreshStatus()}function o(){return s.getSecurityInfo()}function i(){return s.getWpsInfo()}function u(){var n=e("#container");r.cleanNode(n[0]);var s=new t;r.applyBindings(s,n[0]),e("#securityForm").validate({submitHandler:function(){s.save()}}),addInterval(s.refreshStatus,1e3)}var c=a.map(n.AUTH_MODES,function(e){return new Option(e.name,e.value)});return{init:u}});
//# sourceMappingURL=../../sourcemaps/wifi/security.js.map