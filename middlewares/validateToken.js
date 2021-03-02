const { errorWrapper, errorGenerator } = require("../errors");
const { UserService } = require("../services");
const { JWT_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const validateToken = errorWrapper(async (req, res, next) => {
  const { id } = jwt.verify(req.headers.authorization, JWT_SECRET_KEY);

  const foundUser = await UserService.findUser({ id });
  if (!foundUser) errorGenerator({ statusCode: 400, message: "User Not Found" });

  req.foundUser = foundUser;

  next();
});

module.exports = validateToken;
