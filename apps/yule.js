import plugin from "../../../lib/plugins/plugin.js";
import { segment } from "oicq";
import fetch from 'node-fetch'
import fs from 'node:fs'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import uploadRecord from '../model/uploadRecord.js'
export class yule extends plugin {
    constructor() {
        super({
            name: "娱乐功能",
            dsc: "一些娱乐小功能",
            event: "message",
            priority: 5000,
            rule: [{
                    reg: "^绿茶语音$",
                    fnc: "yuyin",
                },
                {
                    reg: "^#企鹅估值$",
                    fnc: "guzhi"
                },
                {
                    reg: "^扭腰$",
                    fnc: 'niuyao',
                },
                {
                    reg: "^重置扭腰$",
                    fnc: 'reniuyao',
                },
                {
                    reg: "^舔狗日记$",
                    fnc: 'tian_gou',
                },
            ],
        });
    }


    async yuyin(e) {
        let url = "http://xiaobapi.top/api/xb/api/lvcha.php";
        e.reply(await uploadRecord(url, 0, false))
    }
    async guzhi(e) {
        if (e.isGroup) {
            let url1 = 'https://xiaobapi.top/api/xb/api/qq_gujia.php?qq=' + e.user_id
             await e.reply(segment.image(url1)).then(mes => {
                setTimeout(() => {
                    e.group.recallMsg(mes.message_id);
                }, 50000);
            })
        }
    }
    async niuyao(e) {
        return true //api 无了，等后面看看会不会再发出来
        fs.exists('./plugins/sanyi-plugin/resources/temp.mp4', (exists) => {
            if (exists) {
                fs.unlink('./plugins/sanyi-plugin/resources/temp.mp4', function(err) {
                    if (err) {
                        console.log(err)
                        return false
                    }
                    console.log('已经删除上次缓存旧文件')
                })
            } else {
                console.log("文件不存在");
            }
        });
        let cd = await redis.get(`Yz:sanyi:yule:niuyao:cd`)
        if (!cd || Number(cd) == 0) {
            let b = await fetch('http://api.xn--7gqa009h.top/api/nysp?key=25632286').then(data => { return data.text() })
            if (b != '获取json数量错误') {
                // e.reply(`@${e.nickname}你要的东西来了` + b)
                let url = b.split('\n')[1]
                let res = await fetch(url)
                res = await res.arrayBuffer()
                const video_data = Buffer.from(res);
                await fs.writeFile("./plugins/sanyi-plugin/resources/temp.mp4", video_data, { encoding: 'binary', }, function(err) {
                    if (!err) {
                        console.log("写入成功");
                        e.reply('稍等，马上就到')
                        try {
                            e.reply(segment.video('./plugins/sanyi-plugin/resources/temp.mp4'))
                        } catch (err) {
                            console.log(err)
                            e.reply('太瑟了发不出来，换个看看吧')
                            fs.unlink('./plugins/sanyi-plugin/resources/temp.mp4', function(err) {
                                if (err) {
                                    console.log(err)
                                    return false
                                }
                                console.log('已经删除已存在视频')
                            })
                        }
                    }
                })

                redis.set(`Yz:sanyi:yule:niuyao:cd`, 10).then(data => {
                    setTimeout(() => {
                        redis.set(`Yz:sanyi:yule:niuyao:cd`, 0)
                    }, 10000)
                })
            } else {
                e.reply('你要的东西坐火箭去太空了，再试一遍吧')
            }
        } else {
            e.reply('现在是圣贤时间，休息一下再来吧')
        }
    }
    async reniuyao(e) {
        await redis.set(`Yz:sanyi:yule:niuyao:cd`, 0)
        e.reply('祭礼枪被动触发,已重置圣贤时间cd')
    }
    async tian_gou(e) {
        let pl = process.cwd()
        fs.readFile('./plugins/sanyi-plugin/resources/yule/舔狗日记.txt', function(err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            data = data.toString()
            data = data.replace("*", "")
            data = data.replace("'", "")
            let data_list = data.split('\n')
            let t_index = Math.ceil(Math.random() * data_list.length)
            let riji = data_list[t_index]
            riji = riji.slice(1, riji.length - 3)
            riji = riji.replace(/'\*'/g, '')
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
}