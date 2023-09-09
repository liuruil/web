const ora = require("ora");
const { Octokit } = require("octokit");
const downloadResource = require("download-git-repo");
const octokit = new Octokit({
  auth: "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",
});

/**
 * 获取我的所有github仓库
 * @returns
 */
async function getMyAllRepos() {
  const { data } = await octokit.request("GET /users/liuruil/repos");
  return data;
}

/**
 * 下载仓库
 * @param {*} reposName 仓库名字和分支 web#main
 * @param {*} targetDir 下载的目标文件夹
 */
function downloadRepos(reposName, targetDir) {
  const spinner = ora({
    text: "Loading...",
  }).start();
  return new Promise((resolve, reject) => {
    downloadResource(`liuruil/${reposName}`, targetDir, (err) => {
      if (err) {
        reject(err);
        spinner.fail();
      } else {
        resolve("下载成功");
        spinner.succeed();
      }
    });
  });
}

module.exports = {
  getMyAllRepos,
  downloadRepos,
};
