import plugin from '../../../lib/plugins/plugin.js'

export class guanli extends plugin {
  constructor() {
    super({
      name: "管理命令",
      dsc: "管理员命令",
      event: "message",
      priority: 5000,

      rule: [
        {
          reg: "^#好友列表$",
          fnc: "get_friend",
          permission:'master'
        },
      ],
    });
  }


  async get_friend(e) {
    let f=e.fl()

    e.reply(typeof f)


  }
}
