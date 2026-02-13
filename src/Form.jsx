import React, { useState } from 'react';

const Form = () => {
    const [fullname, setFullname] = useState('');
    const [formType, setFormType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ form_type: formType, fullname }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle successful response
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                required
            />
            <select value={formType} onChange={(e) => setFormType(e.target.value)} required>
                <option value="">Select Form Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Form;