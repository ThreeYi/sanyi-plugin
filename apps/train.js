import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";

import YAML from "yaml"
import fs from "node:fs"

let botinfo = YAML.parse(fs.readFileSync("./plugins/sanyi-plugin/config/bot.yaml", 'utf8'))
const a = botinfo.bot_name

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
            rule: [{
                    reg: "^训练$", //好感度玩法触发词
                    fnc: "xunlian",
                },
                {
                    reg: "好感查询", //好感度排行
                    fnc: 'haogan',
                },
                {
                    reg: "^恢复", //手动调整好感度，格式： 恢复|小白|12 将小白好感度设置为15
                    fnc: "huifu",
                    permission: 'master'
                },
            ],
        });
    }




    async changeFavorability(a, b, value) {
        let favorability = await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`)
        let riqi = (await redis.get(`Yz:sanyi:favorability:${a}:${b}:riqi`))
        let cishu = (await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))
        if (!favorability) { //判断是否存在，不存在初始化
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, 0)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, '0')
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, '0')
        }
        favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        riqi = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:riqi`))
        cishu = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))


        if (String(riqi) == nowday() && cishu < 1) {
            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, String(cishu))
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            } else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            } else {
                this.reply(`训练了一会\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        } else if (String(riqi) != nowday()) {
            cishu = 1
            favorability += value
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, String(cishu))
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, nowday())
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            } else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            } else {
                this.reply(`训练了一会\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        } else {
            this.reply(`@${b}\n今天已经训练很久了，休息一下明天再来吧!当前好感度:${favorability}`)
        }


    }
    async xunlian(e) {
        if (e.isPrivate) {
            e.reply('请在群聊中使用')
            return true
        }
        let b = e.nickname
        let value = 0
        value += Math.floor(Math.random() * 4)
        this.changeFavorability(a, b, value)

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


        for (let i = 0; i < haogan_list.length - 1; i++) { //代表第几轮比较
            for (let j = 0; j < haogan_list.length - 1 - i; j++) { //每一轮的两两相邻元素比较
                if (Number(haogan_list[j][1]) < Number(haogan_list[j + 1][1])) { //相邻元素比较
                    [haogan_list[j], haogan_list[j + 1]] = [haogan_list[j + 1], haogan_list[j]] //满足条件，交换位置
                }
            }
        }

        let data1 = {}
        let pl = process.cwd()

        data1 = {
            tplFile: './plugins/sanyi-plugin/resources/haogan/haogan.html',
            haogan: String(haogan_list),
            pl: pl,

        }
        let img = await puppeteer.screenshot("好感度", {
            ...data1,
        });
        e.reply(img)

    }
    async huifu(e) {
        let xiaoxi = e.msg
        let shuju = xiaoxi.split('|')
        let favorability = shuju[2]
        let b = shuju[1]
        let cishu = '0'
        let riqi = '0'
        await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
        await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, cishu)
        await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, riqi)
        e.reply('已经恢复' + b + '好感度：' + favorability)

    }
}