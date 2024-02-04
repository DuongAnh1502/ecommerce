import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";
interface ResType {
    req: Request;
    res: Response;
}
const app: Express = express();

app.use(express.json());
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
    log: ["query"],
});
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("Server is running on port 7777");
    console.log("http://localhost:7777");
});
