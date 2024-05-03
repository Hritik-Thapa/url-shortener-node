const users = require("../models/user");
const {setUser}=require('../service/userAuth')

async function handleRegister(req, res) {
  const { name, email, password } = req.body;
  console.log(name)
  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing fields" });
  await users.create({
    name,
    email,
    password,
  });
  return res.redirect("http://localhost:9999/");
}

async function handleLogin(req,res){
  const {email,password}=req.body;

  const user= await users.findOne({email,password})

  if(!user)return res.render('login',{error:'Invalid username or password'});

  const token =setUser(user);
  res.cookie('uid',token);
  return res.redirect('http://localhost:9999')

}

module.exports = { handleRegister,handleLogin };
