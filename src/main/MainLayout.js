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
import Shifts from '../profile/Shifts';
import AddShift from '../profile/AddShift';
import Kitchen from './Kitchen';

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
    this.state = {
      isAuthenticated: isLoggedIn(),
      userProfile: {},
      kitchens: []
    };
  }

  async getProfileData() {
    await axiosInstance.get('/auth/user').then(resp => {
      console.log(resp);
      this.populateProfile(resp.data);
    });
  }

  async getKitchens() {
    await axiosInstance.get('/kitchen/').then(resp => {
      console.log(resp);
      this.populateKitchens(resp.data);
    });
  }

  populateKitchens = payload => {
    this.setState({
      kitchens: payload
    });
  };

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

  componentDidMount() {
    if (isLoggedIn()) {
      this.getProfileData();
      this.getKitchens();
    }
  }

  render() {
    const headerItems = this.state.isAuthenticated ? (
      <HeaderPrivate profileData={this.state.userProfile} />
    ) : (
      <HeaderPublic />
    );

    const Profile = ChefProfile;

    return (
      <Router>
        <Layout className='layout'>
          {headerItems}
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Route path='/about' component={About} />
                <Route
                  path='/login'
                  render={props => (
                    <Login
                      doLogin={this.doLogin}
                      axiosInstance={axiosInstance}
                    />
                  )}
                />
                <Route
                  path='/register'
                  render={props => <Register axiosInstance={axiosInstance} />}
                />
                <Route exact path='/' component={About} />

                <PrivateRoute
                  path='/dashboard'
                  component={() => (
                    <HomePage
                      kitchenData={this.state.kitchens}
                      profileData={this.state.userProfile}
                    />
                  )}
                />
                <PrivateRoute
                  path='/logout'
                  component={() => <Logout doLogout={this.doLogout} />}
                />
                <PrivateRoute
                  path='/profile'
                  component={() => (
                    <Profile
                      profileData={this.state.userProfile}
                      axiosInstance={axiosInstance}
                    />
                  )}
                />

                <PrivateRoute
                  path='/shifts/add'
                  component={() => <AddShift axiosInstance={axiosInstance} />}
                />

                <PrivateRoute
                  exact
                  path='/shifts'
                  component={() => <Shifts axiosInstance={axiosInstance} />}
                ></PrivateRoute>
                <PrivateRoute
                  path='/kitchen/:kitchenId'
                  axiosInstance={axiosInstance}
                  component={() => (
                    <Kitchen
                      profileData={this.state.userProfile}
                      axiosInstance={axiosInstance}
                    />
                  )}
                />
              </div>
            </Content>
            <FooterPublic />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default MainLayout;
