import plugin from '../../../lib/plugins/plugin.js'

let botname = '优菈'
export class jinyong extends plugin {
    constructor() {
        super({
            name: "机器人开关",
            dsc: "控制机器人在指定群开关",
            event: "message",
            priority: 2,
            rule: [
                {
                    reg: "",
                    fnc: "jinyong",
                },
            ],
        });
    }


    async jinyong(e) {
       
        /** 上下班指令 */
        let rule_open = new RegExp(`^#${botname}下班$`)
        let rule_close = new RegExp(`^#${botname}上班$`)
        /** 判断是不是上班和下班指令 */
        if (rule_open.test(e.msg)) {
            await this.openjinyong(e)
            return true
        }
        if (rule_close.test(e.msg)) {
            await this.closejinyong(e)
            return true
        }
        /** 判断是不是该类中的命令，如果是则让消息往下传递 */
        let rules = this.rule
        for (let i in rules) {
            if (rules[i].reg.match(e.msg))
                return false
        }
        

        /** 如果在禁用状态则阻挡消息不再往下传递 */
        if (e.isGroup && (await redis.get(`Yz:sanyi:jinyonggroup:${e.group_id}`))) {
            return true
        }
        /** 如果不在宵禁或者私聊则让消息往下传递 */
        return false

    }
    async closejinyong(e) {
        /** 判断是不是群聊消息 */
        if (!e.isGroup) {
            /** 如果不是则发送提示消息 */
            e.reply('该命令只能在群聊中触发~')
            return
        }
        /** 如果是则继续 */
        else {
            /** 判断用户是不是主人或者主人在群聊中指定的代理人 */
            if (e.isMaster) {
                /** 如果是则继续 */
                /** 判断机器人是否已经上班 */
                if (await redis.get(`Yz:sanyi:jinyonggroup:${e.group_id}`)) {
                    /** 如果没有上班了 */
                    await redis.del(`Yz:sanyi:jinyonggroup:${e.group_id}`)
                    e.reply(`${botname}上线啦~快来陪我玩吧~`)
                    return
                }
                /** 如果已经上班了则发送提示文案 */
                else {
                    e.reply(`${botname}已经在上班啦~${botname}可不敢偷懒哦~`)
                    return
                }
            }
            /** 如果不是则发送提示消息 */
            else {
                e.reply(`抱歉~只有主人和主人在该群指定的代理人才能命令${botname}哦~`)
                return
            }
        }
    }

    /** 下班 */
    async openjinyong(e) {
        /** 判断是不是群聊消息 */
        if (!e.isGroup) {
            /** 如果不是则发送提示消息 */
            e.reply('该命令只能在群聊中触发~')
            return
        }
        /** 如果是则继续 */
        else {
            /** 判断用户是不是主人或者主人在群聊中指定的代理人 */
            if (e.isMaster) {
                /** 如果是则继续 */
                /** 判断机器人是否已经下班 */
                if (!await redis.get(`Yz:sanyi:jinyonggroup:${e.group_id}`)) {
                    /** 如果没有下班 */
                    await redis.set(`Yz:sanyi:jinyonggroup:${e.group_id}`, '1')
                    e.reply(`${botname}下班咯~优菈去找安博玩啦~`)
                    return
                }
            }
            /** 如果不是则发送提示消息 */
            else {
                e.reply(`抱歉~只有主人和主人在该群指定的代理人才能命令${botname}哦~`)
                return
            }
        }
    }


}
