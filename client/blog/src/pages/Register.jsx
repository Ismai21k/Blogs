
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api.jsx';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await authService.register(form);
    alert('Registration successful! Please log in.');
    navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="text" name="username" onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Username" />
      <input type="email" name="email" onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Email" />
      <input type="password" name="password" onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Password" />
      <button type="submit" className="w-full p-2 bg-green-600 text-white">Register</button>
    </form>
  );
};

export default Register;
