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
          reg: "打包测试",
          fnc: "yuyin",
        },
      ],
    });
  }


  async yuyin(e) {

    let a=new Date()
    let pwd=a.getDate()

    e.reply(pwd)

  }
}
