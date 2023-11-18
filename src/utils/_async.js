const _async=(RequestFuntion)=>{
    (res,req,next)=>{
     Promise.resolve(RequestFuntion(res,req,next)).catch((err)=> next(err));
    }
}
export {_async}