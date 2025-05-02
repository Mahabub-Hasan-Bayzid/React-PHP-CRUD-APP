import { BrowserRouter, NavLink } from 'react-router-dom';
import ListUser from './ListUser';
import CreateUser from './CreateUser'; 
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <h2 className='h2'>Full Stack APP</h2>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                List Users
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="user/create" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Create Users
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element ={<ListUser/>} />
          <Route path="user/create" element ={<CreateUser/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

