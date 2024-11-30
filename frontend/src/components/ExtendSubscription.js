import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; 

const ExtendSubscription = () => {
  const [subscriptionId, setSubscriptionId] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subscriptionId || !newEndDate) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axiosInstance.post('extend_subscription/', { subscription_id: subscriptionId, new_end_date: newEndDate });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error extending subscription');
    }
  };

  return (
    <div>
      <h2>Extend Subscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subscription ID:</label>
          <input type="text" value={subscriptionId} onChange={(e) => setSubscriptionId(e.target.value)} placeholder="Enter subscription ID" />
        </div>
        <div>
          <label>New End Date:</label>
          <input type="text" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} placeholder="End Date (YYYY-MM-DD)" />
        </div>
        <button type="submit">Extend Subscription</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExtendSubscription;
