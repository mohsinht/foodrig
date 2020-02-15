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

const { Option } = Select;

class ChefProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialities: [],
      selected_spec: []
    };
  }

  async getSpecialityData() {
    await this.props.axiosInstance.get('/speciality').then(resp => {
      this.populateSpecialities(resp.data);
    });
  }

  populateSpecialities = payload => {
    this.setState({
      specialities: payload
    });
  };

  async updateSpec(s) {
    await this.props.axiosInstance.patch('/chef/', { specialities: s });
  }
  handleSpecialityChange = e => {
    let arr = [];
    for (let i in e) {
      arr.push(parseInt(e[i]));
    }
    this.setState({ selected_spec: e });
    this.updateSpec(arr);
  };

  componentDidMount() {
    this.getSpecialityData();
    const profile = this.props.profileData;
    let selected_spec = [];
    if (profile.chef_profile) {
      for (let i in profile.chef_profile.specialities) {
        selected_spec.push(profile.chef_profile.specialities[i].toString());
      }
    }
    this.setState({ selected_spec });
  }

  render() {
    const profile = this.props.profileData;

    const form_data = profile.customer_profile ? (
      <Form.Item label='Phone Number'>
        <Input value={profile.customer_profile.phone} disabled={true} />
      </Form.Item>
    ) : (
      <>
        <Form.Item label='Select your Specialities'>
          <Select
            onChange={this.handleSpecialityChange}
            mode='multiple'
            placeholder='Specialities'
            value={this.state.selected_spec}
          >
            {this.state.specialities.map((value, index) => {
              return <Option key={value.id}>{value.name}</Option>;
            })}
          </Select>
        </Form.Item>
      </>
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
                <Radio.Button value='regChef'>Registered as Chef</Radio.Button>
                <Radio.Button value='regCust'>
                  Registered as Customer
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
