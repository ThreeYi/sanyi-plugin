import plugin from '../../../lib/plugins/plugin.js'


let a = '优菈'

function nowday() {
    var nowtime = new Date()
    var timeday = nowtime.getDate()

    return timeday
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
            ],
        });
    }


    async xunlian(e) {
        
    }
    async xun(e){
      
}
}
