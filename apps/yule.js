import plugin from "../../../lib/plugins/plugin.js";
import { segment } from "oicq";
import fetch from 'node-fetch'
import fs from 'node:fs'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import uploadRecord from '../model/uploadRecord.js'
export class yule extends plugin {
    constructor() {
        super({
            name: "sy:娱乐功能",
            dsc: "一些娱乐小功能",
            event: "message",
            priority: 5000,
            rule: [{
                reg: "^绿茶语音$",
                fnc: "lvchayuyin",
            },
            {
                reg: "^#企鹅估值",
                fnc: "guzhi"
            },
            {
                reg: "^扭腰$",
                fnc: 'niuyao',
            },
            {
                reg: "^舔狗日记$",
                fnc: 'tian_gou',
            },
            {
                reg: "^老婆骂我$",
                fnc: 'mawo',
            },
            {
                reg: "^渣男语录$",
                fnc: 'zhanan',
            },
            ],
        });
    }


    async lvchayuyin(e) {
        let i = String(Math.floor(Math.random() * 40))
        e.reply(await uploadRecord(`./plugins/sanyi-plugin/resources/yule/lvcha/${i}.mp3`, 0, false))
    }
    async guzhi(e) {
        let a = e.msg.split(' ')
        if (a.length == 1 & a == '#企鹅估值') {
            let url1 = 'https://xiaobapi.top/api/xb/api/qq_gujia.php?qq=' + e.user_id
            await e.reply(segment.image(url1)).then(mes => {
                setTimeout(() => {
                    if (e.isGroup) {
                        e.group.recallMsg(mes.message_id)
                    } else {
                        let user0 = Bot.pickUser(e.user_id)
                        user0.recallMsg(mes.message_id)
                    }
                }, 50000);
            })
        }
        else if (a.length == 2) {
            let url1 = 'https://xiaobapi.top/api/xb/api/qq_gujia.php?qq=' + a[1]
            await e.reply(segment.image(url1)).then(mes => {
                setTimeout(() => {
                    if (e.isGroup) {
                        e.group.recallMsg(mes.message_id)
                    } else {
                        let user0 = Bot.pickUser(e.user_id)
                        user0.recallMsg(mes.message_id)
                    }
                }, 50000);
            })
        } else {
            e.reply('输入有误')
        }
    }
    async niuyao(e) {
        let res_url = await fetch('http://api.xn--7gqa009h.top/api/nysp?key=25632286')
        if (res_url.status == 200) {
            let res_text = await res_url.text()
            if (res_text != '获取json数量错误') {
                let res_video = await fetch(res_text.split('\n')[1])
                let video_data = await res_video.arrayBuffer();
                fs.writeFileSync("./plugins/sanyi-plugin/resources/nysp.mp4", Buffer.from(video_data), "binary", function (err) {
                    console.log(err || "下载视频成功");
                    if (!err) {
                        console.log('准备发送')
                    }
                });
                await e.reply(segment.video('./plugins/sanyi-plugin/resources/nysp.mp4'));
            } else {
                e.reply('小姐姐坐火箭去太空了')
            }
        } else {
            e.reply('卖力找了一圈，没找到你想要的')
        }
    }

    async tian_gou(e) {
        let pl = process.cwd()
        fs.readFile('./plugins/sanyi-plugin/resources/yule/舔狗日记.txt', function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            data = data.toString()
            let data_list = data.split('\n')
            let t_index = Math.ceil(Math.random() * data_list.length)
            let riji = data_list[t_index]
            let time = new Date()
            let day_date = String(time.getFullYear()) + '/' + String(time.getMonth() + 1) + '/' + String(time.getDate())

            console.log(day_date)
            console.log(riji)
            let data1 = {}
            data1 = {
                tplFile: './plugins/sanyi-plugin/resources/yule/tiangou.html',
                day_date: day_date,
                riji: riji,
                pl: pl,

            }
            puppeteer.screenshot("舔狗日记", {
                ...data1,
            }).then(img => {
                e.reply(img)
            })
        })
    }
    async mawo(e) {
        let i = String(Math.floor(Math.random() * 60))
        e.reply(await uploadRecord(`./plugins/sanyi-plugin/resources/yule/mawo/${i}.mp3`, 0, false))
    }
    async zhanan(e) {
        let a = fs.readFileSync('./plugins/sanyi-plugin/resources/yule/渣男语录.txt', 'UTF-8')
        let b = a.split('\n')
        let i = Math.floor(Math.random() * b.length)
        e.reply(b[i])
    }

}