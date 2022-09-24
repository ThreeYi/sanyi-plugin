import plugin from '../../../lib/plugins/plugin.js'


// map转换为字符串
//ty=0:好友列表 ty=1：群列表
function maptostring(map, ty) {
  let allstring = ''
  if (ty == 0) {
    for (let [key, value] of map) {
      allstring = allstring.concat(`(${value.nickname}) ${key}\n`)
    }
  }
  if (ty == 1) {
    for (let [key, value] of map) {
      allstring = allstring.concat(`(${value.group_name}) ${key}\n`)
    }
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
        {
          reg: "^#群列表$",
          fnc: "get_group_list",
          permission: 'master'
        },
      ],
    });
  }


  async get_friend_list(e) {
    let f = Bot.fl
    let ff = maptostring(f, 0)
    e.reply(ff)
  }

  async get_group_list(e) {
    let g = Bot.gl
    let gg = maptostring(g, 1)
    e.reply(gg)
  }
}
