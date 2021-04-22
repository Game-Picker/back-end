// *** [ Router Declaration ] *** //
const router = require("express").Router();

// *** [ Function To Get Time API Was Accessed ] *** //
const getDate = (timeElapsed) => {
  const today = new Date(timeElapsed);
  return today;
};

// *** [ API Landing Route ] *** //
router.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Postgres Game Picker API Documentation</h1>
    <ul>
        <li>Base URL: https://gamers-choice.herokuapp.com/</li>
    </ul>
    <br />
    <h3>Authentication:</h3>
    <ul>
        <li>Post - /auth/register</li>
        <li>Post - /auth/login</li>
    </ul>
    <br />
    <h3>Users:</h3>
    <ul>
        <li>Get - /api/users - Gets all user profiles (Protected)</li>
        <li>Get - /api/users/:id - Gets a specified user profile (Protected)</li>
        <li>Put - /api/users/:id - Updates a specified user's profile (Protected)</li>
        <li>Delete - /api/users/:id - Deletes a specified user's profile (Protected)</li>
    </ul>
    <br />
    <h3>Video Games:</h3>
    <ul>
        <li>Get - /api/games - Gets all the games</li>
        <li>Get - /api/games/:id - Gets a specified game</li>
        <li>Post - /api/games - Creates a new game (Protected)</li>
        <li>Put - /api/games/:id - Updates a specified game (Protected)</li>
        <li>Delete - /api/games/:id - Deletes a specified game (Protected)</li>
    </ul>
    <p>Time Accessed: ${getDate(Date.now())}</p>
  `);
});

// *** [ Exports ] *** //
module.exports = router;
