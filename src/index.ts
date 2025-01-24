import express, { Router, Request, Response, NextFunction } from "express";
import userRoutes from "./routes/users";

const app = express();
const errorHandler = require("./errors/errors");
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler);

app.get(
  "/",
  [
    (req: Request, res: Response, next: NextFunction) => {
      console.log(2);
      // res.send('Hej');  fyfy
      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      next();
      console.log(3);
    },
  ],
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
    next();
  }
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log(1);
});

//error handleren
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Skidt er sket");
  res.status(404).send("Skidt er sket");
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost${port}`);
});
