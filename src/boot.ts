import chalk from "chalk";
import inquirer from "inquirer";
import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import { startUp } from "./player.js";
import { oses, os } from "../global";
import { mainModule } from "node:process";

const date = "31/07/2022".split("/")
const ver = "0.1.0";
const dev = 1

const __dirname = dirname(fileURLToPath(import.meta.url))
const osesFolder = fs.readdirSync(`${__dirname}/oses/`);
let oses: oses[] = []
let osesName: string[] = []
for (const file of osesFolder) {
  if (file === "format.json") continue;
  const { default: os } = await import(`${__dirname}/oses/${file}`, { assert: { type: 'json' } });
  oses.push(os)
  osesName.push(os.name)
}

async function main(): Promise<void> {

}
main()
export { main }