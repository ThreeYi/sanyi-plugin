import plugin from '../../../lib/plugins/plugin.js'
import { segment } from 'oicq'
import fetch from 'node-fetch'

let yunyin_path = './/plugins/sanyi-plugin/resources/yuyin/'
export class youla extends plugin {
    constructor() {
        super({
            name: "优菈对话",
            dsc: "收到指定消息后回复",
            event: "message",
            priority: 5000,
            rule: [
                {
                    reg: "早上好",
                    fnc: "zaoshanghao",
                },
                {
                    reg: "中午好",
                    fnc: "zhongwuhao",
                },
                {
                    reg: "晚上好",
                    fnc: "wanshanghao",
                },
                {
                    reg: "晚安",
                    fnc: 'wanan',
                },
                {
                    reg: "贴贴",
                    fnc: 'tietie',
                },
                {
                    reg: "摸摸",
                    fnc: 'momo',
                },
                {
                    reg: "扭腰",
                    fnc: 'niuyao',
                },
                {
                    reg: "好感排行",
                    fnc: 'haogan',
                },
            ],
        });
    }


    async zaoshanghao(e) {

        e.reply(segment.record(yunyin_path + '早上好.mp3'))

    }
    async zhongwuhao(e) {

        e.reply(segment.record(yunyin_path + '中午好.mp3'))

    }
    async wanshanghao(e) {

        e.reply(segment.record(yunyin_path + '晚上好.mp3'))

    }
    async wanan(e) {

        e.reply(segment.record(yunyin_path + '晚安.mp3'))

    }
    async tietie(e) {
        e.reply('离我远点，真是可耻又无礼的行为')

    }
    async momo(e) {
        e.reply('你在做什么.....这...可是很失礼的')

    }
    async niuyao(e) {
    
        let niuyaolianjie = await fetch( 'http://api.xn--7gqa009h.top/api/nysp?key=qiqi')
        let b =await niuyaolianjie.text()
        e.reply(`@${e.nickname}你要的东西来了`+b)
    }
    async haogan(e) {

        e.reply('haogan')

    }
}
