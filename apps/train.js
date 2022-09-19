import plugin from '../../../lib/plugins/plugin.js'
export class train extends plugin {
    constructor() {
        super({
            name: "训练",
            dsc: "好感度玩法",
            event: "message",
            priority: 5000,
            rule: [
                {
                    reg: "训练",
                    fnc: "train",
                },
            ],
        });
    }

    async changeFavorability(a, b, value) {
        // 先获取 甲 对 乙 的好感度
        let favorability = await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`)
        if (!favorability ||favorability==NaN) {
            await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, 0)
        }
        favorability = Number(await redis.get(`Yz:sanyi:favorability:${a}:${b}:favorability`))
        favorability +=value
        await redis.set(`Yz:sanyi:favorability:${a}:${b}:favorability`, favorability)
        if (value > 0) {
            this.reply(`训练很卖力呢，恭喜！\n${a} 对 ${b} 的好感度增加了 ${value}\n当前好感度: ${favorability}`)
        }
        else if (value < 0) {
            this.reply(`训练心不在焉的，很遗憾！\n${a} 对 ${b} 的好感度降低了 ${Math.abs(value)}\n当前好感度: ${favorability}`)
        }
        else {
            this.reply(`训练挺好的！\n${a} 对 ${b} 的好感度不变呢\n当前好感度: ${favorability}`)
        }
    }
    async train(e) {
        // let groupmembermap = await e.group.getMemberMap()
        // let operator = groupmembermap.get(e.operator_id)
        // let target = groupmembermap.get(e.target_id)
        let a="优菈"
        let b= e.nickname    // 获取发消息人的昵称
        let value = 0 // 好感度改变值
        value += Math.ceil((Math.random() * 5)-2)
        await this.changeFavorability(a, b, value)

    }
}
