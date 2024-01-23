// https://github.com/mswjs/msw/issues/1644#issuecomment-1750722052
import express from "express";
import cors from "cors";
import { createMiddleware } from "@mswjs/http-middleware";
import { handlers } from "./handlers";

const app = express();
const port = 9090;

app.use(express.json());
app.use(cors({ origin: "localhost:3000" }));
app.use(createMiddleware(...handlers));

app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
