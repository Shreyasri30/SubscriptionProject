import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';  

const RevenueReport = () => {
  const [revenue, setRevenue] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    
    const fetchRevenueReport = async () => {
      try {
        const response = await axiosInstance.get('revenue_report/'); 
        setRevenue(response.data.total_revenue);
      } catch (err) {
        console.error('Error fetching revenue report:', err);
        setError('Failed to fetch revenue report.');
      }
    };

    fetchRevenueReport();
  }, []);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2>Revenue Report</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {revenue !== null ? (
        <p>Total Revenue: <strong>${revenue.toFixed(2)}</strong></p>
      ) : (
        <p>Loading revenue data...</p>
      )}
    </div>
  );
};

export default RevenueReport;
