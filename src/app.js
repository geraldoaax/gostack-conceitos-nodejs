const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  console.time(logLabel);

  return next(); //proximo middleware

  console.timeEnd(logLabel);
}

app.get("/repositories", logRequests, (request, response) => {
  const { repositories } = request.query;

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project Not Found' })
  };

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;


  return response.json(project);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
