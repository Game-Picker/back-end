// *** [ Imports ] *** //
const Users = require("../users/user-model");

// *** [ Function To Validate That Id Given Is An Existing Id In Users Table ] *** //
const validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({
        message: `Cannot find user #${id}`,
      });
    } else {
      req.user = user;
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
