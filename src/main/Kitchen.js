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
      kitchenId: [],
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

  render() {
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
                          this.selectCard(value.id);
                        }}
                        className={
                          this.state.selectedShift === value.id
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

              <Button type='primary'>Order Now</Button>
            </>
          ) : (
            ' '
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Kitchen);
