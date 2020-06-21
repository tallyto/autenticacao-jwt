import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import {  Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getRepository(User).find({
    where: {
      email,
    },
  });

  if (user.length === 1) {
    if (await bcrypt.compare(password, user[0].password)) {
      const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET, {
        expiresIn: "1d",
      });

      const data = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        token,
      };

      return res.json(data);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await getRepository(User).find();
  return res.json(users);
};

export const saveUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await getRepository(User).find({
    where: {
      email,
    },
  });
  if (userExists) {
    return res.status(401).json({ message: "E-mail already registered" });
  }
  const passwordHash = await bcrypt.hash(password, 8);
  const user = await getRepository(User).save({
    name,
    email,
    password: passwordHash,
  });
  return res.json(user);
};
