import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; 

const EndSubscription = () => {
  const [subscriptionId, setSubscriptionId] = useState(''); 
  const [message, setMessage] = useState('');  
  const handleChange = (e) => {
    setSubscriptionId(e.target.value);  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();  
    if (!subscriptionId) {
      alert("Please enter a subscription ID.");
      return;
    }
    try {
      const response = await axiosInstance.post('end_subscription/', { subscription_id: subscriptionId });
      setMessage(response.data.message);  
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Error ending subscription');
      } else {
        setMessage('Error: Unable to process request.');
      }
      console.error('Error:', error);  
    }
  };

  return (
    <div>
      <h2>End Subscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subscription ID: </label>
          <input
            type="text"
            value={subscriptionId}
            onChange={handleChange}  
            placeholder="Enter subscription ID"
          />
        </div>
        <button type="submit">End Subscription</button>
      </form>

      {message && <p>{message}</p>}  
    </div>
  );
};

export default EndSubscription;
