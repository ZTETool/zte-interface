define(["jquery","knockout","config/config","service","underscore"],function(n,e,i,o,c){function r(){var n=this;n.isCPE=-1!=i.DEVICE.toLowerCase().indexOf("cpe"),n.wanMode=i.opms_wan_mode}function a(){var i=n("#container");e.cleanNode(i[0]);var o=new r;e.applyBindings(o,i[0])}return{init:a}});
//# sourceMappingURL=../../sourcemaps/firewall/firewall.js.map
