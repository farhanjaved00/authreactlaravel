import React, {useState} from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';

function Register(){
   
   const history=useHistory();

      const [registerInput, setRegister] = useState({
         first_name:'',
         last_name:'',
         email:'',
         phone:'',
         address:'',
         password:'',
         error_list:[],
      });

      const handleInput = (e) => {
         e.persist();
         setRegister({...registerInput,[e.target.name]:e.target.value});
      }

      const registerSubmit = (e) =>{
         e.preventDefault();

         const data={
            first_name:registerInput.first_name,
            last_name:registerInput.last_name,
            email:registerInput.email,
            phone:registerInput.phone,
            address:registerInput.address,
            password:registerInput.password,
         }
            axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register',data).then(res => {
               if(res.data.status ===200){
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('first_name', res.data.first_name);
                  localStorage.setItem('last_name', res.data.last_name);
                  localStorage.setItem('email', res.data.email);
                  localStorage.setItem('phone', res.data.phone);
                  localStorage.setItem('address', res.data.address);
                  swal("Success",res.data.message,"success");
                  history.push('/user/dashboard');
               }else{
                  setRegister({...registerInput,error_list: res.data.validation_errors});
               }

            });
         });
      }

    return (
        <div>
        <Navbar />
        <div className="container py-5">
           <div className="row justify-content-center">
              <div className="col-md-6">
                 <div className="card">
                    <div className="card-header text-light bg-dark">
                       <h4>Register Page</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={registerSubmit}>
                       <div className="row">    
                       <div className="col-lg-6">
                       <div className="form-group mb-3">
                          <label>First Name</label>
                          <input type="text" name="first_name" onChange={handleInput} value={registerInput.first_name} className="form-control"  />
                          <span>{registerInput.error_list.first_name}</span>
                       </div>
                       </div>
                       <div className="col-lg-6">

                       <div className="form-group mb-3">
                          <label>Last Name</label>
                          <input type="text" name="last_name" onChange={handleInput} value={registerInput.last_name} className="form-control"  />
                          <span>{registerInput.error_list.last_name}</span>
                       </div>
                       </div>
                       </div>
                       <div className="form-group mb-3">
                          <label>Email</label>
                          <input type="email" name="email"  onChange={handleInput} value={registerInput.email} className="form-control" />
                          <span>{registerInput.error_list.email}</span>

                       </div>
                       <div className="form-group mb-3">
                          <label>Phone</label>
                          <input type="number" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control"  />
                          <span>{registerInput.error_list.phone}</span>
                       </div>
                       <div className="form-group mb-3">
                          <label>Address</label>
                          <input type="text" name="address" onChange={handleInput} value={registerInput.address} className="form-control"  />
                          <span>{registerInput.error_list.address}</span>
                       </div>
                       <div className="form-group mb-3">
                          <label>Password</label>
                          <input type="password" name="password"  onChange={handleInput} value={registerInput.password} className="form-control"  />
                          <span>{registerInput.error_list.password}</span>

                       </div>
                       <div className="form-group mb-3 text-center">
                          <button type="submit" className="btn btn-danger">Register</button>                       
                       </div>
                       </form>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
    );
}


export default Register;