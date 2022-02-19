define(["jquery","knockout","config/config","service","underscore"],function(r,e,o,t,n){function s(){function r(){"1"==o.outboundEnable()?o.showOutboundDiv(!0):o.showOutboundDiv(!1)}var o=this,n=t.getVoipSettings();o.outboundEnable=e.observable(n.outboundEnable),o.showOutboundDiv=e.observable(!1),o.outboundServer=e.observable(n.outboundServer),o.outboundPort=e.observable(n.outboundPort),r(),o.stunServer=e.observable(n.stunServer),o.registerTime=e.observable(n.registerTime),o.sipRegisterServer=e.observable(n.registration_server),o.sipDomain=e.observable(n.registration_server_port),o.sipRealm=e.observable(n.proxy_server),o.voipSipProxyServer=e.observable(n.proxy_server_port),o.changeOutboundSwitchHandler=function(){return r(),!0},o.sipPort=e.observable(n.sipPort),o.rtpPortMin=e.observable(n.rtpPortMin),o.rtpPortMax=e.observable(n.rtpPortMax),o.apply=function(){var r={goformId:"SIP_SET_SERVER",registration_server:o.sipRegisterServer(),registration_server_port:o.sipDomain(),proxy_server:o.sipRealm(),proxy_server_port:o.voipSipProxyServer(),outbound_proxy_enable:o.outboundEnable(),outbound_proxy_port:o.outboundPort(),outbound_proxy:o.outboundServer()};t.setVoipSettings(r,function(r){"success"==r.result?(successOverlay(),showAlert("warn_information")):errorOverlay()})}}function i(){var o=r("#container");e.cleanNode(o[0]);var t=new s;e.applyBindings(t,o[0]),r("#voipSettingsForm").validate({submitHandler:function(){t.apply()},rules:{outbound_server:{sntp_invalid_server_name:!0},outbound_port:{voip_outbound_port_check:!0},register_server_port:{voip_outbound_port_check:!0},proxy_server_port:{voip_outbound_port_check:!0},register_server_address:{sntp_invalid_server_name:!0},proxy_server_address:{sntp_invalid_server_name:!0}},groups:{range:"sip_rtp_port_min sip_rtp_port_max"},errorPlacement:function(r,e){"outbound_port"==e.attr("name")?r.insertAfter("#outbound_port"):"register_server_port"==e.attr("name")?r.insertAfter("#register_server_port"):"proxy_server_port"==e.attr("name")?r.insertAfter("#proxy_server_port"):"sip_rtp_port_min"==e.attr("name")||"sip_rtp_port_max"==e.attr("name")?r.insertAfter("#rtp_port_label"):r.insertAfter(e)}})}return{init:i}});
//# sourceMappingURL=../../sourcemaps/voip/voip_settings.js.map