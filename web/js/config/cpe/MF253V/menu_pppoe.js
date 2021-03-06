define(function () {
    return [{
        hash: "#login",
        path: "login",
        level: "1",
        requireLogin: !1,
        checkSIMStatus: !1
    }, {
        hash: "#dataCardReject",
        path: "dataCardReject",
        level: "",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#change_password",
        path: "change_password",
        level: "",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#home",
        path: "home",
        level: "1",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#status",
        path: "status/device_info",
        level: "1",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#parental_control",
        path: "firewall/parental_control",
        level: "1",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#setting",
        path: "network/dial_setting_cpe",
        level: "1",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#suggested_position",
        path: "sugPosition/suggested_position",
        level: "1",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#internet_setting",
        path: "network/dial_setting_cpe",
        level: "1",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#net_setting",
        path: "network/dial_setting_cpe",
        level: "2",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi",
        path: "wifi/wifi_basic",
        level: "2",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#device_setting",
        path: "adm/password",
        level: "2",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#group_all",
        path: "phonebook/phonebook",
        level: "2",
        parent: "#phonebook",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#group_common",
        path: "phonebook/phonebook",
        level: "2",
        parent: "#phonebook",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#group_family",
        path: "phonebook/phonebook",
        level: "2",
        parent: "#phonebook",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#group_friend",
        path: "phonebook/phonebook",
        level: "2",
        parent: "#phonebook",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#group_colleague",
        path: "phonebook/phonebook",
        level: "2",
        parent: "#phonebook",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#firewall",
        path: "firewall/firewall",
        level: "2",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#router_setting",
        path: "adm/lan",
        level: "2",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#bind_addr_lan",
        path: "adm/bind_addr_lan",
        level: "2",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#device_info",
        path: "status/device_info",
        level: "2",
        parent: "#status",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#voip_setting",
        path: "voip/voip_setting",
        level: "2",
        parent: "#parental_control",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_basic",
        path: "wifi/wifi_basic",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_main",
        path: "wifi/wifi_main",
        level: "3",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_guest",
        path: "wifi/wifi_guest",
        level: "3",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_advance",
        path: "wifi/wifi_advance",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#station_info",
        path: "wifi/station_info",
        level: "3",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#black_list",
        path: "wifi/mac_filter",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wps",
        path: "wifi/wps",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_mac_filter",
        path: "wifi/mac_filter20",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_main_chip1",
        path: "wifi/wifi_main_chip1",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#wifi_main_chip2",
        path: "wifi/wifi_main_chip2",
        level: "3",
        parent: "#wifi",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#password_management",
        path: "adm/password",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#pin_management",
        path: "adm/pin",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !0
    }, {
        hash: "#restore",
        path: "adm/restore",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#sleep_mode",
        path: "wifi/sleep_mode",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#others",
        path: "adm/others",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#restart",
        path: "adm/restart",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#tr069config",
        path: "adm/tr069config",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0
    }, {
        hash: "#port_filter",
        path: "firewall/port_filter",
        level: "3",
        parent: "#firewall",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#port_forward",
        path: "firewall/port_forward",
        level: "3",
        parent: "#firewall",
        requireLogin: !0
    }, {
        hash: "#url_filter",
        path: "firewall/url_filter",
        level: "3",
        parent: "#firewall",
        requireLogin: !0
    }, {
        hash: "#port_map",
        path: "firewall/port_map",
        level: "3",
        parent: "#firewall",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#upnp",
        path: "firewall/upnp_setting",
        level: "3",
        parent: "#firewall",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#dmz",
        path: "firewall/dmz_setting",
        level: "3",
        parent: "#firewall",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#SNTP",
        path: "adm/sntp",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0
    }, {
        hash: "#pc_children_group",
        path: "firewall/parental_control",
        level: "2",
        parent: "#parental_control",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#pc_time_limited",
        path: "firewall/pc_time_limited",
        level: "2",
        parent: "#parental_control",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#ota_update",
        path: "update/ota_update",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#network_info",
        path: "adm/network_info",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#diagnosis",
        path: "adm/diagnosis",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#thermal_switch",
        path: "adm/thermal_switch",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0
    }, {
        hash: "#ping_log",
        path: "status/ping_log",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !0
    }, {
        hash: "#sleep_protection_mode",
        path: "adm/sleep_protection_mode",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#restart_schedule",
        path: "adm/restart_schedule",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#vpn_client",
        path: "firewall/vpn_client",
        level: "3",
        parent: "#firewall",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#user_details",
        path: "voip/voip_user_details",
        level: "3",
        parent: "#voip_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#supplement_service",
        path: "voip/voip_supplementary_service",
        level: "3",
        parent: "#voip_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#voip_settings",
        path: "voip/voip_settings",
        level: "3",
        parent: "#voip_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#voip_advanced_settings",
        path: "voip/voip_advanced_settings",
        level: "3",
        parent: "#voip_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#ap_station",
        path: "wifi/ap_station",
        level: "3",
        parent: "#setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#temp_status",
        path: "status/temp_status",
        level: "",
        parent: "",
        requireLogin: !0
    }, {
        hash: "#ant_switch",
        path: "hide/ant_switch",
        level: "",
        parent: "",
        requireLogin: !0
    }, {
        hash: "#debug_page",
        path: "hide/debug_page",
        level: "",
        parent: "",
        requireLogin: !0
    }, {
        hash: "#rf_mmw",
        path: "hide/rf_mmw",
        level: "",
        parent: "",
        requireLogin: !0
    }, {
        hash: "#slice_setting",
        path: "hide/slice_setting",
        level: "",
        parent: "",
        requireLogin: !0
    }, {
        hash: "#watch_dog_setting",
        path: "adm/watch_dog",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#user_improv_switch",
        path: "adm/user_improv_setting",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#upgrade_url",
        path: "adm/upgrade_url",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#nat",
        path: "firewall/nat_setting",
        level: "3",
        parent: "#firewall",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#mec_setting",
        path: "adm/mec_setting",
        level: "",
        parent: "",
        requireLogin: !0
    }, {
        hash: "#vxlan_menu",
        path: "adm/vxlan_menu",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#vxlan_tunnel",
        path: "adm/vxlan_tunnel",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#mec_coordination_menu",
        path: "adm/mec_coordination_menu",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#vxlan_application",
        path: "adm/vxlan_application",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#reverse_addressing_application",
        path: "adm/reverse_addressing_application",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#sys_log",
        path: "adm/sys_log",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !1
    }, {
        hash: "#network_debug",
        path: "hide/network_debug",
        level: "3",
        parent: "#device_setting",
        requireLogin: !0,
        checkSIMStatus: !0
    }]
});
//# sourceMappingURL=../../../../sourcemaps/config/cpe/MF253V/menu_pppoe.js.map