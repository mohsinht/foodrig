import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import HeaderPublic from '../layout/HeaderPublic';
import HeaderPrivate from '../layout/HeaderPrivate';
import FooterPublic from '../layout/FooterPublic';
import Login from '../auth/Login';
import Register from '../auth/Register';
import About from '../content/About';
import axios from 'axios';
import env from '../env';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import HomePage from './HomePage';
import Logout from '../auth/Logout';
import ChefProfile from '../profile/ChefProfile';

const { Header, Content, Footer } = Layout;

const axiosInstance = axios.create({
  baseURL: env.API_URL
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = request => {
  if (isHandlerEnabled(request)) {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers['Authorization'] = 'Token ' + token;
    }
  }
  return request;
};

axiosInstance.interceptors.request.use(request => requestHandler(request));

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token;
};

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: isLoggedIn() };
  }

  async getProfileData() {
    await axiosInstance.get('/auth/user').then(resp => {
      console.log(resp);
    });
  }

  populateProfile = payload => {
    this.setState({
      userProfile: payload
    });
  };

  doLogout = () => {
    this.setState({
      isAuthenticated: false
    });
  };

  doLogin = () => {
    this.setState({
      isAuthenticated: true
    });
    this.getProfileData();
  };

  render() {
    const headerItems = this.state.isAuthenticated ? (
      <HeaderPrivate />
    ) : (
      <HeaderPublic />
    );

    const Profile = ChefProfile;

    return (
      <Router>
        <Layout className='layout'>
          {headerItems}
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Route path='/about' component={About} />
              <Route
                path='/login'
                render={props => (
                  <Login doLogin={this.doLogin} axiosInstance={axiosInstance} />
                )}
              />
              <Route
                path='/register'
                render={props => <Register axiosInstance={axiosInstance} />}
              />
              <Route exact path='/' component={HomePage} />

              <PrivateRoute path='/dashboard' component={HomePage} />
              <PrivateRoute
                path='/logout'
                component={() => <Logout doLogout={this.doLogout} />}
              />
              <PrivateRoute path='/profile' component={Profile} />
            </div>
          </Content>
          <FooterPublic />
        </Layout>
      </Router>
    );
  }
}

export default MainLayout;
