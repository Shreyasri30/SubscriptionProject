import axiosInstance from '../axiosInstance';  
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const AddSubscription = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    product_id: '',  
    start_date: '',
    end_date: '',
    users: ''
  });

  const [customers, setCustomers] = useState([]);  
  const [products, setProducts] = useState([]);    

 
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get('customers/');
        setCustomers(response.data);  
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();  
  }, []);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products/');  
        setProducts(response.data);  
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();  
  }, []);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('add_subscription/', formData);
      setMessage(response.data.message); 
    } catch (error) {
      if(error.response){
        console.error('Error Response: ', error.response.data, error.response.status);
      }else if (ErrorEvent.request){
        console.error('No response: ', error.request);
      }else{
        console.error('Error Message: ', error.message);
      }


    }
  };

  return (
    <div>
      <h2>Add Subscription</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
        <select
  name="customer_id"
  value={formData.customer_id}
  onChange={handleChange}
  required
  style={{ width: '105%', padding: '15px', fontSize: '18px', marginBottom: '10px' }}  
>
  <option value="">Select a customer</option>
  {customers.map(customer => (
    <option key={customer.customer_id} value={customer.customer_id}>
      {customer.name}
    </option>
  ))}
</select>

        <select
  name="product_id"
  value={formData.product_id}
  onChange={handleChange}
  required
  style={{ width: '105%', padding: '15px', fontSize: '18px', marginBottom: '10px' }} 
>
  <option value="">Select a product</option>
  {products.map(product => (
    <option key={product.id} value={product.id}>
      {product.product_name}
    </option>
  ))}
</select>


        {/* Other form fields */}
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            placeholder="Start Date (YYYY-MM-DD)"
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="text"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            placeholder="End Date (YYYY-MM-DD)"
          />
        </div>

        <div>
          <label>Number of Users:</label>
          <input
            type="text"
            name="users"
            value={formData.users}
            onChange={handleChange}
            placeholder="Enter number of users"
          />
        </div>

        <button type="submit">Add Subscription</button>
      </form>
    </div>
  );
};

export default AddSubscription;
