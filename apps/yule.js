import plugin from "../../../lib/plugins/plugin.js";
import { segment } from "oicq";
import fetch from 'node-fetch'

export class yule extends plugin {
    constructor() {
        super({
            name: "娱乐功能",
            dsc: "一些娱乐小功能",
            event: "message",
            priority: 5000,
            rule: [{
                    reg: "学习茶艺",
                    fnc: "yuyin",
                },
                {
                    reg: "^qq估值$",
                    fnc: "guzhi"
                },
                {
                    reg: "^扭腰$",
                    fnc: 'niuyao',
                },
                {
                    reg: "^重置扭腰$",
                    fnc: 'reniuyao',
                },
            ],
        });
    }


    async yuyin(e) {
        let url = "http://xiaobapi.top/api/xb/api/lvcha.php";
        e.reply(segment.record(url))
    }
    async guzhi(e) {
        if (e.isGroup) {
            let url1 = 'https://xiaobapi.top/api/xb/api/qq_gujia.php?qq=' + e.user_id
            await e.reply(segment.image(url1)).then(mes => {
                setTimeout(() => {
                    e.group.recallMsg(mes.message_id);
                }, 50000);
            })
        }
    }
    async niuyao(e) {
        let cd = await redis.get(`Yz:sanyi:yule:niuyao:cd`)
        if (!cd || Number(cd) == 0) {
            let niuyaolianjie = await fetch('http://api.xn--7gqa009h.top/api/nysp?key=qiqi')
            let b = await niuyaolianjie.text()
            if (b != '获取json数量错误') {
                e.reply(`@${e.nickname}你要的东西来了` + b)
                await redis.set(`Yz:sanyi:yule:niuyao:cd`, 10).then(data => {
                    setTimeout(() => {
                        redis.set(`Yz:sanyi:yule:niuyao:cd`, 0)
                    }, 10000)
                })
            } else {
                e.reply('你要的东西坐火箭去太空了，再试一遍吧')
            }
        } else {
            e.reply('现在是圣贤时间，休息一下再来吧')
        }
    }
    async reniuyao(e) {
        await redis.set(`Yz:sanyi:yule:niuyao:cd`, 0)
        e.reply('祭礼枪被动触发,已重置圣贤时间cd')
    }
}