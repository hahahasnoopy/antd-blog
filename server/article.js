/**
 * 文章管理操作
 */
const express = require('express');
const {Article,Tags} = require('./modal');
const router =express.Router();

/**
 * 添加文章
 */
router.post('/addArticle',async (req,res)=>{
  const { title,content,time,tags } = req.body;
  const author = process.env.NODE_ENV ==='development'?'hahahasnoopy':req.session.userInfo.username;
  const viewCount = 0;
  console.log(tags)
  tags.forEach(tag=>  //判断tag是否存在，没有就加入添加新的tag
    {
      Tags.findOne({name:tag}).then(
        val =>{
          if(!val){
            console.log('saving')
            Tags.create({name:tag})
          }
        }
      )
    }
  );
  new Article({
    title,content,time,tags,author,viewCount
  }).save().then(
    ()=>{
      res.send({message:'add article success'})
    }
  ).catch(
    err=>{
      res.status(500).send({message:'add article failed',err})
    }
  )
});

router.post('/updateArticle',async (req,res)=>{
  const { title,content,time,tags,id } = req.body;
  Article.findOneAndUpdate({_id:id},{title,content,time,tags}).then((article)=>{
    if(!article){
      res.status(500).send({message:'not a valid id'})
    }
    res.send({message:'update success'})
  })
});

router.get('/delArticle',(req,res)=>{
  const id = req.query.id;
  if(!id){
    res.status(500).send({message:'id is required'})
  }
  Article.findByIdAndDelete(id).then(
    (article)=>{
      if(!article){
        res.status(500).send({message:'article not exist'})
      }
      res.send({message:'delete completed'})
    }
  ).catch(
    err=>res.status(500).send(err)
  )
});

module.exports = router;
