import React from 'react';
import './App.css';
import AddSubscription from './components/AddSubscription';
import ExtendSubscription from './components/ExtendSubscription';
import EndSubscription from './components/EndSubscription';
import RevenueReport from './components/RevenueReport';


function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My React Application</h1>
      <p style={{ textAlign: 'center' }}>Welcome to the Subscription Management App</p>
      
            <div>
        <h2 style={{ textAlign: 'center' }}>Subscription Management</h2>
        <AddSubscription />
        <ExtendSubscription />
        <EndSubscription />
      </div>

      <div>
        <RevenueReport />
      </div>
    </div>
  );

}

export default App;
