const {getUser}=require("../service/userAuth");

async function loginAuth(req,res,next){
    const userUid=req.cookies?.uid;
    if (!userUid) return res.redirect('/login');

    const user=getUser(userUid);
    if(!user)return res.redirect('/login');

    req.user=user;
    console.log(`userUid ${userUid}`);
    next();
}


async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid;

    const user=getUser(userUid);

    req.user=user;

    next();
}



module.exports={loginAuth,checkAuth}