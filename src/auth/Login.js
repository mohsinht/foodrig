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

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.dataSubmission(values);
        this.loadingMsg();
        console.log('Received values of form: ', values);
      }
    });
  };

  async dataSubmission(payload) {
    let resp;
    await this.props.axiosInstance
      .post('/auth/login/', payload)
      .then(resp => {
        console.log(resp);
        const keysTemp = Object.keys(resp.data)[0];

        if (resp.status === 200) {
          message.success('Logged in successfully!');
          localStorage.setItem('token', resp.data.key);
          this.props.history.push('/dashboard');
          this.props.doLogin();
        } else {
          message.warning(resp.data[keysTemp]);
        }
      })
      .catch(err => {
        const keysTemp = Object.keys(err.response.data)[0];
        message.error(err.response.data[keysTemp]);
      });
  }

  loadingMsg = () => {
    const hide = message.loading('Logging in..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='fg-login-form'>
        <div className='title'>Login to FoodRig</div>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }]
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email Address'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default withRouter(LoginForm);
