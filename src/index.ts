import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import rootRouter from "./routes";
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

app.listen(PORT, () => {
    console.log("Server is running on port 5555");
    console.log("http://localhost:5555");
});
