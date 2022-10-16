import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import { core } from 'oicq'



function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

export class guanli extends plugin {
    constructor() {
        super({
            name: "管理命令",
            dsc: "管理员命令",
            event: "message",
            priority: 5000,

            rule: [{
                    reg: "^#好友列表$",
                    fnc: "get_friend_list",
                    permission: 'master'
                },
                {
                    reg: "^#群列表$",
                    fnc: "get_group_list",
                    permission: 'master'
                },
            ],
        });
    }


    async get_friend_list(e) {
        let pl = process.cwd()
        let f = Bot.fl
        let online_list = []
        let online_statu = []
        let online_name = []
        let no_online_name = []
        let no_online_list = []
        const FSOLREQ = core.jce.encodeStruct([
            Bot.uin, 0, 0, null, 1, 31, 0
        ])
        const body = core.jce.encodeWrapper({ FSOLREQ }, "mqq.IMService.FriendListServiceServantObj", "GetSimpleOnlineFriendInfoReq")
        const payload = await Bot.sendUni("friendlist.GetSimpleOnlineFriendInfoReq", body)
        const rsp = core.jce.decodeWrapper(payload)[1]
        for (let i of rsp) {
            online_list.push(i[0])
            online_statu.push(i[14])
            online_name.push(Bot.pickFriend(Number(i[0])).nickname)
        }


        for (let [key, value] of f) {
            if (!isInArray(online_list, key)) {
                no_online_name.push(value.nickname)
                no_online_list.push(key)
                    // online_name_list.push(value.nickname)
            }
        }
        let data1 = {}

        data1 = {
            tplFile: './plugins/sanyi-plugin/resources/guanli/friend.html',
            all_online_name: String(online_name),
            all_online_list: String(online_list),
            all_online_statu: String(online_statu),
            pl: pl,
            all_no_online_name: String(no_online_name),
            all_no_online_list: String(no_online_list)

        }
        let img = await puppeteer.screenshot("好友列表", {
            ...data1,
        });
        e.reply(img)
    }

    async get_group_list(e) {
        let g = Bot.gl
        let allgroup = ''
        let allnum = ''
        let pl = process.cwd()
        for (let [key, value] of g) {
            allgroup = allgroup.concat(`${value.group_name}(${key}),`)
            allnum = allnum.concat(`${key},`)

        }
        let data1 = {}

        data1 = {
            tplFile: './plugins/sanyi-plugin/resources/guanli/group.html',
            allnum: allnum,
            allgroup: allgroup,
            pl: pl,

        }
        let img = await puppeteer.screenshot("群列表", {
            ...data1,
        });
        e.reply(img)
    }
}