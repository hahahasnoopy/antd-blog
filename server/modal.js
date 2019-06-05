const mongoose = require('mongoose');
const bcrypt  = require('bcryptjs');
mongoose.connect('mongodb://localhost:27017/express_demo',
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
).then(value =>
  console.log('数据库连接成功')
)
.catch(err=>
  console.log(err, '数据库连接失败')
);

const User = mongoose.model('User',new mongoose.Schema({
  username:{type: String,unique:true},
  password:{type: String,set(val){
    return bcrypt.hashSync(val,10)
  }},
}));

const Article = mongoose.model('Article',new mongoose.Schema({
  title:{type:String}, // 文章标题
  content:{type:String}, // 文章内容
  viewContent:{type:String}, // 浏览次数
  time:{type:String}, // 发表时间
  author:{type:String}, // 作者
  tags:{type:Array}, // 标签
}));

const Tags = mongoose.model('Tags',new mongoose.Schema({
  name:String
}));

module.exports = {User, Article, Tags};
