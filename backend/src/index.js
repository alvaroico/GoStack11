const express = require("express");

const app = express();

/**
 * Métodos HTTP
 * 
 * GET: Buscar informação back-end
 * POST: Criar uma informação no Back-end
 * PUT/PATCH: Alterar uma informação no Bak-End PUT muitos / PATCH um especifico
 * DELETE: Deletar uma informação no back-end
 * 
 */

app.get("/", (request, response) => {
  return response.send("Hello Word");
});
app.get("/projects", (request, response) => {
  return response.json([ 
    'Projeto 1',
    'Projeto GET'
  ]);
});
app.post("/projects", (request, response) => {
  return response.json([ 
    'Projeto 1',
    'Projeto POST'
  ]);
});
app.put("/projects/:id", (request, response) => {
  return response.json([ 
    'Projeto 1',
    'Projeto PUT de ID = '
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
