const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const { UserService } = require("../services");
const { errorGenerator, errorWrapper } = require("../errors");

const signUp = errorWrapper(async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const foundUser = await UserService.findUser({ email });
  if (foundUser) errorGenerator({ statusCode: 400, message: "Email Already Exists" });

  const createdUser = await UserService.createUser({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ createdUserEmail: createdUser.email });
});

const signIn = errorWrapper(async (req, res) => {
  const { email, password: inputPassword } = req.body;

  const foundUser = await UserService.findUser({ email });
  if (!foundUser) errorGenerator({ statusCode: 400, message: "User Does Not Exists" });

  const { id, password: hashedPassword } = foundUser;

  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
  if (!isValidPassword) errorGenerator({ statusCode: 400 });

  const token = jwt.sign({ id }, JWT_SECRET_KEY);
  res.status(200).json({ token });
});

module.exports = {
  signUp,
  signIn,
};
