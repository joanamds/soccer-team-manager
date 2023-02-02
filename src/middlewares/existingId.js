const teams = [
  {
    id: 1,
    nome: 'Clube de Regatas Vasco da Gama',
    sigla: 'CRVG',
  },
  {
    id: 2,
    nome: 'Clube Atlético Mineiro',
    sigla: 'CAM',
  },
];

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