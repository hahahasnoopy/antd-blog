const {User}  = require('./modal');
const express = require('express') ;
const config = require('./config/config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());
app.use(cookieParser(config.SECRET));
app.use(session({
  secret:config.SECRET,
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:60*1000*30} // session 过期时间
}));
app.get('/',async(req,res)=>{
  res.send('hello')
});

app.get('/users',async(req,res)=>{
  const users = await User.find();
  res.send(users)
});

app.post('/register',async(req,res)=>{
  const user = await User.create({
  username: req.body.username,
  password: req.body.password
});
  res.send(user)
});
// const auth = async(req,res,next)=>{  //将token鉴定写成中间件的形式
//   const raw = req.headers.authorization.split(" ").pop()
//   const {id} = jwt.verify(raw,process.env.SECRET)
//   req.user = await User.findById(id)
//   next()
// }
app.post('/login',async(req,res)=>{
  const user = await User.findOne({
    username:req.body.username
  });
  if(!user){
    res.status(422).send({message:'user not exist'})
  }else{
    // if(bcrypt.compareSync(req.body.password, user.password)){
    //   const token = jwt.sign({
    //     id:String(user._id)
    //   },process.env.SECRET)
    //   res.send({message:'login success',token:token})
    // }else{
    //   res.send({message:'invalid password'})
    // }
  }
});

app.get('/profile',async(req,res)=>{
  res.send(req.user)
});

app.listen(3001,()=>{
  console.log("http://localhost:3001")
});
