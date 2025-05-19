import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import CreateWeddingPlan from './Pages/creat';
import WeddingPlanList from './Pages/WeddingPlanList';
import EditWeddingPlan from './Pages/EditWeddingPlan'; // ✅ Import the Edit component
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Wedding Planner</h1>
                <nav>
                    <Link className="App-link" to="/creat">Create Plan</Link>
                    <Link className="App-link" to="/plans">View Plans</Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/creat" />} />
                <Route path="/creat" element={<CreateWeddingPlan />} />
                <Route path="/plans" element={<WeddingPlanList />} />
                <Route path="/edit/:id" element={<EditWeddingPlan />} /> {/* ✅ Edit route */}
            </Routes>
        </div>
    );
}

export default App;
