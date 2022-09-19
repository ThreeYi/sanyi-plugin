import plugin from '../../../lib/plugins/plugin.js'

export class te extends plugin {
  constructor() {
    super({
      name: "打包测试",
      dsc: "测试",
      event: "message",
      priority: 5000,
      rule: [
        {
          reg: "测试",
          fnc: "yuyin",
        },
      ],
    });
  }


  async yuyin(e) {
    // console.info(d)
    var nowtime = new Date()
    let d = nowtime.getDate()
    let da=d.toString()
    await  e.reply(da)

  }
}
