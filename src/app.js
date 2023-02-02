// src/app.js
const express = require('express');

const app = express();
const apiCredentials = require('./middlewares/apiCredentials');

const validateTeam = require('./middlewares/validateTeam');

const existingId = require('./middlewares/existingId');

const teams = require('./teams');

app.use(apiCredentials);
app.use(express.json());

app.get('/teams', async (req, res) => res.json(await teams.allTeams()));

app.get('/teams/:id', existingId, async (req, res) => {
  const id = Number(req.params.id);
  const team = await teams.getTeamById(id);
  res.json(team);
});

// arranja os middlewares para chamar validateTeam primeiro
app.post('/teams', validateTeam, async (req, res) => {
  const getAllTeams = await teams.allTeams();
  if (
    !req.teams.getAllTeams.includes(req.body.sigla)
    && teams.every((t) => t.sigla !== req.body.sigla) 
  ) {
    return res.status(422).json({ message: 'Já existe um time com essa sigla' });
  }
  let { nextId } = getAllTeams;
  const team = { id: nextId, ...req.body };
  getAllTeams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

app.put('/teams/:id', validateTeam, existingId, async (req, res) => {
  const id = Number(req.params.id);
  const team = await teams.getTeamById(id);
  const teamsGroup = await teams.allTeams();
  const index = teamsGroup.indexOf(team);
  const updated = { id, ...req.body };
  teamsGroup.splice(index, 1, updated);
  res.status(201).json(updated);
});

app.delete('/teams/:id', existingId, async (req, res) => {
  const id = Number(req.params.id);
  const team = await teams.getTeamById(id);
  const teamsGroup = await teams.allTeams();
  const index = teamsGroup.indexOf(team);
  teamsGroup.splice(index, 1);
  res.sendStatus(204);
});

module.exports = app;
