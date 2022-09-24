import plugin from '../../../lib/plugins/plugin.js'


function maptostring(map) {
  let allstring = ''
  for (let [key,value] of map) {

     allstring=allstring.concat(value.nickname).concat(key).concat('\n')
  }
   return allstring
}

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
          fnc: "get_friend_list",
          permission: 'master'
        },
      ],
    });
  }


  async get_friend_list(e) {
    let f = Bot.fl
    let dd = maptostring(f)

    e.reply(dd)

  }
}
