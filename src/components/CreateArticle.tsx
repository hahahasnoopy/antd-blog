import React, { Component } from 'react'
import Axios from 'axios';
import { notification } from 'antd';
import {actions,actionNames} from '../actions'
import { StoreState, ArticleType } from '../../types';
import Article from './Article';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ValidInputElement } from 'antd/lib/auto-complete';


export class CreateArticle extends Component {

  allTags:string[] = []

  getTags = ()=>{ //获取所有的tag
    Axios.get('/admin/tags/allTags').then(
      res =>{
        const tags:string[] = res.data.map((tag:{name:string})=>{
          return tag.name
        })
        this.setState(Object.assign({},this.state,{allTags:tags}))
      }
    )
  }

  handleContentChange = (content:string)=>{
    this.setState(Object.assign({},this.state,{content}))
  }

  handleSelectChange = (tags:string[])=>{
     this.setState(Object.assign({},this.state,{tags}))
  }

  saveContent = ()=>{
    Axios.post('/admin/article/addArticle',{
      "title": "title1",
      "time": new Date(),
      ...this.state
    }).then(
      ()=>{
        notification.success({
          message:'提交成功'
        })
      }
    ).catch(
      err=>{
        notification.warn({
          message:`提交失败${err}`
        })
      }
    )
  }
    
  titleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    this.setState(Object.assign({},this.state,{title:e.target.value}))
  }
}

export function mapStateToProps({ editingArticle }: StoreState) {
  return {
    editingArticle
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    titleChange: (e:React.ChangeEvent<HTMLInputElement>) => dispatch(actions.setArticle({title:e.target.value})),
    contentChange: (e:React.ChangeEvent<HTMLInputElement>) => dispatch(actions.setArticle({content:e.target.value})),
    tagChange: (tag:string) => dispatch(actions.setArticle({tag:tag})),
    saveContent: () => dispatch(actions.setArticle()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);

