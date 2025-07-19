import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api.jsx';


const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value });
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await authService.login(form);
            if (response.success) {
                alert('Login successful!');
                navigate('/home');// redirect to home or dashbord

            } else {
                alert(response.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occured during login. Please try again later.');
        }
    }


    return ( 
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input type="email" name="email" onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} className="w-full p-2 mb-2 border" placeholder="Password" />
            <button type="submit" className="w-full p-2 bg-green-600 text-white">Register</button>
      </form>
     );
}
 
export default Login;