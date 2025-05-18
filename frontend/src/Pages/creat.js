import React, { useState } from 'react';
import axios from 'axios';

const CreateWeddingPlan = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        servicesIncluded: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/api/wedding-plans', {
                ...formData,
                price: parseFloat(formData.price)
            });

            setMessage('Wedding plan created successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                servicesIncluded: ''
            });
        } catch (error) {
            setMessage('Failed to create wedding plan.');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Create Wedding Plan</h2>
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

                <button type="submit" style={{ marginTop: '10px' }}>Create Plan</button>
            </form>
        </div>
    );
};

export default CreateWeddingPlan;
