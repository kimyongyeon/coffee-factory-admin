import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Login from '../Login';
import Board from '../Board';
import { Link, Route } from 'react-router-dom';
import Member from '../Member';

const { Header, Content, Footer } = Layout;

interface AppProps { }

function App({ }: AppProps) {

  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="0"><Link to="/">홈 </Link> </Menu.Item>
            <Menu.Item key="1"><Link to="/board">게시판관리 </Link> </Menu.Item>
            <Menu.Item key="2"><Link to="/member">회원관리 </Link> </Menu.Item>
            <Menu.Item key="3"><Link to="/order">주문관리 </Link> </Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Route exact path="/" component={Login} />
            <Route exact path="/board" component={Board} />
            <Route exact path="/member" component={Member} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  );
}

export default App;
