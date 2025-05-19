import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WeddingPlanList = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/wedding-plans');
            setPlans(response.data);
        } catch (err) {
            setError('Failed to fetch wedding plans.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this plan?')) return;

        try {
            await axios.delete(`http://localhost:8080/api/wedding-plans/${id}`);
            setPlans(plans.filter(plan => plan.id !== id));
        } catch (err) {
            alert('Failed to delete plan.');
            console.error(err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // Assumes you have a route like /edit/:id
    };

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
            <h2>Wedding Plan List</h2>
            {loading && <p>Loading plans...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && plans.length === 0 && <p>No wedding plans available.</p>}

            {!loading && plans.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Title</th>
                        <th style={thStyle}>Description</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Services Included</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {plans.map(plan => (
                        <tr key={plan.id}>
                            <td style={tdStyle}>{plan.id}</td>
                            <td style={tdStyle}>{plan.title}</td>
                            <td style={tdStyle}>{plan.description}</td>
                            <td style={tdStyle}>${plan.price.toFixed(2)}</td>
                            <td style={tdStyle}>{plan.servicesIncluded}</td>
                            <td style={tdStyle}>
                                <button onClick={() => handleEdit(plan.id)} style={btnStyle}>Edit</button>
                                <button onClick={() => handleDelete(plan.id)} style={{ ...btnStyle, backgroundColor: '#e74c3c' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const thStyle = {
    borderBottom: '2px solid #ccc',
    textAlign: 'left',
    padding: '8px'
};

const tdStyle = {
    borderBottom: '1px solid #eee',
    padding: '8px'
};

const btnStyle = {
    marginRight: '10px',
    padding: '6px 10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default WeddingPlanList;
