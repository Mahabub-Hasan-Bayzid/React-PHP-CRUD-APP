import { useState } from 'react';
import './CreateUser.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateUser() {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8005/api/', inputs)
      .then(response => {
        console.log(response.data);
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ffcc00',
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add user.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ffcc00',
        });
      });
  };

  return (
    <div className="form-container">
      <h2>Add New User 📋</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter name" required onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter email" required onChange={handleChange} />

        <label htmlFor="mobile">Mobile:</label>
        <input type="tel" id="mobile" name="mobile" placeholder="Enter mobile number" required onChange={handleChange} />

        <button type="submit" className="save-btn">Save User</button>
      </form>
    </div>
  );
}

export default CreateUser;
