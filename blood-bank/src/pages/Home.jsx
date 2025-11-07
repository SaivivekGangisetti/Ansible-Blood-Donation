import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bloodGroup: '',
    role: 'Donor'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE Record
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.bloodGroup) {
      setError("Please select a blood group");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/data/create', formData);
      setSuccess(response.data.message || "Record created successfully!");
      setError('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        bloodGroup: '',
        role: 'Donor'
      });
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
      setSuccess('');
    }
  };

  // READ Record
  const handleRead = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      console.log("Fetched Data:", response.data);
      setSuccess("Data fetched successfully! Check console for details.");
      setError('');
    } catch (err) {
      setError("Failed to fetch data");
      setSuccess('');
    }
  };

  // UPDATE Record
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/data/${formData.email}`, formData);
      setSuccess(response.data.message || "Record updated successfully!");
      setError('');
    } catch (err) {
      setError("Update failed");
      setSuccess('');
    }
  };

  // DELETE Record
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/data/${formData.email}`);
      setSuccess(response.data.message || "Record deleted successfully!");
      setError('');
    } catch (err) {
      setError("Delete failed");
      setSuccess('');
    }
  };

  return (
    <div className="Home">
      <h2>BLOOD DONATION</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (Used as ID)"
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <select name="role" value="Donor" disabled>
          <option value="Donor">Donor</option>
        </select>

        <div className="crud-buttons">
          <button type="submit">Create</button>
          <button type="button" onClick={handleRead}>Read</button>
          <button type="button" onClick={handleUpdate}>Update</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
