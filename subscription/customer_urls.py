import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; 

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get('customers/'); 
        setCustomers(response.data); 
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Failed to fetch customers');
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
