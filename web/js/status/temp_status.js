define(["jquery","service","knockout","config/config"],function(e,_,t,m){function r(){var e=this;e.wifi_chip_temp=t.observable(),e.pm_sensor_pa1=t.observable(),e.pm_sensor_mdm=t.observable(),e.pm_modem_5g=t.observable(),e.therm_pa_level=t.observable(),e.therm_pa_frl_level=t.observable(),e.therm_tj_level=t.observable(),e.updateInfo=function(_){e.wifi_chip_temp(_.wifi_chip_temp),e.pm_sensor_pa1(_.pm_sensor_pa1),e.pm_sensor_mdm(_.pm_sensor_mdm),e.pm_modem_5g(_.pm_modem_5g),e.therm_pa_level(_.therm_pa_level),e.therm_pa_frl_level(_.therm_pa_frl_level),e.therm_tj_level(_.therm_tj_level)};var m=_.getTempStatus();e.updateInfo(m)}function n(){var m=e("#container")[0];t.cleanNode(m);var n=new r;t.applyBindings(n,m),addInterval(function(){_.getTempStatus({},function(e){n.updateInfo(e)})},1e3)}return{init:n}});
//# sourceMappingURL=../../sourcemaps/status/temp_status.js.map