/* External Modules */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
const storiesRouter = require("./stories/stories.router");
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";
import { sequelize } from './sequalize';

dotenv.config();

(async () => {
  await sequelize.sync({ force: false });
})();

const app = express();

/* Configuration */
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/stories", storiesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;