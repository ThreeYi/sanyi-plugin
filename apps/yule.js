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
                    reg: "扭腰",
                    fnc: 'niuyao',
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
            e.reply(segment.image(url1)).then(mes => {
                setTimeout(() => {
                    e.group.recallMsg(mes.message_id);
                }, 50000);
            })
        }
    }
    async niuyao(e) {

        let niuyaolianjie = await fetch('http://api.xn--7gqa009h.top/api/nysp?key=qiqi')
        let b = await niuyaolianjie.text()
        while (b = '获取json数量错误') {
            niuyaolianjie = await fetch('http://api.xn--7gqa009h.top/api/nysp?key=qiqi')
            b = await niuyaolianjie.text()
        }
        if (b != '获取json数量错误') {
            e.reply(`@${e.nickname}你要的东西来了` + b)
        }

    }
}