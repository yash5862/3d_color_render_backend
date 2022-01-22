const jwt = require('jsonwebtoken');
const User = require('../../apis/users/users.model');
const config = require('../../../config');

function getData(token) {
  return jwt.decode(token.replace('Bearer ', ''));
}

async function getAuthUser(token) {
  try {
    const tokenData = getData(token);
    const user = await User.findOne({ userId: tokenData.id });
    const resUser = JSON.parse(JSON.stringify(user));
    delete resUser.password;
    return resUser;
  } catch (e) {
    return {};
  }
}

function getJWTToken(data) {
  const token = `Bearer ${jwt.sign(data, config.jwtConfig.secret)}`;
  return token;
}

module.exports = { getData, getAuthUser, getJWTToken };
