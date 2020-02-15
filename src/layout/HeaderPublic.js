import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
const { Header } = Layout;

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

class HeaderPublic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: isLoggedIn() };
  }
  render() {
    // console.log(this.props);

    return (
      <Header>
        <div className='fg-logo'>
          FOOD<span className='fg-logo-sub'>Ring</span>
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
          <Menu.Item key='/login'>
            <Link to='/login'>Login</Link>
          </Menu.Item>
          <Menu.Item key='/register'>
            <Link to='/register'>Register</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(HeaderPublic);
