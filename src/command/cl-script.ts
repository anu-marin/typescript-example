import { sequelize } from '../sequalize';
import { readStoriesFile, checkFileExist } from '../util/fileload';

const myArgs = process.argv.slice(2);
const fileName = myArgs[0];

!checkFileExist(fileName)?process.exit():null;

(async () => {
  await sequelize.sync({ force: false });
})();
readStoriesFile(fileName);
