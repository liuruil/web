const inquirer = require("inquirer");
const chalk = require("chalk");
const { program } = require("commander");
module.exports = async function (name, options) {
  console.clear();
  console.log(chalk.yellow("Vue CLI v5.0.8"));
  // 选择版本
  const { version } = await inquirer.prompt([
    {
      type: "list",
      name: "version",
      message: "Please pick a preset: ",
      choices: [
        `Default ${chalk.yellow("([Vue 3] babel, eslint)")}`,
        `Default ${chalk.yellow("([Vue 2] babel, eslint)")}`,
        "Manually select feature",
      ],
    },
  ]);
  //自定义配置
  if (version === "Manually select feature") {
    // 插件
    const { plugins } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "plugins",
        message: "Check the features needed for your project: ",
        choices: [
          {
            name: "Babel",
            checked: true,
          },
          {
            name: "TypeScript",
          },
          {
            name: "Progressive Web App (PWA) Support",
          },
          {
            name: "Router",
          },
          {
            name: "Vuex",
          },
          {
            name: "CSS Pre-processors",
          },
          {
            name: "Linter / Formatter",
            checked: true,
          },
          {
            name: "Unit Testing",
          },
          {
            name: "E2E Testing",
          },
        ],
        pageSize: 9,
      },
    ]);
    // 版本
    const { version } = await inquirer.prompt([
      {
        type: "list",
        name: "version",
        message:
          "Choose a version of Vue.js that you want to start the project with",
        choices: [`3.x`, `2.x`],
      },
    ]);
    // 选择路由模式
    const { routerHistoryMode } = await inquirer.prompt([
      {
        type: "confirm",
        name: "routerHistoryMode",
        message: "Use history mode for router?",
        // choices: [`3.x`, `2.x`],
      },
    ]);
    console.log({ plugins, version, routerHistoryMode });
  }
};
