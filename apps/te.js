import plugin from '../../../lib/plugins/plugin.js'
var nowtime = new Date()
let d = nowtime.getDate()
export class te extends plugin {
  constructor() {
    super({
      name: "打包测试",
      dsc: "测试",
      event: "message",
      priority: 5000,
      rule: [
        {
          reg: "打包测试",
          fnc: "yuyin",
        },
      ],
    });
  }


  async yuyin(e) {
    console.info(nowtime.getDate)

    // e.reply(d)

  }
}
