import React from 'react';
import { Layout, Menu } from 'antd';
import Login from '../Login';
import Board from '../Board';
import { Link, Route } from 'react-router-dom';
import Member from '../Member';
import Order from '../Order';
import OrderDetail from '../Order/detail';
import Product from '../Product';
import ProductDetial from '../Product/detail';
import { RecoilRoot } from 'recoil';

const { Header, Content, Footer } = Layout;

interface AppProps { }

function App({ }: AppProps) {

  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key="0"><Link to="/">홈 </Link> </Menu.Item>
            <Menu.Item key="1"><Link to="/board">게시판 관리 </Link> </Menu.Item>
            <Menu.Item key="2"><Link to="/member">회원 관리 </Link> </Menu.Item>
            <Menu.Item key="3"><Link to="/order">주문 관리 </Link> </Menu.Item>
            <Menu.Item key="4"><Link to="/product">상품 관리 </Link> </Menu.Item>
          </Menu>
        </Header>
        <RecoilRoot>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              <Route exact path="/" component={Login} />
              <Route exact path="/board" component={Board} />
              <Route exact path="/member" component={Member} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/order/detail" component={OrderDetail} />
              <Route exact path="/product" component={Product} />
              <Route exact path="/product/detail" component={ProductDetial} />
            </div>
          </Content>
        </RecoilRoot>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Coffee Factory</Footer>
      </Layout>
    </>
  );
}

export default App;
