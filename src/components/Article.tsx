import React, { Component } from 'react'
// @ts-ignore
import Editor from 'for-editor'
import Axios from 'axios';
import { notification, Select, Input, Row, Col } from 'antd';
import {connect} from "react-redux"
import { StoreState, ArticleType } from '../../types';
import { Dispatch } from 'redux';
import { actions } from 'actions';
import { HtmlAttributes } from 'csstype';

const {Option}  = Select

interface Props{
  editingArticle:ArticleType,
  titleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  contentChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  tagChange:(value:string)=>void,
  saveContent:(e:React.ChangeEvent<HTMLInputElement>)=>void, //保存正在输入的文章
  allTags:string[]
}

export default function Article ({editingArticle,titleChange,tagChange,contentChange,allTags,saveContent}:Props) {
  return (
    <div>
      <Row gutter = {16} style ={{marginBottom:'10px'}}>
        <Col span={6}>
          文章标题：
          <Input onChange={titleChange} value = {editingArticle.title} style={{width:'70%'}}></Input>
        </Col>
        <Col span={6}>
          标签选择：
          <Select mode="tags" placeholder="choose a tag"
            onChange={tagChange}
            style={{width:'70%'}}
          >
          {allTags.map(tag =>{
            return <Option key={tag}>{tag}</Option>
          })}
          </Select>
        </Col>
      </Row>
      <Editor value={editingArticle.content} onChange={contentChange}
        onSave={saveContent}
      ></Editor>
    </div>
  )
}