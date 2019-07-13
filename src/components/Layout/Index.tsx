import React, { Component, PropsWithChildren, ReactNode } from 'react'
import Header from "./Header"
import Footer from './Footer';
export default function Layout(props:PropsWithChildren<ReactNode>) {
  return (
    <div className = "layout">
      <Header></Header>
      {props.children}
      <Footer></Footer>
      
    </div>
  )
}
