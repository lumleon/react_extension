import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs5';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rdate, setRdate] = useState('');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      $('#ordersTable').DataTable({
        data: orders,
        columns: [
          { title: "Order ID", data: "order_id" },
          { title: "Status", data: "status" },
          { title: "Date", data: "date" }
        ]
      });
    }
  }, [orders]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost/siteone/wp-json/oe/v1/login', {
        username,
        password
      });
      setToken(response.data.token);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  const checkOrders = async () => {
    try {
      const response = await axios.get('http://localhost/siteone/wp-json/oe/v1/order-status', {
        headers: { Authorization: `Bearer ${token}` },
        params: { rdate }
      });
      setOrders(response.data);
    } catch (error) {
      alert('Failed to fetch orders');
    }
  };

  return (
    <div style={{ width: '450px', height: '100vh', position: 'fixed', right: 0, top: 0, backgroundColor: '#fff', padding: '10px' }}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" />
      <button onClick={handleLogin} className="btn btn-primary mb-2">Login</button>
      {token && (
        <>
          <h2>Check Orders</h2>
          <select value={rdate} onChange={(e) => setRdate(e.target.value)} className="form-select mb-2">
            <option value="">Select Date</option>
            <option value="2024-11-20">2024-11-20</option>
            <option value="2024-09-01">2024-09-01</option>
          </select>
          <button onClick={checkOrders} className="btn btn-primary mb-2">Check Orders</button>
          <table id="ordersTable" className="table table-striped display"></table>
        </>
      )}
    </div>
  );
};

export default LoginForm;
