const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const secret = process.env.JWT_SECRET;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 11;

const getUsers = async (req, res) => {};
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });
    res.status(201).json({ user: user, status: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const logUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { password: true },
  });
  const createToken = (payload, secret) => {
    const token = jwt.sign(payload, secret);
    return token;
  };

  function hasAccess(result) {
    if (result) {
      console.log("Access Granted!");
      const payload = { username, password };
      const myToken = createToken(payload, secret);
      return res
        .status(200)
        .json({
          status: "success",
          data: { token: myToken, username: username },
        });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  }
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      hasAccess(result);
    });
  }
  else {
    return res.status(404).json({ error: "User not in system" });
  }
};

module.exports = {
  getUsers,
  registerUser,
  logUser,
};
