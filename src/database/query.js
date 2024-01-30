import pool from './index.js';
const query = async (sql, values) => {
  return   new Promise((resolve,reject)=>{
      pool.query(sql,values,(err,result)=>{
         if(err){
          reject(result);
          return;
        }  
        resolve(result[0])
      })
    })

};

export default query ;
