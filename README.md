# **Subscription Management System**

## **Overview**
The Subscription Management System is a full-stack web application designed to manage customer subscriptions to various products. Built with **Django** for the backend and **React** for the frontend, this system allows users to add, extend, and end subscriptions while also generating a real-time revenue report.

---

## **Features**
1. **Customer and Product Management**
   - Add, update, and list customers and products.
   - Dropdowns dynamically load customers and products from the database.

2. **Subscription Management**
   - **Add Subscription**: Subscribe customers to products with specified start and end dates and the number of users.
   - **Extend Subscription**: Extend the subscription period by updating the end date.
   - **End Subscription**: Mark a subscription as ended by setting the end date to the current date.

3. **Revenue Report**
   - Calculate and display the total revenue based on active subscriptions, considering the number of users and product costs.

---

## **Technologies Used**
- **Backend**: Django (Python)
- **Frontend**: React (JavaScript)
- **Database**: SQLite (development) 
- **HTTP Client**: Axios
- **Styling**: CSS

---

## **Installation**

### **Prerequisites**
- Python (>=3.9)
- Node.js (>=16.0)
- npm 
- Git

---

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/Shreyasri30/SubscriptionProject.git
   cd SubscriptionProject
