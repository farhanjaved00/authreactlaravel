import React, {useState} from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';

function Login () {

   const history=useHistory();
   const [loginInput, setLogin] = useState({
       email:'',
       password:'',
       error_list:[],
    });

   const handleInput = (e) => {
      e.persist();
      setLogin({...loginInput,[e.target.name]:e.target.value});
   }

      const loginSubmit= (e) =>{
         e.preventDefault();
         
         const data={
            email:loginInput.email,
            password:loginInput.password,
         }

         axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post('/api/login',data).then(res => {
               if(res.data.status ===200){
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('first_name', res.data.first_name);
                  localStorage.setItem('last_name', res.data.last_name);
                  localStorage.setItem('email', res.data.email);
                  localStorage.setItem('phone', res.data.phone);
                  localStorage.setItem('address', res.data.address);
                  swal("Success",res.data.message,"success");
                  history.push('/user/dashboard')
               }
               else if(res.data.status ===401){
                  swal("Warning",res.data.message,"warning");
               }else
               {
                  setLogin({...loginInput ,error_list: res.data.validation_errors});
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
                        <h4>Login Page</h4>
                     </div>
                     <div className="card-body">
                        <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                           <label>Email</label>
                           <input type="" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                           <span>{loginInput.error_list.email}</span>
                        </div>
                        <div className="form-group mb-3">
                           <label>Password</label>
                           <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                           <span>{loginInput.error_list.password}</span>
                        </div>
                        
                        <div className="form-group text-center mb-3">
                           <button type="submit" className="btn btn-success">Login</button>                       
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


export default Login;