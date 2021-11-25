import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';

function Navbar(){

    const history=useHistory();

    const logoutSubmit = (e) =>{
        e.preventDefault();
            axios.post('/api/logout').then(res => {
                if(res.data.status ===200){
                   localStorage.removeItem('token');
                   localStorage.removeItem('first_name');
                   localStorage.removeItem('last_name');
                   localStorage.removeItem('email');
                   localStorage.removeItem('phone');
                   localStorage.removeItem('address');
                   swal("Success",res.data.message,"success");
                   history.push('/');
                 }
            });
    }

    return (
        <div>
       <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">AuthSystem</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                   
                    <li className="nav-item">
                    <Link className="nav-link"  to="/user/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/user/profile">Profile</Link>
                    </li>
                </ul>
                <form className="d-flex">
                     <Link className="btn btn-outline-success" to="/" onClick={logoutSubmit}>Logout</Link>
                </form>
                </div>
            </div>
        </nav>
    </div>
    </div>
    );
}
export default Navbar;