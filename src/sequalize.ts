import { Sequelize} from 'sequelize';

/**
 * TODO: Implement secrets to store the credentials
 */

 export const sequelize =  new Sequelize({
  database: 'test_mysql',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  username: 'root',
  password: '',
});
