import { ArticleType } from './../../types/index';
import { observable, action } from 'mobx';
export class articleStore{
    @observable 
    editingArticle:ArticleType = {
      _id:'',
      content:'',
      title:'this is a title',
      tags:[],
      author:'annoymous',
      createTime:'1960.0.0'
    }

    @action
    setArticle=(payload:object)=>{
      this.editingArticle = {...this.editingArticle,...payload}
    }
}

export default new articleStore()