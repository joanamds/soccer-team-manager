const fs = require('fs').promises;
const { join } = require('path');

const readTeamsFile = async () => {
  const path = 'files/teams.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const allTeams = async () => {
  const response = await readTeamsFile();
  return response.teams;
};

const getTeamById = async (id) => {
  const response = await readTeamsFile();
  return response.teams
    .find((team) => team.id === id);
};

module.exports = {
  allTeams, 
  getTeamById,
  readTeamsFile,
};