/**
 * 标签管理操作
 * @type {createApplication|e|(() => Express)}
 */
const express = require('express');
const {Tags} = require('./modal');
const router =express.Router();

/**
 * 添加标签
 */
router.post('/addTag',(req,res)=>{
  const {name} = req.body;
  Tags.findOne({name}).then(
    tag=>{
      if (!tag){
        Tags.create({name});
        res.send({message:'add tag success'})
      } else {
        res.status(500).send({message:'tag already exists'})
      }
    }
  )
});

router.get('/delTag',(req,res)=>{
  const {name} = req.query;
  Tags.findOneAndDelete({name}).then(
    tag=>{
      if(!tag){
        res.status(500).send({message:'tag not found'})
      } else {
        res.send({message:'delete tag success'})
      }
    }
  )
});

module.exports = router;
