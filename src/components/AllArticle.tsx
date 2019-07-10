import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { ArticleType } from '../../types';
import Axios from 'axios';
import { inject, observer } from 'mobx-react';
import { articleProps } from './Article';
import { ColumnProps } from 'antd/lib/table';


const AllArticle =inject('articleStore')(observer((props:articleProps)=>{
  const {history} = props
  const {setArticle} = props.articleStore
  const columns:ColumnProps<ArticleType>[] = [
    {
      title:'ID',
      dataIndex:'_id',
      key:'_id',
    },
    {
      title:'标题',
      dataIndex:'title',
      key:'title',
    },
    {
      title:'内容',
      dataIndex:'content',
      key:'content',
    },
    {
      title:'标签',
      dataIndex:'tags',
      key:'tags',
    },
    {
      title:'作者',
      dataIndex:'author',
      key:'author',
    },
    {
      title:'操作',
      dataIndex:'',
      key:'x',
      render:(text,record,index)=><Button type="primary" onClick = {()=>edit(record)} >编辑</Button>
    }
  ]

  const edit = function(record:ArticleType){
    setArticle({...record})
    history.push('/admin/article')
  }
  const [allArticle, setAllArticle] = useState([])
  useEffect(() => {
    Axios.get('/admin/article/allArticle').then(
      res=>setAllArticle(res.data)
      )
    }, [])

  return (
    <div>
      <Table dataSource={allArticle} columns ={columns}
        rowKey={(article:ArticleType)=> article._id}
      ></Table>
    </div>
  )
}))

export default AllArticle
