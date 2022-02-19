define(function () {
    return {
        INCLUDE_MOBILE: !0,
        HAS_CASCADE_SMS: !0,
        IPV6_SUPPORT: !0,
        PRODUCT_TYPE: "CPE",
        HAS_BATTERY: !0,
        EMPTY_APN_SUPPORT: !0,
        TSW_SUPPORT: !0,
        WIFI_SLEEP_SUPPORT: !0,
        HAS_FOTA: !0,
        WIFI_BAND_SUPPORT: !0,
        HAS_MULTI_SSID: !0,
        WIFI_BANDWIDTH_SUPPORT: !0,
        WIFI_SUPPORT_QR_CODE: !0,
        STATION_BLOCK_SUPPORT: !0,
        WDS_SUPPORT: !1,
        WIFI_SWITCH_SUPPORT: !0,
        WIFI_HAS_5G: !0,
        WEBUI_TITLE: "5G CPE",
        SHOW_WIFI_AP_ISOLATED: !0,
        sysLogModes: [{
            name: "ALL",
            value: "all"
        }, {
            name: "WAN Connect",
            value: "wan_connect"
        }, {
            name: "SMS",
            value: "sms"
        }, {
            name: "WLAN",
            value: "wlan"
        }, {
            name: "Router",
            value: "router"
        }],
        AUTO_MODES: [{
            name: "5G/4G/3G",
            value: "WL_AND_5G"
        }, {
            name: "5G NSA",
            value: "LTE_AND_5G"
        }, {
            name: "5G SA",
            value: "Only_5G"
        }, {
            name: "4G/3G",
            value: "WCDMA_AND_LTE"
        }, {
            name: "4G Only",
            value: "Only_LTE"
        }, {
            name: "3G Only",
            value: "Only_WCDMA"
        }],
        VPN_TYPE_MODES: [{
            name: "PPTP",
            value: "PPTP"
        }, {
            name: "L2TP",
            value: "L2TP"
        }],
        FREQUENCY_TYPE_4G: [{
            name: "all",
            value: "0xA3E2AB0908DF"
        }, {
            name: "1",
            value: "0x000000001"
        }, {
            name: "2",
            value: "0x000000002"
        }, {
            name: "3",
            value: "0x000000004"
        }, {
            name: "4",
            value: "0x000000008"
        }, {
            name: "5",
            value: "0x000000010"
        }, {
            name: "7",
            value: "0x000000040"
        }, {
            name: "8",
            value: "0x000000080"
        }, {
            name: "12",
            value: "0x000000800"
        }, {
            name: "17",
            value: "0x000010000"
        }, {
            name: "20",
            value: "0x000080000"
        }, {
            name: "25",
            value: "0x001000000"
        }, {
            name: "26",
            value: "0x002000000"
        }, {
            name: "28",
            value: "0x008000000"
        }, {
            name: "30",
            value: "0x020000000"
        }, {
            name: "32",
            value: "0x080000000"
        }, {
            name: "34",
            value: "0x200000000"
        }, {
            name: "38",
            value: "0x2000000000"
        }, {
            name: "39",
            value: "0x4000000000"
        }, {
            name: "40",
            value: "0x8000000000"
        }, {
            name: "41",
            value: "0x10000000000"
        }, {
            name: "42",
            value: "0x20000000000"
        }, {
            name: "46",
            value: "0x200000000000"
        }, {
            name: "48",
            value: "0x800000000000"
        }],
        LANGUAGES: [{
            name: "English",
            value: "en"
        }],
        APN_AUTH_MODES_SLICE: [{
            name: "NONE",
            value: "NONE"
        }, {
            name: "CHAP",
            value: "CHAP"
        }, {
            name: "PAP",
            value: "PAP"
        }, {
            name: "PAP/CHAP",
            value: "PAP_CHAP"
        }],
        vxlanTunnel_TYPE_MODES: [{
            name: "unicast",
            value: "unicast"
        }]
    }
});
//# sourceMappingURL=../../../../sourcemaps/config/cpe/MF253V/config.js.map