import {DATABASE_NAME} from '../constants.js'
import  mysql from  'mysql2';
const pool =   mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'SAVtech',
    database:DATABASE_NAME
})
pool.getConnection((err,con)=>{
    if(err)
    throw err;
    console.log('Database connected successfully');
    con.release()
})
export default pool;
// getting host,user,password from .env,databasename from contants only for learning we add databasename in contans.