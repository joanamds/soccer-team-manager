const teams = require('../teams');

module.exports = async function existingId(req, res, next) {
  const id = Number(req.params.id);
  const getAllTeams = await teams.allTeams();
  const getTeam = getAllTeams.some((t) => t.id === id);
  if (!getTeam) {
    res.sendStatus(404).json({ message: 'Time não encontrado' });
  } else {
    next();
  }
};
