import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
const { Header, Content, Footer, Sider } = Layout;

class HeaderPrivate extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className='fp-logo-priv '>
          FOOD<span className='fg-logo-sub'>Ring</span>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['/about']}
          style={{ lineHeight: '64px' }}
          selectedKeys={[window.location.pathname]}
        >
          <Menu.Item key='/about'>
            <Link to='/about'>About</Link>
          </Menu.Item>
          <Menu.Item key='/dashboard'>
            <Link to='/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='/profile'>
            <Link to='/profile'>My Profile</Link>
          </Menu.Item>
          <Menu.Item key='/logout'>
            <Link to='/logout'>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(HeaderPrivate);
