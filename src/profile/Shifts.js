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
            for (const item of shift.menu_items_detailed) {
                menu.push(<p key={item.id}>{item.name}</p>)
            }
            shifts.push(
                <Col span={8}>
                    <Card title={shift.kitchen_name}>
                        <p>{shift.start_time} - {shift.end_time}</p>
                        <p><b>Menu</b></p> 
                        {menu}
                        <p><b>Status: </b> {shift.status.toLowerCase().charAt(0).toUpperCase() + shift.status.substring(1).toLowerCase()} </p>
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
