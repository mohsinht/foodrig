import React from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import {
  Icon,
  Row,
  Col,
} from 'antd';
import { Card } from 'antd';
import '../App.css';

class Shifts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          shifts: [],
        };
    }

    componentDidMount() {
        this.getShifts();
    }

    async getShifts() {
        await this.props.axiosInstance.get('/shift').then(resp => {
            this.setShifts(resp.data);
        });
    }

    setShifts = payload => {
        this.setState({
          shifts: payload
        });
    };

    createShiftsCards = () => {
        let shifts = []
        for (const shift of this.state.shifts) {
            let menu = []
            for (const item of shift.menu_items) {
                menu.push(<p>{item.name}</p>)
            }
            shifts.push(
                <Col span={8}>
                    <Card title={shift.kitchen.name} bordered={false}>
                        <p>{shift.start_time} - {shift.end_time}</p>
                        <p><b>Menu</b></p> 
                        {menu}
                    </Card>
                </Col>
            )
        }

        return shifts;
    }

    render() {
        return (
            <>
                <h1>Shifts</h1>
                <Row gutter={16}>
                    {this.createShiftsCards()}
                </Row>

                <Link to='/shifts/add'>
                    <div className="floating-button">
                        <Icon type="plus" />
                    </div>
                </Link>
            </>
        );
    }
}

export default withRouter(Shifts);
