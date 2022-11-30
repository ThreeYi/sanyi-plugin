import plugin from '../../../lib/plugins/plugin.js'
import fs from "node:fs"

export class data_recover extends plugin {
    constructor() {
        super({
            name: "sy:数据库备份",
            dsc: "数据库里面的数据备份",
            event: "message",
            priority: 5000,
            rule: [{
                reg: '^#数据库备份$',
                fnc: "data_backup",
                permission: 'master',
            },
            {
                reg: '^#数据库恢复$',
                fnc: "data_recover",
                permission: 'master',
            },
            ],
        });
    }

    async data_backup(e) {
        let all_key = await redis.keys('*')
        let bei = {}
        let fail_num = 0
        let ok_num = 0
        let failkey = ''
        for (let key of all_key) {
            let key_type = await redis.type(key)
            if (key_type != 'string') {
                continue
            }
            try {
                let value = await redis.get(key)
                bei[key] = value
                ok_num++
            } catch (err) {
                fail_num++
                failkey = failkey.concat(key + '\n')
            }
        }
        bei = JSON.stringify(bei)
        fs.writeFileSync('./data/sy/redis_data.json', bei, 'utf8', function (err) {
            if (err) {
                console.log(err);
                return false;
            }
            logger.mark('数据库备份结果:', `备份成功${ok_num}个，备份失败${fail_num}个\n`, '备份失败的条目：\n' + failkey)

        })
        await e.reply('数据库备份结果:\n' + `备份成功${ok_num}个，备份失败${fail_num}个`)
    }
    async data_recover(e) {

        let re_fail_num = 0
        let re_ok_num = 0
        let re_failkey = ''
        fs.readFileSync('./data/sy/redis_data.json', function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(data.toString());
            let redis_data = JSON.parse(data.toString())
            console.log(typeof redis_data)
            // console.log(Object(redis_data))
            for (let key in redis_data) {
                try {
                    re_ok_num = re_ok_num + 1
                    // console.log(key, redis_data[key])
                    redis.set(key, redis_data[key])

                } catch (err) {
                    re_fail_num++
                    console.log('恢复该条数据失败', `总共失败${re_fail_num}条`)
                    return false;
                }
            }
            logger.mark('数据库恢复结果:', `恢复成功${re_ok_num}个，恢复失败${re_fail_num}个\n`, '恢复失败的条目：\n' + re_failkey)
        })
        await e.reply('数据库恢复结果:\n' + `恢复成功${re_ok_num}个，恢复失败${re_fail_num}个`)
    }
}