# react_extension
A chrome extension in ReactJs

 
### Step 1: Set Up Your Project
First, create a new React project using Create React App:
```bash
npx create-react-app chrome-extension
cd chrome-extension
```

### Step 2: Modify `public/manifest.json`
Create a `manifest.json` file in the `public` directory with the following content:
```json
{
  "manifest_version": 3,
  "name": "Order Checker Extension",
  "version": "1.0",
  "description": "A Chrome extension to check order status.",
  "action": {
    "default_popup": "index.html"
  },
  "permissions": [
    "activeTab",
    "storage"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### Step 3: Create the UI Component
In your `src` directory, create a new component `LoginForm.js`:
```jsx
import React, { useState } from 'react';
import axios from 'axios';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rdate, setRdate] = useState('');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);

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
      const response = await axios.get(`http://localhost/siteone/wp-json/oe/v1/order-status`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { rdate }
      });
      setOrders(response.data);
      $('#ordersTable').DataTable({
        data: response.data,
        columns: [
          { title: "Order ID", data: "order_id" },
          { title: "Status", data: "status" },
          { title: "Date", data: "date" }
        ]
      });
    } catch (error) {
      alert('Failed to fetch orders');
    }
  };

  return (
    <div style={{ width: '450px', height: '100vh', position: 'fixed', right: 0, top: 0, backgroundColor: '#fff', padding: '10px' }}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {token && (
        <>
          <h2>Check Orders</h2>
          <select value={rdate} onChange={(e) => setRdate(e.target.value)}>
            <option value="">Select Date</option>
            {/* Add options dynamically */}
          </select>
          <button onClick={checkOrders}>Check Orders</button>
          <table id="ordersTable" className="display"></table>
        </>
      )}
    </div>
  );
};

export default LoginForm;
```

### Step 4: Update `src/App.js`
Replace the content of `App.js` with:
```jsx
import React from 'react';
import LoginForm from './LoginForm';

function App() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
```

### Step 5: Create `public/content.js`
Create a `content.js` file in the `public` directory:
```javascript
// This file can be used to inject the React app into the DOM
const app = document.createElement('div');
app.id = 'chrome-extension-root';
document.body.appendChild(app);
```

### Step 6: Build and Load the Extension
1. Build your React app:
   ```bash
   npm run build
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the `build` folder of your project.

Now, your Chrome extension should be up and running with the specified functionality. Let me know if you need any further assistance!
