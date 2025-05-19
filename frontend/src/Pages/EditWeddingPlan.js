import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditWeddingPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        servicesIncluded: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/wedding-plans/${id}`);
                const { title, description, price, servicesIncluded } = response.data;
                setFormData({ title, description, price, servicesIncluded });
            } catch (err) {
                setMessage('Failed to load wedding plan.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8080/api/wedding-plans/${id}`, {
                ...formData,
                price: parseFloat(formData.price)
            });

            setMessage('Wedding plan updated successfully!');
            setTimeout(() => navigate('/plans'), 1500);
        } catch (err) {
            setMessage('Failed to update wedding plan.');
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Edit Wedding Plan</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div>
                    <label>Description:</label><br />
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div>
                    <label>Price:</label><br />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>

                <div>
                    <label>Services Included:</label><br />
                    <input type="text" name="servicesIncluded" value={formData.servicesIncluded} onChange={handleChange} required />
                </div>

                <button type="submit" style={{ marginTop: '10px' }}>Update Plan</button>
            </form>
        </div>
    );
};

export default EditWeddingPlan;
