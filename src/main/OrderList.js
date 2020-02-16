import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import {
  Icon,
  Row,
  Button,
  message,
  Col,
} from 'antd';
import { Card } from 'antd';
import '../App.css';

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          orders: [],
        };
    }

    componentDidMount() {
        this.getOrders();
    }

    setOrders = payload => {
        this.setState({
          orders: payload
        });
    };

    async getOrders() {
        await this.props.axiosInstance.get('/order').then(resp => {
            this.setOrders(resp.data);
        });
    }

    async markComplete(order) {
        await this.props.axiosInstance.post('/order/complete/', {order: order.id}).then(resp => {
            message.success('Order Completed!');
            const orders = this.state.orders
            let index = 0;
            for (const order of orders) {
                if (order.id === resp.data.id) {
                    orders[index] = resp.data
                }
                index++;
            }
            this.setState({
                orders: orders
            });
        });
    }

    createOrderCards = () => {
        let orders = []
        for (const order of this.state.orders) {
            let items = [];
            for (const item of order.detailed_items) {
                items.push(
                    <p key={item.id}>{item.name}</p>
                )
            }

            const btn = (order.status !== 'COMPLETED' && this.props.profileData.chef_profile) ? (
                <Button type='primary' onClick={()=>{this.markComplete(order)}}>MarkCompleted</Button>
            ) : (<></>);

            orders.push(
                <Col key={order.id} span={8}>
                    <Card title={'Order #' + order.id}>
                        <p><b>Items</b></p> 
                        {items}
                        <p><b>Status: </b> {order.status.toLowerCase().charAt(0).toUpperCase() + order.status.substring(1).toLowerCase()} </p>
                        {btn}
                    </Card>
                </Col>
            )
        }

        return orders;
    }

    render() {
        return (
            <>
                <h1>Orders</h1>
                <Row gutter={16}>
                    {this.createOrderCards()}
                </Row>
            </>
        );
    }
}

export default withRouter(OrderList);
