import {DATABASE_NAME} from '../constants.js'
import  mysql from  'mysql2';
const pool =   mysql.createPool({
    connectionLimit:10,
    host:'127.0.0.1',
    user:'root',
    password:'SAVtech',
    database:DATABASE_NAME
})
pool.getConnection((err,con)=>{
    con.release()
})
export default pool;
// getting host,user,password from .env,databasename from contants only for learning we add databasename in contans.