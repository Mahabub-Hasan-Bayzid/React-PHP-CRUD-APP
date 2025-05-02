import { useState, useEffect } from 'react';
import axios from 'axios';
import './ListUser.css';
import Swal from 'sweetalert2';

function ListUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    axios.get('http://localhost:8005/api/')
      .then(response => {
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setUsers([]); 
          setError(response.data.message || 'Unexpected response format');
        }
      });
  }, []);

  // Handler for edit action
  const editHandler = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handler for modal form submission
  const handleEditSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8005/api/?id=${selectedUser.id}`, selectedUser)
      .then(response => {
        if (response.data.status === 'success') {
          setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
          setIsModalOpen(false);
          Swal.fire({
            title: "Updated!",
            text: "User details have been updated.",
            icon: "success",
          });
        } else {
          setError(response.data.message || 'Unexpected response format');
        }
      });
  };

  // Handler for input changes in the modal form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Handler for delete action
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8005/api/?id=${id}`)
          .then(response => {
            if (response.data.status === 'success') {
              setUsers(users.filter(user => user.id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            } else {
              setError(response.data.message || 'Unexpected response format');
            }
          });
      }
    });
  };

  return (
    <div className="list-container">
      <h2>User List 🧑‍🤝‍🧑</h2>
      {error && <div className="error">{error}</div>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <svg id='edit' onClick={() => editHandler(user)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                  <svg id='delete' onClick={() => deleteHandler(user.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="35px" fill="#FFFF55"><path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q37 0 73 4.5t72 14.5l-67 68q-20-3-39-5t-39-2q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32h240v80H160Zm400 40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-340L683-120H560Zm300-263-37-37 37 37ZM620-180h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Z"/></svg>Edit User</h3>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={selectedUser.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={selectedUser.mobile}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListUser;
