const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

/**
 * Métodos HTTP
 *
 * GET: Buscar informação back-end
 * POST: Criar uma informação no Back-end
 * PUT/PATCH: Alterar uma informação no Bak-End PUT muitos / PATCH um especifico
 * DELETE: Deletar uma informação no back-end
 *
 */

/**
 * Tipos de parâmetros:
 *
 * Query params: filtros e paginação
 * Route Params: Identificar recursos (Atualizar / Deletar)
 * Request Body: Conteúdo na hora de criar ou editar um recurso
 *
 */

 /**
  * Middleware:
  * 
  * Interceptador de requisições que interromper totalmente a requisição ou altera dados da requisição
  */

const projects = [];

function logRequests(request, response, next){
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log('1')
  console.time(logLabel)

  next() // Proximo middleware
  
  console.log('2')
  console.timeEnd(logLabel)
}

function validateProjectId(request, response, next){
  const {id} = request.params
  if(!isUuid(id)){
    return response.status(400).json({ error: 'ID do projeto invalido.'})
  }
  return next()
}


app.use(logRequests)
app.use('/projects/:id', validateProjectId)



app.get("/", (request, response) => {
  const { title, owner } = request.query;

  return response.send(`Hello Word ${title} da ${owner}`);
});
app.get("/projects", /*logRequests,*/ (request, response) => {
  console.log('3')

  const { title } = request.query

  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects

  return response.json(
    results
    /* [ 
    'Projeto 1',
    'Projeto GET'
    ] */
  );
});
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(
    project
    /* [
    "Projeto 1",
    "Projeto POST",
    `title ${body.title} e o owner ${body.owner}`,
    ] */
  );
});
app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Projeto nao encontrado." });
  }

  const project = {
    id,
    title,
    owner,
  };
  projects[projectIndex] = project;

  return response.json(
    project
    /* ["Projeto 1", `Projeto PUT de ID = ${params.id}`] */
    );
});
app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Projeto nao encontrado." });
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("👌 Back-End Started!");
});
