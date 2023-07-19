const express = require("express");

const { getMovies, createMovie } = require("../controllers/movie");

const router = express.Router();

router.get("/:id", getMovies);
router.post("/", createMovie);

module.exports = router;
