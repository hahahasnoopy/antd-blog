const {User}  = require('./modal');
const express = require('express') ;
const config = require('./config/config');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
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

app.use('/admin', require('./admin'))

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

app.post('/login',async(req,res)=>{
  const {username,password} = req.body
  const user = await User.findOne({
    username
  });
  if(!user){
    res.status(422).send({message:'user not exist'})
  }else{
    let md5 = crypto.createHash('md5');
    User.findOne({
      username,
      password:md5.update(password + config.MD5_SUFFIX).digest('hex')
    }).then(
      (info) =>{
        req.session.userInfo = info
        res.send({message:'login success'})
      }
    ).catch(
      () =>res.send({message:'invalid password'})
    )
  }
});

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send({message:'succeed'})
})

app.listen(3001,()=>{
  console.log("listening to http://localhost:3001")
});
