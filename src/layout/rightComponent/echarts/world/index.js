import React from 'react';
import { Row, Col } from 'antd';
import MapOne from './MapOne';

export default class Index extends React.Component {
    render(){
        return (
            <Row>
                <Col span={24}>
                    <MapOne></MapOne>
                </Col>
            </Row>
        )
    }
}