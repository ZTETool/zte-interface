define(["underscore", "config/config", "smsData", "wifi2Data"], function (_, config, smsData, new_wifi) {
    function updateBattery() {
        var e = "1" == simulate.battery_charging,
            t = getRandomInt(10),
            s = parseInt(simulate.battery_vol_percent);
        e ? s + t <= 100 ? simulate.battery_vol_percent = s + t + "" : (simulate.battery_charging = "0", simulate.battery_vol_percent = s - t + "") : s - t >= 0 ? simulate.battery_vol_percent = s - t + "" : (simulate.battery_charging = "1", simulate.battery_vol_percent = s + t + "")
    }

    function updateAttachedDevices() {
        if (1 == getRandomInt(3) || 0 == simulate.attachedDevices.length) {
            var e = [],
                t = [];
            simulate.station_mac = "", simulate.station_list = [];
            for (var s = 0; s < devices.length && s < simulate.MAX_Access_num; s++) {
                var a = getRandomInt(devices.length - 1); - 1 == _.indexOf(e, a) && e.push(a)
            }
            for (var s = 0; s < e.length; s++) {
                t.push(devices[e[s]]);
                simulate.station_mac += devices[e[s]].macAddress + ";", simulate.station_list.push({
                    mac_addr: devices[e[s]].macAddress,
                    hostname: devices[e[s]].hostName,
                    ip_addr: devices[e[s]].ipAddress
                })
            }
            simulate.attachedDevices = t, simulate.curr_connected_devices = t
        }
    }

    function getPhoneBook(e) {
        return 3 == e.mem_store ? _.filter(simulate.phoneBooks, function (t) {
            return t.pbm_group == e.pbm_group
        }) : 2 == e.mem_store ? simulate.phoneBooks : _.filter(simulate.phoneBooks, function (t) {
            return t.pbm_location == e.mem_store
        })
    }

    function savePhoneBook(e) {
        if (-1 == e.edit_index && 0 == e.location || -1 == e.add_index_pc && 1 == e.location) {
            var t = _.max(simulate.phoneBooks, function (e) {
                    return e.pbm_id
                }),
                s = t ? t.pbm_id + 1 : 1;
            simulate.phoneBooks.push({
                pbm_id: s,
                pbm_location: e.location,
                pbm_name: e.name,
                pbm_number: e.mobilephone_num,
                pbm_anr: e.homephone_num,
                pbm_anr1: e.officephone_num,
                pbm_email: e.email,
                pbm_group: e.groupchoose
            }), 1 == e.location ? simulate.pbm_capacity_info.pbm_dev_used_record_num++ : simulate.pbm_capacity_info.pbm_sim_used_record_num++
        } else
            for (var a = 0; a < simulate.phoneBooks.length; a++) {
                var i = simulate.phoneBooks[a];
                (e.edit_index == i.pbm_id && 0 == e.location || e.add_index_pc == i.pbm_id && 1 == e.location) && (i.pbm_name = e.name, i.pbm_number = e.mobilephone_num, i.pbm_anr = e.homephone_num, i.pbm_anr1 = e.officephone_num, i.pbm_email = e.email, i.pbm_group = e.groupchoose)
            }
    }

    function dealPhoneBookDelete(e) {
        "delete_all" == e.del_option ? deleteAllPhoneBook(e) : "delete_all_by_group" == e.del_option ? deleteAllPhoneBookByGroup(e) : deletePhoneBook(e)
    }

    function deletePhoneBook(e) {
        var t = e.delete_id.split(",");
        simulate.phoneBooks = _.filter(simulate.phoneBooks, function (e) {
            return -1 == jQuery.inArray(String(e.pbm_id), t)
        });
        for (var s = 0, a = 0; a < simulate.phoneBooks.length; a++) 0 == simulate.phoneBooks[a].pbm_location && s++;
        simulate.pbm_capacity_info.pbm_dev_used_record_num = simulate.phoneBooks.length - s, simulate.pbm_capacity_info.pbm_sim_used_record_num = s
    }

    function deleteAllPhoneBook(e) {
        if (2 == e.del_all_location) return simulate.phoneBooks = [], simulate.pbm_capacity_info.pbm_dev_used_record_num = 0, void(simulate.pbm_capacity_info.pbm_sim_used_record_num = 0);
        simulate.phoneBooks = _.filter(simulate.phoneBooks, function (t) {
            return t.pbm_location != e.del_all_location
        }), 0 == e.pbm_location ? simulate.pbm_capacity_info.pbm_sim_used_record_num = 0 : simulate.pbm_capacity_info.pbm_dev_used_record_num = 0
    }

    function deleteAllPhoneBookByGroup(e) {
        simulate.phoneBooks = _.filter(simulate.phoneBooks, function (t) {
            return t.pbm_group != e.del_group
        });
        for (var t = 0, s = 0; s < simulate.phoneBooks.length; s++) 0 == simulate.phoneBooks[s].pbm_location && t++;
        simulate.pbm_capacity_info.pbm_dev_used_record_num = simulate.phoneBooks.length - t, simulate.pbm_capacity_info.pbm_sim_used_record_num = t
    }

    function deleteApn(e) {
        simulate["APN_config" + e.index] = "";
        for (var t = e.index + 1; t < 20; t++) "" != simulate["APN_config" + t] && apnMoveUp(t)
    }

    function apnMoveUp(e) {
        simulate["APN_config" + (e - 1)] = simulate["APN_config" + e]
    }

    function parseApnItem(e) {
        var t = {},
            s = [];
        return s = "" == e ? ["", "", "", "", "", "", "", "", "", "", "", ""] : e.split("($)"), t.profile_name = s[0], t.wan_apn = s[1], t.apn_select = s[2], t.wan_dial = s[3], t.ppp_auth_mode = s[4], t.ppp_username = s[5], t.ppp_passwd = s[6], t.pdp_type = s[7], t.pdp_select = s[8], t.pdp_addr = s[9], t.dns_mode = s[10], t.prefer_dns_manual = s[11], t.standby_dns_manual = s[12], t
    }

    function addOrEditApn(e) {
        var t = [];
        if ("IP" == e.pdp_type) {
            t.push(e.profile_name), t.push(e.wan_apn), t.push(e.apn_select), t.push(e.wan_dial), t.push(e.ppp_auth_mode), t.push(e.ppp_username), t.push(e.ppp_passwd), t.push(e.pdp_type), t.push(e.pdp_select), t.push(e.pdp_addr), t.push(e.dns_mode), t.push(e.prefer_dns_manual), t.push(e.standby_dns_manual);
            var s = t.join("($)");
            simulate["APN_config" + e.index] = s, simulate["ipv6_APN_config" + e.index] = [e.profile_name, "", "", "", "", "", "", "", "", "", "", ""].join("($)")
        } else if ("IPv6" == e.pdp_type) {
            t.push(e.profile_name), t.push(e.ipv6_wan_apn), t.push(e.apn_select), t.push(e.wan_dial), t.push(e.ipv6_ppp_auth_mode), t.push(e.ipv6_ppp_username), t.push(e.ipv6_ppp_passwd), t.push(e.pdp_type), t.push(e.pdp_select), t.push(e.pdp_addr), t.push(e.ipv6_dns_mode), t.push(e.ipv6_prefer_dns_manual), t.push(e.ipv6_standby_dns_manual);
            var s = t.join("($)");
            simulate["APN_config" + e.index] = [e.profile_name, "", "", "", "", "", "", "", "", "", "", ""].join("($)"), simulate["ipv6_APN_config" + e.index] = s
        } else {
            var t = [];
            t.push(e.profile_name), t.push(e.wan_apn), t.push(e.apn_select), t.push(e.wan_dial), t.push(e.ppp_auth_mode), t.push(e.ppp_username), t.push(e.ppp_passwd), t.push(e.pdp_type), t.push(e.pdp_select), t.push(e.pdp_addr), t.push(e.dns_mode), t.push(e.prefer_dns_manual), t.push(e.standby_dns_manual);
            var s = t.join("($)");
            simulate["APN_config" + e.index] = s, t = [], t.push(e.profile_name), t.push(e.ipv6_wan_apn), t.push(e.apn_select), t.push(e.wan_dial), t.push(e.ipv6_ppp_auth_mode), t.push(e.ipv6_ppp_username), t.push(e.ipv6_ppp_passwd), t.push(e.pdp_type), t.push(e.pdp_select), t.push(e.pdp_addr), t.push(e.ipv6_dns_mode), t.push(e.ipv6_prefer_dns_manual), t.push(e.ipv6_standby_dns_manual), s = t.join("($)"), simulate["ipv6_APN_config" + e.index] = s
        }
    }

    function setDefaultApn(e) {
        var t = parseApnItem(simulate["APN_config" + e.index]),
            s = parseApnItem(simulate["ipv6_APN_config" + e.index]);
        simulate.apn_index = e.index, simulate.ipv6_apn_index = e.index, simulate.Current_index = e.index, "auto" == e.apn_mode || (simulate.apn_mode = "manual", simulate.m_profile_name = t.profile_name, simulate.wan_dial = "*99#", simulate.apn_select = "manual", simulate.pdp_select = "auto", simulate.pdp_addr = "", "IP" == e.pdp_type ? (simulate.pdp_type = "IP", simulate.ipv6_pdp_type = "", simulate.wan_apn = t.wan_apn, simulate.ppp_auth_mode = t.ppp_auth_mode, simulate.ppp_username = t.ppp_username, simulate.ppp_passwd = t.ppp_passwd, simulate.dns_mode = t.dns_mode, simulate.prefer_dns_manual = t.prefer_dns_manual, simulate.standby_dns_manual = t.standby_dns_manual) : "IPv6" == e.pdp_type ? (simulate.pdp_type = "", simulate.ipv6_pdp_type = "IPv6", simulate.ipv6_wan_apn = s.wan_apn, simulate.ipv6_ppp_auth_mode = s.ppp_auth_mode, simulate.ipv6_ppp_username = s.ppp_username, simulate.ipv6_ppp_passwd = s.ppp_passwd, simulate.ipv6_dns_mode = s.dns_mode, simulate.ipv6_prefer_dns_manual = s.prefer_dns_manual, simulate.ipv6_standby_dns_manual = s.standby_dns_manual) : (simulate.pdp_type = "IPv4v6", simulate.ipv6_pdp_type = "IPv4v6", simulate.wan_apn = t.wan_apn, simulate.ppp_auth_mode = t.ppp_auth_mode, simulate.ppp_username = t.ppp_username, simulate.ppp_passwd = t.ppp_passwd, simulate.dns_mode = t.dns_mode, simulate.prefer_dns_manual = t.prefer_dns_manual, simulate.standby_dns_manual = t.standby_dns_manual, simulate.ipv6_wan_apn = s.wan_apn, simulate.ipv6_ppp_auth_mode = s.ppp_auth_mode, simulate.ipv6_ppp_username = s.ppp_username, simulate.ipv6_ppp_passwd = s.ppp_passwd, simulate.ipv6_dns_mode = s.dns_mode, simulate.ipv6_prefer_dns_manual = s.prefer_dns_manual, simulate.ipv6_standby_dns_manual = s.standby_dns_manual))
    }

    function initPhoneBooks(e) {
        for (var t = ["common", "family", "friend", "colleague"], s = [], _ = 0, a = 0; a < e; a++) {
            var i = getRandomInt(11) % 2 == 0 ? "0" : "1";
            _ >= phonebook_sim_max && (i = 1), 0 == i && _++;
            var n = null;
            1 == i && (n = t[getRandomInt(3)]);
            var o = "00" + String(a % 10 + 30),
                m = "00" + String(parseInt(a / 10) % 100 + 30),
                r = "00" + String(parseInt(a / 100) % 1e3 + 30);
            s.push({
                pbm_id: a + 1,
                pbm_location: i,
                pbm_name: "005A00540045" + r + m + o,
                pbm_number: phoneNumbers[getRandomInt(phoneNumbers.length - 1)],
                pbm_anr: 0 == i ? "" : "028756412" + String(a),
                pbm_anr1: 0 == i ? "" : "02955456" + String(a),
                pbm_email: 0 == i ? "" : "006D" + r + m + o + "0040006D00610069006C002E0063006F006D",
                pbm_group: n
            })
        }
        return phonebook_sim_used = _, phonebook_device_used = e - _, s
    }

    function login(e) {
        return e.password = e.password, simulate.admin_Password == e.password ? (clearInterval(loginLockTimer), simulate.loginfo = "ok", simulate.psw_fail_num_str = "5", simulate.login_lock_time = "300", {
            result: "0"
        }) : ("1" == simulate.psw_fail_num_str && (simulate.login_lock_time = "300", startLoginLockInterval()), "0" != simulate.psw_fail_num_str && (simulate.psw_fail_num_str = parseInt(simulate.psw_fail_num_str, 10) - 1 + ""), {
            result: "3"
        })
    }

    function startLoginLockInterval() {
        loginLockTimer = setInterval(function () {
            parseInt(simulate.login_lock_time, 10) <= 0 && (simulate.psw_fail_num_str = "0", simulate.login_lock_time = "300", clearInterval(loginLockTimer)), simulate.login_lock_time = parseInt(simulate.login_lock_time, 10) - 1 + ""
        }, 1e3)
    }

    function logout() {
        return simulate.loginfo = "no", {
            result: "success"
        }
    }

    function validatePUK(e) {
        return e.PUKNumber == simulate.PUK ? (simulate.pinnumber = 3, simulate.puknumber = 10, simulate.PIN = e.PinNumber, simulate.modem_main_state = "modem_init_complete", {
            result: "success"
        }) : (simulate.puknumber = simulate.puknumber - 1, simulate.puknumber <= 0 && (simulate.modem_main_state = "modem_sim_destroy"), {
            result: "fail"
        })
    }

    function validatePIN(e) {
        return e.PinNumber == simulate.PIN ? (simulate.pinnumber = 3, simulate.modem_main_state = "modem_init_complete", {
            result: "success"
        }) : (simulate.pinnumber = simulate.pinnumber - 1, simulate.modem_main_state = "modem_waitpin", simulate.pinnumber <= 0 && (simulate.modem_main_state = "modem_waitpuk"), {
            result: "fail"
        })
    }

    function getAllSmsMessages(e) {
        var t = smsData.getConvertedSmsData(),
            s = {},
            _ = [];
        s.messages = [], simulate.sms_unread_num = simulate.sms_nv_rev_total = simulate.sms_nv_send_total = simulate.sms_nv_draftbox_total = simulate.sms_sim_rev_total = simulate.sms_sim_send_total = simulate.sms_sim_draftbox_total = 0;
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            "1" == i.Tag && (simulate.sms_unread_num++, simulate.sms_nv_rev_total++, simulate.sms_sim_rev_total++), "0" == i.Tag && (simulate.sms_nv_rev_total++, simulate.sms_sim_rev_total++), "2" != i.Tag && "3" != i.Tag || (simulate.sms_nv_send_total++, simulate.sms_sim_send_total++), "4" == i.Tag && (simulate.sms_nv_draftbox_total++, simulate.sms_sim_draftbox_total++);
            var n = smsArray2Object(i);
            10 != e.tags ? i.Tag == e.tags && s.messages.push(n) : s.messages.push(n), _.push(n)
        }
        if (s.messages = s.messages.reverse(), smsArr.messages = _.reverse(), "sms_data_total" == e.cmd && 5 == e.data_per_page) {
            for (var o = [], a = 0; a < s.messages.length && a < e.data_per_page; a++) o.push(s.messages[a]);
            return {
                messages: o
            }
        }
        return s
    }

    function smsArray2Object(e) {
        return {
            id: e.id,
            number: e.Number,
            tag: e.Tag,
            content: e.Content,
            date: e.Year + "," + e.Month + "," + e.Day + "," + e.Hour + "," + e.Minute + "," + e.Second + ",+8",
            draft_group_id: e.groupId
        }
    }

    function getNewSms(e) {
        var t = [];
        if (smsArr.messages.length > 0)
            for (var s = 1; s < smsArr.messages.length; s++) "1" == smsArr.messages[smsArr.messages.length - s].tag && s <= e && t.push(smsArr.messages[smsArr.messages.length - s]);
        return t
    }

    function deleteMessage(e) {
        var t = e.msg_id.split(";");
        t && t.length > 1 && (simulate.sms_nv_rev_total = simulate.sms_nv_rev_total - (t.length - 1)), smsArr.messages = $.grep(smsArr.messages, function (e, s) {
            return -1 == $.inArray(e.id + "", t)
        }), smsData.deleteSms(t)
    }

    function sendSms(e) {
        var t = {
            id: smsData.getSmsMaxId(),
            number: e.Number,
            tag: "2",
            content: e.MessageBody,
            date: parseTime(e.sms_time)
        };
        smsArr.messages.push(t), smsData.storeSms(t), simulate.sms_nv_send_total++
    }

    function saveSms(e) {
        $.each(e.SMSNumber.split(";"), function (t, s) {
            if (s) {
                var _ = {
                    id: smsData.getSmsMaxId(),
                    number: s,
                    tag: "4",
                    content: e.SMSMessage,
                    date: parseTime(e.sms_time),
                    groupId: e.draft_group_id
                };
                smsArr.messages.push(_), smsData.storeSms(_), simulate.sms_nv_draftbox_total++
            }
        })
    }

    function setSmsRead(e) {
        var t = e.msg_id.split(";");
        $.map(smsArr.messages, function (e) {
            -1 != $.inArray(e.id + "", t) && (e.tag = "0")
        }), smsData.setSmsRead(e)
    }

    function smsStatusInfo() {
        var e = getRandomInt(10),
            t = "1";
        return 0 == e && (t = "2"), e > 0 && e < 8 && (t = "3"), t
    }

    function validatePassword(e) {
        return config.PASSWORD_ENCODE && (e.oldPassword = Base64.decode(e.oldPassword)), e.oldPassword == simulate.admin_Password ? (simulate.admin_Password = e.newPassword, {
            result: "success"
        }) : {
            result: "fail"
        }
    }

    function enablePin(e) {
        if (e.NewPinNumber) {
            if (e.OldPinNumber == simulate.PIN) return simulate.PIN = e.NewPinNumber, simulate.pinnumber = 3, {
                result: "success"
            }
        } else if (e.OldPinNumber == simulate.PIN) return simulate.pin_status = "1", simulate.modem_main_state = "modem_waitpin", simulate.pinnumber = 3, {
            result: "success"
        };
        return simulate.pinnumber = simulate.pinnumber - 1, simulate.pinnumber <= 0 && (simulate.modem_main_state = "modem_waitpuk"), {
            result: "fail"
        }
    }

    function disablePin(e) {
        return e.OldPinNumber == simulate.PIN ? (simulate.pin_status = "0", simulate.modem_main_state = "modem_init_complete", simulate.pinnumber = 3, {
            result: "success"
        }) : (simulate.pinnumber = simulate.pinnumber - 1, simulate.pinnumber <= 0 && (simulate.modem_main_state = "modem_waitpuk"), {
            result: "fail"
        })
    }

    function setSdCardMode(e) {
        simulate.mode_set = e.mode_set, "http_share_mode" == e.mode_set ? simulate.sdcard_mode_option = "1" : simulate.sdcard_mode_option = "0"
    }

    function quickSetup(e) {
        simulate.m_profile_name = e.Profile_Name, simulate.apn_mode = e.apn_mode, simulate.wan_apn = e.APN_name, simulate.ppp_auth_mode = e.ppp_auth_mode, simulate.ppp_username = e.ppp_username, simulate.ppp_passwd = e.ppp_passwd, simulate.SSID1 = e.SSID_name, simulate.HideSSID = e.SSID_Broadcast, simulate.broadcastssid = e.SSID_Broadcast, simulate.AuthMode = e.Encryption_Mode_hid, config.PASSWORD_ENCODE ? simulate.WPAPSK1_encode = e.WPA_PreShared_Key : simulate.WPAPSK1 = e.WPA_PreShared_Key;
        var t = simulate["APN_config" + simulate.apn_index].split("($)");
        t[0] = e.Profile_Name, t[1] = e.APN_name, t[4] = e.ppp_auth_mode, t[5] = e.ppp_username, t[6] = e.ppp_passwd, simulate["APN_config" + simulate.apn_index] = t.join("($)")
    }

    function quickSetupExtend(e) {
        if (simulate.pdp_type = e.pdp_type, simulate.apn_mode = e.apn_mode, simulate.m_profile_name = e.profile_name, simulate.wan_apn = e.wan_apn, simulate.ppp_auth_mode = e.ppp_auth_mode, simulate.ppp_username = e.ppp_username, simulate.ppp_passwd = e.ppp_passwd, simulate.ipv6_wan_apn = e.ipv6_wan_apn, simulate.ipv6_ppp_auth_mode = e.ipv6_ppp_auth_mode, simulate.ipv6_ppp_username = e.ipv6_ppp_username, simulate.ipv6_ppp_passwd = e.ipv6_ppp_passwd, simulate.SSID1 = e.SSID_name, simulate.broadcastssid = e.SSID_Broadcast, simulate.HideSSID = e.SSID_Broadcast, simulate.AuthMode = e.Encryption_Mode_hid, config.PASSWORD_ENCODE ? simulate.WPAPSK1_encode = e.WPA_PreShared_Key : simulate.WPAPSK1 = e.WPA_PreShared_Key, "IP" == e.pdp_type || "IPv4v6" == e.pdp_type) {
            var t = simulate["APN_config" + simulate.apn_index].split("($)");
            t[0] = e.profile_name, t[1] = e.wan_apn, t[4] = e.ppp_auth_mode, t[5] = e.ppp_username, t[6] = e.ppp_passwd, simulate["APN_config" + simulate.apn_index] = t.join("($)"), "IP" == e.pdp_type && (simulate["ipv6_APN_config" + simulate.ipv6_apn_index] = [e.profile_name, "", "", "", "", "", "", "", "", "", "", ""].join("($)"))
        }
        if ("IPv6" == e.pdp_type || "IPv4v6" == e.pdp_type) {
            var t = simulate["ipv6_APN_config" + simulate.ipv6_apn_index].split("($)");
            t[0] = e.profile_name, t[1] = e.ipv6_wan_apn, t[4] = e.ipv6_ppp_auth_mode, t[5] = e.ipv6_ppp_username, t[6] = e.ipv6_ppp_passwd, simulate["ipv6_APN_config" + simulate.ipv6_apn_index] = t.join("($)"), "IPv6" == e.pdp_type && (simulate["APN_config" + simulate.ipv6_apn_index] = [e.profile_name, "", "", "", "", "", "", "", "", "", "", ""].join("($)"))
        }
    }

    function getPhoneCapacity(e) {
        return {
            pbm_sim_max_record_num: simulate.pbm_capacity_info.pbm_sim_max_record_num,
            pbm_sim_used_record_num: simulate.pbm_capacity_info.pbm_sim_used_record_num,
            pbm_sim_max_name_len: simulate.pbm_capacity_info.pbm_sim_max_name_len,
            pbm_sim_max_number_len: simulate.pbm_capacity_info.pbm_sim_max_number_len,
            pbm_sim_type: simulate.pbm_capacity_info.pbm_sim_type,
            pbm_dev_max_record_num: simulate.pbm_capacity_info.pbm_dev_max_record_num,
            pbm_dev_used_record_num: simulate.pbm_capacity_info.pbm_dev_used_record_num
        }
    }

    function getFileList(e) {
        e.path_SD_CARD, e.index;
        return fileList
    }

    function fileRename(e) {
        for (var t = e.NEW_NAME_SD_CARD.substring(e.NEW_NAME_SD_CARD.lastIndexOf("/") + 1, e.NEW_NAME_SD_CARD.length), s = e.OLD_NAME_SD_CARD.substring(e.OLD_NAME_SD_CARD.lastIndexOf("/") + 1, e.OLD_NAME_SD_CARD.length), _ = 0; _ < fileList.result.fileInfo.length; _++)
            if (fileList.result.fileInfo[_].fileName == s) {
                fileList.result.fileInfo[_].fileName = t;
                break
            }
    }

    function deleteFilesAndFolders(e) {
        var t = e.name_SD_CARD.substring(0, e.name_SD_CARD.length - 1).split("*");
        fileList.result.fileInfo = $.grep(fileList.result.fileInfo, function (e, s) {
            return -1 == $.inArray(fileList.result.fileInfo[s].fileName, t)
        }), fileList.result.totalRecord = fileList.result.fileInfo.length
    }

    function createFolder(e) {
        var t = e.path_SD_CARD.substring(e.path_SD_CARD.lastIndexOf("/") + 1, e.path_SD_CARD.length);
        fileList.result.fileInfo.push({
            fileName: t,
            attribute: "document",
            size: getRandomInt(1e5),
            lastUpdateTime: "20120510"
        }), fileList.result.totalRecord = fileList.result.fileInfo.length
    }

    function transForFilter(e) {
        var t;
        return "TCP" == e ? t = "1" : "UDP" == e ? t = "2" : "ICMP" == e ? t = "4" : "None" == e ? t = "5" : "TCP&UDP" == e && (t = "3"), t
    }

    function transAction(e) {
        return "Drop" == e ? "0" : "1"
    }

    function getSmsSetting() {
        return {
            sms_para_sca: simulate.sms_para_sca,
            sms_para_mem_store: simulate.sms_para_mem_store,
            sms_para_status_report: simulate.sms_para_status_report,
            sms_para_validity_period: simulate.sms_para_validity_period
        }
    }

    function setSmsSetting(e) {
        switch (e.save_time) {
            case "twelve_hours":
                simulate.sms_para_validity_period = "143";
                break;
            case "one_day":
                simulate.sms_para_validity_period = "167";
                break;
            case "one_week":
                simulate.sms_para_validity_period = "173";
                break;
            case "largest":
                simulate.sms_para_validity_period = "255";
                break;
            default:
                simulate.sms_para_validity_period = "143"
        }
        simulate.sms_para_sca = e.MessageCenter, simulate.sms_para_mem_store = e.save_location, simulate.sms_para_status_report = e.status_save
    }

    function getSmsCapability() {
        return {
            sms_nv_total: simulate.sms_nv_total,
            sms_nv_rev_total: simulate.sms_nv_rev_total,
            sms_nv_send_total: simulate.sms_nv_send_total,
            sms_nv_draftbox_total: simulate.sms_nv_draftbox_total,
            sms_sim_rev_total: simulate.sms_sim_rev_total,
            sms_sim_send_total: simulate.sms_sim_send_total,
            sms_sim_draftbox_total: simulate.sms_sim_draftbox_total
        }
    }

    function updateHotspot(e) {
        simulate.wifi_profile = e.wifi_profile, simulate.wifi_profile1 = e.wifi_profile1, simulate.wifi_profile2 = e.wifi_profile2, simulate.wifi_profile3 = e.wifi_profile3, simulate.wifi_profile4 = e.wifi_profile4, simulate.wifi_profile5 = e.wifi_profile5
    }

    function connectHotspot(e) {
        disconnectHotspot(), simulate.ex_wifi_status = "connecting", simulate.EX_SSID1 = e.EX_SSID1, simulate.EX_wifi_profile = e.EX_wifi_profile, window.setTimeout(function () {
            for (var t = 0; t <= 5; t++) {
                var s = "";
                s = 0 == t ? "wifi_profile" : "wifi_profile" + t;
                var _ = simulate[s].indexOf(e.EX_wifi_profile + ",");
                if (-1 != _) {
                    var a = _ + e.EX_wifi_profile.length + 3,
                        i = simulate[s];
                    simulate[s] = i.substring(0, a) + "1" + i.substring(a + 1, i.length), simulate.EX_SSID1 = e.EX_SSID1, simulate.ex_wifi_status = "connect", simulate.EX_wifi_profile = e.EX_wifi_profile, simulate.ppp_status = "ppp_disconnected";
                    break
                }
            }
        }, 3e3)
    }

    function disconnectHotspot() {
        if (simulate.EX_wifi_profile)
            for (var e = 0; e <= 5; e++) {
                var t = "";
                t = 0 == e ? "wifi_profile" : "wifi_profile" + e;
                var s = simulate[t].indexOf(simulate.EX_wifi_profile + ",");
                if (-1 != s) {
                    var _ = s + simulate.EX_wifi_profile.length + 3,
                        a = simulate[t];
                    simulate[t] = a.substring(0, _) + "0" + a.substring(_ + 1, a.length), simulate.EX_SSID1 = "", simulate.ex_wifi_status = "", simulate.EX_wifi_profile = "";
                    break
                }
            }
    }

    function getOpmsWanMode() {
        var e = CookieUtil.get("opms_wan_mode");
        return null == e && (e = ["AUTO", "BRIDGE", "PPPOE", "STATIC", "PPP", "DHCP"][getRandomInt(6)], simulate.opms_wan_mode = e, CookieUtil.set("opms_wan_mode", e, 30)), e
    }

    function setUpgAutoSetting(e) {
        simulate.GetUpgAutoSetting.UpgMode = e.UpgMode, simulate.GetUpgAutoSetting.UpgIntervalDay = e.UpgIntervalDay, simulate.GetUpgAutoSetting.UpgRoamPermission = e.UpgRoamPermission, simulate.upg_roam_switch = e.UpgRoamPermission
    }

    function setUpgradeSelectOption(e) {
        if (simulate.upgrade_result = "", simulate.setUpgradeSelectOp = e.select_op, "check" == e.select_op) {
            simulate.new_version_state = "checking";
            if (getRandomInt(10) <= 1) simulate.new_version_state = "0";
            else {
                getRandomInt(10) < 5 ? simulate.new_version_state = "version_has_new_optional_software" : (simulate.new_version_state = "version_has_new_critical_software", simulate.current_upgrade_state = "upgrading")
            }
        } else "0" == e.select_op || "2" == e.select_op ? (simulate.new_version_state = "version_idle", simulate.current_upgrade_state = "fota_idle", simulate.pack_size_info.download_size = 0) : "1" == e.select_op && (simulate.new_version_state = "version_has_new_critical_software", simulate.pack_size_info.download_size = simulate.pack_size_info.download_size + 1e5, simulate.current_upgrade_state = "upgrading")
    }

    function setOpmsWanMode(e) {
        return simulate.opms_wan_mode = e, CookieUtil.set("opms_wan_mode", e, 30), {
            result: "success"
        }
    }

    function addChildGroup(e) {
        var t = _.find(simulate.station_list, function (t) {
            return t.mac_addr == e.mac
        });
        t && simulate.childGroupList.devices.push({
            hostname: t.hostname,
            mac: t.mac_addr
        })
    }

    function removeChildGroup(e) {
        simulate.childGroupList.devices = _.filter(simulate.childGroupList.devices, function (t) {
            return t.mac != e.mac
        })
    }

    function editHostName(e) {
        var t = !1;
        simulate.hostNameList.devices = _.map(simulate.hostNameList.devices, function (s) {
            return s.mac == e.mac && (s.hostname = e.hostname, t = !0), s
        }), t || simulate.hostNameList.devices.push({
            hostname: e.hostname,
            mac: e.mac
        })
    }

    function removeSiteWhite(e) {
        simulate.site_white_list.siteList = _.filter(simulate.site_white_list.siteList, function (t) {
            return -1 == _.indexOf(e.ids.split(","), t.id + "")
        })
    }

    function addSiteWhite(e) {
        simulate.site_white_list.siteList.push({
            id: _.uniqueId("1"),
            name: e.name,
            site: e.site
        })
    }

    function saveTimeLimited(e) {
        simulate.time_limited = e.time_limited
    }

    function saveTsw(e) {
        simulate.openEnable = e.openEnable, simulate.closeEnable = e.closeEnable, simulate.openTime = e.openTime, simulate.closeTime = e.closeTime
    }

    function getCurrentNetwork() {
        for (var e = simulate.m_netselect_contents.split(";"), t = null, s = 0; s < e.length; s++) {
            var _ = e[s].split(",");
            if ("2" == _[0]) {
                t = _;
                break
            }
        }
        return {
            strFullName: t[1],
            strShortName: t[1],
            strNumeric: t[2],
            nRat: t[3],
            strBearer: "HSUPA"
        }
    }

    function setNetwork(e) {
        for (var t = simulate.m_netselect_contents.split(";"), s = [], _ = 0; _ < t.length; _++) {
            var a = t[_].split(",");
            a[2] == e.NetworkNumber && a[3] == e.Rat ? a[0] = 2 : a[0] = 1, s.push(a)
        }
        for (var i = [], _ = 0; _ < s.length; _++) i.push(s[_].join(","));
        return simulate.m_netselect_contents = i.join(";"), {
            result: "success"
        }
    }

    function trafficCalibration(e) {
        "time" == e.calibration_way ? (simulate.monthly_tx_bytes = 1, simulate.monthly_rx_bytes = 1, simulate.monthly_time = 3600 * e.time) : (simulate.monthly_tx_bytes = 1, simulate.monthly_rx_bytes = 1024 * e.data * 1024, simulate.monthly_time = 1)
    }

    function dealDetectProgress() {
        4 != simulate.signal_detect_progress ? setTimeout(function () {
            simulate.signal_detect_progress++, dealDetectProgress()
        }, 2e3) : setTimeout(function () {
            simulate.signal_detect_progress = 0, simulate.signal_detect_quality = ["0", "1", "2", "3", "4"][getRandomInt(5)]
        }, 2e3)
    }

    function getChildMacRuleInfo(mac_address) {
        for (var child_mac_rule_info = "", i = 0; i <= 9; i++) {
            var child_mac = eval("simulate.child_mac_" + i);
            "" != child_mac && mac_address == child_mac.split(";")[0] && (child_mac_rule_info = child_mac)
        }
        return {
            child_mac_rule_info: child_mac_rule_info
        }
    }

    function handleChildAccessTimeRule(child_mac_rule_info) {
        for (var i = 0; i <= 9; i++) {
            var child_mac = eval("simulate.child_mac_" + i);
            if ("" != child_mac && child_mac_rule_info.split(";")[0] == child_mac.split(";")[0]) switch (i) {
                case 0:
                    simulate.child_mac_0 = child_mac_rule_info;
                    break;
                case 1:
                    simulate.child_mac_1 = child_mac_rule_info;
                    break;
                case 2:
                case 3:
                    simulate.child_mac_3 = child_mac_rule_info;
                    break;
                case 4:
                    simulate.child_mac_4 = child_mac_rule_info;
                    break;
                case 5:
                    simulate.child_mac_5 = child_mac_rule_info;
                    break;
                case 6:
                    simulate.child_mac_6 = child_mac_rule_info;
                    break;
                case 7:
                    simulate.child_mac_7 = child_mac_rule_info;
                    break;
                case 8:
                    simulate.child_mac_8 = child_mac_rule_info;
                    break;
                case 9:
                    simulate.child_mac_9 = child_mac_rule_info
            }
        }
    }
    var phonebookSize = 10 + getRandomInt(30),
        phoneNumbers = smsData.getPhoneNumbers(),
        phonebook_sim_max = 50,
        phonebook_sim_used = 0,
        phonebook_device_max = 100,
        phonebook_device_used = 0,
        sms_nv_capability_used = 0,
        smsReady = !1,
        smsArr = {
            messages: []
        },
        sntpAutoFlag = !1,
        simulate = {
            simulateRequest: function (e, t, s, a, i) {
                if (i) {
                    if (new_wifi.wifi2Methods[e.goformId]) return new_wifi.wifi2Methods[e.goformId](e);
                    if ("PBM_CONTACT_ADD" == e.goformId) savePhoneBook(e);
                    else if ("PBM_CONTACT_DEL" == e.goformId) dealPhoneBookDelete(e);
                    else {
                        if ("LOGIN" == e.goformId) return login(e);
                        if ("IF_UPGRADE" == e.goformId) setTimeout(function () {
                            simulate.new_version_state = "version_checking_failed"
                        }, 5e3);
                        else {
                            if ("LOGOUT" == e.goformId) return logout();
                            if ("ENTER_PIN" == e.goformId) return validatePIN(e);
                            if ("ENTER_PUK" == e.goformId) return validatePUK(e);
                            if ("APN_PROC" == e.goformId || "APN_PROC_EX" == e.goformId) return "set_default" == e.apn_action ? setDefaultApn(e) : "delete" == e.apn_action ? deleteApn(e) : "save" == e.apn_action && addOrEditApn(e), {
                                result: "success"
                            };
                            if ("ALL_DELETE_SMS" == e.goformId) return smsArr.messages = [], smsData.deleteAllSmsData(), {
                                result: "success"
                            };
                            if ("DELETE_SMS" == e.goformId) return deleteMessage(e), {
                                result: "success"
                            };
                            if ("SET_MSG_READ" == e.goformId) return setSmsRead(e), {
                                result: "success"
                            };
                            if ("CHANGE_PASSWORD" == e.goformId) return validatePassword(e);
                            if ("ENABLE_PIN" == e.goformId) return enablePin(e);
                            if ("DISABLE_PIN" == e.goformId) return disablePin(e);
                            if ("SEND_SMS" == e.goformId) return sendSms(e), {
                                result: "success"
                            };
                            if ("SAVE_SMS" == e.goformId) return saveSms(e), {
                                result: "success"
                            };
                            if ("FW_FORWARD_DEL" == e.goformId) {
                                var n = e.delete_id.split(";");
                                _.each(n, function (e) {
                                    simulate["PortForwardRules_" + e] = ""
                                })
                            } else if ("FW_FORWARD_ADD" == e.goformId) {
                                for (var o = "", m = 0; m < parseInt(simulate.portforward_rule_num); m++)
                                    if ("" == this["PortForwardRules_" + m]) {
                                        o = e.ipAddress + "," + e.portStart + "," + e.portEnd + "," + transForFilter(e.protocol) + "," + e.comment, this["PortForwardRules_" + m] = o;
                                        break
                                    }
                            } else if ("ADD_IP_PORT_FILETER" == e.goformId) {
                                for (var o = "", m = 0; m < 10; m++)
                                    if ("" == this["IPPortFilterRules_" + m]) {
                                        o = e.sip_address + ",1," + e.sFromPort + "," + e.sToPort + "," + e.dip_address + ",5," + e.dFromPort + "," + e.dToPort + "," + transForFilter(e.protocol) + "," + transAction(e.action) + "," + e.comment + "," + e.mac_address, this["IPPortFilterRules_" + m] = o;
                                        break
                                    }
                            } else if ("ADD_IP_PORT_FILETER_V4V6" == e.goformId) {
                                var o = "";
                                if ("ipv4" == e.ip_version) {
                                    for (var m = 0; m < 10; m++)
                                        if ("" == this["IPPortFilterRules_" + m]) {
                                            o = e.sip_address + ",1," + e.sFromPort + "," + e.sToPort + "," + e.dip_address + ",5," + e.dFromPort + "," + e.dToPort + "," + transForFilter(e.protocol) + "," + transAction(e.action) + "," + e.comment + "," + e.mac_address, this["IPPortFilterRules_" + m] = o;
                                            break
                                        }
                                } else
                                    for (var m = 0; m < 10; m++)
                                        if ("" == this["IPPortFilterRulesv6_" + m]) {
                                            o = e.sip_address + ",1," + e.sFromPort + "," + e.sToPort + "," + e.dip_address + ",5," + e.dFromPort + "," + e.dToPort + "," + transForFilter(e.protocol) + "," + transAction(e.action) + "," + e.comment + "," + e.mac_address, this["IPPortFilterRulesv6_" + m] = o;
                                            break
                                        }
                            } else if ("DEL_IP_PORT_FILETER" == e.goformId) {
                                var n = e.delete_id.split(";");
                                _.each(n, function (e) {
                                    simulate["IPPortFilterRules_" + e] = ""
                                })
                            } else if ("DEL_IP_PORT_FILETER_V4V6" == e.goformId) {
                                var n = e.delete_id.split(";");
                                _.each(n, function (e) {
                                    simulate["IPPortFilterRules_" + e] = ""
                                });
                                var r = e.delete_id_v6.split(";");
                                _.each(r, function (e) {
                                    simulate["IPPortFilterRulesv6_" + e] = ""
                                })
                            } else if ("HTTPSHARE_MODE_SET" == e.goformId) setSdCardMode(e);
                            else {
                                if ("GOFORM_HTTPSHARE_CHECK_FILE" == e.goformId) return {
                                    result: "noexist"
                                };
                                if ("QUICK_SETUP" == e.goformId) quickSetup(e);
                                else if ("QUICK_SETUP_EX" == e.goformId) quickSetupExtend(e);
                                else {
                                    if ("HTTPSHARE_ENTERFOLD" == e.goformId) return getFileList(e);
                                    if ("HTTPSHARE_FILE_RENAME" == e.goformId) fileRename(e);
                                    else if ("HTTPSHARE_DEL" == e.goformId) this.dlna_scan_state = "1", deleteFilesAndFolders(e);
                                    else if ("HTTPSHARE_NEW" == e.goformId) createFolder(e);
                                    else if ("UPNP_SETTING" == e.goformId) this.upnpEnabled = e.upnp_setting_option;
                                    else if ("FW_SYS" == e.goformId) this.RemoteManagement = e.remoteManagementEnabled, this.WANPingFilter = e.pingFrmWANFilterEnabled;
                                    else if ("DMZ_SETTING" == e.goformId) this.DMZEnable = e.DMZEnabled, this.DMZIPAddress = e.DMZIPAddress;
                                    else if ("DHCP_SETTING" == e.goformId) this.dhcpEnabled = "SERVER" == e.lanDhcpType ? "1" : "0", this.lan_ipaddr = e.lanIp, this.lan_netmask = e.lanNetmask, "1" == this.dhcpEnabled && (this.dhcpStart = e.dhcpStart, this.dhcpEnd = e.dhcpEnd, this.dhcpLease_hour = e.dhcpLease);
                                    else if ("BASIC_SETTING" == e.goformId) this.IPPortFilterEnable = e.portFilterEnabled, this.DefaultFirewallPolicy = e.defaultFirewallPolicy;
                                    else if ("ADD_PORT_MAP" == e.goformId) {
                                        if (this.PortMapEnable = e.portMapEnabled, e.ip_address)
                                            for (var o = "", m = 0; m < 10; m++)
                                                if ("" == this["PortMapRules_" + m]) {
                                                    o = e.ip_address + "," + e.fromPort + "," + e.toPort + "," + transForFilter(e.protocol) + "," + e.comment, this["PortMapRules_" + m] = o;
                                                    break
                                                }
                                    } else if ("DEL_PORT_MAP" == e.goformId) {
                                        var n = e.delete_id.split(";");
                                        _.each(n, function (e) {
                                            simulate["PortMapRules_" + e] = ""
                                        })
                                    } else if ("WIFI_WPS_SET" == e.goformId) this.wps_type = e.wps_mode, this.wpsFlag = "1", this.WscModeOption = "1", setTimeout(function () {
                                        this.wpsFlag = "0", this.WscModeOption = "0"
                                    }, 15e3);
                                    else if ("SET_BEARER_PREFERENCE" == e.goformId) this.net_select = e.BearerPreference;
                                    else if ("SET_WIFI_SSID1_SETTINGS" == e.goformId) this.SSID1 = e.ssid, this.HideSSID = e.broadcastSsidEnabled, config.PASSWORD_ENCODE ? this.WPAPSK1_encode = e.passphrase : this.WPAPSK1 = e.passphrase, this.AuthMode = e.security_mode, this.MAX_Access_num = e.MAX_Access_num, this.NoForwarding = e.NoForwarding, "OPEN" == this.AuthMode ? this.EncrypType = "NONE" : "WPA2PSK" == this.AuthMode ? this.EncrypType = "CCMP" : this.EncrypType = "TKIPCCMP";
                                    else if ("SET_WIFI_SSID2_SETTINGS" == e.goformId) this.m_SSID = e.m_SSID, this.m_HideSSID = e.m_HideSSID, config.PASSWORD_ENCODE ? this.m_WPAPSK1_encode = e.m_WPAPSK1 : this.m_WPAPSK1 = e.m_WPAPSK1, this.m_AuthMode = e.m_AuthMode, this.m_MAX_Access_num = e.m_MAX_Access_num, this.m_NoForwarding = e.m_NoForwarding, "OPEN" == this.m_AuthMode ? this.m_EncrypType = "NONE" : "WPA2PSK" == this.m_AuthMode ? this.m_EncrypType = "CCMP" : this.m_EncrypType = "TKIPCCMP";
                                    else if ("SET_WIFI_INFO" == e.goformId) config.WIFI_SWITCH_SUPPORT && void 0 !== e.wifiEnabled && (this.RadioOff = e.wifiEnabled), e.m_ssid_enable ? this.m_ssid_enable = e.m_ssid_enable : (this.WirelessMode = e.wifiMode, this.CountryCode = e.countryCode, this.Channel = e.selectedChannel, e.abg_rate && (this.HT_MCS = e.abg_rate), e.wifi_11n_cap && (this.wifi_11n_cap = e.wifi_11n_cap), e.MAX_Access_num && (this.MAX_Access_num = e.MAX_Access_num), e.m_MAX_Access_num && (this.m_MAX_Access_num = e.m_MAX_Access_num), e.wifi_band && (this.wifi_band = e.wifi_band));
                                    else if ("SET_MESSAGE_CENTER" == e.goformId) setSmsSetting(e);
                                    else if ("CONNECT_NETWORK" == e.goformId) this.ppp_status = "ppp_connecting", setTimeout(function () {
                                        disconnectHotspot(), simulate.ppp_status = "ppp_connected"
                                    }, 1e3 * (getRandomInt(5) + 1));
                                    else if ("DISCONNECT_NETWORK" == e.goformId) this.ppp_status = "ppp_disconnecting", setTimeout(function () {
                                        simulate.ppp_status = "ppp_disconnected"
                                    }, 1e3 * (getRandomInt(5) + 1));
                                    else if ("DLNA_SETTINGS" == e.goformId) $.extend(this, e), this.dlna_rescan_end = "1";
                                    else if ("DLNA_RESCAN" == e.goformId) this.dlna_rescan_end = "1", this.dlna_scan_state = "0";
                                    else {
                                        if ("UNLOCK_NETWORK" == e.goformId) return e.unlock_network_code == simulate.unlock_code ? (simulate.unlock_nck_time = 5, setTimeout(function () {
                                            simulate.modem_main_state = "modem_init_complete"
                                        }, 4e3), {
                                            result: "success"
                                        }) : (simulate.unlock_nck_time = simulate.unlock_nck_time - 1, {
                                            result: "failure"
                                        });
                                        if ("WIFI_SPOT_PROFILE_UPDATE" == e.goformId) updateHotspot(e);
                                        else if ("WLAN_SET_STA_CON" == e.goformId) connectHotspot(e);
                                        else if ("WLAN_SET_STA_DISCON" == e.goformId) disconnectHotspot();
                                        else if ("OPERATION_MODE" == e.goformId) simulate.opms_wan_mode = e.opMode, setOpmsWanMode(e.opMode);
                                        else if ("WAN_GATEWAYMODE_PPPOE" == e.goformId) simulate.pppoe_dial_mode = e.dial_mode, simulate.pppoe_username = e.pppoe_username, simulate.pppoe_password = e.pppoe_password, "manual_dial" == e.dial_mode && ("connect" == e.action_link ? (this.ppp_status = "ppp_connecting", setTimeout(function () {
                                            disconnectHotspot(), simulate.ppp_status = "ppp_connected"
                                        }, 1e3 * (getRandomInt(5) + 1))) : (this.ppp_status = "ppp_disconnecting", setTimeout(function () {
                                            simulate.ppp_status = "ppp_disconnected"
                                        }, 1e3 * (getRandomInt(5) + 1)))), simulate.opms_wan_mode = "PPPOE", setOpmsWanMode("PPPOE");
                                        else if ("WAN_GATEWAYMODE_STATIC" == e.goformId) simulate.opms_wan_mode = "STATIC", simulate.static_wan_ipaddr = e.static_wan_ipaddr, simulate.static_wan_netmask = e.static_wan_netmask, simulate.static_wan_gateway = e.static_wan_gateway, simulate.static_wan_primary_dns = e.static_wan_primary_dns, simulate.static_wan_secondary_dns = e.static_wan_secondary_dns;
                                        else if ("WAN_GATEWAYMODE_DHCP" == e.goformId) simulate.opms_wan_mode = "DHCP",
                                            setOpmsWanMode("DHCP");
                                        else if ("SNTP" == e.goformId) simulate.syn_done = "", simulate.sntp_year = e.time_year, simulate.sntp_month_temp = e.time_month, simulate.sntp_day = e.time_day, simulate.sntp_hour = e.time_hour, simulate.sntp_minute = e.time_minute, simulate.sntp_time_set_mode = e.manualsettime, simulate.sntp_server0 = e.sntp_server1_ip, simulate.sntp_server1 = e.sntp_server2_ip, simulate.sntp_server2 = e.sntp_server3_ip, simulate.sntp_other_server0 = e.sntp_other_server0, simulate.sntp_other_server1 = e.sntp_other_server1, simulate.sntp_other_server2 = e.sntp_other_server2, simulate.sntp_timezone = e.timezone, simulate.sntp_dst_enable = e.DaylightEnabled, "auto" == simulate.sntp_time_set_mode && setTimeout(function () {
                                            sntpAutoFlag ? (simulate.syn_done = "1", sntpAutoFlag = !1) : (simulate.syn_done = "0", sntpAutoFlag = !0)
                                        }, 2e3);
                                        else if ("URL_FILTER_ADD" == e.goformId) "" == simulate.websURLFilters ? simulate.websURLFilters = e.addURLFilter : simulate.websURLFilters += ";" + e.addURLFilter;
                                        else if ("URL_FILTER_DELETE" == e.goformId) {
                                            for (var l = e.url_filter_delete_id.split(";"), p = simulate.websURLFilters.split(";"), m = l.length - 2; m >= 0; m--) p.splice(l[m], 1);
                                            simulate.websURLFilters = p.join(";")
                                        } else if ("SYSLOG" == e.goformId) simulate.syslog_mode = e.syslog_mode, simulate.debug_level = "open" == e.syslog_flag ? "7" : "";
                                        else if ("setTR069Config" == e.goformId) simulate.tr069_ServerURL = e.serverURL, simulate.tr069_ServerUsername = e.serverusername, simulate.tr069_ServerPassword = e.serveruserpassword, simulate.tr069_ConnectionRequestUname = e.connrequestname, simulate.tr069_ConnectionRequestPassword = e.connrequestpassword, simulate.tr069_CPEPortNo = e.tr069_CPEPortNo, simulate.tr069_PeriodicInformTime = e.tr069_PeriodicInformTime, simulate.tr069_PeriodicInformEnable = e.tr069_PeriodicInformEnable, simulate.tr069_PeriodicInformInterval = e.tr069_PeriodicInformInterval, simulate.tr069_CertEnable = e.tr069_CertEnable;
                                        else if ("SIP_PROC1" == e.goformId) simulate.voip_sip_register_server1 = e.voip_sip_register_server, simulate.voip_sip_domain1 = e.voip_sip_domain, simulate.voip_sip_realm1 = e.voip_sip_realm, simulate.voip_sip_proxy_enable1 = e.voip_sip_proxy_enable, simulate.voip_sip_proxy_server1 = e.voip_sip_proxy_server, simulate.voip_account_display_account1 = e.voip_account_display_account1, simulate.voip_account_auth1 = e.voip_account_auth1, simulate.voip_account_password1 = e.voip_account_password1, simulate.voip_user1_register_status = "register_connecting";
                                        else if ("SIP_ADV_PROC1" == e.goformId) simulate.voip_sip_t38_enable1 = e.voip_sip_t38_enable, simulate.voip_sip_dtmf_method = e.voip_sip_dtmf_method, simulate.voip_sip_encoder1 = e.voip_sip_encoder, simulate.voip_sip_vad_enable1 = e.voip_sip_vad_enable1, simulate.voip_sip_cng_enable1 = e.voip_sip_cng_enable1;
                                        else if ("SIP_SUPPLEMENTARY1" == e.goformId) simulate.voip_forwarding_model = e.voip_forwarding_mode, simulate.voip_forwarding_uri1 = e.voip_forwarding_uri, simulate.voip_not_disturb_enable = e.voip_not_disturb_enable, simulate.voip_call_waiting_in_enable = e.voip_call_waiting_in_enable;
                                        else if ("ADD_DEVICE" == e.goformId) addChildGroup(e);
                                        else if ("DEL_DEVICE" == e.goformId) removeChildGroup(e);
                                        else if ("EDIT_HOSTNAME" == e.goformId) editHostName(e);
                                        else if ("REMOVE_WHITE_SITE" == e.goformId) removeSiteWhite(e);
                                        else if ("ADD_WHITE_SITE" == e.goformId) addSiteWhite(e);
                                        else if ("SAVE_TIME_LIMITED" == e.goformId) saveTimeLimited(e);
                                        else if ("SAVE_TSW" == e.goformId) saveTsw(e);
                                        else if ("SET_NETWORK" == e.goformId) setNetwork(e);
                                        else if ("FLOW_CALIBRATION_MANUAL" == e.goformId) trafficCalibration(e);
                                        else if ("WIFI_STA_CONTROL" == e.goformId) simulate.wifi_sta_connection = e.wifi_sta_connection, simulate.ap_station_mode = e.ap_station_mode, simulate.m_ssid_enable = "0";
                                        else {
                                            if ("GET_SNTP_INFO" == e.goformId) return {
                                                sntp_dst_bias: getRandomInt(23) + "_" + getRandomInt(59) + "_" + getRandomInt(59),
                                                sntp_dst_start: getRandomInt(5) + "_" + getRandomInt(7) + "_" + getRandomInt(12) + "_" + getRandomInt(23) + "_" + getRandomInt(59) + "_" + getRandomInt(59),
                                                sntp_dst_end: getRandomInt(5) + "_" + getRandomInt(7) + "_" + getRandomInt(12) + "_" + getRandomInt(23) + "_" + getRandomInt(59) + "_" + getRandomInt(59)
                                            };
                                            if ("VPN_CLIENT_SET" == e.goformId) simulate.vpn_type = e.vpn_type, simulate.vpn_l2tp_passwd = e.vpn_l2tp_passwd, simulate.vpn_account = e.vpn_account, simulate.vpn_passwd = e.vpn_passwd, simulate.vpn_server_ip = e.vpn_server_ip, simulate.vpn_auto_start = e.vpn_auto_start;
                                            else if ("VPN_CONNECT" == e.goformId) this.vpn_conn_status = "connecting", setTimeout(function () {
                                                simulate.vpn_conn_status = "connected", simulate.vpn_remote_ip = "1.1.1.1", simulate.vpn_local_ip = "2.2.2.2"
                                            }, 1e3 * (getRandomInt(5) + 1));
                                            else if ("VPN_DISCONNECT" == e.goformId) this.vpn_conn_status = "disconnecting", setTimeout(function () {
                                                simulate.vpn_conn_status = "disconnected", simulate.vpn_remote_ip = "", simulate.vpn_local_ip = ""
                                            }, 1e3 * (getRandomInt(5) + 1));
                                            else if ("VOIP_VOICE_WORK_TYPE_SET" == e.goformId) this.voice_work_type = e.voice_work_type;
                                            else if ("setDeviceAccessControlList" == e.goformId) this.AclMode = e.AclMode, this.WhiteMacList = e.WhiteMacList, this.BlackMacList = e.BlackMacList, this.WhiteNameList = e.WhiteNameList, this.BlackNameList = e.BlackNameList;
                                            else if ("SIGNAL_QUALITY_DETECT_START" == e.goformId) dealDetectProgress();
                                            else if ("SIGNAL_QUALITY_DETECT_CANCEL" == e.goformId) simulate.signal_detect_progress = "0";
                                            else if ("SIGNAL_QUALITY_RECORD_ADD" == e.goformId) {
                                                var d = e.date + "($)" + e.location + "($)" + e.quality;
                                                switch (parseInt(e.index)) {
                                                    case 0:
                                                        simulate.signal_detect_record_0 = d;
                                                        break;
                                                    case 1:
                                                        simulate.signal_detect_record_1 = d;
                                                        break;
                                                    case 2:
                                                        simulate.signal_detect_record_2 = d;
                                                        break;
                                                    case 3:
                                                        simulate.signal_detect_record_3 = d;
                                                        break;
                                                    case 4:
                                                        simulate.signal_detect_record_4 = d;
                                                        break;
                                                    case 5:
                                                        simulate.signal_detect_record_5 = d;
                                                        break;
                                                    case 6:
                                                        simulate.signal_detect_record_6 = d;
                                                        break;
                                                    case 7:
                                                        simulate.signal_detect_record_7 = d;
                                                        break;
                                                    case 8:
                                                        simulate.signal_detect_record_8 = d;
                                                        break;
                                                    case 9:
                                                        simulate.signal_detect_record_9 = d
                                                }
                                            } else if ("SIGNAL_QUALITY_RECORD_DEL" == e.goformId) {
                                                var d = "";
                                                switch (parseInt(e.index)) {
                                                    case 0:
                                                        simulate.signal_detect_record_0 = d;
                                                        break;
                                                    case 1:
                                                        simulate.signal_detect_record_1 = d;
                                                        break;
                                                    case 2:
                                                        simulate.signal_detect_record_2 = d;
                                                        break;
                                                    case 3:
                                                        simulate.signal_detect_record_3 = d;
                                                        break;
                                                    case 4:
                                                        simulate.signal_detect_record_4 = d;
                                                        break;
                                                    case 5:
                                                        simulate.signal_detect_record_5 = d;
                                                        break;
                                                    case 6:
                                                        simulate.signal_detect_record_6 = d;
                                                        break;
                                                    case 7:
                                                        simulate.signal_detect_record_7 = d;
                                                        break;
                                                    case 8:
                                                        simulate.signal_detect_record_8 = d;
                                                        break;
                                                    case 9:
                                                        simulate.signal_detect_record_9 = d
                                                }
                                            } else "CHILD_MAC_RULE_ADD" == e.goformId ? handleChildAccessTimeRule(e.child_mac_rule_info) : "CHILD_MAC_RULE_UPDATE" == e.goformId ? handleChildAccessTimeRule(e.child_mac_rule_info) : "USER_IMPROV_SET" == e.goformId ? (simulate.tr069_user_improv_flag = e.tr069_user_improv_flag, simulate.tr069_user_improv_notify_flag = "1") : "USER_GRANT_CHANGE_SET" == e.goformId ? (simulate.dm_user_grant_flag = e.dm_user_grant_flag, simulate.dm_user_grant_notify_flag = "1") : $.extend(this, e)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return {
                        result: "success"
                    }
                }
                if (new_wifi.wifi2Methods[e.cmd]) return new_wifi.wifi2Methods[e.cmd](e);
                var o = {};
                if ("pbm_data_total" == e.cmd || "pbm_data_info" == e.cmd) return o = getPhoneBook(e), {
                    pbm_data: o
                };
                if ("pbm_capacity_info" == e.cmd) return getPhoneCapacity(e);
                if ("pbm_write_flag" == e.cmd) return {
                    pbm_write_flag: simulate.pbm_write_flag
                };
                if ("pbm_init_flag" == e.cmd) return {
                    pbm_init_flag: simulate.pbm_init_flag
                };
                if ("restore_flag" == e.cmd) return o = String(getRandomInt(3)), {
                    restore_flag: o
                };
                if ("sms_data_total" == e.cmd || "sms_page_data" == e.cmd) return getAllSmsMessages(e);
                if ("ConnectionMode" == e.cmd) return {
                    connectionMode: this.ConnectionMode,
                    autoConnectWhenRoaming: this.roam_setting_option
                };
                if ("sms_cmd_status_info" == e.cmd) return e.sms_cmd, {
                    sms_cmd_status_result: "3"
                };
                if ("HTTPSHARE_GETCARD_VALUE" == e.cmd) return {
                    sd_card_total_size: getRandomInt(99e3),
                    sd_card_avi_space: getRandomInt(1e4)
                };
                if ("sms_parameter_info" == e.cmd) return getSmsSetting();
                if ("sms_capacity_info" == e.cmd) return getSmsCapability();
                if ("GetUpgAutoSetting" == e.cmd) return simulate.GetUpgAutoSetting;
                if ("new_version_state" == e.cmd) return {
                    new_version_state: simulate.new_version_state
                };
                if ("update_info" == e.cmd) return simulate.update_info;
                if ("pack_size_info" == e.cmd) return this.pack_size_info.download_size = simulate.pack_size_info.download_size + 1e4, this.pack_size_info.download_size >= simulate.pack_size_info.pack_total_size && (this.pack_size_info.download_size = simulate.pack_size_info.pack_total_size, "upgrading" == this.current_upgrade_state && (this.current_upgrade_state = "upgrade_prepare_install", window.setTimeout(function () {
                    simulate.current_upgrade_state = "ota_update_success", simulate.new_version_state = "0", simulate.upgrade_result = "success"
                }, 5e3))), this.pack_size_info;
                if ("current_network" == e.cmd) return getCurrentNetwork();
                if ("child_mac_rule_info" == e.cmd) return getChildMacRuleInfo(e.mac_addr);
                if (e.multi_data) {
                    $.extend(this, new_wifi.wifi2NV);
                    for (var u = e.cmd.split(","), m = 0; m < u.length; m++) {
                        var c = u[m];
                        o[u[m]] = "opms_wan_mode" == c ? getOpmsWanMode() : this[u[m]]
                    }
                    return o
                }
                return o[e.cmd] = this[e.cmd], o
            },
            testEnv: !1,
            stk_write_flag: "0",
            stk: "ZDIST:2,808F7B677E75316211795E5DDE884C0021",
            stk_menu: "ZSTM:9,;240,808F7B677E95EE5019;241,8077ED4FE17FA453D1;248,804F1860E05FEB8BAF;255,804E1A52A17CBE9009;97,804F014E1A4FBF6C11641C7D22;99,808D224FE1901A4FF14E5090E8;100,80682156ED6E386C11516C793E;101,80682156ED661F51496C47;254,8000530049004D53614FE1606F;",
            web_wake_switch: "1",
            web_sleep_switch: "1",
            web_wake_time: "15:35",
            web_sleep_time: "15:24",
            auto_power_save: "1",
            WirelessMode: "4",
            m_ssid_enable: "1",
            broadcastssid: "1",
            CountryCode: "cn",
            Channel: "2",
            HT_MCS: "1",
            MAX_Access_num: "16",
            wifi_band: "b",
            wifi_11n_cap: "0",
            AuthMode: "WPAPSKWPA2PSK",
            EncrypType: "TKIPCCMP",
            HideSSID: "0",
            NoForwarding: "1",
            Key1Str1: "12345",
            Key1Type: "1",
            Key2Str1: "12345",
            Key2Type: "1",
            Key3Str1: "12345",
            Key3Type: "1",
            Key4Str1: "12345",
            Key4Type: "1",
            SSID1: "102Z_E6C9C5",
            WPAPSK1_encode: "MTIzNDU2Nzg=",
            m_SSID: "102B_E6C9C5",
            m_AuthMode: "WPAPSKWPA2PSK",
            m_HideSSID: "0",
            m_NoForwarding: "0",
            m_CountryCode: "cn",
            m_WPAPSK1_encode: "MTIzNDU2Nzg=",
            m_MAX_Access_num: "4",
            m_EncrypType: "TKIPCCMP",
            m_wifi_band: "a",
            Language: "en",
            wifi_coverage: "long_mode",
            attachedDevices: [],
            station_mac: "",
            signalbar: getRandomInt(5),
            signal: "22",
            pdp_type: "IP",
            signalbar_5g: "4",
            network_type: "ENDC",
            wan_action_channel: "11",
            nr5G_action_channel: "33",
            lte_snr: "22",
            rssi: "-" + 9 * getRandomInt(5),
            rscp: "-" + 9 * getRandomInt(5),
            lte_rsrp: "-" + 9 * getRandomInt(5),
            lte_pci: "7654321",
            ZCELLINFO_band: "WCDMA 2100",
            lte_ca_pcell_arfcn: "1300",
            lte_multi_ca_scell_info: "101,2,3,1600,20.0;102,2,20,6200,20.0;",
            Z5g_dlEarfcn: "733333",
            network_provider: ["China Mobile", "中国联通", "中国电信"][getRandomInt(2)],
            spn_name_data: "00530050004E",
            spn_b1_flag: "1",
            spn_b2_flag: "1",
            ppp_status: "ppp_connected",
            pppoe_status: "ppp_disconnected",
            simcard_roam: "Internal",
            roam_setting_option: "off",
            modem_main_state: "modem_init_complete",
            battery_charging: "0",
            battery_vol_percent: "30",
            wan_lte_ca: "ca_activated",
            lte_ca_pcell_band: "3",
            lte_ca_scell_band: "0",
            lte_ca_pcell_bandwidth: "20.0",
            lte_ca_scell_bandwidth: "0.0",
            lte_ca_scell_info: "1,1,1,1,10.0;1,1,3,1,20.0;1,1,7,1,30.0;1,1,10,1,10.0;",
            curr_connected_devices: [],
            mtu: "1320",
            tcp_mss: "1270",
            ethernet_port_specified: "1",
            net_select: "Only_WCDMA",
            m_netselect_contents: "2,China Mobile,46001,12;1,China Mobile,46002,7;1,China Unicom,46001,0;1,China Unicom,46001,7",
            realtime_rx_thrpt: 0,
            total_tx_bytes: 0,
            total_rx_bytes: 0,
            total_time: 0,
            monthly_tx_bytes: 0,
            monthly_rx_bytes: 0,
            monthly_time: 0,
            realtime_tx_bytes: 0,
            realtime_rx_bytes: 0,
            realtime_time: 0,
            realtime_tx_thrpt: 0,
            phoneBooks: initPhoneBooks(phonebookSize),
            apn_auto_config: "Auto Mobile1($)1bam.vtr.com($)manual($)*99#($)chap($)user($)pwd($)IP($)manual($)($)auto($)($)||Auto Mobile2($)2bam.vtr.com($)manual($)*99#($)chap($)user($)pwd($)IP($)manual($)($)auto($)($)",
            ipv6_apn_auto_config: "",
            APN_config0: "Default($)($)manual($)*99#($)chap($)($)($)IP($)manual($)($)auto($)($)",
            APN_config1: "Vodafone GR($)internet.vodafone.gr($)manual($)*99#($)pap($)vtr($)vtr($)IPv4v6($)auto($)($)auto($)($)",
            APN_config2: "ChinaMobile($)internet.ChinaMobile.gr($)manual($)*99#($)pap($)vtr($)vtr($)IPv6($)auto($)($)auto($)($)",
            APN_config3: "",
            APN_config4: "",
            APN_config5: "",
            APN_config6: "",
            APN_config7: "",
            APN_config8: "",
            APN_config9: "",
            APN_config10: "",
            APN_config11: "",
            APN_config12: "",
            APN_config13: "",
            APN_config14: "",
            APN_config15: "",
            APN_config16: "",
            APN_config17: "",
            APN_config18: "",
            APN_config19: "",
            ipv6_APN_config0: "Default($)($)($)($)($)($)($)($)($)($)($)($)",
            ipv6_APN_config1: "Vodafone GR($)internet.vodafone.gr($)manual($)*99#($)pap($)vtr($)vtr($)IPv4v6($)auto($)($)auto($)($)",
            ipv6_APN_config2: "ChinaMobile($)internet.ChinaMobile.gr($)manual($)*99#($)pap($)vtr($)vtr($)IPv6($)auto($)($)auto($)($)",
            ipv6_APN_config3: "",
            ipv6_APN_config4: "",
            ipv6_APN_config5: "",
            ipv6_APN_config6: "",
            ipv6_APN_config7: "",
            ipv6_APN_config8: "",
            ipv6_APN_config9: "",
            ipv6_APN_config10: "",
            ipv6_APN_config11: "",
            ipv6_APN_config12: "",
            ipv6_APN_config13: "",
            ipv6_APN_config14: "",
            ipv6_APN_config15: "",
            ipv6_APN_config16: "",
            ipv6_APN_config17: "",
            ipv6_APN_config18: "",
            ipv6_APN_config19: "",
            apn_mode: "manual",
            DefaultKeyID: "0",
            WscModeOption: "0",
            action: "",
            apn_index: "0",
            ipv6_apn_index: "0",
            lte_band_lock: "0x008000000",
            lte_freq_lock: "3",
            ConnectionMode: "manual_dial",
            dial_mode: "manual_dial",
            m_profile_name: "Modem",
            ipv6_m_profile_name: "Modem",
            wan_apn: "bam.vtr.com",
            apn_select: "manual",
            wan_dial: "*99#",
            dns_mode: "auto",
            prefer_dns_manual: "",
            standby_dns_manual: "",
            ppp_auth_mode: "chap",
            ppp_username: "user",
            ppp_passwd: "pwd",
            ipv6_wan_apn: "",
            ipv6_apn_select: "",
            ipv6_wan_dial: "",
            ipv6_dns_mode: "",
            ipv6_prefer_dns_manual: "",
            ipv6_standby_dns_manual: "",
            ipv6_ppp_auth_mode: "",
            ipv6_ppp_username: "",
            ipv6_ppp_passwd: "",
            Current_index: "0",
            ipv6_wan_ipaddr: "FF:FF:FF:FF:FF:FF",
            wan_ipaddr: "123.55.77.88",
            ipv6_pdp_type: "IP",
            vpn_type: "PPTP",
            vpn_l2tp_passwd: "654321",
            vpn_account: "aaa",
            vpn_passwd: "123456",
            vpn_server_ip: "1.2.3.4",
            vpn_conn_status: "connected",
            vpn_remote_ip: "1.1.1.1",
            vpn_local_ip: "2.2.2.3",
            updateAttachedDevices: updateAttachedDevices,
            pbm_capacity_info: {
                pbm_dev_max_record_num: 100,
                pbm_dev_used_record_num: phonebook_device_used,
                pbm_sim_max_record_num: phonebook_sim_max,
                pbm_sim_used_record_num: phonebook_sim_used,
                pbm_sim_type: "",
                pbm_sim_max_name_len: 22,
                pbm_sim_max_number_len: 30
            },
            websRemoteManagementFilters: [{
                sourceIPAddress: "192.168.0.1",
                endIPAddress: "192.168.0.3"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }, {
                sourceIPAddress: "127.0.0.1",
                endIPAddress: "127.0.0.100"
            }],
            current_static_addr_list: [{
                hostname: "No.1",
                mac: "00:1E:90:FF:FF:FF",
                ip: "192.168.0.100",
                domain: "m.home"
            }, {
                hostname: "No.2",
                mac: "00:1E:90:FF:FF:FF",
                ip: "127.0.0.100",
                domain: "h3g.com"
            }],
            opms_wan_auto_mode: ["AUTO_LTE_GATEWAY", "AUTO_DHCP", "AUTO_PPPOE"][getRandomInt(2)],
            mac_ip_status: "1",
            pbm_write_flag: "0",
            pbm_init_flag: "0",
            loginfo: "ok",
            wifi_profile_num: 1,
            login_error: "",
            login_lock_time: "300",
            psw_fail_num_str: "5",
            save_login: "1",
            psw_save: "123456",
            puknumber: 10,
            pinnumber: 3,
            PIN: "1234",
            pin_status: "0",
            PUK: "11111111",
            admin_Password: "81896F393DFD164D3ABAE35AFB866F49497F7AB27320AB029D539E62FE73BC55",
            LD: "123456",
            sms_nv_capability: config.SMS_NV_CAPABILITY,
            sms_nv_capability_used: 0,
            sms_received_flag: "0",
            lan_ipaddr: "192.168.0.1",
            subnetMask: "255.255.255.0",
            lan_netmask: "255.255.255.0",
            macAddress: "aa:cc:bb:cc:dd:ee",
            mac_address: "aa:cc:bb:cc:dd:ee",
            dhcpServer: "enable",
            dhcpStart: "192.168.0.100",
            dhcpEnd: "192.168.0.200",
            dhcpLease: "24",
            dhcpLease_hour: "24",
            dhcpEnabled: "1",
            validity: "one_week",
            centerNumber: "13999988888",
            deliveryReport: "0",
            restore_flag: "1",
            wpsFlag: "0",
            authMode: "OPEN",
            wps_type: "PBC",
            RadioOff: "1",
            sysIdleTimeToSleep: "10",
            RemoteManagement: "0",
            WANPingFilter: "0",
            PortForwardEnable: "0",
            PortForwardRules_0: "192.168.0.11,1111,2222,2,astest",
            PortForwardRules_1: "192.168.0.22,3333,4444,2,astest111",
            PortForwardRules_2: "192.168.0.12,1111,2222,2,astest",
            PortForwardRules_3: "192.168.0.13,1111,2222,2,astest",
            PortForwardRules_4: "192.168.0.14,1111,2222,2,astest",
            PortForwardRules_5: "192.168.0.15,1111,2222,2,astest",
            PortForwardRules_6: "192.168.0.16,1111,2222,2,astest",
            PortForwardRules_7: "192.168.0.17,1111,2222,2,astest",
            PortForwardRules_8: "192.168.0.18,1111,2222,2,astest",
            PortForwardRules_9: "192.168.0.19,1111,2222,2,astest",
            PortForwardRules_10: "192.168.0.21,1111,2222,2,astest",
            PortForwardRules_11: "192.168.0.31,1111,2222,2,astest",
            PortForwardRules_12: "192.168.0.41,1111,2222,2,astest",
            PortForwardRules_13: "192.168.0.51,1111,2222,2,astest",
            PortForwardRules_14: "192.168.0.61,1111,2222,2,astest",
            PortForwardRules_15: "192.168.0.71,1111,2222,2,astest",
            PortForwardRules_16: "192.168.0.81,1111,2222,2,astest",
            PortForwardRules_17: "192.168.0.91,1111,2222,2,astest",
            PortForwardRules_18: "192.168.0.99,1111,2222,2,astest",
            PortForwardRules_19: "",
            mode_set: "http_share_mode",
            sdcard_mode_option: "1",
            sd_card_state: "1",
            HTTP_SHARE_STATUS: "Enabled",
            HTTP_SHARE_CARD_USER: "user",
            HTTP_SHARE_WR_AUTH: "readonly",
            HTTP_SHARE_FILE: "/mmc2",
            IPPortFilterEnable: "0",
            DefaultFirewallPolicy: "0",
            IPPortFilterRules_0: "192.168.0.5,0,1,6,192.168.0.53,0,1,655,1,1,aa,00:1E:90:FF:FF:FF",
            IPPortFilterRules_1: "192.168.0.5,0,1,6,192.168.0.53,0,1,655,1,1,kk,00:1E:90:FF:FF:FF",
            IPPortFilterRules_2: "",
            IPPortFilterRules_3: "",
            IPPortFilterRules_4: "",
            IPPortFilterRules_5: "",
            IPPortFilterRules_6: "",
            IPPortFilterRules_7: "",
            IPPortFilterRules_8: "",
            IPPortFilterRules_9: "",
            IPPortFilterRulesv6_0: "",
            IPPortFilterRulesv6_1: "",
            IPPortFilterRulesv6_2: "",
            IPPortFilterRulesv6_3: "",
            IPPortFilterRulesv6_4: "",
            IPPortFilterRulesv6_5: "",
            IPPortFilterRulesv6_6: "",
            IPPortFilterRulesv6_7: "",
            IPPortFilterRulesv6_8: "",
            IPPortFilterRulesv6_9: "",
            PortMapEnable: "0",
            PortMapRules_0: "192.168.0.11,1111,2222,1,astest",
            PortMapRules_1: "192.168.0.12,3333,4444,1,astest111",
            PortMapRules_2: "192.168.0.13,3333,4444,1,astest111",
            PortMapRules_3: "192.168.0.14,3333,4444,1,astest111",
            PortMapRules_4: "192.168.0.15,3333,4444,1,astest111",
            PortMapRules_5: "192.168.0.16,3333,4444,1,astest111",
            PortMapRules_6: "192.168.0.17,3333,4444,1,astest111",
            PortMapRules_7: "192.168.0.18,3333,4444,1,astest111",
            PortMapRules_8: "192.168.0.19,3333,4444,1,astest111",
            PortMapRules_9: "192.168.0.10,3333,4444,1,astest111",
            PortMapRules_10: "192.168.0.21,1111,2222,1,astest",
            PortMapRules_11: "192.168.0.23,3333,4444,1,astest111",
            PortMapRules_12: "192.168.0.24,3333,4444,1,astest111",
            PortMapRules_13: "192.168.0.25,3333,4444,1,astest111",
            PortMapRules_14: "192.168.0.26,3333,4444,1,astest111",
            PortMapRules_15: "192.168.0.27,3333,4444,1,astest111",
            PortMapRules_16: "192.168.0.28,3333,4444,1,astest111",
            PortMapRules_17: "192.168.0.29,3333,4444,1,astest111",
            PortMapRules_18: "192.168.0.30,3333,4444,1,astest111",
            PortMapRules_19: "",
            wifiRangeMode: "short_mode",
            upnpEnabled: "0",
            DMZEnable: "0",
            DMZIPAddress: "192.168.0.1",
            imei: "864589000054888",
            cr_version: "CR_MF25DV0.0.0B01",
            hardware_version: "PCBMF25DV1.0.0",
            sim_spn: "1",
            ecio: "3",
            lac_code: "4",
            cell_id: "5",
            nr5g_cell_id: "123456",
            LocalDomain: "m.home",
            sim_iccid: "12345678987654321",
            sms_para_sca: "15800000001",
            sms_para_mem_store: "native",
            sms_para_status_report: "0",
            sms_para_validity_period: "255",
            sms_unread_num: 0,
            data_volume_limit_switch: "1",
            data_volume_limit_unit: "data",
            data_volume_limit_size: "100_1",
            data_volume_alert_percent: "80",
            dlna_language: "chinese",
            dlna_name: "12345",
            dlna_share_audio: "on",
            dlna_share_video: "on",
            dlna_share_image: "on",
            dlna_scan_state: "0",
            dlna_rescan_end: "0",
            unlock_nck_time: 3,
            unlock_code: "aaaaffff12345678",
            sms_nv_total: 300,
            sms_nv_rev_total: 0,
            sms_nv_send_total: 0,
            sms_nv_draftbox_total: 0,
            sms_sim_rev_total: 0,
            sms_sim_send_total: 0,
            sms_sim_draftbox_total: 0,
            station_list: [{
                mac_addr: "00:23:CD:AC:08:7E",
                hostname: "",
                ip_addr: "192.168.0.23",
                ssid_index: "1"
            }, {
                mac_addr: "34:E0:CF:E0:B2:99",
                hostname: "android-26bda3ab2d9a107f",
                ip_addr: "192.168.0.101",
                ssid_index: "1"
            }],
            lan_station_list: [{
                mac_addr: "01:23:CD:AC:08:7E",
                hostname: "",
                ip_addr: "192.168.0.20"
            }, {
                mac_addr: "32:E0:CF:E0:B2:99",
                hostname: "android-26bda3ab2d9a",
                ip_addr: "192.168.0.10"
            }],
            wifi_sta_connection: 0,
            ap_station_mode: "wifi_pref",
            wifi_profile: "0001softbank,1,0,2,0001softbank,OPEN,NONE,0,0;mobilepoint,1,0,3,mobilepoint,OPEN,WEP,696177616b,0;userSaved,0,0,3,userSaved,OPEN,WEP,696177616b,0",
            wifi_profile1: "",
            wifi_profile2: "",
            wifi_profile3: "",
            wifi_profile4: "",
            wifi_profile5: "",
            EX_APLIST: "0,0,du Mobile WiFI_305288,4,6,WPAPSKWPA2PSK,TKIPCCMP;0,0,4G-Gateway-0888,4,6,WPAPSK,CCMP;0,0,life Wi-Fi_ABCD1231231,4,7,WPAPSKWPA2PSK,TKIPCCMP;0,0,uFi_duanruinan,4,8,WPAPSKWPA2PSK,TKIPCCMP;0,0,CPE_666666,4,6,WPAPSKWPA2PSK,TKIPCCMP;0,0,SOFTAP_XL,4,9,OPEN,NONE;0,0,T-Mobile Broadband11,4,6,WPAPSK,TKIPCCMP;0,0,sharaxa,3,11,OPEN,WEP;0,0,T-Mobile Broadband13,0,11,WPAPSK,TKIPCCMP;0,0,Atheros_XSpan_2G,4,6,OPEN,NONE;0,0,duanruinan,4,6,WPAPSKWPA2PSK,TKIPCCMP;0,0,T-Mobile Broadband11,4,1,WPAPSK,TKIPCCMP;0,0,life Wi-Fi_555658,0,1,OPEN,NONE;0,0,ZTE_MF29T_meng01,4,1,WPAPSKWPA2PSK,TKIPCCMP;0,0,AIRTEL_335258,4,3,OPEN,NONE",
            EX_APLIST1: "0,0,life Wi-Fi_ABCDDA,4,1,OPEN,NONE;0,0,ZTE_MF29T_meng01,4,1,WPAPSKWPA2PSK,TKIPCCMP",
            scan_finish: 1,
            EX_SSID1: "",
            ex_wifi_status: "",
            EX_wifi_profile: "",
            opms_wan_mode: ["AUTO", "BRIDGE", "PPPOE", "STATIC", "PPP", "DHCP"][getRandomInt(6)],
            pppoe_username: "user",
            pppoe_password: "password",
            pppoe_dial_mode: "auto_dial",
            static_wan_ipaddr: "192.168.1.100",
            static_wan_netmask: "255.255.255.0",
            static_wan_gateway: "192.168.1.1",
            static_wan_primary_dns: "6.6.6.6",
            static_wan_secondary_dns: "3.3.3.3",
            sntp_year: "2012",
            sntp_month_temp: "11",
            sntp_day: "21",
            sntp_hour: "1",
            sntp_minute: "22",
            sntp_second: "50",
            sntp_time_set_mode: "auto",
            sntp_server_list1: "192.168.3.1",
            sntp_server_list2: "www.baidu.com",
            sntp_server_list3: "www.it.zte.com",
            sntp_server_list4: "google.com.hk",
            sntp_server_list5: "",
            sntp_server_list6: "",
            sntp_server_list7: "",
            sntp_server_list8: "",
            sntp_server_list9: "",
            sntp_server_list10: "",
            sntp_server0: "www.baidu.com",
            sntp_server1: "www.it.zte.com",
            sntp_server2: "Other",
            sntp_other_server0: "",
            sntp_other_server1: "",
            sntp_other_server2: "2.3.6.5",
            sntp_timezone: "6.5",
            sntp_dst_enable: "1",
            sntp_dst_bias: "0_0_0",
            sntp_dst_start: "1_0_1_0_0_0",
            sntp_dst_end: "1_0_1_0_0_0",
            syn_done: "",
            websURLFilters: "www.aa.com;www.bb.com;www.cc.com",
            wifi_wds_mode: "0",
            wifi_wds_ssid: "wds",
            wifi_wds_AuthMode: "WPAPSKWPA2PSK",
            wifi_wds_EncrypType: "1",
            wifi_wds_WPAPSK1: "12345678",
            syslog_mode: "sms",
            debug_level: "7",
            tr069_ServerURL: "test069.com",
            tr069_ServerUsername: "Lily",
            tr069_ServerPassword: "0000000",
            tr069_ConnectionRequestUname: "Mary",
            tr069_ConnectionRequestPassword: "5555555",
            tr069_CPEPortNo: "51005",
            tr069_PeriodicInformTime: "20150202T00:10:22",
            tr069_PeriodicInformEnable: "0",
            tr069_PeriodicInformInterval: "30",
            tr069_CertEnable: "0",
            voip_sip_outbound_enable: "1",
            voip_sip_outbound_server: "cpe.cn",
            voip_sip_outbound_port: "1055",
            voip_sip_stun_enable: "0",
            voip_sip_stun_server: "rong.com",
            voip_sip_register_time: "2000",
            voip_sip_port: "1033",
            voip_sip_rtp_port_min: "2000",
            voip_sip_rtp_port_max: "6550",
            voip_sip_register_server1: "user.com",
            voip_sip_domain1: "aa.cn",
            voip_sip_realm1: "000",
            voip_sip_proxy_enable1: "1",
            voip_sip_proxy_server1: "bb",
            voip_account_display_account1: "bbbb",
            voip_account_auth1: "aaaaaaa",
            voip_account_password1: "00000000",
            voip_user1_register_status: "register_failed",
            voip_sip_t38_enable1: "1",
            voip_sip_dtmf_method: "2",
            voip_sip_encoder1: "3",
            voip_sip_vad_enable1: "1",
            voip_sip_cng_enable1: "1",
            voip_forwarding_model: "0",
            voip_forwarding_uri1: "0123456789*#+",
            voip_not_disturb_enable: "1",
            voip_call_waiting_in_enable: "1",
            ACL_mode: "2",
            wifi_mac_black_list: "00:23:33:AC:08:7E;34:E0:44:E0:B2:99;E8:E3:55:AB:86:41",
            wifi_hostname_black_list: "刘涛;季冬;小李",
            imsi: "0000000",
            static_wan_status: "",
            dhcp_wan_status: "1",
            new_version_state: "version_has_new_optional_software",
            update_info: {
                filesname: "Version_1.0.2",
                " size": "1254",
                description: "description of Version_1.0.2",
                version: "V1.0.2"
            },
            dm_new_version: "Version_1.1.1",
            is_mandatory: !1,
            upgrade_result: "",
            current_upgrade_state: "fota_idle",
            pack_size_info: {
                pack_total_size: 18e4,
                download_size: 0
            },
            if_has_select: "none",
            GetUpgAutoSetting: {
                UpgMode: "1",
                UpgIntervalDay: 1,
                UpgRoamPermission: "0"
            },
            upg_roam_switch: 0,
            dm_last_check_time: "2014-09-02 11:34:36",
            get_user_mac_addr: "60:73:BC:64:87:41",
            childGroupList: {
                devices: [{
                    hostname: "name",
                    mac: "60:73:BC:64:87:4F"
                }, {
                    hostname: "name1",
                    mac: "4F:13:44:37:E6:7B"
                }, {
                    hostname: "name2",
                    mac: "E6:44:37:4F:13:7B"
                }, {
                    hostname: "name3",
                    mac: "13:4F:44:37:E6:7B"
                }, {
                    hostname: "name4",
                    mac: "37:E6:44:4F:13:7B"
                }, {
                    hostname: "name5",
                    mac: "13:44:37:E6:4F:7B"
                }, {
                    hostname: "name6",
                    mac: "4F:13:7B:44:37:E6"
                }, {
                    hostname: "name7",
                    mac: "60:73:BC:64:87:4F"
                }, {
                    hostname: "name8",
                    mac: "37:E6:13:4F:44:7B"
                }]
            },
            site_white_list: {
                siteList: [{
                    id: 1,
                    name: "sina",
                    site: "http://sina.com"
                }, {
                    id: 2,
                    name: "百度",
                    site: "http://www.baidu.com"
                }, {
                    id: 3,
                    name: "QQ",
                    site: "http://www.qq.com"
                }, {
                    id: 4,
                    name: "淘宝",
                    site: "www.taobao.com"
                }]
            },
            time_limited: "0+0,8,20;1+9,13;2+10,15,18,22",
            hostNameList: {
                devices: [{
                    hostname: "刘涛",
                    mac: "60:73:BC:64:87:4F"
                }, {
                    hostname: "季冬",
                    mac: "4F:13:44:37:E6:7B"
                }, {
                    hostname: "雷海波",
                    mac: "E6:44:37:4F:13:7B"
                }]
            },
            openEnable: "1",
            closeEnable: "0",
            openTime: "06:30",
            closeTime: "22:00",
            systime_mode: "sntp",
            m_netselect_result: "manual_success",
            privacy_read_flag: "0",
            tr069_user_improv_notify_flag: "0",
            dm_user_grant_notify_flag: "0",
            tr069_user_improv_flag: "0",
            Z5g_snr: "111",
            Z5g_SINR: "123",
            Z5g_rsrp: "222",
            nr5g_pci: "1234567",
            OOM_TEMP_PRO: "0",
            wifi_sta_switch_onoff: "apap",
            m_band_enable: "1",
            password_remind: "1",
            web_wifi_password_remind: "0",
            wifi_syncparas_flag: "0",
            wifi_onoff_wifi5g_by_n79_mutex: "1",
            lte_ca_pcell_band: "3",
            lte_ca_pcell_bandwidth: "20",
            lte_ca_scell_band: "40",
            lte_ca_scell_bandwidth: "40",
            lte_ca_pcell_arfcn: "2100",
            lte_ca_scell_arfcn: "2200",
            is_night_mode: "1",
            night_mode_switch: "1",
            night_mode_start_time: "23:20",
            night_mode_end_time: "05:10",
            night_mode_close_all_led: "1",
            voice_work_type: "VOIP",
            nr5g_action_band: "N41",
            signal_detect_progress: "0",
            signal_detect_quality: "0",
            signal_detect_record_0: "1576304977285($)Home($)0",
            signal_detect_record_1: "1576304977285($)Cook($)2",
            signal_detect_record_2: "1576304977285($)Toilet($)4",
            signal_detect_record_3: "",
            signal_detect_record_4: "",
            signal_detect_record_5: "",
            signal_detect_record_6: "",
            signal_detect_record_7: "",
            signal_detect_record_8: "",
            signal_detect_record_9: "",
            sta_ip_status: "connect",
            station_ip_addr: "1.2.3.4",
            wifi_chip_temp: "55",
            pm_sensor_pa1: "44",
            pm_sensor_mdm: "33",
            pm_modem_5g: "22",
            therm_pa_level: "0",
            therm_pa_frl_level: "1",
            therm_tj_level: "2",
            ant_switch_enable: "0",
            operate_mode: "LOW_POWER",
            zte_voice_debug_ims_set: "0",
            zte_voice_debug_voice_set: "0",
            wifi_tputs_test_ip: "1.2.3.4",
            wifi_tputs_test_mode: "udp",
            rf_mmw_status: "12345",
            child_mac_0: "60:73:BC:64:87:4F;1234560+7:00,8:00,1;135+11:00,16:00,0;246+9:00,10:00,1;0+1:00,23:00,0;",
            child_mac_1: "",
            child_mac_2: "",
            child_mac_3: "",
            child_mac_4: "",
            child_mac_5: "",
            child_mac_6: "",
            child_mac_7: "",
            child_mac_8: "",
            child_mac_9: "",
            mec_enable: "0",
            mec_url: "mqtt://10.62.89.210",
            mec_port: "28006",
            mec_username: "cpetest",
            mec_password: "cpetest123",
            mec_groupid: "101",
            mec_alivePeriod: "10",
            mec_status: "Active",
            mec_tls_en: "0",
            mec_aes_key: "1111111111",
            mec_aes_iv: "2222222222",
            ip_passthrough_enabled: "0",
            rmcc: "460",
            rmnc: "20",
            fota_download_url: "ftp://www.124.232",
            dm_install_time: "21-23",
            nssai_pdn3_switch: "1",
            nssai_pdn4_switch: "0",
            MP_APN_config3: "zte22.com($)IP($)PAP($)admin22($)admin22($)",
            MP_APN_config4: "zte33.com($)IPv4v6($)PAP_CHAP($)admin33($)admin33($)",
            multi_vlan_pdns_map_tmp: "102,slice3,0;103,slice4,1;",
            multi_vlan_pdns_map_ip_rule_3_1: ",192.168.2.200,1000:2000,2000:3000,1;",
            multi_vlan_pdns_map_ip_rule_4_1: "192.168.3.100,192.168.3.200,3000:4000,5000:6000,2;",
            multi_pdns_wan_ipaddr_3: "192.168.1.1",
            multi_pdns_ipv6_wan_ipaddr_3: "ABCD:EF01:2345:6789:ABCD:EF01:2345:6789",
            multi_pdns_wan_ipaddr_4: "192.168.2.1",
            multi_pdns_ipv6_wan_ipaddr_4: "ABCD:EF01:2345:6789:ABCD:EF01:2345:678A",
            wan_connect_status: "wifi_connect",
            nat_mode: "",
            portforward_rule_num: "20",
            portmap_rule_num: "20",
            udp_echo_plus_status: "1",
            tr069_udpechos_prcv: "111",
            tr069_udpechos_prsp: "222",
            tr069_udpechos_brcv: "333",
            tr069_udpechos_brsp: "444",
            tr069_udpechos_tfr: "12:23",
            tr069_udpechos_tlr: "14:55",
            vxlan_config: "unicast,192.168.0.1,CDCD:910A:2222:5498:8475:1111:3900:2020,65535,eth,16777216",
            vxlan_enable: "1",
            vxlan_auth_enable: "1",
            vxlan_mec_enable: "1",
            vxlan_mec_status: "ACCESSED"
        },
        frequency = 10;
    setInterval(function () {
        if (simulate.signalbar = getRandomInt(5), simulate.opms_wan_auto_mode = ["AUTO_LTE_GATEWAY", "AUTO_DHCP", "AUTO_PPPOE"][getRandomInt(2)], updateBattery(), updateAttachedDevices(), simulate.rssi = "-" + getRandomInt(100), simulate.rscp = "-" + getRandomInt(100), simulate.lte_rsrp = "-" + getRandomInt(100), "ppp_disconnected" == simulate.ppp_status) simulate.total_tx_bytes = simulate.total_tx_bytes ? simulate.total_tx_bytes : getRandomInt(1e7), simulate.total_rx_bytes = simulate.total_rx_bytes ? simulate.total_rx_bytes : getRandomInt(1e7), simulate.total_time = simulate.total_time ? simulate.total_time : getRandomInt(1e4), simulate.monthly_tx_bytes = simulate.monthly_tx_bytes ? simulate.monthly_tx_bytes : getRandomInt(500), simulate.monthly_rx_bytes = simulate.monthly_rx_bytes ? simulate.monthly_rx_bytes : getRandomInt(1e3), simulate.monthly_time = simulate.monthly_time ? simulate.monthly_time : getRandomInt(1e4), simulate.realtime_tx_thrpt = 0, simulate.realtime_rx_thrpt = 0;
        else if (checkConnectedStatus(simulate.ppp_status)) {
            var e = getRandomInt(2) ? getRandomInt(1e4) : 0,
                t = getRandomInt(2) ? getRandomInt(1e5) : 0;
            simulate.total_tx_bytes += e, simulate.total_rx_bytes += t, simulate.total_time += 10, simulate.monthly_tx_bytes += e, simulate.monthly_rx_bytes += t, simulate.monthly_time += 10, simulate.realtime_tx_bytes += e, simulate.realtime_rx_bytes += t, simulate.realtime_time += 10, simulate.realtime_tx_thrpt = e, simulate.realtime_rx_thrpt = t
        }
        if (!simulate.testEnv) {
            if (0 == getRandomInt(5)) {
                if (simulate.sms_nv_rev_total + simulate.sms_nv_send_total + simulate.sms_nv_draftbox_total != simulate.sms_nv_total) {
                    simulate.sms_received_flag = "1";
                    var s = null;
                    smsReady || (s = "inner", smsReady = !0);
                    var _ = smsData.addNewSms(s);
                    smsArr.messages.push(smsArray2Object(_))
                }
            } else simulate.sms_received_flag = "0";
            simulate.sms_unread_num = simulate.sms_nv_rev_total = simulate.sms_nv_send_total = simulate.sms_nv_draftbox_total = simulate.sms_sim_rev_total = simulate.sms_sim_send_total = simulate.sms_sim_draftbox_total = 0, $.each(smsArr.messages, function (e, t) {
                "1" == t.tag && (simulate.sms_unread_num++, simulate.sms_nv_rev_total++, simulate.sms_sim_rev_total++), "0" == t.tag && (simulate.sms_nv_rev_total++, simulate.sms_sim_rev_total++), "2" != t.tag && "3" != t.tag || (simulate.sms_nv_send_total++, simulate.sms_sim_send_total++), "4" == t.tag && (simulate.sms_nv_draftbox_total++, simulate.sms_sim_draftbox_total++)
            })
        }
    }, 1e4);
    var devices = [{
            macAddress: "E8:E3:A5:AB:86:41",
            hostName: "MyHostName1",
            ipAddress: "192.168.0.151",
            addressType: "3",
            timeConnected: 124,
            ssid_index: "0"
        }, {
            macAddress: "E8:E3:A5:AB:86:42",
            hostName: "MyHostName2",
            ipAddress: "192.168.0.152",
            addressType: "1",
            timeConnected: 123,
            ssid_index: "1"
        }, {
            macAddress: "E8:E3:A5:AB:86:43",
            hostName: "MyHostName3",
            ipAddress: "192.168.0.153",
            addressType: "2",
            timeConnected: 122,
            ssid_index: "0"
        }, {
            macAddress: "E8:E3:A5:AB:86:44",
            hostName: "MyHostName24",
            ipAddress: "192.168.0.154",
            addressType: "3",
            timeConnected: 123,
            ssid_index: "1"
        }, {
            macAddress: "E8:E3:A5:AB:86:45",
            hostName: "MyHostName35",
            ipAddress: "192.168.0.155",
            addressType: "3",
            timeConnected: 122,
            ssid_index: "0"
        }],
        loginLockTimer = 0,
        fileList = {
            result: {
                totalRecord: "125",
                fileInfo: [{
                    fileName: "dev",
                    attribute: "document",
                    size: "0",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "sms.db",
                    attribute: "file",
                    size: "1231230",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "share.avi",
                    attribute: "file",
                    size: "480000",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "usr.jpg",
                    attribute: "file",
                    size: "456879",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "bin.pdf",
                    attribute: "file",
                    size: "789450",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "build.xml",
                    attribute: "file",
                    size: "423428",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "tmp.rar",
                    attribute: "file",
                    size: "12540",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "document.doc",
                    attribute: "file",
                    size: "2342234",
                    lastUpdateTime: "20120511"
                }, {
                    fileName: "share.ppt",
                    attribute: "file",
                    size: "122540",
                    lastUpdateTime: "20120510"
                }, {
                    fileName: "mySheet.xls",
                    attribute: "file",
                    size: "2341234",
                    lastUpdateTime: "20120511"
                }]
            }
        },
        CookieUtil = {
            set: function (e, t, s) {
                var _ = "";
                if (s) {
                    var a = new Date;
                    a.setTime(a.getTime() + 24 * s * 60 * 60 * 1e3);
                    var _ = "; expires=" + a.toGMTString()
                }
                document.cookie = e + "=" + t + _ + "; path=/"
            },
            get: function (e) {
                for (var t = e + "=", s = document.cookie.split(";"), _ = 0; _ < s.length; _++) {
                    for (var a = s[_];
                        " " == a.charAt(0);) a = a.substring(1, a.length);
                    if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
                }
                return null
            },
            remove: function (e) {
                CookieUtil.set(e, "", -1)
            }
        };
    return simulate
});
//# sourceMappingURL=../sourcemaps/simulate.js.map