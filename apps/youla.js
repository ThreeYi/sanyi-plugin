import plugin from '../../../lib/plugins/plugin.js'
import { segment } from 'oicq'



let yunyin_path = './plugins/sanyi-plugin/resources/yuyin/'
export class youla extends plugin {
    constructor() {
        super({
            name: "优菈对话",
            dsc: "收到指定消息后回复",
            event: "message",
            priority: 5000,
            rule: [{
                    reg: "优菈贴贴",
                    fnc: 'tietie',
                },
                {
                    reg: "优菈摸摸",
                    fnc: 'momo',
                },


            ],
        });
    }



    async tietie(e) {
        let mo = [
            '离我远点，真是可耻又无礼的行为',
            '贴..贴贴(靠近'
        ]
        let index = Math.floor((Math.random() * mo.length));
        e.reply(mo[index])

    }
    async momo(e) {
        let tie = [
            '你在做什么...这......这可是很失礼的',
            '呐,给你摸好了(伸手'
        ]
        let index = Math.floor((Math.random() * tie.length));
        e.reply(tie[index])

    }

}