import YAML from 'yaml'
import fs from 'fs'
words = YAML.parse(fs.readFileSync("./words/words.yaml", 'utf8'))
