import plugin from '../../../lib/plugins/plugin.js'
import sycfg from '../config/config.js'

let botname = await sycfg.get_cfg('bot.yaml','bot_name')
let starttip = await sycfg.get_cfg('bot.yaml','start_tip')
let closetip = await sycfg.get_cfg('bot.yaml','close_tip')
export class jinyong extends plugin {
    constructor() {
        super({
            name: "机器人群开关",
            dsc: "控制机器人在指定群开关",
            event: "message",
            priority: -10,
            rule: [{
                    reg: `^#${botname}下班$`,
                    fnc: "jinyong",
                    permission: 'master',
                },
                {
                    reg: `^#${botname}上班$`,
                    fnc: "kaiqi",
                    permission: 'master',
                },
            ],
        });
    }

    // 关机
    async jinyong(e) {
        if (e.isGroup) {
            this.file = './config/config/group.yaml'
            let data = YAML.parse(fs.readFileSync(this.file, 'utf8'))
            console.log(data)
            data[e.group_id] = { enable: ["机器人群开关", ] }
            let yaml = YAML.stringify(data)
            fs.writeFileSync(this.file, yaml, "utf8")
            e.reply(closetip)
        } else {
            e.reply('请在群聊中使用')  
        }
    }

    /** 开机 */
    async kaiqi(e) {
        if (e.isGroup) {
            this.file = './config/config/group.yaml'
            let data = YAML.parse(fs.readFileSync(this.file, 'utf8'))
            data[e.group_id] = { enable: null }
            let yaml = YAML.stringify(data)
            fs.writeFileSync(this.file, yaml, "utf8")
            e.reply(starttip)
        } else {
            e.reply('请在群聊中使用')
        }
    }
}