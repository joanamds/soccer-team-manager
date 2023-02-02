const readTeamsFile = require('../teams');

const teams = readTeamsFile();

const existingId = (req, res, next) => {
  const id = Number(req.params.id);
  const getTeam = teams.some((t) => t.id === id);
  if (getTeam) {
    next();
  } else {
    res.sendStatus(404);
  }
};

module.exports = existingId;