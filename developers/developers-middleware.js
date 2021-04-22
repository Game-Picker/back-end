// *** [ Imports ] *** //
const Developers = require("./developers-model");

// *** [ Function To Validate That Id Given Is An Existing Id In Developers Table ] *** //
const validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const developer = await Developers.findById(id);
    if (!developer) {
      res.status(404).json({
        message: `Cannot find developer #${id}`,
      });
    } else {
      req.developer = developer;
      next();
    }
  } catch (err) {
    next(err);
  }
};

// *** [ Exports ] *** //
module.exports = {
  validateId,
};
