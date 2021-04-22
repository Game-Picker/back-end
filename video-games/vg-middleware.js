const Games = require("./vg-model");

const validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const game = await Games.findById(id);
    const randomGame = await Games.pickRandomGame();
    // console.log(randomGame[0]);

    if (!game && id != 0) {
      res.status(404).json({
        message: `Cannot locate game #${id}`,
      });
    } else if (game) {
      req.game = game;
      console.log("We hit the else if");
    } else {
      req.randomGame = randomGame[0];
      console.log("We hit the else");
    }
    next();
  } catch (err) {
    next(err);
  }
};

const validateBody = (req, res, next) => {
  const game = req.body;

  if (!game.title) {
    res.status(400).json({
      message: "Game Title Is Required",
    });
  } else if (!game.image) {
    res.status(400).json({
      message: "Game Image Is Required",
    });
  } else if (!game.rating_id) {
    res.status(400).json({
      message: "Game Rating Is Required",
    });
  } else {
    next();
  }
};

module.exports = {
  validateId,
  validateBody,
};
