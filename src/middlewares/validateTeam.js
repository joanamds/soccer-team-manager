const validateTeam = (req, res, next) => {
  const requiredProperties = ['nome', 'sigla'];
  if (requiredProperties.every((property) => property in req.body)) {
    next(); // chama o próximo middleware
  } else {
    res.sendStatus(400); // ou já responde avisando que deu erro
  }
};

module.exports = validateTeam;