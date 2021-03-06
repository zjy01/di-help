import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, LocaleProvider } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import DiCreate from './container/DiCreate';

moment.locale('zh-CN',{
  weekdaysMin: "周日_周一_周二_周三_周四_周五_周六".split("_"),
});


const { Header, Content, Footer } = Layout;

const router = [{
  key: '1',
  label: '行程单',
  component: DiCreate
}]

class App extends Component {
  state = {
    nav: 0
  }
  render() {
    const { nav } = this.state;
    const Comp = router[nav].component;
    return (
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[router[0].key]}
              style={{ lineHeight: '64px' }}
            >
              {
                router.map(({ key, label }) => <Menu.Item key={key}>{label}</Menu.Item>)
              }
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{router[0].label}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Comp />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            DI-HELP ©2019 Created by Carven
    </Footer>
        </Layout>

      </LocaleProvider>);
  }
}

export default App;
