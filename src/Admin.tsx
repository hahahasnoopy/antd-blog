import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './Admin.css'
import {Link, Route, Switch} from "react-router-dom";
import DashBoard from './DashBoard';
import User from './User';
import Article from './Article';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Sider, Content } = Layout;

interface Props {
  name:String
}
const initialState = { collapsed:false };
type State =  Readonly<typeof initialState>

class Sidebar extends React.Component<Props,State> {
  state = initialState;
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  };


  render(){
    return(
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className='logo'/>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key ='1'>
              <Link to={'/admin'}/>
              <Icon type = 'user'/>
              <span>Dashboard</span>
            </Menu.Item>
            <SubMenu
              key='sub1'
              title = {
                <span>
                  <Icon type = 'book'/>
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key ='sub1-1'>
                <Link to={'/admin/article'}/>
                <Icon type = 'video-camera'/>
                <span>增加文章</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key ='3'>
              <Link to={'/admin/user'}/>
              <Icon type = 'google'/>
              <span>用户管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path='/admin' component = {DashBoard}/>
              <Route path='/admin/article' component = {Article}/>
              <Route path='/admin/user' component = {User}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default Sidebar
