const Users = require("./user-model");

const validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (!user) {
      res.status(404).json({
        message: `Cannot find user #${id}`,
      });
    } else {
      req.userRequested = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateId,
};
