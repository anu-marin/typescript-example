import { Request } from 'express';
import { Story as StoryInterface } from './story.interface';
//const Stories = require('../models/Stories');
import { Stories, findStories } from '../models/Stories';

/* Services */
export const insertStory = async (record: StoryInterface) => {
  try {
      await Stories.create({
        launch_date: record.launch_date,
        title: record.title,
        privacy: record.privacy,
        likes: record.likes
    });
  } catch (error) {
    console.log('Error creating the record', error);
    //throw error;
  }
};


//list stories with params `privacy` and `likes` gt minlikes  
export const ListStories = async (req: Request): Promise<any> => {
  try {
    return await findStories(req);
  } catch (error) {
    console.log('Error reading the records from model', error);
    throw error;
  }
};