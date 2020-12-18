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

  return next(); //proximo middleware

}

function validadeRepositorieID(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid Repositorie ID!' });
  }
  return next();
}

app.use(logRequests);
app.use('/projects/:id', validadeRepositorieID); //opcao para rotas

app.get("/repositories", (request, response) => {

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
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie Not Found' })
  };

  const repositorie = {
    id,
    title,
    url,
    techs
  };

  repositories[repositorieIndex] = repositorie;


  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie Not Found' })
  };

  repositories.splice(repositorieIndex, 1)
  return response.status(204).send();
});

app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie Not Found' })
  };


  const like = {
    id,
    // title,
    // url,
    // techs,
    likes
  };

  repositories[repositorieIndex] = like;

  return response.json(like);
});

module.exports = app;
