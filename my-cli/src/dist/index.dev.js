"use strict";

var _require = require("commander"),
    program = _require.program;

var chalk = require("chalk");

var inquirer = require("inquirer");

var ora = require("ora");

var logSymbols = require("log-symbols"); // enhance common error messages


var enhanceErrorMessages = require("./utils/enhanceErrorMessages");

var _require2 = require("./command/index"),
    addCommand = _require2.addCommand;

console.clear();
program.name("leo").version("1.0.0", "-v, --vers", "output the current version"); //指定版本

addCommand(program); // 匹配空执行

if (!process.argv.slice(2).length) {
  program.usage("<command> [options]").addHelpText("after", "\n  Run ".concat(chalk.blueBright("vue <command> --help"), " for detailed usage of given command.")).help(); // 输出help 文档并立即退出
} // 配置错误输出


program.configureOutput({
  // 将错误高亮显示
  outputError: function outputError(str, write) {
    program.usage("create [options] <app-name>\n  \ncreate a new project powered by vue-cli-service");
    program.commands[0].addHelpText("after", "\n  ".concat(chalk.red(str.split(": ")[1].replace(/^\S/, function (s) {
      return s.toUpperCase();
    })), "\n      "));
    program.commands[0].help();
  }
});
program.parse();

function init() {
  var answers, spinner;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            type: "checkbox",
            message: "Select toppings",
            name: "toppings",
            choices: [{
              name: "Pepperoni"
            }, {
              name: "Ham"
            }, {
              name: "Ground Meat"
            }, {
              name: "Bacon"
            }, {
              name: "Mozzarella",
              checked: true
            }, {
              name: "Cheddar"
            }],
            validate: function validate(answer) {
              if (answer.length < 1) {
                return "You must choose at least one topping.";
              }

              return true;
            }
          }]));

        case 2:
          answers = _context.sent;
          console.log(JSON.stringify(answers)); // loading效果;

          spinner = ora({
            text: "Loading..."
          });
          spinner.start();
          console.log("\r\n");
          console.log(logSymbols.info, "daskjfanskjf");

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}