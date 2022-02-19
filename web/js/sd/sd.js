define(["jquery", "config/config", "service", "knockout"], function (e, a, s, t) {
    function r() {
        function a() {
            var e = {
                share_status: o.selectedShareEnable(),
                share_auth: o.selectedAccessType(),
                share_file: n + o.pathToShare()
            };
            "0" == o.selectedShareEnable() ? r(e) : s.checkFileExists({
                path: e.share_file
            }, function (a) {
                "exist" != a.status ? errorOverlay("sd_card_share_setting_" + a.status) : r(e)
            }, function () {
                errorOverlay()
            })
        }

        function r(e) {
            s.setSdCardSharing(e, function (e) {
                isErrorObject(e) ? "no_sdcard" == e.errorType ? errorOverlay("sd_card_share_setting_no_sdcard") : errorOverlay() : successOverlay()
            })
        }
        var o = this,
            d = s.getSDConfiguration();
        o.selectedMode = t.observable(d.sd_mode), o.orignalMode = t.observable(d.sd_mode), o.sdStatus = t.observable(d.sd_status), o.sdStatusInfo = t.observable("sd_card_status_info_" + d.sd_status), o.selectedShareEnable = t.observable(d.share_status), o.selectedFileToShare = t.observable(d.file_to_share), o.selectedAccessType = t.observable(d.share_auth);
        var l = d.share_file.substring(n.length);
        o.pathToShare = t.observable(l), o.isInvalidPath = t.observable(!1), e("#sd_card_status_info").translate(), o.disableApplyBtn = t.computed(function () {
            return o.selectedMode() == o.orignalMode() && "1" == o.selectedMode()
        }), o.fileToShareClickHandle = function () {
            return "1" == o.selectedFileToShare() && o.pathToShare("/"), !0
        }, o.save = function () {
            return showLoading(), o.orignalMode() == o.selectedMode() && "0" == o.selectedMode() ? a() : s.setSdCardMode({
                mode: o.selectedMode()
            }, function (e) {
                e.result ? (o.orignalMode(o.selectedMode()), "0" == o.selectedMode() ? a() : successOverlay()) : errorOverlay()
            }, function (e) {
                errorOverlay()
            }), !0
        }, o.checkPathIsValid = t.computed(function () {
            0 == o.orignalMode() && "1" == o.selectedShareEnable() && "0" == o.selectedFileToShare() && "" != o.pathToShare() && "/" != o.pathToShare() ? s.checkFileExists({
                path: n + o.pathToShare()
            }, function (e) {
                "exist" != e.status ? o.isInvalidPath(!0) : o.isInvalidPath(!1)
            }) : o.isInvalidPath(!1)
        })
    }

    function o() {
        var a = e("#container")[0];
        t.cleanNode(a);
        var s = new r;
        t.applyBindings(s, a), e("#httpshare_form").validate({
            submitHandler: function () {
                s.save()
            },
            rules: {
                path_to_share: "check_file_path"
            }
        })
    }
    var n = a.SD_BASE_PATH;
    return {
        init: o
    }
});
//# sourceMappingURL=../../sourcemaps/sd/sd.js.map