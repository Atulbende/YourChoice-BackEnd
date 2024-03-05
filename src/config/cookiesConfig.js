export const  CookiesOptions={
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'none', //cross-site cookie 
    maxAge: 28 * 24 * 60 * 60 //cookie expiry: set to match rT
}