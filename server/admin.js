const express = require('express');
const router = express.Router();
const {User} = require('./modal');

router.use((req,res,next)=>{ //鉴权中间件
  if(req.session.userInfo||process.env.NODE_ENV === 'development'){
    next()
  }else{
    res.status(440).send({message:'login expired'})
  }
});

router.use('/article',require('./article'));
router.use('/tags',require('./tag'));

module.exports = router;
