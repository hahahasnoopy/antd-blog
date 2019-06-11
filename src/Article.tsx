import React, { Component } from 'react'
import Editor from 'for-editor'
import Axios from 'axios';
import { notification, Select } from 'antd';
const {Option}  = Select

interface iState {
  content:string,
  tags:string[],
  allTags:[]
}

export class Article extends Component {

  allTags:string[] = []

  state:iState = {
    content: '',
    tags: [],
    allTags: []
  }

  componentDidMount(){
    this.getTags()
  }

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


  render() {
    return (
      <div style = {{paddingBottom:'20px'}}>
        标签选择：<Select mode="tags" placeholder="choose a tag"
          onChange={this.handleSelectChange}
          style={{width:'30%',marginBottom:'10px'}}
        >
        {this.state.allTags.map(tag =>{
          return <Option key={tag}>{tag}</Option>
        })}
        </Select>
        <Editor value={this.state.content} onChange={this.handleContentChange}
          onSave={this.saveContent}
        ></Editor>

      </div>
    )
  }
}

export default Article
