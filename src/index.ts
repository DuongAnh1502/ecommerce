import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
interface ResType {
    req: Request;
    res: Response;
}
const app: Express = express();

app.listen(PORT, () => {
    console.log("Server is running on port 5555");
    console.log("http://localhost:5555");
});

app.use("/api", rootRouter);
