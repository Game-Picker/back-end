const router = require("express").Router();

const Games = require("./vg-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Games.find()
    .then((games) => {
      res.status(200).json(games);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Games.findById(id)
    .then((game) => {
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json({
          message: `Cannot find game #${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    });
});

router.post("/", restricted, (req, res) => {
  const newGame = req.body;
  Games.create(newGame)
    .then((game) => {
      res.status(201).json(game);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Games.findById(id)
    .then((game) => {
      if (game) {
        return Games.update(id, changes)
          .then((change) => {
            res.status(200).json(change);
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
              stack: err.stack,
            });
          });
      } else {
        res.status(404).json({
          message: `Cannot find game #${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Games.remove(id)
    .then((game) => {
      if (game) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: `Cannot find game #${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    });
});

module.exports = router;
