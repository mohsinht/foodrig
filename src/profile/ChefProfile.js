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

class ChefProfile extends React.Component {
  render() {
    return <div>Profile</div>;
  }
}

export default withRouter(ChefProfile);
