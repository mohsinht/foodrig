import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
const { Header } = Layout;

class HeaderPrivate extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Header>
        <div className='fg-logo'>
          FOOD<span className='fg-logo-sub'>Rig</span>
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
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
      </Header>
    );
  }
}

export default withRouter(HeaderPrivate);
