import plugin from '../../../lib/plugins/plugin.js';
import cfg from '../../../lib/config/config.js';
import common from '../../../lib/common/common.js'
import { Console } from 'console';
import YAML from 'yaml';
import fs from 'fs';
export class grouppoke extends plugin {
    constructor() {
        super({
            name: "戳一戳",
            dsc: "收到戳一戳消息做出回应",
            event: "notice.group.poke",
            priority: 5000,
            rule: [
                {
                    reg: ".*",
                    fnc: "grouppoke",
                },
            ],
        });
    }


    async grouppoke(e) {
        let words = YAML.parse(fs.readFileSync("/root/Yunzai-Bot/plugins/sanyi/config/words/words.yaml", 'utf8'))
        let wordsindex = Math.ceil(Math.random() * words.length)
        let appindex = Math.ceil(Math.random() * 2)
        // let groupmembermap = await e.group.getMemberMap()
        // let operator = groupmembermap.get(e.operator_id).nickname
        // let target = groupmembermap.get(e.target_id).nickname
        if (e.target_id === cfg.qq) {
            switch (appindex) {
                case 1:
                    e.reply(words[wordsindex - 1])
                    break
                case 2:
                    this.reply('你戳戳我，我戳回去，哼！！！')
                    await common.sleep(1000)
                    e.group.pokeMember(e.operator_id)
                    break
                default:
                    break
            }
        }
    }
}
