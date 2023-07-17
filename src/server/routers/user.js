const express = require("express");

const { getUsers, registerUser, logUser } = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", logUser);

module.exports = router;
