import plugin from '../../../lib/plugins/plugin.js'


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
                    reg: "^训练测试$",
                    fnc: "xun",
                },
                {
                    reg: "删除好感$",
                    fnc: "delh",
                },
            ],
        });
    }


    async xunlian(e) {
        
    }
    async delh(e) {
        await client.flushadb()
        e.reply("已删除")
    }
    async changeFavorability(a, b, value) {
        // 先获取 甲 对 乙 的好感度
        let favorability = await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`)
        let riqi = (await redis.get(`Yz:sanyi:favorability:${a}:${b}:riqi`))
        let cishu = (await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))
        if (!favorability) {
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, '0')
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, '0')
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, '0')
        }
        favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        riqi = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:riqi`))
        cishu = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:cishu`))
        if ( String(riqi)==nowday() && cishu < 3 ){
            // favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
            favorability += value
            cishu += 1
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, String(favorability))
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, String(cishu))
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练表现平平\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }
        else if( String(riqi) != nowday()) {
            cishu =0
            favorability += value
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, String(favorability))
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:cishu`, String(cishu))
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:riqi`, nowday())
            if (value > 0) {
                this.reply(`训练很卖力\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
            }
            else if (value < 0) {
                this.reply(`训练心不在焉的\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
            }
            else {
                this.reply(`训练表现平平\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
            }
        }

        else {
            this.reply(`@${b}\n今天已经训练很久了，休息一下明天再来吧!当前好感度:${favorability}`)
        }
       
        
    }
    async xun(e){
        let b=e.nickname
        let value = -1
        value += Math.ceil(Math.random() * 5)
        this.changeFavorability(a,b)
        e.reply(nowday())
      
}
}
