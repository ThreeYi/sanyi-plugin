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
            priority: 3000,
            rule: [
                {
                    reg: "^训练$",
                    fnc: "xunlian",
                },
                {
                    reg: "^训练测试$",
                    fnc: "xun",
                },
            ],
        });
    }


    async xunlian(e) {
        let b = e.nickname
        let value = -1
        value += Math.floor(Math.random()*5)

        let favorability = await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`)
        let riqi = (await redis.get(`Yz:sanyi0:favorability:${a}:${b}: riqi`))
        let cishu = (await redis.get(`Yz:sanyi0:favorability:${a}:${b}:cishu`))
        if (!favorability) {
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, 0)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:riqi`, 0)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, 0)
        }
        favorability = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`))
        riqi = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:riqi`))
        riqi =Number(riqi)
        cishu = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:cishu`))
        if (riqi = nowday() && cishu < 3) {
            // this.reply("成功0"+riqi+nowday()

            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, cishu)
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练的还行\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else if (riqi != nowday() && cishu < 3) {
            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, cishu)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:riqi`,Number(nowday()))
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练的还行\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else if (riqi != nowday() && cishu > 2 && (typeof riqi == 'number')) {
            // this.reply("成功"+riqi)

            favorability += value
            
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:favorability`, favorability)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:cishu`, 0)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:riqi`, Number(nowday()))
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练的还行\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else if(typeof riqi != 'number'){
            let haogan= await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`)
            await redis.set(`Yz:sanyi0:favorability:${a}:${b}:riqi`, Number(nowday()))
            this.reply(`@${b}\n今天已经训练好久了，休息一下明天再来吧!当前好感度`+haogan)
        }
        else {
            let haogan= await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`)
            this.reply(`@${b}\n今天已经训练好久了，休息一下明天再来吧!当前好感度`+haogan)
        }
    }
    async xun(e){
        let b = e.nickname
        let favorability = await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`)
        let riqi = (await redis.get(`Yz:sanyi0:favorability:${a}:${b}: riqi`))
        let cishu = (await redis.get(`Yz:sanyi0:favorability:${a}:${b}:cishu`))
        favorability = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:favorability`))
        riqi = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:riqi`))
        riqi =Number(riqi)
        cishu = Number(await redis.get(`Yz:sanyi0:favorability:${a}:${b}:cishu`))
        e.reply(favorability+riqi+cishu)
    }
}

