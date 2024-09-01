import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Settings = () => {
    const [setting1, setSetting1] = useState('');
    const [setting2, setSetting2] = useState('');

    const handleSave = () => {
        // Logic to save or apply the settings
        console.log('Settings saved:', { setting1, setting2 });
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Setting 1</Form.Label>
                <Form.Control
                    type="text"
                    value={setting1}
                    onChange={(e) => setSetting1(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Setting 2</Form.Label>
                <Form.Control
                    type="text"
                    value={setting2}
                    onChange={(e) => setSetting2(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
                Save Settings
            </Button>
        </Form>
    );
};

export default Settings;
