import React, { Component } from 'react'
import { Table, Button } from 'antd';
import { ArticleType } from '../../types';
import Axios from 'axios';

const columns = [
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
    render:()=><Button type ="primary">编辑</Button>
  }
]
export class AllArticle extends Component {
  state={
    allArticle:[]
  }
  componentDidMount(){
    this.getAllAriticle()
  }
  getAllAriticle(){
    Axios.get('/admin/article/allArticle').then(
      res=>this.setState(Object.assign({},this.state,{'allArticle':res.data}))
    )
  }
  render() {
    return (
      <div>
        <Table dataSource={this.state.allArticle} columns ={columns}
          rowKey={(article:ArticleType)=> article._id}
        ></Table>
      </div>
    )
  }
}

export default AllArticle
