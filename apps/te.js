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

   pwd=process.cwd()
    e.reply(pwd)

  }
}
