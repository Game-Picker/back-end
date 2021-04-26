// *** [ Imports ] *** //
const router = require("express").Router();

const Developers = require("./developers-model");
const { restricted } = require("../middleware/restricted-middleware");
const { validateId } = require("../middleware/developers-middleware");

// *** [ GET All Route ] *** //
router.get("/", restricted, async (req, res, next) => {
  try {
    const developers = await Developers.find();
    res.status(200).json(developers);
  } catch (err) {
    next(err);
  }
});

// *** [ GET Specified Route ] *** //
router.get("/:id", restricted, validateId, (req, res, next) => {
  try {
    res.status(200).json(req.developer);
  } catch (err) {
    next(err);
  }
});

// *** [ POST Route ] *** //
router.post("/", async (req, res, next) => {
  const developer = req.body;

  try {
    const newDeveloper = await Developers.create(developer);
    res.status(201).json(newDeveloper);
  } catch (err) {
    next(err);
  }
});

// *** [ PUT Route ] *** //
router.put("/:id", restricted, validateId, async (req, res, next) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    const updatedDeveloper = await Developers.update(id, changes);
    res.status(200).json(updatedDeveloper);
  } catch (err) {
    next(err);
  }
});

// *** [ DELETE Route ] *** //
router.delete("/:id", restricted, validateId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedDeveloper = await Developers.remove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// *** [ Exports ] *** //
module.exports = router;
