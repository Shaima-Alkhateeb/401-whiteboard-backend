'use strict';

const User = require('../models').userModel;

module.exports = async (req, res, next) => {
  console.log('Inside the middleware');
  if (!req.headers.authorization) {
    next('Invalid Login !!');
  }
  //   else {
  // console.log(req.headers.authorization); //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWltYSIsImlhdCI6MTY2Mzc2MDUwMX0.HRu4iU-Ngajl752vSo6DxwW7OhlAXM5WKzgUwnv9vPw
  const token = req.headers.authorization.split(' ').pop();
  try {
    console.log(token); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWltYSIsImlhdCI6MTY2Mzc2MDUwMX0.HRu4iU-Ngajl752vSo6DxwW7OhlAXM5WKzgUwnv9vPw
    const validUser = await User.authenticateToken(token);
    // console.log(validUser); // { username: 'shaima', iat: 1663760501 } //Executing (default): SELECT "id", "username", "email", "password", "createdAt", "updatedAt" FROM "Users" AS "User";

    const userInfo = await User.findOne({
      where: { username: validUser.username },
    });
    // console.log(userInfo);

    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token;
      next();
    } else {
      next('Invalid Login !!');
    }
    // console.log(userInfo)
  } catch (e) {
    // next(e);
    console.log(e);
  }
  //   }
};
