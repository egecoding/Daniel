import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-4">
            <Container fluid>
                <Row>
                    <Col className="text-center py-3">
                        &copy; 2024 Deriv Bot - All Rights Reserved
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

