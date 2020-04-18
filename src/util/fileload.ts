const fs = require('fs');
const readline = require('readline');
import { Story as StoryInterface } from '../stories/story.interface';
const StoryService = require("../stories/stories.service");

export const readStoriesFile = async (file: string) => {
  try {
    const fileStream = fs.createReadStream(file, 'utf8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      const records: RegExpMatchArray|null = parseFileData(line);
      records !== null ? updateDataStore(records):null;
    }
  } catch (err) {
    console.error('Error occurred while reading the file', err);
    process.exit();
  }
}

export const parseFileData = (data: string): RegExpMatchArray|null => {
  const csvRegex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
  return data.match(csvRegex);  
}

export const updateDataStore = (items: Array<string>) => {

  if(items[0] !== 'launch_date') {
    const story:StoryInterface = {
      launch_date: new Date(items[0]),
      title: items[1],
      privacy: items[2],
      likes: parseInt(items[3])
    };
    StoryService.insertStory(story);
  }
}
export const checkFileExist = (filename: string):boolean => {
  if (!fs.existsSync(filename)) {
    console.error('File does not exist');
    return false;
  }
  return true;
}