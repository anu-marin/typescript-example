const sinon = require('sinon');
const StoryService = require('../stories/stories.service');
const storiesModel = require('../models/Stories')

let mockReq = {};
beforeEach(() => {
  sinon.stub(storiesModel, 'findStories').callsFake(() => {
    return [{
      launch_date: '2011-07-30',
      title: 'test_story1',
      privacy: 'public',
      likes: 99
    }];
  });
});

afterEach(() => {
  sinon.restore();
});
describe('stories router test',() => {
  it('should get stories with privacy=public and likes gt 20', async () => {
    mockReq = {
      params: {
        privacy:'public',
        likes: 20
      }
    };
    const stories = await StoryService.ListStories(mockReq);
    expect(stories[0].title).toEqual('test_story1');
    expect(stories[0].privacy).toEqual('public');
    expect(stories[0].likes).toBeGreaterThan(20);
  });
});