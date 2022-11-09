import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import { core } from 'oicq'
import fetch from 'node-fetch'

let domain = ""; //支持qun.qq.com等多个domain
const botcookie = Bot.cookies[domain];
const bkn = Bot.bkn;
// cookie需要设置在http请求头部

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
            name: "sy:管理命令",
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
                {
                    reg: "^#获取好友个性签名$",
                    fnc: "get_sign",
                    permission: 'master'
                },
            ],
        });
    }

    async get_sign(e) {
        e.reply('开始获取好友个性签名，每个好友预计花费3s，全部完成后会有提示。')
        let f = Bot.fl
        for (let [key, value] of f) {
            let url = 'https://find.qq.com/proxy/domain/cgi.find.qq.com/qqfind/find_v11?backver=2'
            let res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    cookie: botcookie,
                },
                body: 'bnum=15&pagesize=15&id=0&sid=0&page=0&pageindex=0&ext=&guagua=1&gnum=12&guaguan=2&type=2&ver=4903&longitude=116.405285&latitude=39.904989&lbs_addr_country=%E4%B8%AD%E5%9B%BD&lbs_addr_province=%E5%8C%97%E4%BA%AC&lbs_addr_city=%E5%8C%97%E4%BA%AC%E5%B8%82&keyword=' + String(key) + '&nf=0&of=0&ldw=' + String(bkn)
            })
            let cc = await res.text()
            cc = cc.match(/"lnick":"(.*?)"/g)
            cc = String(cc)
            cc = cc.replace('"lnick":"', '')
            cc = cc.replace('，"', '')
            cc = cc.replace('"', '')
            cc = cc.replace(',', '，')
            cc = cc.replace('’', '')
            await redis.set(`Yz:sanyi:qqsign:${key}`, cc)
        }
        e.reply('签名获取已完成,现在使用 #好友列表 可看到签名')
    }
    async get_friend_list(e) {
        let pl = process.cwd()
        let f = Bot.fl
        let online_list = []
        let online_statu = []
        let online_name = []
        let no_online_name = []
        let no_online_list = []
        let sign_list = []
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
                // sign_list.push(await this.get_sign(i[0]))
            let signnature0 = await redis.get(`Yz:sanyi:qqsign:${i[0]}`)
            if (!signnature0 || String(signnature0) == 'null') {
                sign_list.push('')
            } else {
                if (signnature0.length >= 18) {
                    signnature0 = signnature0.slice(0, 17) + '...'
                }
                sign_list.push(signnature0)
            }
        }

        for (let [key, value] of f) {
            if (!isInArray(online_list, key)) {
                no_online_name.push(value.nickname)
                no_online_list.push(key)
                    // sign_list.push(await this.get_sign(key))
                let signnature = await redis.get(`Yz:sanyi:qqsign:${key}`)
                if (!signnature || String(signnature) == 'null') {
                    sign_list.push('')
                } else {
                    if (signnature.length >= 18) {
                        signnature = signnature.slice(0, 17) + '...'
                    }
                    sign_list.push(signnature)
                }
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
            all_no_online_list: String(no_online_list),
            all_sign: String(sign_list),
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