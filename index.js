import fs from 'node:fs'
import Ver from './components/Version.js'

const files = fs.readdirSync('./plugins/sanyi-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

logger.info('-------------------------')
logger.info(`三一插件${Ver.ver}初始化~`)
logger.info('-------------------------')


files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
    let name = files[i].replace('.js', '')

    if (ret[i].status != 'fulfilled') {
        logger.error(`载入插件错误：${logger.red(name)}`)
        logger.error(ret[i].reason)
        continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
