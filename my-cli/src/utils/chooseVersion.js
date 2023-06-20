const inquirer = require("inquirer");
const chalk = require("chalk");
const { program } = require("commander");
module.exports = async function (name, options) {
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
    const config = await inquirer.prompt([
      {
        type: "checkbox",
        name: "config",
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
    console.log(config);
  }
};
