import React, { Component } from 'react'
import { Table } from 'antd';
import axios from 'axios'
import { UserType } from './types/index'
const columns = [
{
  title:'ID',
  dataIndex:'_id',
  key:'_id',
},
{
  title:'用户名',
  dataIndex:'username',
  key:'username',
},
{
  title:'密码',
  dataIndex:'password',
  key:'password'
}
]
export class User extends Component {

  state = {
    UsersData:[]
  }

  componentDidMount(){
    this.getUsers()
  }

  getUsers = () =>{
    axios.get('/users').then(
      res => this.setState({
        UsersData:res.data
      })
    )
  }

  render() {
    return (
      <div>
        <Table dataSource = {this.state.UsersData} columns = {columns} 
          rowKey = {(record:UserType,index:number)=>record._id}></Table>
      </div>
    )
  }
}

export default User
