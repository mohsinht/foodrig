import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import '../App.css';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

class Logout extends React.Component {
  loadingMsg = () => {
    const hide = message.success('Logged out successfully', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  componentDidMount() {
    this.props.doLogout();
    this.loadingMsg();
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  render() {
    return <div>Please wait...</div>;
  }
}

export default withRouter(Logout);
