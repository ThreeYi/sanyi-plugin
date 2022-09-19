import plugin from '../../../lib/plugins/plugin.js'


let a = '优菈'

function nowday() {
    var nowtime = new Date()
    var timeday = nowtime.getDate()

    return timeday
}

export class train extends plugin {
    constructor() {
        super({
            name: "训练",
            dsc: "通过训练增加好感度",
            event: "message",
            priority: 5000,
            rule: [
                {
                    reg: "^训练$",
                    fnc: "xunlian",
                },
            ],
        });
    }


    async xunlian(e) {

        let b = e.nickname
        let value = -1
        value += Math.ceil(Math.random() * 5)

        let favorability = await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`)
        let riqi = (await redis.get(`Yz:sanyi0:favorability:${a}:${b}:riqi`))
        let cishu = (await redis.get(`Yz:sanyi0:favorability:${a}:${b}:cishu`))
        if (!favorability) {
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, 0)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:riqi`, 0)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, 0)
        }
        favorability = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`))
        riqi = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:riqi`))
        cishu = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:cishu`))
        if (riqi = nowday() && cishu < 3) {
            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, cishu)
            if (value > 0) {
                this.reply(`恭喜！\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`很遗憾！\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`挺好的！\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else if (riqi != nowday() && cishu < 3) {
            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, cishu)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:riqi`, nowday())
            if (value > 0) {
                this.reply(`恭喜！\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`很遗憾！\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`挺好的！\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else {
            this.reply("今天已经训练好久了，休息一下明天再来吧")
        }
    }
}

