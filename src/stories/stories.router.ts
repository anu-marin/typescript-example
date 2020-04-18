import express, { Request, Response } from "express";
const StoryService = require("./stories.service");
import { Stories } from "./stories.interface";

/* Router */
const storiesRouter = express.Router();

// GET stories with privacy='public/private' AND likes > minlikes
storiesRouter.get('/privacy/:privacy/likes/:minlikes', async (req: Request, res: Response) => {
  try {
    const stories: Stories = await StoryService.ListStories(req);
    res.status(200).send(stories);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// POST insert story record
storiesRouter.post('/story', async (req: Request, res: Response) => {
  try {
    await StoryService.insertStory(req.body);
    res.status(200).send('Story created successfully');
  } catch (e) {
    res.status(404).send(e.message);
  }
}); 

module.exports = storiesRouter;

