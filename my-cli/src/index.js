const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");
const logSymbols = require("log-symbols");

// const { downloadRepos } = require("./api/index");
const { addCommand } = require("./command/index");
console.log(logSymbols.success, "daskjfanskjf");
// (async () => {
//   await downloadRepos("web#main", "aaa");
//   console.log("完成了");
// })();
console.log("🔍");
// program
//   .name("leo")
//   .version("1.0.0", "-v, --vers", "output the current version"); //指定版本

// addCommand(program);

// // 匹配空执行
// if (!process.argv.slice(2).length) {
//   program
//     .usage("<command> [options]")
//     .addHelpText(
//       "after",
//       `
//   Run ${chalk.blueBright(
//     "vue <command> --help"
//   )} for detailed usage of given command.`
//     )
//     .help(); // 输出help 文档并立即退出
// }

// // 配置错误输出
// program.configureOutput({
//   // 将错误高亮显示
//   outputError: (str, write) => {
//     program.usage(`create [options] <app-name>

// create a new project powered by vue-cli-service`);
//     program.commands[0].addHelpText(
//       "after",
//       `
//   ${chalk.red(str.split(": ")[1].replace(/^\S/, (s) => s.toUpperCase()))}
//       `
//     );
//     program.commands[0].help();
//   },
// });

// program.parse();

// async function init() {
//   const answers = await inquirer.prompt([
//     {
//       type: "checkbox",
//       message: "Select toppings",
//       name: "toppings",
//       choices: [
//         {
//           name: "Pepperoni",
//         },
//         {
//           name: "Ham",
//         },
//         {
//           name: "Ground Meat",
//         },
//         {
//           name: "Bacon",
//         },
//         {
//           name: "Mozzarella",
//           checked: true,
//         },
//         {
//           name: "Cheddar",
//         },
//       ],
//       validate(answer) {
//         if (answer.length < 1) {
//           return "You must choose at least one topping.";
//         }

//         return true;
//       },
//     },
//   ]);
//   console.log(JSON.stringify(answers));
//   // loading效果;
//   const spinner = ora({
//     text: "Loading...",
//   });
//   spinner.start();
//   console.log("\r\n");
// }
