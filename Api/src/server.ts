import express, { Express } from "express";
import cors from "cors";
import { basicAuth } from "./middlewares/basic-auth";
import autenticacaoRoutes from "./routes/autenticacao";
import usuariosRoutes from "./routes/usuarios";
import eventosRoutes from "./routes/eventos";

let server: Express = express();
let port: number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());
server.use(autenticacaoRoutes);
server.use(usuariosRoutes);
server.use(eventosRoutes);


export default {
  start() {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  },
};
