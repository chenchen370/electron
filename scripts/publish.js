const gulp = require('gulp');
const path = require('path');
const sftp = require('gulp-sftp-up5');

/**
 * 命令列别
 * @enum {string}
 */
const CommandOptionsEnum = Object.freeze({
  WEB_PUBLISH: 'WEB_PUBLISH'
});

/**
 * 各种命令对应执行的回调
 */
const cmdOperations = {
  [CommandOptionsEnum.WEB_PUBLISH]: function () {
    const sftpConfig = {
      remotePath: `/usr/share/nginx/html/dist`, // 部署到服务器的路径
      host: '8.136.101.72', // 服务器地址
      user: 'root', // 帐号
      pass: 'M)g)G$D3hyHngWO', // 密码
      port: 22, // 端口
      removeCurrentFolderFiles: true,
      callback(param) {
        console.log(111, param);
      }
    };
    gulp.src(path.resolve(__dirname, './../dist/**')).pipe(sftp(sftpConfig));
  }
};

(function (cmdType) {
  if (!cmdType) {
    console.log('请提供执行node命令的参数');
    return;
  }
  if (!CommandOptionsEnum[cmdType]) {
    console.log('未知命令!');
    return;
  }
  cmdOperations[cmdType]();
})(process.argv.splice(2)[0]);
