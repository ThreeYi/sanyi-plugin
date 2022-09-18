import fs from "node:fs";


logger.info(`-----------加载三一插件---------------`);

const files = fs
  .readdirSync("./plugins/sanyi/apps")
  .filter((file) => file.endsWith(".js"));

let apps = {};
for (let file of files) {
  let name = file.replace(".js", "");
  apps[name] = (await import(`./apps/${file}`))[name];
}

export { apps };
