// *** [ Imports ] *** //
const router = require("express").Router();

const Users = require("./user-model");
const { validateId } = require("../middleware/user-middleware");
const { restricted } = require("../middleware/restricted-middleware");

// *** [ GET All Route ] *** //
router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// *** [ GET Specified Route ] *** //
router.get("/:id", restricted, validateId, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

// *** [ PUT Route ] *** //
router.put("/:id", restricted, validateId, async (req, res, next) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await Users.update(id, changes);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// *** [ DELETE Route ] *** //
router.delete("/:id", restricted, validateId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await Users.remove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// *** [ Exports ] *** //
module.exports = router;
