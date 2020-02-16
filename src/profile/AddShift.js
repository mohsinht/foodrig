import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import {
  Icon,
  Col,
  Button,
  Checkbox,
  Form, Row,
  Input,
  Select,
  Card,
  TimePicker,
  message
} from 'antd';
import '../App.css';
import moment from 'moment';

const { Option, OptGroup } = Select;
const { Meta } = Card;

class AddShift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          kitchens: []
        };
    }

    componentDidMount() {
        this.getItems();
        this.getKitchens()
    }

    setItems = payload => {
      this.setState({
        items: payload
      });
    };

    setKitchens = payload => {
      this.setState({
        kitchens: payload
      });
    }

    async getItems() {
        await this.props.axiosInstance.get('/item').then(resp => {
            this.setItems(resp.data);
        });
    }

    async getKitchens() {
      await this.props.axiosInstance.get('/kitchen').then(resp => {
        this.setKitchens(resp.data);
      });
    }

    getKitchenOptions() {
      const kitchens = [];
      for (const k of this.state.kitchens) {
        
        kitchens.push(
          <Option key={k.id} value={k.id}>{k.name}</Option>
        );
      }
      return kitchens
    }

    createItemCards() {
      const items = [];
      for (const item of this.state.items) {
        items.push(
          <Col key={item.id} span={12}
          style={{marginBottom: 30}}
          >
              <Card
                cover={<img style={{objectFit: 'cover', height: 200 }} src={item.image || "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"} />}
              >
                <Meta title={item.name} description={
                  <Checkbox value={item.id}></Checkbox>
                } />
              </Card>
          </Col>
        );
      }
      return items;
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.dataSubmission(values);
          this.loadingMsg();
        }
      });
    };

    async dataSubmission(payload) {
      payload.start_time = payload.start_time.format('HH:mm');
      payload.end_time = payload.end_time.format('HH:mm');
      await this.props.axiosInstance.post('/shift/', payload).then(
        resp => {
          message.success('Shift requested successfully!');
          this.props.history.push('/shifts');
        }
      ).catch(err => {
        const keysTemp = Object.keys(err.response.data)[0];
        message.error(err.response.data[keysTemp]);
      });
      // let resp;
      // await this.props.axiosInstance
      //   .post('/auth/login/', payload)
      //   .then(resp => {
      //     console.log(resp);
      //     const keysTemp = Object.keys(resp.data)[0];
  
      //     if (resp.status === 200) {
      //       message.success('Logged in successfully!');
      //       localStorage.setItem('token', resp.data.key);
      //       this.props.history.push('/dashboard');
      //       this.props.doLogin();
      //     } else {
      //       message.warning(resp.data[keysTemp]);
      //     }
      //   })
      //   .catch(err => {
      //     const keysTemp = Object.keys(err.response.data)[0];
      //     message.error(err.response.data[keysTemp]);
      //   });
    }

    loadingMsg = () => {
      const hide = message.loading('Requesting shift..', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide, 2500);
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const format = 'HH:mm';
      return (
        <>
          <h1>
            Add New Shift
          </h1>
          <Form onSubmit={this.handleSubmit} className='fg-login-form'>
            <Form.Item>
            {getFieldDecorator('kitchen', {
              rules: [{ required: true, message: 'Please select a kitchen!' }]
            })(
              <Select placeholder="Select Kitchen" >
                {this.getKitchenOptions()}
              </Select>,
            )}
            </Form.Item>
            <div style={{display: 'flex'}}>
            <Form.Item style={{ width: '48%' }}>
            {getFieldDecorator('start_time', {
              rules: [{ required: true, message: 'Please select a start time!' }]
            })(
                <TimePicker  style={{ width: '100%' }} defaultOpenValue={moment('00:00:00', format)} format={format} placeholder="Start Time" />
            )}
            </Form.Item>
            <Form.Item style={{ width: '48%', marginLeft: '4%' }}>
            {getFieldDecorator('end_time', {
              rules: [{ required: true, message: 'Please select a end time!' }]
            })(
              <TimePicker style={{ width: '100%' }} defaultOpenValue={moment('00:00:00', format)} format={format} placeholder="End Time" />
            )}
            </Form.Item>
            </div>
            <h2>Menu</h2>
            <Form.Item>
            {getFieldDecorator('menu_items', {
              rules: [{ required: true, message: 'Please select the menu!' }]
            })(
              <Checkbox.Group>
                <Row gutter={16}>
                  {this.createItemCards()}
                </Row>
              </Checkbox.Group>
            )}
            </Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Request Shift
            </Button>
          </Form>
        </>
      )
    }
}

const ShiftForm = Form.create({ name: 'shift_add' })(AddShift);

export default withRouter(ShiftForm);
