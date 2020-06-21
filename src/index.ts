import "reflect-metadata";
import './config/env'
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";


createConnection()
  .then(() => console.log("Tudo certo"))
  .catch((error) =>
    console.log("Erro ao conectar ao banco de dados: " + error)
  );
const app = express();
app.use(bodyParser.json());
app.use(routes);
app.listen(process.env.PORT,()=>{
    console.log("Servidor rodando em http://localhost:3333")
});
