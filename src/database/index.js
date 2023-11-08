import {DATABASE_NAME} from '../constants.js'
import  mysql from  'mysql';

const database = async ()=>{ 
    try {
      const connectionReponse =  await mysql.createConnection({
            host:process.env.HOST,
            user:process.env.USER,
            password:process.env.PASSWORD,
            database:DATABASE_NAME
        });
        console.log(`mysql Connected!`,connectionReponse);
    } catch (error) {
        console.log('Connection-error:',error)
    }
   
}
export default database;
// getting host,user,password from .env,databasename from contants only for learning we add dabasename in contans.