const request = require('supertest');
const express = require('express');
const storiesRouter = require('../stories/stories.router');
const { ListStories, insertStory } = require('../stories/stories.service');

const apptest = express();
apptest.use("/stories", storiesRouter);

jest.mock('../stories/stories.service');

describe('stories router test',() => {
  it('GET stories with privacy - success',  async () => {
    ListStories.mockImplementationOnce((request) => {
      return [{
        launch_date: '2011-07-30',
        title: 'test_story1',
        privacy: 'public',
        likes: 99
      }];
    });
    const body = await request(apptest).get('/stories/privacy/public/likes/20');
    expect(JSON.parse(body.text)).toEqual([{
      launch_date: '2011-07-30',
      title: 'test_story1',
      privacy: 'public',
      likes: 99
    }]);
  });

  it('GET stories with privacy - empty data condition did not match',  async () => {
    ListStories.mockImplementationOnce((request) => {
      return [];
    });
    const body = await request(apptest).get('/stories/privacy/public/likes/20');
    expect(JSON.parse(body.text)).toEqual([]);
  });

  it('POST create a story - success',  async () => {
    request.body = {
      launch_date: '2011-07-30',
      title: 'test_story1',
      privacy: 'public',
      likes: 99
    };
    insertStory.mockImplementationOnce((request) => {});
    const res = await request(apptest).post('/stories/story');
    expect(res.status).toEqual(200);
  });
});