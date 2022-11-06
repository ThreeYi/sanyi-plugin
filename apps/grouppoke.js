import plugin from '../../../lib/plugins/plugin.js';
import cfg from '../../../lib/config/config.js';
import common from '../../../lib/common/common.js'
import sycfg from '../config/config.js'
export class grouppoke extends plugin {
    constructor() {
        super({
            name: "戳一戳",
            dsc: "收到戳一戳消息做出回应",
            event: "notice.group.poke",
            priority: 5000,
            rule: [{
                reg: ".*",
                fnc: "grouppoke",
            }, ],
        });
    }


    async grouppoke(e) {
        let poke_switch=await sycfg.get_cfg('bot.yaaml',poke_switch)
        if(poke_switch == false){
            return false
        }
        let words=await sycfg.get_cfg('grouppoke_words.yaml','poked_words')
        let wordsindex = Math.ceil(Math.random() * words.length)
        let appindex = Math.ceil(Math.random() * 2)
        if (e.target_id == cfg.qq) {
            switch (appindex) {
                case 1:
                    e.reply(words[wordsindex - 1])
                    break
                case 2:
                    this.reply('你刚刚是不是戳我了，我要戳回去，哼！！！')
                    await common.sleep(1000)
                    e.group.pokeMember(e.operator_id)
                    break
                default:
                    break
            }
        }
    }
}