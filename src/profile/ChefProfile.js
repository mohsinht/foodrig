import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
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
import '../App.css';

class ChefProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const profile = this.props.profileData;
    const form_data = profile.customer_profile ? (
      <Form.Item label='Phone Number'>
        <Input value={profile.customer_profile.phone} disabled={true} />
      </Form.Item>
    ) : (
      ''
    );
    console.log('PROFILE: ', profile);
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
    return (
      <>
        <h1>Profile</h1>

        <div>
          <Form
            className='fg-reg-form'
            {...formItemLayout}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label='Account Type' {...formItemLayout}>
              <Radio.Group
                defaultValue={profile.chef_profile ? 'regChef' : 'regCust'}
                onChange={this.handleAccTypeChange}
                disabled={true}
              >
                <Radio.Button value='regChef'>Register as a Chef</Radio.Button>
                <Radio.Button value='regCust'>
                  Register as a Customer
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label='E-mail'>
              <Input value={profile.email} disabled={true} />
            </Form.Item>
            <Form.Item label='Full Name'>
              <Input value={profile.first_name} disabled={true} />
            </Form.Item>
            {form_data}
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(ChefProfile);
