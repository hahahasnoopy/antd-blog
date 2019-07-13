import React, { useState, useEffect } from 'react'
import enquire from 'enquire.js'
import { Menu, Icon, Row, Col, Button, Modal, Input } from 'antd';
import { MenuMode } from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import './header.css'
export default function Header() {
  const [menuMode, setmenuMode] = useState<MenuMode>('horizontal')
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    enquire.register('only screen and (min-width: 320px) and (max-width: 1024px)',{
      match:()=>{
        setmenuMode("inline")
      },
      unmatch:()=>{
        setmenuMode('horizontal')
      }
    })
  }, [])
  const loggedIn = false
  const isMobile = menuMode=="horizontal"
  const submit = ()=>{
    //数据校验
    // 提交登陆数据
    //todo

  }
  const loginModal = 
  <Modal
    title="登录"
    visible={showLogin}
    onOk={submit}
    onCancel={()=>setShowLogin(false)}
  >
     <Input
        style={{ marginBottom: 20 }}
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        name="username"
        placeholder="请输入用户名"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
     <Input
        style={{ marginBottom: 20 }}
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        name="password"
        placeholder="请输入密码"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
  </Modal>
  const menu = 
    <Menu mode={menuMode} id='nav'>
      <Menu.Item key="home">
        <Link to={'/'}>
          <Icon type="home"/>
          <span>首页</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="admin">
        <Link to={'/admin'}>
          <Icon type="database"></Icon>
          <span>后台</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="archive">
        <Link to={'/archive'}>
          <Icon type="project"></Icon>
          <span>归档</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="timeline">
        <Link to={'/timeline'}>
          <Icon type="hourglass"></Icon>
          <span>历程</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to={'/about'}>
          <Icon type="user"></Icon>
          <span>关于</span>
        </Link>
      </Menu.Item>
    </Menu>
  return (
    <header id='header'>
      <Row>
        <Col span={6}>
        </Col>
        <Col span={12}>
          {isMobile&&menu}
        </Col>
        <Col span={6}>
          {loggedIn? (<Button type="primary" >注销</Button>):
          (<Button type="primary" onClick = {()=>setShowLogin(true)}>登录</Button>)}
        </Col>
      </Row>
      {loginModal}
    </header>
  )
}
