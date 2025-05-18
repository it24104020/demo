import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import CreateWeddingPlan from './Pages/creat';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Wedding Planner</h1>
                <nav>
                    <Link className="App-link" to="/creat">Create Plan</Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/creat" />} />
                <Route path="/creat" element={<CreateWeddingPlan />} />
                {/* Add more routes here if needed */}
            </Routes>
        </div>
    );
}

export default App;
