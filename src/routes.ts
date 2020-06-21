import { Router } from "express";
import { saveUser, listUsers, login } from "./controller/UserController";
import { auth } from "./middlewares/auth";

const routes = Router();

routes.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

routes.post("/session", login);
routes.post("/users", saveUser);

routes.use(auth);
routes.get("/users", listUsers);

export default routes;
