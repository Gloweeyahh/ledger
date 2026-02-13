import React, { useState } from 'react';

const Form = () => {
    const [fullname, setFullname] = useState('');
    const [formType, setFormType] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setSubmitError(null);

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ fullname, form_type: formType })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Form submitted successfully!');
            window.location.href = '/success';
        } catch (error) {
            setSubmitError('There was an error submitting the form.');
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
            />
            <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                required
            >
                <option value="">Select Form Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
            </select>
            <button type="submit" disabled={submitLoading}>
                {submitLoading ? 'Submitting...' : 'Submit'}
            </button>
            {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
        </form>
    );
};

export default Form;