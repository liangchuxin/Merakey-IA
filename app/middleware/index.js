const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt, // 这是一个 JSON 格式数据，检查 token 和权限
  verifySignUp, // 这是一个 JSON 格式数据，检查重复用户名邮箱和 roles
};
