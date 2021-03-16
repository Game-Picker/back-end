const router = require("express").Router();

const Developers = require("./developers-model");
const restricted = require("../auth/restricted-middleware");
const { validateId } = require("./developers-middleware");

router.get("/", async (req, res, next) => {
  try {
    const developers = await Developers.find();
    res.status(200).json(developers);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateId, (req, res, next) => {
  res.status(200).json(req.developerRequested);
});

router.post("/", async (req, res, next) => {
  const developer = req.body;

  try {
    const newDeveloper = await Developers.create(developer);
    res.status(201).json(newDeveloper);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateId, async (req, res, next) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    const updatedDeveloper = await Developers.update(id, changes);
    res.status(200).json(updatedDeveloper);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedDeveloper = await Developers.remove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    error: err,
  });
});

module.exports = router;
