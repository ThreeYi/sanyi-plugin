import plugin from '../../../lib/plugins/plugin.js'
import sycfg from '../config/config.js'

let botname = await sycfg.get_cfg('bot.yaml', 'bot_name')
let a = botname

export class youla extends plugin {
    constructor() {
        super({
            name: "sy:bot对话", //根据好感度双标
            dsc: "收到指定消息后回复",
            event: "message",
            priority: 5000,
            rule: [{
                reg: `^${botname}贴贴$`,
                fnc: 'tietie',
            },
            {
                reg: `^${botname}摸摸$`,
                fnc: 'momo',
            },


            ],
        });
    }



    async tietie(e) {

        let b = e.nickname
        console.log(b)
        let favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        if (!favorability || favorability < 10) {
            e.reply('你想挨拳头吗')
        } else if (favorability < 20) {
            e.reply('要是旅行者的话，也不是不可以')
        }
        else {
            e.reply('贴..贴贴(靠近')
        }


    }
    async momo(e) {
        let b = e.nickname
        console.log(b)
        let favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        if (!favorability || favorability < 10) {
            e.reply('想尝尝煎饼，蛋卷生抽吗')

        } else if (favorability < 20) {
            e.reply('要是旅行者的话，也不是不可以')
        }
        else {

            e.reply('呐，给你摸好了（伸手')
        }


    }

}