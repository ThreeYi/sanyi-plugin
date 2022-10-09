import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";



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
        let f = Bot.fl
        let allname = ''
        let allimg = ''
        let allsign = ''
        let allstatu = ''
        let allkey = ''
        for (let [key, value] of f) {
            allkey = allkey.concat(`${key},`)
            allname = allname.concat(`${value.nickname}(${key}),`)
            allimg = allimg.concat(`${value.nickname},`)
            allsign = allsign.concat(`${value.signature},`)
            allstatu = allstatu.concat(`${String(value.online_status)},`)
        }
        let data1 = {}

        data1 = {
            tplFile: '/root/Yunzai-Bot/plugins/sanyi-plugin/resources/guanli/friend.html',
            allname: allname,
            allkey: allkey,

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
        for (let [key, value] of g) {
            allgroup = allgroup.concat(`${value.group_name}(${key}),`)
            allnum = allnum.concat(`${key},`)

        }
        let data1 = {}

        data1 = {
            tplFile: '/root/Yunzai-Bot/plugins/sanyi-plugin/resources/guanli/group.html',
            allnum: allnum,
            allgroup: allgroup,

        }
        let img = await puppeteer.screenshot("群列表", {
            ...data1,
        });
        e.reply(img)
    }
}