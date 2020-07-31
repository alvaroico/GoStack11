const express = require("express");

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




app.get("/", (request, response) => {
  const { title, owner} = request.query;

  return response.send(`Hello Word ${title} da ${owner}`);
});
app.get("/projects", (request, response) => {
  return response.json([ 
    'Projeto 1',
    'Projeto GET'
  ]);
});
app.post("/projects", (request, response) => {
  const body = request.body
 
  return response.json([ 
    'Projeto 1',
    'Projeto POST',
    `title ${body.title} e o owner ${body.owner}`
  ]);
});
app.put("/projects/:id", (request, response) => {
  const params = request.params;
  
  return response.json([ 
    'Projeto 1',
    `Projeto PUT de ID = ${params.id}`
  ]);
});
app.delete("/projects/:id", (request, response) => {
  return response.json([ 
    'Projeto 1',
    'Projeto DELETE de ID = '
  ]);
});

app.listen(3333, () => {
  console.log('👌 Back-End Started!')
});
