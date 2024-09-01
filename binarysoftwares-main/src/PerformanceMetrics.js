import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PerformanceMetrics = () => {
    // Example metrics, replace with real data
    const metrics = [
        { name: 'Total Trades', value: 120 },
        { name: 'Winning Trades', value: 75 },
        { name: 'Losing Trades', value: 45 },
        { name: 'Win Rate', value: '62.5%' },
        { name: 'Profit', value: '$1,200' },
    ];

    return (
        <ListGroup>
            {metrics.map((metric, index) => (
                <ListGroup.Item key={index}>
                    <strong>{metric.name}: </strong>{metric.value}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default PerformanceMetrics;
