/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '三一帮助',
  subTitle: 'Yunzai-Bot & sanyi-plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
{
  group: '三一插件功能',
  list: [{
    icon: 25,
    title: '扭腰 ',
    desc: '斯哈斯哈~'
  },{
    icon: 32,
    title: '绿茶语音',
    desc: '温柔懂事好妹妹谁不爱呢'
  },{
    icon: 9,
    title: '#优菈上班 #优菈下班 ',
    desc: '上下班命令,可在配置文件修改'
  },{
    icon: 40,
    title: '训练  好感查询',
    desc: '好感度玩法'
  },{
    icon: 71,
    title: '#戳一戳',
    desc: '群聊戳一戳'
  },{
    icon: 78,
    title: '舔狗日记',
    desc: '女神回我信息了唉！'
  },{
    icon: 24,
    title: '#企鹅估值',
    desc: '图一乐，时代的眼泪'
  },{
    icon: 60,
    title: '老婆骂我',
    desc: '^_^'
  },{
    icon: 42,
    title: '渣男语录',
    desc: '他只是我的妹妹'
  }
]
},{
  group: '管理命令，仅管理员可用',
  auth: 'master',
  list: [{
    icon: 85,
    title: '#三一更新 #三一强制更新',
    desc: '更新插件'
  },
  {
    icon: 92,
    title: '#数据库备份 #数据库恢复',
    desc: '备份redis数据到文件'
  },{
    icon: 75,
    title: '#好友列表 #群列表',
    desc: '查看机器人好友'
  },
  {
    icon: 71,
    title: '#获取好友个性签名',
    desc: '执行后好友列表会显示签名'
  },]
}]

export const isSys = true
