# sanyi-plugin

#### 介绍
不想要哪个把对应的js删掉,不会写开关（开摆



#### 软件架构
js一窍不通，只有依葫芦画瓢的程度,有些还没完善

cv了[@小飞](https://gitee.com/xfdown)大佬的高清语音 ，特别感谢

功能：

      1、戳一戳

      2、上下班

      3、通过训练提升好感度

      4、获取机器人好友列表和群列表
        
      5、娱乐功能
      
      6、数据库备份和恢复
      


#### 安装教程

1、下面两个安装方式任选一个，在Yunzai-Bot目录下运行，安装插件（推荐使用gitee）

### （1）使用gitee安装

```

git clone https://gitee.com/ThreeYi/sanyi-plugin.git ./plugins/sanyi-plugin/

```

### （2）使用GitHub安装

```
git clone https://gitee.com/ThreeYi/sanyi-plugin.git ./plugins/sanyi-plugin/

```
2、安装好后重启机器人


#### 使用说明

1、无需环境配置，能使用云崽和喵喵插件，这个就能正常用

2、没有写容错，注意命令格式
#### 命令（没加#号的命令加#不会触发）
  
 0、#三一帮助 #三一版本   //查看命令帮助和版本改动

 1、#优菈上班  #优菈下班   //在config文件夹中的bot.yaml修改机器人名字和上下班提示词，默认： 优菈

 2、训练 好感查询 好感恢复   //redis丢数据的话手动恢复）:例如：恢复|三一|10  将三一的好感度恢复为10

 3、群聊双击机器人头像发戳一戳，私聊不会触发

 4、#好友列表 #群列表 //在群里也会触发，建议私聊使用，首次使用请 #获取好友个性签名 拿签名，比较慢，没找到其他好方法，一个好友需要大概3s，完成后会有提示，耐心等待

 5、扭腰 绿茶语音 qq估值 舔狗日记  //娱乐功能，茶艺和扭腰需要ffmpeg才能用
      
 6、 #数据库备份 #数据库恢复 //redis里面的东西备份到文件，使用恢复功能从文件恢复数据到redis，要先备份才能恢复

 7、#三一更新   #三一强制更新  //更新命令

#### 其他
[gitee地址](https://gitee.com/ThreeYi/sanyi-plugin)/[github地址](https://github.com/ThreeYi/sanyi-plugin)

联系方式QQ:89388003