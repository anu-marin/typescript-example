const fileload = require('../util/fileload');
const StoriesService = require('../stories/stories.service');
const inputPath = require('path');
const file = inputPath.join(__dirname, '../../examples/stories.csv');

jest.mock('../stories/stories.service');

afterEach(() => {
  jest.clearAllMocks();
});

describe("File util test suite",() =>{
  it('should parse lines from the csv file',  () => {
    const fileData = "2011-07-31,Story1,public,99";
    const records = fileload.parseFileData(fileData);
    if(records !== null) {
      expect(records[0]).toEqual('2011-07-31');
      expect(records[1]).toEqual('Story1');
      expect(records[2]).toEqual('public');
      expect(records[3]).toEqual('99');
    }
  });

  it('should read the file',  async () => {
    const mockFn = StoriesService.insertStory.mockImplementationOnce(() => {});
    await fileload.readStoriesFile(file);
    expect(mockFn).toHaveBeenCalledTimes(356);
  });

  it('should not call updateDataStore()', () => {
    const mockFn = StoriesService.insertStory.mockImplementationOnce(() => {});
    const story = [ 'launch_date', 'Story1', 'public', '99' ];
    fileload.updateDataStore(story);
    expect(mockFn).not.toHaveBeenCalled();

  });

  it('should call updateDataStore()', () => {
    const mockFn = StoriesService.insertStory.mockImplementationOnce(() => {});
    const items = [ '2011-07-31', 'Story1', 'public', '99' ];
    fileload.updateDataStore(items);
    expect(mockFn).toHaveBeenCalled();

  });

  it('file exist test', () => {
    const fileExist = fileload.checkFileExist(file);
    expect(fileExist).toBeTruthy();
  }); 

  it('file does not exist test', () => {
    const fileExist = fileload.checkFileExist(file+'c');
    expect(fileExist).not.toBeTruthy();
  }); 

});