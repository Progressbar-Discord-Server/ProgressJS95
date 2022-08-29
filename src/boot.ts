import chalk from "chalk";
import inquirer from "inquirer";
import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import { startUp } from "./player.js";

const date = "31/07/2022".split("/")
const ver = "0.1.0";
const dev = 1

const __dirname = dirname(fileURLToPath(import.meta.url))
const osesFolder = fs.readdirSync(`${__dirname}/oses/`);
let oses: Record<string, unknown>[] = []
let osesName: string[] = []
for (const file of osesFolder) {
  if (file === "format.json") continue;
  const { default: os } = await import(`${__dirname}/oses/${file}`, { assert: { type: 'json' } });
  oses.push(os)
  osesName.push(os.name)
}

const langFolder = fs.readdirSync(`${__dirname}/lang/`);
let langCode: string[] = []

for (const file of langFolder) {
  if (file === "format.json" || file === "test.json") continue;
  const { default: lang } = await import(`${__dirname}/lang/${file}`, { assert: { type: 'json' } });
  langCode.push(`${lang.code}  ${lang.langDescription}`)
  console.log(lang.code)
}

console.clear()

let langChosen = await inquirer.prompt({
  name: 'lang',
  type: 'list',
  message: 'What language do you want?\n',
  choices: langCode,
  default() {
    return "en_US";
  }
});
console.clear()
let { default: lang } = await import(`${__dirname}/lang/${langChosen.lang.split("  ")[0]}.json`, { assert: { type: "json" } })

let os: object
async function main(): Promise<any> {
  let devPass = 0
  while (devPass !== 1) {
    if (dev) devPass = 1
    console.log(lang.sparow, '-', chalk.yellow(lang.energyStar));
    console.log(lang.jsVer, ver, lang.compiled.replace("{d}", date[0]).replace("{m}", date[1]).replace("{y}", date[2]));
    console.log(chalk.red(lang.dev) + "\n")

    let osChoice = await inquirer.prompt({
      name: 'os',
      type: 'list',
      message: "What OS do you want to boot?\n",
      choices: osesName
    });

    oses.forEach(e => { if (e.name === osChoice.os) { os = e } })
    console.log()
    // console.clear();
    await startUp(os, lang, /*save*/)
  }
}
main()
export { main }