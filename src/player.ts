import inquirer from "inquirer";
import chalk from "chalk";
import { main } from "./boot.js";
import { os } from "../global"

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function startUp(os: os, save: Record<string, any>) {

}

export { startUp }