import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [backendMessage, setBackendMessage] = useState('Loading...');

    // Call backend API
    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.text())
            .then((data) => setBackendMessage(data))
            .catch((err) => setBackendMessage('Error: Backend not reachable'));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {/* Frontend check */}
                <img src={logo} className="App-logo" alt="logo" />
                <p>✅ Frontend is working!</p>

                {/* Backend check */}
                <p>🔗 Backend says: {backendMessage}</p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
