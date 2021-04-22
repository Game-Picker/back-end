// *** [ Imports ] *** //
const router = require("express").Router();

const Games = require("./vg-model");
const { validateId, validateBody } = require("./vg-middleware");
const restricted = require("../auth/restricted-middleware");

// *** [ GET All Route ] *** //
router.get("/", async (req, res, next) => {
  try {
    const games = await Games.find();
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
});

// *** [ Get Specified Or Random Route ] *** //
router.get("/:id", validateId, async (req, res, next) => {
  try {
    if (req.randomGame) {
      res.status(200).json(req.randomGame);
    } else {
      res.status(200).json(req.game);
    }
  } catch (err) {
    next(err);
  }
});

// *** [ POST Route ] *** //
router.post("/", restricted, validateBody, async (req, res, next) => {
  const newGame = req.body;

  try {
    const game = Games.create(newGame);
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
});

// *** [ PUT Route ] *** //
router.put("/:id", restricted, validateId, async (req, res, next) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    const updatedGame = await Games.update(id, changes);
    res.status(200).json(updatedGame);
  } catch (err) {
    next(err);
  }
});

// *** [ DELETE Route ] *** //
router.delete("/:id", restricted, validateId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedGame = await Games.remove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// *** [ Exports ] *** //
module.exports = router;
