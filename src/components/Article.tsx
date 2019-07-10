import React, { Component, useEffect } from 'react'
// @ts-ignore
import Editor from 'for-editor'
import Axios from 'axios';
import { notification, Select, Input, Row, Col } from 'antd';
import { observer, inject } from "mobx-react"
import { articleStore } from 'stores/articleStore';
import { RouteComponentProps } from 'react-router';

const {Option}  = Select

export interface articleProps extends RouteComponentProps{
  articleStore:articleStore
}

const Article = inject('articleStore')(observer(
  (props:articleProps)=> {
    const {editingArticle} = props.articleStore
    const {setArticle}  = props.articleStore

    function saveContent(){
      Axios.post('/admin/article/addArticle',{
        "time": new Date(),
        ...editingArticle
      }).then(
        ()=>{
          notification.success({
            message:'提交成功'
          })
        }
      )
    }
    // useEffect 第二个参数为空数组表示只运行一次，如果有内容表示在该内容改变时也运行
    useEffect(()=>{
      Axios.get('/admin/tags/allTags').then(res=>{
        setArticle({tags:res.data.map((tag:{name:string})=>{
          return tag.name
        })})
      })
    },[setArticle])

    return (
    <div>
      <Row gutter = {16} style ={{marginBottom:'10px'}}>
        <Col span={6}>
          文章标题：
          <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setArticle({title:e.target.value})}} value = {editingArticle.title} style={{width:'70%'}}></Input>
        </Col>
        <Col span={6}>
          标签选择：
          <Select mode="tags" placeholder="choose a tag"
            defaultValue = {editingArticle.tags}
            onChange={(val:string)=>setArticle({tags:val})}
            style={{width:'70%'}}
          >

          {editingArticle.tags.map(tag =>{
            return <Option key={tag}>{tag}</Option>
          })}
          </Select>
        </Col>
      </Row>

      <Editor value={editingArticle.content} onChange={(value:string)=>setArticle({content:value})}
        onSave={saveContent}
      ></Editor>
    </div>
  )
}
)
)

export default Article