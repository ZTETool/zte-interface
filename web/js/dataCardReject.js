define(["jquery","knockout","config/config","service","underscore","config/menu","logout","status/statusBar"],function(n,o,i,e,t,c,u,a){function r(){this.goToHome=function(){window.location.hash="#home"}}function s(){var i=n("#container")[0];o.cleanNode(i);var e=new r;o.applyBindings(e,i)}return{init:s}});
//# sourceMappingURL=../sourcemaps/dataCardReject.js.map
