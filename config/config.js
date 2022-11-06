import YAML from 'yaml'
import fs from 'fs'
export default new class sycfg {

    constructor() {
        this.default_config_path = './plugins/sanyi-plugin/config/default_config/'
        this.config_path = './plugins/sanyi-plugin/config/config/'
        this.initconfig()
    }

    async initconfig() {
        const files = fs.readdirSync(this.default_config_path).filter(file => file.endsWith('.yaml'))
        for (let file of files) {
            if (!fs.existsSync(`${this.config_path}${file}`)) {
                fs.copyFileSync(`${this.default_config_path}${file}`, `${this.config_path}${file}`)
            }
        }
    }

    async read_cfgfile(filename){
        let cfg_list
        try{
            cfg_list=YAML.parse(fs.readFileSync(this.config_path+filename, 'utf8'))
        }catch{
            cfg_list=YAML.parse(fs.readFileSync(this.default_config_path+filename, 'utf8'))
        }
        return await cfg_list
    }
}