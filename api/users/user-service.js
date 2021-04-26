// *** [ Exports ] *** //
module.exports = {
  isValid,
};

// *** [ Function To Validate Incoming User Email & Password ] *** //
function isValid(user) {
  return Boolean(
    user.email && user.password && typeof user.password === "string"
  );
}
