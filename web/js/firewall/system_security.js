define(["jquery","knockout","config/config","service","underscore"],function(e,n,r,i,a){function t(){var e=this,r=o();e.remoteFlag=n.observable(r.remoteFlag),e.pingFlag=n.observable(r.pingFlag),e.clear=function(){c()},e.save=function(){showLoading();var n={};n.remoteFlag=e.remoteFlag(),n.pingFlag=e.pingFlag(),i.setSysSecurity(n,function(e){"success"==e.result?successOverlay():errorOverlay()})}}function o(){return i.getSysSecurity()}function c(){var r=e("#container");n.cleanNode(r[0]);var i=new t;n.applyBindings(i,r[0]),e("#sysSecurityForm").validate({submitHandler:function(){i.save()}})}return{init:c}});
//# sourceMappingURL=../../sourcemaps/firewall/system_security.js.map