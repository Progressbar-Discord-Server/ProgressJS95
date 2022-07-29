import chalk from "chalk";
import inquirer from "inquirer";
import fs from 'node:fs';
import { BlockList } from "node:net";
import { dirname } from 'path';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const osesFolder = fs.readdirSync(`${__dirname}/oses/`);
let oses = []
let osesName = []
for (const file of osesFolder) {
  if (file === "format.json") continue;
  const { default: os } = await import(`${__dirname}/oses/${file}`, { assert: { type: 'json' }});
  oses.push(os)
  osesName.push(os.name)
}

const langFolder = fs.readdirSync(`${__dirname}/lang/`);
let langCode = []

for (const file of langFolder) {
  if (file === "format.json") continue;
  const { default: lang } = await import(`${__dirname}/lang/${file}`, { assert: { type: 'json' }});
  langCode.push(lang.code)
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

let { default: lang} = await import(`${__dirname}/lang/${langChosen.lang}.json`, { assert: {type: "json" }})

let os = await inquirer.prompt({
  name: 'os',
  type: 'list',
  message: "What OS do you want to boot?\n",
  choices: osesName
})

console.clear();
console.log(lang.sparow, chalk.yellow(lang.energyStar));