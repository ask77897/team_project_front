import React from 'react';
import './App.css';
import RouterPage from './mainpage/RouterPage';
import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Container>
            <div>
                <RouterPage />
            </div>
        </Container>
    );
}

export default App;
