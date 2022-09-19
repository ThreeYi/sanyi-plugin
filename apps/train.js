import plugin from '../../../lib/plugins/plugin.js';

function riqi() {
    // console.info(d)
    var nowtime = new Date()
    let da = nowtime.getDate()
    // let da=d.toString()
    return da
}

export class train extends plugin {
    constructor() {
        super({
            name: "训练",
            dsc: "好感度玩法",
            event: "message",
            priority: 5000,
            rule: [
                {
                    reg: "^训练$",
                    fnc: "train",
                },
            ],
        });
    }
   
    async training(favorability, cishu, value, a, b) {
        favorability += value
        cishu += 1
        await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
        await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, cishu)
        // await this.e.reply(String(cishu))
        if (value > 0) {
            await this.reply(`训练很卖力呢，恭喜！\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
        }
        else if (value < 0) {
            await this.reply(`训练心不在焉的，很遗憾！\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
        }
        else {
            await this.reply(`训练挺好的！\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
        }
    }
    async changeFavorability(a, b, value) {
        // 先获取 甲 对 乙 的好感度
        let favorability_0 = await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`)
        let trainriqi_0 = await redis.get(`Yz:sanyi:favorability:${a}:${b}:trainriqi`)
        let cishu_0 = await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`)
        if (!favorability_0 || !trainriqi_0 || !cishu_0 || (typeof(trainriqi) != 'string')) {
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, 0)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:trainriqi`, Number(riqi()))
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, 0)
            this.e.reply('初始化好感度'+typeof(trainriqi)+!favorability+!trainriqi+ !cishu)
        }
        let favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        let trainriqi = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:trainriqi`))
        let  cishu= Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))

        if (trainriqi = Number(riqi()) && cishu < 3) {

            this.training(favorability, cishu, value, a, b)
            this.e.reply("fnc1")

        }
        else if (Number(trainriqi) != Number(riqi())) {

            this.training(favorability, cishu, value, a, b)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, 1)
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:trainriqi`, Number(riqi()))
            this.e.reply('func2'+cishu+trainriqi)

            let tt=riqi()
            this.e.reply(typeof( tt)+tt)
            this.e.reply(typeof( trainriqi)+trainriqi)


        }
        else {
            this.reply(`@${b}今天训练好久了，休息一下，明天再来吧`)
        }

    }
    async train(e) {

        let a = "优菈"
        let b = e.nickname    // 获取发消息人的昵称
        let value = -1 // 好感度改变值
        value += Math.ceil(Math.random() * 4)
        await this.changeFavorability(a, b, value)

    }
}
