import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Settings from './Settings';
import RealTimeChart from './RealTimeChart';
import PerformanceMetrics from './PerformanceMetrics';

const Dashboard = () => {
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Settings</Card.Title>
                            <Settings />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Real-time Data Visualization</Card.Title>
                            <RealTimeChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Performance Metrics</Card.Title>
                            <PerformanceMetrics />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
