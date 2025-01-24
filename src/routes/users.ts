import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";

const router = Router();
let users: User[] = [];

const userValidationRules = [
  body("name").notEmpty().withMessage("User skal have et navn"),
  body("age").isNumeric().withMessage("Alder skal være et tal"),
];

router.get("/", userValidationRules, async (req: Request, res: Response) => {
  const response = await users;
  res.send(response);
});

router.post(
  "/",
  userValidationRules,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        const user: User = {
          id: users.length + 1,
          name: req.body.name,
          age: req.body.age,
        };
        users.push(user);
        res.status(201).json(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  userValidationRules,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await users.find((u) => u.id === parseInt(id + ""));

      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.json(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", userValidationRules, (req: Request, res: Response) => {});

router.delete(
  "/:id",
  userValidationRules,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      const { id } = req.params;
      const indexOfUser = users.findIndex((u) => u.id === parseInt(id + ""));

      if (indexOfUser === -1) res.status(404).send("User not found");
      else {
        users.splice(indexOfUser);
        res.status(204).send;
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
