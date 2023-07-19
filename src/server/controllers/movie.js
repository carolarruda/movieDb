const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const getMovies = await prisma.movie.findMany({
    where: { userId: id },
  });
  return res.send({ movies: getMovies });
};
const createMovie = async (req, res) => {
  let { title, description, runtimeMins, url, userId } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  } else {
    userId = Number(userId);
    runtimeMins = Number(runtimeMins);

    try {
      const movie = await prisma.movie.create({
        data: {
          title,
          description,
          runtimeMins,
          url,
          userId,
        },
      });
      res.status(201).json({ movie: movie });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
};
