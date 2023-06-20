const chooseVersion = require("../utils/chooseVersion");
/**
 * 给程序添加命令
 * @param {*} program 程序
 */
function addCommand(program) {
  program
    .command("create <app-name>")
    .description("create a new project powered by vue-cli-service")
    .option(
      "-p, --preset <presetName>",
      "Skip prompts and use saved or remote preset"
    )
    .option("-d, --default", "Skip prompts and use default preset")
    .option(
      "-i, --inlinePreset <json>",
      "Skip prompts and use inline JSON string as preset"
    )
    .option(
      "-m, --packageManager <command>",
      "Use specified npm client when installing dependencies"
    )
    .option(
      "-r, --registry <url>",
      "Use specified npm registry when installing dependencies (only for npm)"
    )
    .option(
      "-g, --git [message]",
      "Force git initialization with initial commit message"
    )
    .option("-n, --no-git", "Skip git initialization")
    .option("-f, --force", "Overwrite target directory if it exists")
    .option("--merge", "Merge target directory if it exists")
    .option("-c, --clone", "Use git clone when fetching remote preset")
    .option(
      "-x, --proxy <proxyUrl>",
      "Use specified proxy when creating project"
    )
    .option("-b, --bare", "Scaffold project without beginner instructions")
    .option("--skipGetStarted", 'Skip displaying "Get started" instructions')
    .action(function (name, options) {
      chooseVersion(name, options);
    });
  program
    .command(
      "add [options] <plugin> [pluginOptions]",
      "install a plugin and invoke its generator in an already created project"
    )
    .command(
      "invoke [options] <plugin> [pluginOptions]",
      "invoke the generator of a plugin in an already created project"
    )
    .command(
      "inspect [options] [paths...]",
      "inspect the webpack config in a project with vue-cli-service"
    )
    .command("serve", 'alias of "npm run serve" in the current project')
    .command("build", 'alias of "npm run build" in the current project')
    .command("ui [options]", "start and open the vue-cli ui")
    .command(
      "init [options] <template> <app-name>",
      "generate a project from a remote template (legacy API, requires @vue/cli-init)"
    )
    .command("config [options] [value]", "inspect and modify the config")
    .command(
      "outdated [options]",
      "(experimental) check for outdated vue cli service / plugins"
    )
    .command(
      "upgrade [options] [plugin-name]",
      "(experimental) upgrade vue cli service / plugins"
    )
    .command(
      "migrate [options] [plugin-name]",
      "(experimental) run migrator for an already-installed cli plugin"
    )
    .command("info", "print debugging information about your environment");
}

module.exports = {
  addCommand,
};
