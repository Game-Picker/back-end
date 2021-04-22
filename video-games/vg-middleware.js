// *** [ Imports ] *** //
const Games = require("./vg-model");

// *** [ Function To Validate That Id Given Is An Existing Id In Games Table ] *** //
const validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const game = await Games.findById(id);
    const randomGame = await Games.pickRandomGame();

    if (!game && id != 0) {
      res.status(404).json({
        message: `Cannot locate game #${id}`,
      });
    } else if (game) {
      req.game = game;
    } else {
      req.randomGame = randomGame[0];
    }
    next();
  } catch (err) {
    next(err);
  }
};

// *** [ Function To Validate That The Body Given Fits Schema Of Games Table ] *** //
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

// *** [ Exports ] *** //
module.exports = {
  validateId,
  validateBody,
};
