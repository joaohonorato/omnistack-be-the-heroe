const routes = require("express").Router();
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const SessionController = require("./controllers/SessionControlller");

routes.post("/sessions", SessionController.create);
routes.get("/ongs", OngController.list);
routes.post("/ongs", OngController.create);
routes.post("/incidents", IncidentController.create);
routes.get("/incidents", IncidentController.listAll);
routes.get("/incidents/ong", IncidentController.listByOng);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
