import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";

let a = '优菈'

function nowday() {
    var nowtime = new Date()
    var timeday = nowtime.getDate()

    return String(timeday)
}

export class train extends plugin {
    constructor() {
        super({
            name: "训练",
            dsc: "通过训练增加好感度",
            event: "message",
            priority: 3000,
            rule: [
                {
                    reg: "^训练$",
                    fnc: "xunlian",
                },
                {
                    reg: "好感查询",
                    fnc: 'haogan',
                },
            ],
        });
    }




    async changeFavorability(a, b, value) {
        // 先获取 甲 对 乙 的好感度
        let favorability = await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`)
        let riqi = (await redis.get(`Yz:sanyi:favorability:${a}:${b}:riqi`))
        let cishu = (await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))
        if (!favorability) {
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, 0)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, '0')
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, '0')
        }
        favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        riqi = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:riqi`))
        cishu = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))
        // this.reply(String( favorability))
        // this.reply(String(cishu))

        if (String(riqi) == nowday() && cishu < 1) {
            // favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, String(cishu))
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练了一会\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else if (String(riqi) != nowday()) {
            cishu = 1
            favorability += value
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, String(cishu))
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, nowday())
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练了一会\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }

        else {
            this.reply(`@${b}\n今天已经训练很久了，休息一下明天再来吧!当前好感度:${favorability}`)
        }


    }
    async xunlian(e) {
        let b = e.nickname
        let value = 0
        value += Math.floor(Math.random() * 4)
        this.changeFavorability(a, b, value)
        // e.reply(nowday())

    }
    async haogan(e) {

        let favorability = await redis.keys('Yz:sanyi:favorability:优菈:*:favorability')
        favorability = String(favorability)
        favorability = favorability.replace(RegExp("Yz:sanyi:favorability:优菈:", "g"), '')
        favorability = favorability.replace(RegExp(":favorability", 'g'), '')
        let name_list = favorability.split(',')
        let haogan_list = []
        for (let name in name_list) {
            let haogan = await redis.get(`Yz:sanyi:favorability:优菈:${name_list[name]}:favorability`)
            haogan_list.push([name_list[name], haogan])
        }
        // console.log(haogan_list)

        for (let i = 0; i < haogan_list.length - 1; i++) {//代表第几轮比较
            for (let j = 0; j < haogan_list.length - 1 - i; j++) {//每一轮的两两相邻元素比较
                if (Number(haogan_list[j][1]) < Number(haogan_list[j + 1][1])) {//相邻元素比较
                    [haogan_list[j], haogan_list[j + 1]] = [haogan_list[j + 1], haogan_list[j]]//满足条件，交换位置
                }
            }
        }
        // console.log(haogan_list)
        // let ml = process.cwd()
        let data1 = {}

        data1 = {
            tplFile: '/root/Yunzai-Bot/plugins/sanyi-plugin/resources/haogan/2.html',
            haogan: String(haogan_list)

        }
        let img = await puppeteer.screenshot("好感度", {
            ...data1,
        });
        e.reply(img)
        // e.reply('haogan')

    }
}
