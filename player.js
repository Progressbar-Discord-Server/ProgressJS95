import inquirer from "inquirer";
import chalk from "chalk";
import { main } from "./boot.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function startUp(os, lang, save) {
  console.clear()
  console.log(`P r o g r e s s b a r  ${os.startupString}\n\n\n\n${lang.loading}`)
  // await sleep()
  await beginMenu(os, lang, save)
}

async function beginMenu(os, lang, save) {
  console.clear()
  let beginMenuChoices = []

  // if (save.os[os.shortName].level) beginMenuChoices.push(`1. ${lang.loadGame}`)
  beginMenuChoices.push(`${beginMenuChoices.length + 1}. ${lang.newGame}`, `${beginMenuChoices.length + 2}. ${lang.settings}`, `${beginMenuChoices.length + 3}. ${lang.restart}`, `${beginMenuChoices.length + 4}. ${lang.shutdown}`)
  let beginMenu = await inquirer.prompt({
    name: "begMe",
    type: 'list',
    message: `${lang.beginMenu}\n`,
    choices: beginMenuChoices
  });

  console.clear()
  switch (beginMenu.begMe.split('.')[0]) {
    case '1': {
      // if (save.os[os.shortName].level) return
      await play(null /* save.os[os.shortName].level */, lang)
      break
    }
    case '2': {
      // if (save.os[os.shortName].level) return
      settings()
      break
    }
    case '3': {
      // if (save.os[os.shortName].level) return
      restart()
      break
    }
    case '4': {
      // if (save.os[os.shortName].level) return
      shutdown()
      break
    }
    case '5': {
      shutdown()
      break
    }
    default: {
      console.log(lang.error)
      await sleep(1000)
      process.exit(1)
    }
  }
}

async function play(level = 1, lang) {

  async function downInfo(lang, bar, percent) {
    console.log(lang.bar + bar.join(""))
    console.log(lang.progreHave.replace('{%}', percent))
  }

  async function input(lang, bar, percent) {
    downInfo(lang, bar, percent)
    let play = await inquirer.prompt({
      name: "play",
      type: "input",
      message: lang.instruction + "\n"
    });
    
    return play.play
  }

  async function ChoiceSegment(lives, bar, percent, lang) {
    let green
    let segment = Math.floor(Math.random() * 6);
    switch (segment) {
      case 0: {
        console.log(`${chalk.red("╔══╗")}\n${chalk.red("║!!║")}\n${chalk.red("║!!║")}\n${chalk.red("╚══╝")}`)
        break;
      }
      case 1: {
        console.log(`${chalk.blue("╔══╗")}\n${chalk.blue("║  ║")}\n${chalk.blue("║  ║")}\n${chalk.blue("╚══╝")}`)
        break;
      }
      case 2: {
        console.log(`${chalk.blue("╔══╗")}\n${chalk.cyan("║??║")}\n${chalk.hex('#FFA500')("║??║")}\n${chalk.red("╚══╝")}`)
        break;
      }
      case 3: {
        console.log(`${chalk.yellow("╔══╗")}\n${chalk.yellow("║~~║")}\n${chalk.yellow("║~~║")}\n${chalk.yellow("╚══╝")}`)
        break;
      }
      case 4: {
        console.log(`${chalk.hex("#ffc0cb")("╔══╗")}\n${chalk.hex("#ffc0cb")("║--║")}\n${chalk.hex("#ffc0cb")("║--║")}\n${chalk.hex("#ffc0cb")("╚══╝")}`)
        break;
      }
      case 5: {
        green = Math.floor(Math.random() * 100)
        
        if (green !== 0) console.log(`${chalk.blueBright("╔══╗")}\n${chalk.blueBright("║~~║")}\n${chalk.blueBright("║~~║")}\n${chalk.blueBright("╚══╝")}`)
        else if (green === 0) console.log(`${chalk.green("╔══╗")}\n${chalk.green("║$$║")}\n${chalk.green("║$$║")}\n${chalk.green("╚══╝")}`)
        break;
      }
      case 6: {
        console.log(`${chalk.gray("╔══╗")}\n${chalk.gray("║  ║")}\n${chalk.gray("║  ║")}\n${chalk.gray("╚══╝")}`)
        break;
      }
    }
    if (lives !== 1) console.log(lang.livesLeft.replace('{lives}', lives) + '\n')
    else if (lives === 1) console.log(lang.oneLifeLeft)
    input2 = await input(lang, bar, percent)
    return [input2, segment, green]
  }

  async function CheckSegment(level, lives, bar, percent, seg, green) {
    switch (seg) {
      case 0: {
        if ((lives - 1) === 0) {if ((level - 1) !== 0) level = level - 1; lives = 3}
        else if ((lives - 1) !== 0) lives = lives - 1
        bar = []
        percent = 0
        break
      }
      case 1: {
        bar.push(chalk.blue("[]"))
        percent = percent + 5
        break
      }
      case 2: {
        seg = Math.floor(Math.random() * 6)
        await CheckSegment(level, lives, bar, percent, seg, green)
        break
      }
      case 3: {
        bar.push(chalk.yellow("[]"))
        percent = percent + 5
        break
      }
      case 4: {
        bar.pop()
        percent = percent - 5
        break
      }
      case 5: {
        if (green === 0) {
          percent = 100
          while (bar.length) {
            bar.pop()
          }
          for (let i; i > 20; i++) {
            bar.push(chalk.blue("[]"))
          }
          break
        }
        else if (green !== 0) {
          let num = Math.floor(Math.random() * 2) + 1;
          for (let i; i > num; i++) {
            bar.push(chalk.blue("[]"))
            percent = percent + 5
            console.log(num, i)
          }
          break
        }
      }
      default : {
        break
      }
    } 
  }

  let lives = 3
  let seg, green, result, input2
  let barArr = []
  let percent = 0
  while (true) {
    //console.clear()
    console.log(lang.level, level)
    result = await ChoiceSegment(lives, barArr, percent, lang)
    input2 = result[0]; seg = result[1]; green = result[2]; 
    if (input2 === "c") await CheckSegment(level, lives, barArr, percent, seg, green)
    if (percent === 100) {
      console.log("You won, press any key to continue")
    }
  }
}

export { startUp }