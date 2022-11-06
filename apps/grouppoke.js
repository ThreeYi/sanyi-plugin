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
        let poke_switch=await sycfg.get_cfg('bot.yaml','poke_switch')
        if(poke_switch == false){
            return false
        }
        
        let appindex = Math.ceil(Math.random() * 2)
        if (e.target_id == cfg.qq) {
            switch (appindex) {
                case 1:
                    let poked_words=await sycfg.get_cfg('grouppoke_words.yaml','poked_words')
                    let wordsindex = Math.ceil(Math.random() * poked_words.length)
                    e.reply(poked_words[wordsindex - 1])
                    break
                case 2:
                    let poke_words=await sycfg.get_cfg('grouppoke_words.yaml','poke_words')
                    let wordsindex2 = Math.ceil(Math.random() * poke_words.length)
                    e.reply(poke_words[wordsindex2 - 1])
                    await common.sleep(1000)
                    e.group.pokeMember(e.operator_id)
                    break
                default:
                    break
            }
        }
    }
}