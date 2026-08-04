import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: "public" });
});

app.use('/js', express.static("dist"));
app.use('/styles', express.static("public/css"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
