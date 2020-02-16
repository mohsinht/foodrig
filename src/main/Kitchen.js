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
  message,
  PageHeader,
  Card
} from 'antd';
import '../App.css';

const { Option } = Select;
const { Meta } = Card;

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kitchenId: 0,
      selected_spec: [],
      details: {}
    };
  }

  async getKitchenData() {
    const { kitchenId } = this.props.match.params;
    await this.props.axiosInstance.get(`/kitchen/${kitchenId}`).then(resp => {
      console.log(resp);
      this.populateDetails(resp.data);
    });
  }

  selectCard = id => {
    this.setState({
      selectedShift: id
    });
  };

  populateDetails = payload => {
    this.setState({
      details: payload
    });
  };
  componentDidMount() {
    const { kitchenId } = this.props.match.params;
    this.setState({
      kitchenId
    });
    this.getKitchenData();
  }

  createItemCards(cards) {
    const items = [];
    for (const item of cards) {
      items.push(
        <Col key={item.id} span={8} style={{ marginBottom: 30 }}>
          <Card
            cover={
              <img
                style={{ objectFit: 'cover', height: 200 }}
                src={
                  item.image ||
                  'https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png'
                }
              />
            }
          >
            <Meta
              title={`${item.name} (${item.price}rs)`}
              description={<Checkbox value={item.id}></Checkbox>}
            />
          </Card>
        </Col>
      );
    }
    return items;
  }

  orderNow = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const payload = {
          kitchen: parseInt(this.props.match.params.kitchenId),
          items: values.menu_items,
          chef: this.state.selectedShift.chef.id,
          shift: this.state.selectedShift.id
        };
        console.log(payload);
        this.addOrder(payload);
      }
    });
  };
  async addOrder(payload) {
    await this.props.axiosInstance.post('/order/', payload).then(resp => {
      message.success('Order added successfully!');
      this.props.history.push('/dashboard');
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.match);
    const shifts = this.state.details.approved_shifts;
    return (
      <div>
        <PageHeader
          onBack={() => {
            this.props.history.push('/dashboard');
          }}
          title={this.state.details.name}
        />

        <div className='cooking-now'>Cooking Right Now</div>
        <div>
          <br />
          <Row gutter={16}>
            {shifts
              ? shifts.map((value, index) => {
                  return (
                    <Col span={8} key={value.id}>
                      <Card
                        onClick={() => {
                          this.selectCard(value);
                        }}
                        className={
                          this.state.selectedShift &&
                          this.state.selectedShift.id === value.id
                            ? 'kit-card kit-card-selected'
                            : 'kit-card'
                        }
                        key={value.id}
                      >
                        <Meta
                          title={value.chef.user.first_name}
                          description={`from ${value.start_time} to ${value.end_time}`}
                        />
                      </Card>
                    </Col>
                  );
                })
              : ''}
          </Row>

          {this.state.selectedShift ? (
            <>
              <br />
              <div className='cooking-now'>Whats Cooking?</div>
              <br />
              <Form.Item>
                {getFieldDecorator('menu_items', {
                  rules: [
                    { required: true, message: 'Please select the menu!' }
                  ]
                })(
                  <Checkbox.Group>
                    <Row gutter={16}>
                      {this.createItemCards(
                        this.state.selectedShift.menu_items_detailed
                      )}
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
              <Button type='primary' onClick={this.orderNow}>
                Order Now
              </Button>
            </>
          ) : (
            ' '
          )}
        </div>
      </div>
    );
  }
}

const KitchenTemp = Form.create({ name: 'kitchen_select' })(Kitchen);

export default withRouter(KitchenTemp);
