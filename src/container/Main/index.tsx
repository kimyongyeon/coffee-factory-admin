import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Login from '../Login';
import Board from '../Board';

const { Header, Content, Footer } = Layout;

interface AppProps { }

function App({ }: AppProps) {

  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">게시판관리  </Menu.Item>
            <Menu.Item key="2">회원관리</Menu.Item>
            <Menu.Item key="3">주문관리</Menu.Item>
            <Menu.Item key="3">로그인관리  </Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Board bno="번호가안나옵니다." title="나는게시판입니다." content="게시판의 내용입니다. " />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  );
}

export default App;
