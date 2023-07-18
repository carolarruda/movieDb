const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const getMovies = await prisma.movie.findMany()
  return res.send({movies: getMovies})
};
const createMovie = async (req, res) => {
  let { title, description, runtimeMins } = req.body;

  runtimeMins = Number(runtimeMins);

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });
    res.status(201).json({ movie: movie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getMovies,
  createMovie,
};
