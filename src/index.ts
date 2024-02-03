import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
interface ResType {
    req: Request;
    res: Response;
}
const app: Express = express();

app.get("/", ({ req, res }: ResType) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log("Server is running on port 5555");
    console.log("http://localhost:5555");
});
