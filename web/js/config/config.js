define(function () {
    var e = {
            IS_TEST: zte_web_ui_is_test,
            WIFI_GUEST_SSID_ACCESS_SUPPORT: !0,
            WIFI_MAC_FILTER_SUPPORT: !0,
            HAS_GDPR: !0,
            HAS_USER_IMPROVEMENT: !0,
            PRODUCT_TYPE: "CPE",
            HAS_LOGIN: !0,
            LOGIN_THEN_CHECK_PIN: !0,
            defaultRoute: "#login",
            LOGIN_SECURITY_SUPPORT: !0,
            MAX_LOGIN_COUNT: 5,
            GUEST_HASH: ["#httpshare_guest"],
            INCLUDE_MOBILE: !0,
            DEVICE: "cpe/MF253V",
            PASSWORD_ENCODE: !0,
            EMPTY_APN_SUPPORT: !0,
            FAST_BOOT_SUPPORT: !0,
            HAS_STK: !0,
            HAS_CASCADE_SMS: !0,
            HAS_FOTA: !0,
            HAS_MULTI_SSID: !0,
            HAS_WIFI: !0,
            HAS_BATTERY: !0,
            SHOW_MAC_ADDRESS: !0,
            IPV6_SUPPORT: !0,
            IPV4V6_SUPPORT: !0,
            IPV4_AND_V6_SUPPORT: !0,
            CLEAR_DATA_SUPPORT: !0,
            USE_IPV6_INTERFACE: !0,
            MAX_STATION_NUMBER: 20,
            MAX_STATION_NUMBER_5G: 10,
            NETWORK_UNLOCK_SUPPORT: !0,
            WIFI_BAND_SUPPORT: !0,
            WIFI_BANDWIDTH_SUPPORT: !0,
            WIFI_SUPPORT_QR_CODE: !0,
            WIFI_SWITCH_SUPPORT: !0,
            WIFI_SLEEP_SUPPORT: !0,
            AUTO_POWER_SAVE_SUPPORT: !0,
            SHOW_WIFI_AP_ISOLATED: !0,
            STATION_BLOCK_SUPPORT: !0,
            STATION_BIND_SUPPORT: !0,
            UPGRADE_TYPE: "OTA",
            ALREADY_NOTICE: !0,
            HAS_OTA_NEW_VERSION: !0,
            ALREADY_OTA_NOTICE: !0,
            AP_STATION_SUPPORT: !1,
            AP_STATION_LIST_LENGTH: 10,
            TSW_SUPPORT: !0,
            HAS_PHONEBOOK: !0,
            HAS_SMS: !0,
            SMS_DATABASE_SORT_SUPPORT: !0,
            SHOW_UN_COMPLETE_CONCAT_SMS: !0,
            SMS_UNREAD_NUM_INCLUDE_SIM: !0,
            SMS_SET_READ_WHEN_COMPLETE: !0,
            DATE_FORMAT: "3",
            TIME_FORMAT: "24",
            SD_CARD_SUPPORT: !0,
            VOLTE_SUPPORT: !0,
            WEBUI_TITLE: "4G Hostless Modem",
            TEMPORARY_MODEM_MAIN_STATE: ["modem_undetected", "modem_detected", "modem_sim_state", "modem_handover", "modem_imsi_lock", "modem_online", "modem_offline"],
            SHOW_APN_DNS: !0,
            HAS_PARENTAL_CONTROL: !0,
            WIFI_HAS_5G: !0,
            AC_MODE_SUPPORT: !0,
            OPMODE_CHANGE_SUPPORT: !0,
            OPERATE_MODE: ["LTE_BRIDGE", "PPP", "PPPOE", "AUTO", "AUTO_BACKUP"],
            homeRoute: "home",
            defaultRouteM: "login",
            isLogin: !1,
            isTrafficAlertSet: !1,
            DEVICE_MODE: "",
            DEVICE_TYPE: "CPE",
            SIM_CARD_STATUS: "",
            DEVICE_NAME: "",
            HAS_SAVE_LOGIN_PASSWORD: !0,
            HAS_TR069: !0,
            PASSWORD_ENCODE_SHA256: !0,
            WEB_ATTR_IF_SUPPORT_SHA256: 2,
            ACCESSIBLE_ID_SUPPORT: !0,
            IS_SHOW_SINR: !0,
            IS_SUPORT_NIGHT_MODE: !0,
            WIFI_DOUBLE_CHIP: !0,
            WIFI_POINT_INFO: {},
            WIFI_CHIP_CAPACITY: {},
            ACCESSPOINTINDEX: {
                FIRST: 0,
                SECOND: 1,
                THIRD: 2,
                FOURTH: 3
            },
            WIFICHIPINDEX: {
                FIRST: 0,
                SECOND: 1
            },
            CONTENT_MODIFIED: {
                modified: !1,
                message: "leave_page_info",
                data: {},
                checkChangMethod: function () {
                    return !1
                },
                callback: {
                    ok: $.noop,
                    no: function () {
                        return !0
                    }
                }
            },
            resetContentModifyValue: function () {
                this.CONTENT_MODIFIED.checkChangMethod = function () {
                    return !1
                }, this.CONTENT_MODIFIED.modified = !1, this.CONTENT_MODIFIED.message = "leave_page_info", this.CONTENT_MODIFIED.callback = {
                    ok: $.noop,
                    no: function () {
                        return !0
                    }
                }, this.CONTENT_MODIFIED.data = {}
            },
            portForwardMax: 10,
            urlFilterMax: 10,
            defaultApnSize: 1,
            maxApnNumber: 10,
            staticMacIPAddress: 10,
            NETWORK_MODES: [{
                name: "802.11 b/g/n",
                value: "4"
            }, {
                name: "11axg",
                value: "7"
            }],
            NETWORK_MODES_BAND: [{
                name: "802.11 a only",
                value: "5"
            }, {
                name: "802.11 n only",
                value: "2"
            }, {
                name: "802.11 a/n",
                value: "4"
            }, {
                name: "11a/11n/11ac",
                value: "6"
            }, {
                name: "11axa",
                value: "8"
            }],
            NETWORK_MODES_AC: [{
                name: "802.11 a/n/ac)",
                value: "6"
            }, {
                name: "802.11 a/n/ac/ax",
                value: "8"
            }],
            KEY_ID_MODES: [{
                name: "Key 1",
                value: "0"
            }, {
                name: "Key 2",
                value: "1"
            }, {
                name: "Key 3",
                value: "2"
            }, {
                name: "Key 4",
                value: "3"
            }],
            ENCRYPT_TYPE_MODES: [{
                name: "NO ENCRYPTION",
                value: "NONE"
            }, {
                name: "WEP",
                value: "WEP"
            }],
            AUTH_MODES: [{
                name: "NO ENCRYPTION",
                value: "OPEN"
            }, {
                name: "WPA2(AES)-PSK",
                value: "WPA2PSK"
            }, {
                name: "WPA-PSK/WPA2-PSK",
                value: "WPAPSKWPA2PSK"
            }],
            AUTH_MODES_ALL: [{
                name: "NO ENCRYPTION",
                value: "OPEN"
            }, {
                name: "SHARED",
                value: "SHARED"
            }, {
                name: "WPA2-PSK",
                value: "WPA2PSK"
            }, {
                name: "WPA-PSK/WPA2-PSK",
                value: "WPAPSKWPA2PSK"
            }],
            LANGUAGES: [{
                name: "English",
                value: "en"
            }],
            AUTO_MODES: [{
                name: "Automatic",
                value: "WCDMA_preferred"
            }, {
                name: "3G Only",
                value: "Only_WCDMA"
            }, {
                name: "2G Only",
                value: "Only_GSM"
            }],
            APN_AUTH_MODES: [{
                name: "NONE",
                value: "none"
            }, {
                name: "CHAP",
                value: "chap"
            }, {
                name: "PAP",
                value: "pap"
            }],
            SMS_VALIDITY: [{
                name: "12 hours",
                value: "twelve_hours"
            }, {
                name: "A day",
                value: "one_day"
            }, {
                name: "A week",
                value: "one_week"
            }, {
                name: "The longest period",
                value: "largest"
            }],
            SLEEP_MODES: [{
                name: "Always on",
                value: "-1"
            }, {
                name: "5 minutes",
                value: "5"
            }, {
                name: "10 minutes",
                value: "10"
            }, {
                name: "20 minutes",
                value: "20"
            }, {
                name: "30 minutes",
                value: "30"
            }, {
                name: "1 hour",
                value: "60"
            }, {
                name: "2 hours",
                value: "120"
            }],
            FORWARD_PROTOCOL_MODES: [{
                name: "TCP+UDP",
                value: "TCP&UDP"
            }, {
                name: "TCP",
                value: "TCP"
            }, {
                name: "UDP",
                value: "UDP"
            }],
            MAP_PROTOCOL_MODES: [{
                name: "TCP+UDP",
                value: "TCP&UDP"
            }, {
                name: "TCP",
                value: "TCP"
            }, {
                name: "UDP",
                value: "UDP"
            }],
            FILTER_PROTOCOL_MODES: [{
                name: "NONE",
                value: "None"
            }, {
                name: "TCP",
                value: "TCP"
            }, {
                name: "UDP",
                value: "UDP"
            }, {
                name: "ICMP",
                value: "ICMP"
            }],
            SD_SHARE_ENABLE: [{
                name: "Enable",
                value: "1"
            }, {
                name: "Disable",
                value: "0"
            }],
            SD_FILE_TO_SHARE: [{
                name: "entire_sd_card",
                value: "1"
            }, {
                name: "custom_setting",
                value: "0"
            }],
            SD_ACCESS_TYPE: [{
                name: "entire_sd_card",
                value: "1"
            }, {
                name: "custom_setting",
                value: "0"
            }],
            DLNA_LANGUAGES: [{
                name: "english",
                value: "english"
            }, {
                name: "chinese",
                value: "chinese"
            }],
            SD_BASE_PATH: "/mmc2",
            dbMsgs: [],
            listMsgs: [],
            currentChatObject: null,
            smsMaxId: 0,
            phonebook: [],
            smsIsReady: !1,
            countryCodeType: {
                world: 3,
                mkkc: 3,
                apld: 7,
                etsic: 3,
                fcca: 1
            },
            countryCode: {
                world: ["AL", "DZ", "AR", "AM", "AU", "AT", "AZ", "BH", "BY", "BE", "BA", "BR", "BN", "BG", "CL", "CN", "CR", "HR", "CY", "CZ", "DK", "EC", "EG", "SV", "EE", "FI", "FR", "GE", "DE", "GR", "HN", "HK", "HU", "IS", "IN", "ID", "IE", "IL", "IT", "JM", "JO", "KZ", "KE", "KW", "LV", "LB", "LI", "LT", "LU", "MO", "MK", "MY", "MT", "MC", "MA", "NL", "AN", "NO", "OM", "PK", "PE", "PH", "PL", "PT", "QA", "RO", "RU", "SA", "SG", "SK", "SI", "ZA", "ES", "LK", "SE", "CH", "TH", "TT", "TN", "TR", "UA", "AE", "GB", "UY", "VN", "ZW", "BD"],
                mkkc: ["JP"],
                apld: [],
                etsic: ["BZ", "BO", "NZ", "VE"],
                fcca: ["CA", "CO", "DO", "GT", "MX", "PA", "PR", "TW", "US", "UZ"]
            },
            countryCode_5g: {
                one: {
                    codes: ["AL", "AI", "AW", "AT", "BY", "BM", "BA", "BW", "IO", "BG", "CV", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GF", "PF", "TF", "GI", "DE", "GR", "GP", "GG", "HU", "IS", "IE", "IT", "KE", "LA", "LV", "LS", "LI", "LT", "LU", "MK", "MT", "IM", "MQ", "MR", "MU", "YT", "MC", "ME", "MS", "NL", "AN", "NO", "OM", "PL", "PT", "RE", "RO", "SM", "SN", "RS", "SK", "SI", "ZA", "ES", "SE", "CH", "TC", "UG", "GB", "VG", "WF", "ZM", "AF", "JO", "MA", "EH", "EU", "DZ", "IL", "MX", "PM", "TN", "TR", "JP"],
                    channels: [36, 40, 44, 48]
                },
                two: {
                    codes: ["AS", "AG", "AZ", "BR", "KH", "KY", "CO", "CR", "DM", "DO", "EC", "GH", "GD", "HK", "KZ", "KI", "FM", "MZ", "NA", "NZ", "NI", "NE", "PW", "PE", "PH", "PR", "VC", "TH", "TT", "UY", "ZW", "AU", "BH", "BB", "CA", "CL", "CX", "EG", "SV", "GT", "HT", "IN", "MY", "NF", "PA", "PG", "SG", "US", "VN"],
                    channels: [36, 40, 44, 48, 149, 153, 157, 161, 165]
                },
                three: {
                    codes: ["LB", "MW", "MO", "QA"],
                    channels: [149, 153, 157, 161]
                },
                four: {
                    codes: ["BD", "BF", "CN", "HN", "JM", "PK", "PY", "KN", "AR", "TW", "NG"],
                    channels: [149, 153, 157, 161, 165]
                },
                five: {
                    codes: ["SA"],
                    channels: [36, 40, 44, 48, 149, 153, 157, 161]
                }
            },
            countries: {
                NONE: "NONE",
                AL: "SHQIPERI",
                DZ: "الجزائر",
                AR: "ARGENTINA",
                AM: "ՀԱՅԱՍՏԱՆ",
                AU: "AUSTRALIA",
                AT: "ÖSTERREICH",
                AZ: "AZƏRBAYCAN",
                BD: "বাংলাদেশ",
                BH: "البحرين",
                BY: "БЕЛАРУСЬ",
                BE: "BELGIË",
                BA: "БОСНА И ХЕРЦЕГОВИНА",
                BR: "BRASIL",
                BN: "BRUNEI DARUSSALAM",
                BG: "БЪЛГАРИЯ",
                CL: "CHILE",
                CN: "中国",
                CR: "COSTA RICA",
                HR: "HRVATSKA",
                CY: "ΚΎΠΡΟΣ",
                CZ: "ČESKÁ REPUBLIKA",
                DK: "DANMARK",
                EC: "ECUADOR",
                EG: "مصر",
                SV: "EL SALVADOR",
                EE: "EESTI",
                FI: "SUOMI",
                FR: "FRANCE",
                GE: "საქართველო",
                DE: "DEUTSCHLAND",
                GR: "ΕΛΛΆΔΑ",
                HN: "HONDURAS",
                HK: "中國香港",
                HU: "MAGYARORSZÁG",
                IS: "ÍSLAND",
                IN: "INDIA",
                ID: "INDONESIA",
                IE: "ÉIRE",
                IL: "إسرائيل",
                IT: "ITALIA",
                JM: "JAMAICA",
                JO: "الأردن",
                KZ: "КАЗАХСТАН",
                KE: "KENYA",
                KW: "الكويت",
                LV: "LATVIJA",
                LB: "لبنان",
                LI: "LIECHTENSTEIN",
                LT: "LIETUVA",
                LU: "LUXEMBOURG",
                MO: "中國澳門",
                MK: "МАКЕДОНИЈА",
                MY: "MALAYSIA",
                MT: "MALTA",
                MC: "MONACO",
                MA: "المغرب",
                NL: "NEDERLAND",
                AN: "NETHERLANDS ANTILLES",
                NO: "NORGE",
                OM: "سلطنة عمان",
                PK: "PAKISTAN",
                PE: "PERÚ",
                PH: "PHILIPPINES",
                PL: "POLSKA",
                PT: "PORTUGAL",
                QA: "قطر",
                RO: "ROMÂNIA",
                RU: "Российская Федерация",
                SA: "السعودية",
                SG: "SINGAPORE",
                SK: "SLOVENSKÁ REPUBLIKA",
                SI: "SLOVENIJA",
                ZA: "SOUTH AFRICA",
                ES: "ESPAÑA",
                LK: "SRILANKA",
                SE: "SVERIGE",
                CH: "SCHWEIZ",
                TH: "ประเทศไทย",
                TT: "TRINIDAD AND TOBAGO",
                TN: "تونس",
                TR: "TÜRKİYE",
                UA: "Україна",
                AE: "الإمارات العربية المتحدة",
                GB: "UNITED KINGDOM",
                UY: "URUGUAY",
                VN: "VIỆT NAM",
                ZW: "ZIMBABWE",
                JP: "日本",
                BZ: "BELIZE",
                BO: "BOLIVIA",
                NZ: "NEW ZEALAND",
                VE: "REPÚBLICA BOLIVARIANA DE VENEZUELA",
                CA: "CANADA",
                CO: "COLOMBIA",
                DO: "REPÚBLICA DOMINICANA",
                GT: "GUATEMALA",
                MX: "MEXICO",
                PA: "PANAMÁ",
                PR: "PUERTO RICO",
                TW: "中國台灣",
                US: "UNITED STATES",
                UZ: "O’zbekiston"
            },
            countries_5g: {
                NONE: "NONE",
                AR: "ARGENTINA",
                AM: "ՀԱՅԱՍՏԱՆ",
                AU: "AUSTRALIA",
                AT: "ÖSTERREICH",
                AZ: "AZƏRBAYCAN",
                BH: "البحرين",
                BY: "БЕЛАРУСЬ",
                BE: "BELGIË",
                BA: "БОСНА И ХЕРЦЕГОВИНА",
                BR: "BRASIL",
                BN: "BRUNEI DARUSSALAM",
                BG: "БЪЛГАРИЯ",
                CL: "CHILE",
                CN: "中国",
                CR: "COSTA RICA",
                HR: "HRVATSKA",
                CY: "ΚΎΠΡΟΣ",
                CZ: "ČESKÁ REPUBLIKA",
                DK: "DANMARK",
                EC: "ECUADOR",
                EG: "مصر",
                SV: "EL SALVADOR",
                EE: "EESTI",
                FI: "SUOMI",
                FR: "FRANCE",
                GE: "საქართველო",
                DE: "DEUTSCHLAND",
                GR: "ΕΛΛΆΔΑ",
                HK: "中國香港",
                HU: "MAGYARORSZÁG",
                IS: "ÍSLAND",
                IN: "INDIA",
                ID: "INDONESIA",
                IE: "ÉIRE",
                IL: "إسرائيل",
                IT: "ITALIA",
                JM: "JAMAICA",
                JO: "الأردن",
                LV: "LATVIJA",
                LI: "LIECHTENSTEIN",
                LT: "LIETUVA",
                LU: "LUXEMBOURG",
                MO: "中國澳門",
                MY: "MALAYSIA",
                MT: "MALTA",
                MC: "MONACO",
                NL: "NEDERLAND",
                AN: "Netherlands Antilles",
                NO: "NORGE",
                OM: "سلطنة عمان",
                PE: "PERÚ",
                PH: "PHILIPPINES",
                PL: "POLSKA",
                PT: "PORTUGAL",
                SA: "السعودية",
                SG: "SINGAPORE",
                SK: "SLOVENSKÁ REPUBLIKA",
                SI: "SLOVENIJA",
                ZA: "SOUTH AFRICA",
                ES: "ESPAÑA",
                LK: "SRILANKA",
                SE: "SVERIGE",
                CH: "SCHWEIZ",
                TT: "TRINIDAD AND TOBAGO",
                TN: "تونس",
                TR: "TÜRKİYE",
                GB: "UNITED KINGDOM",
                UY: "URUGUAY",
                JP: "日本",
                BZ: "BELIZE",
                BO: "BOLIVIA",
                NZ: "NEW ZEALAND",
                VE: "VENEZUELA",
                CA: "CANADA",
                CO: "COLOMBIA",
                DO: "REPÚBLICA DOMINICANA",
                GT: "GUATEMALA",
                MX: "MEXICO",
                PA: "PANAMÁ",
                PR: "PUERTO RICO",
                TW: "中國台灣",
                US: "UNITED STATES",
                UZ: "O’zbekiston"
            },
            pppoeModes: [{
                name: "PPPoE",
                value: "PPPOE"
            }, {
                name: "Static",
                value: "STATIC"
            }, {
                name: "DHCP",
                value: "DHCP"
            }],
            autoPPPOEModes: [{
                name: "PPPoE",
                value: "AUTO_PPPOE"
            }, {
                name: "DHCP",
                value: "AUTO_DHCP"
            }],
            sntpTimeSetMode: [{
                name: "manual",
                value: "manual"
            }, {
                name: "auto",
                value: "auto"
            }],
            timeZone: [{
                name: "GMT-12:00",
                value: "-12"
            }, {
                name: "GMT-11:00",
                value: "-11"
            }, {
                name: "GMT-10:00",
                value: "-10"
            }, {
                name: "GMT-09:00",
                value: "-9"
            }, {
                name: "GMT-08:00",
                value: "-8"
            }, {
                name: "GMT-08:00-1",
                value: "-8-1"
            }, {
                name: "GMT-07:00",
                value: "-7"
            }, {
                name: "GMT-07:00-1",
                value: "-7-1"
            }, {
                name: "GMT-07:00-2",
                value: "-7-2"
            }, {
                name: "GMT-06:00",
                value: "-6"
            }, {
                name: "GMT-06:00-1",
                value: "-6-1"
            }, {
                name: "GMT-06:00-2",
                value: "-6-2"
            }, {
                name: "GMT-06:00-3",
                value: "-6-3"
            }, {
                name: "GMT-05:00",
                value: "-5"
            }, {
                name: "GMT-05:00-1",
                value: "-5-1"
            }, {
                name: "GMT-05:00-2",
                value: "-5-2"
            }, {
                name: "GMT-04:00",
                value: "-4"
            }, {
                name: "GMT-04:00-1",
                value: "-4-1"
            }, {
                name: "GMT-04:00-2",
                value: "-4-2"
            }, {
                name: "GMT-04:00-3",
                value: "-4-3"
            }, {
                name: "GMT-03:30",
                value: "-3.5"
            }, {
                name: "GMT-03:00",
                value: "-3"
            }, {
                name: "GMT-03:00-1",
                value: "-3-1"
            }, {
                name: "GMT-03:00-2",
                value: "-3-2"
            }, {
                name: "GMT-02:00",
                value: "-2"
            }, {
                name: "GMT-01:00",
                value: "-1"
            }, {
                name: "GMT-01:00-1",
                value: "-1-1"
            }, {
                name: "GMT",
                value: "0"
            }, {
                name: "GMT-1",
                value: "0-1"
            }, {
                name: "GMT+01:00",
                value: "1"
            }, {
                name: "GMT+01:00-1",
                value: "1-1"
            }, {
                name: "GMT+01:00-2",
                value: "1-2"
            }, {
                name: "GMT+01:00-3",
                value: "1-3"
            }, {
                name: "GMT+01:00-4",
                value: "1-4"
            }, {
                name: "GMT+02:00",
                value: "2"
            }, {
                name: "GMT+02:00-1",
                value: "2-1"
            }, {
                name: "GMT+02:00-2",
                value: "2-2"
            }, {
                name: "GMT+02:00-3",
                value: "2-3"
            }, {
                name: "GMT+02:00-4",
                value: "2-4"
            }, {
                name: "GMT+02:00-5",
                value: "2-5"
            }, {
                name: "GMT+02:00-6",
                value: "2-6"
            }, {
                name: "GMT+02:00-7",
                value: "2-7"
            }, {
                name: "GMT+02:00-8",
                value: "2-8"
            }, {
                name: "GMT+03:00",
                value: "3"
            }, {
                name: "GMT+03:00-1",
                value: "3-1"
            }, {
                name: "GMT+03:00-2",
                value: "3-2"
            }, {
                name: "GMT+03:00-3",
                value: "3-3"
            }, {
                name: "GMT+03:00-4",
                value: "3-4"
            }, {
                name: "GMT+04:00",
                value: "4"
            }, {
                name: "GMT+04:00-1",
                value: "4-1"
            }, {
                name: "GMT+04:00-2",
                value: "4-2"
            }, {
                name: "GMT+04:30",
                value: "4.5"
            }, {
                name: "GMT+05:00",
                value: "5"
            }, {
                name: "GMT+05:00-1",
                value: "5-1"
            }, {
                name: "GMT+05:30",
                value: "5.5"
            }, {
                name: "GMT+05:30-1",
                value: "5.5-1"
            }, {
                name: "GMT+05:45",
                value: "5.75"
            }, {
                name: "GMT+06:00",
                value: "6"
            }, {
                name: "GMT+06:00-1",
                value: "6-1"
            }, {
                name: "GMT+06:30",
                value: "6.5"
            }, {
                name: "GMT+07:00",
                value: "7"
            }, {
                name: "GMT+07:00-1",
                value: "7-1"
            }, {
                name: "GMT+08:00",
                value: "8"
            }, {
                name: "GMT+08:00-1",
                value: "8-1"
            }, {
                name: "GMT+08:00-2",
                value: "8-2"
            }, {
                name: "GMT+08:00-3",
                value: "8-3"
            }, {
                name: "GMT+09:00",
                value: "9"
            }, {
                name: "GMT+09:00-1",
                value: "9-1"
            }, {
                name: "GMT+09:00-2",
                value: "9-2"
            }, {
                name: "GMT+09:30",
                value: "9.5"
            }, {
                name: "GMT+09:30-1",
                value: "9.5-1"
            }, {
                name: "GMT+10:00",
                value: "10"
            }, {
                name: "GMT+10:00-1",
                value: "10-1"
            }, {
                name: "GMT+10:00-2",
                value: "10-2"
            }, {
                name: "GMT+10:00-3",
                value: "10-3"
            }, {
                name: "GMT+10:00-4",
                value: "10-4"
            }, {
                name: "GMT+11:00",
                value: "11"
            }, {
                name: "GMT+12:00",
                value: "12"
            }, {
                name: "GMT+12:00-1",
                value: "12-1"
            }, {
                name: "GMT+13:00",
                value: "13"
            }],
            daylightSave: [{
                name: "Disable",
                value: "0"
            }, {
                name: "Enable",
                value: "1"
            }],
            dstSequences: [{
                name: "First",
                value: "1"
            }, {
                name: "Second",
                value: "2"
            }, {
                name: "Third",
                value: "3"
            }, {
                name: "Fourth",
                value: "4"
            }, {
                name: "Last",
                value: "5"
            }],
            dstWeeks: [{
                name: "Sunday",
                value: "0"
            }, {
                name: "Monday",
                value: "1"
            }, {
                name: "Tuesday",
                value: "2"
            }, {
                name: "Wednesday",
                value: "3"
            }, {
                name: "Thursday",
                value: "4"
            }, {
                name: "Friday",
                value: "5"
            }, {
                name: "Saturday",
                value: "6"
            }],
            dstMonths: [{
                name: "January",
                value: "1"
            }, {
                name: "February",
                value: "2"
            }, {
                name: "March",
                value: "3"
            }, {
                name: "April",
                value: "4"
            }, {
                name: "May",
                value: "5"
            }, {
                name: "June",
                value: "6"
            }, {
                name: "July",
                value: "7"
            }, {
                name: "August",
                value: "8"
            }, {
                name: "September",
                value: "9"
            }, {
                name: "October",
                value: "10"
            }, {
                name: "November",
                value: "11"
            }, {
                name: "December",
                value: "12"
            }],
            wdsModes: [{
                name: "Disable",
                value: "0"
            }, {
                name: "RootAP Mode",
                value: "1"
            }, {
                name: "Bridge Mode",
                value: "2"
            }, {
                name: "Repeater Mode",
                value: "3"
            }],
            voipSipDtmfMethod: [{
                name: "InBand",
                value: "2"
            }, {
                name: "RFC2833",
                value: "3"
            }, {
                name: "SIPInfo",
                value: "4"
            }],
            sipEncodeMethod: [{
                name: "G.711 u-Law",
                value: "0"
            }, {
                name: "G.711 a-Law",
                value: "1"
            }, {
                name: "G.722",
                value: "2"
            }, {
                name: "G.729",
                value: "3"
            }, {
                name: "G.726-16kps",
                value: "4"
            }, {
                name: "G.726-24kps",
                value: "5"
            }, {
                name: "G.726-32kps",
                value: "6"
            }, {
                name: "G.726-40kps",
                value: "7"
            }],
            FORWARDING_MODES: [{
                name: "Unconditional forwarding",
                value: "1"
            }, {
                name: "busy/no answer",
                value: "0"
            }],
            TIME_UNITS: [{
                name: "hour",
                value: "60"
            }, {
                name: "Minutes",
                value: "1"
            }],
            LTE_FREQUENCY_CODE: [{
                name: "1",
                value: "2100"
            }, {
                name: "2",
                value: "1900"
            }, {
                name: "3",
                value: "1800"
            }, {
                name: "4",
                value: "1700/2100"
            }, {
                name: "5",
                value: "850"
            }, {
                name: "6",
                value: "800"
            }, {
                name: "7",
                value: "2600"
            }, {
                name: "8",
                value: "900"
            }, {
                name: "12",
                value: "700"
            }, {
                name: "13",
                value: "700"
            }, {
                name: "14",
                value: "700"
            }, {
                name: "17",
                value: "700"
            }, {
                name: "20",
                value: "800"
            }, {
                name: "25",
                value: "1900"
            }, {
                name: "28",
                value: "AC700"
            }, {
                name: "38",
                value: "2600"
            }, {
                name: "39",
                value: "1900"
            }, {
                name: "40",
                value: "2300"
            }, {
                name: "41",
                value: "2600"
            }, {
                name: "66",
                value: "AWS Extension"
            }],
            restartScheduleHours: [{
                name: "00-01",
                value: "00"
            }, {
                name: "01-02",
                value: "01"
            }, {
                name: "02-03",
                value: "02"
            }, {
                name: "03-04",
                value: "03"
            }, {
                name: "04-05",
                value: "04"
            }, {
                name: "05-06",
                value: "05"
            }, {
                name: "06-07",
                value: "06"
            }, {
                name: "07-08",
                value: "07"
            }, {
                name: "08-09",
                value: "08"
            }, {
                name: "09-10",
                value: "09"
            }, {
                name: "10-11",
                value: "10"
            }, {
                name: "11-12",
                value: "11"
            }, {
                name: "12-13",
                value: "12"
            }, {
                name: "13-14",
                value: "13"
            }, {
                name: "14-15",
                value: "14"
            }, {
                name: "15-16",
                value: "15"
            }, {
                name: "16-17",
                value: "16"
            }, {
                name: "17-18",
                value: "17"
            }, {
                name: "18-19",
                value: "18"
            }, {
                name: "19-20",
                value: "19"
            }, {
                name: "20-21",
                value: "20"
            }, {
                name: "21-22",
                value: "21"
            }, {
                name: "22-23",
                value: "22"
            }, {
                name: "23-00",
                value: "23"
            }],
            ACTIVE_TIME_MODES: [{
                name: "Free",
                value: "0"
            }, {
                name: "2 hours",
                value: "2"
            }, {
                name: "4 hours",
                value: "4"
            }, {
                name: "8 hours",
                value: "8"
            }, {
                name: "12 hours",
                value: "12"
            }, {
                name: "1 day",
                value: "24"
            }]
        },
        a = window.location.href,
        A = "config/" + e.DEVICE + "/config";
    return -1 != a.indexOf("/m/") && (A = "../../js/config/" + e.DEVICE + "/config"), require([A], function (a) {
        $.extend(e, a)
    }), e
});
//# sourceMappingURL=../../sourcemaps/config/config.js.map