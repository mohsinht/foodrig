import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  message
} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from 'react-router-dom';
import '../App.css';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'Pakistan',
    label: 'Pakistan',
    children: [
      {
        value: 'Lahore',
        label: 'Lahore',
        children: [
          {
            value: 'Model Town',
            label: 'Near Model Town Park'
          }
        ]
      }
    ]
  },
  {
    value: 'Sargodha',
    label: 'Sargodha',
    children: [
      {
        value: 'chungi',
        label: 'Chungi Road',
        children: [
          {
            value: 'busstop',
            label: 'Near Bus Stop'
          }
        ]
      }
    ]
  }
];

class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    accountType: 'regCust'
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let valuesTemp = {
        ...values,
        type: this.state.accountType === 'regCust' ? 1 : 2
      };

      valuesTemp.phone = valuesTemp.prefix + valuesTemp.phone;
      if (!err) {
        console.log('Received values of form: ', valuesTemp);
        this.dataSubmission(valuesTemp);
        this.loadingMsg();
      }
    });
  };

  loadingMsg = () => {
    const hide = message.loading('Registration in progress..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  async dataSubmission(payload) {
    let resp;
    await this.props.axiosInstance
      .post('/auth/registration/', payload)
      .then(resp => {
        console.log(resp);
        const keysTemp = Object.keys(resp.data)[0];
        if (resp.status / 200 === 1) {
          message.success('Registration completed!');
        } else {
          message.warning(resp.data[keysTemp]);
        }

        if (resp.statusText === 'Created') {
          this.props.history.push('/login');
        }
      })
      .catch(err => {
        const keysTemp = Object.keys(err.response.data)[0];
        message.error(err.response.data[keysTemp]);
      });
  }

  handleAccTypeChange = e => {
    this.setState({ accountType: e.target.value });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password1')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password2'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '92'
    })(
      <Select style={{ width: 70 }}>
        <Option value='92'>+92</Option>
        <Option value='04'>+04</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form
        className='fg-reg-form'
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <div className='title'>Create an account on FoodRig</div>

        <Form.Item label='Account Type' {...formItemLayout}>
          <Radio.Group
            defaultValue='regCust'
            onChange={this.handleAccTypeChange}
          >
            <Radio.Button value='regChef'>Register as a Chef</Radio.Button>
            <Radio.Button value='regCust'>Register as a Customer</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='E-mail'>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Password' hasFeedback>
          {getFieldDecorator('password1', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label='Confirm Password' hasFeedback>
          {getFieldDecorator('password2', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Full Name&nbsp;
              <Tooltip title='What is your name registered on CNIC?'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('first_name', {
            rules: [
              {
                required: true,
                message: 'Please input your full name!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Habitual Residence'>
          {getFieldDecorator('residence', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!'
              }
            ]
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item label='Phone Number'>
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: 'Please input your phone number!' }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked'
          })(
            <Checkbox>
              I have read the <a href=''>agreement</a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegistrationForm = Form.create({ name: 'register' })(Register);

export default withRouter(RegistrationForm);
