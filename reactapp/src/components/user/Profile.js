import React from 'react'

function Profile() {
    return (
      <div className="container table-responsive">
      <table class="table">
         <thead>
            <tr>
               <th>Firstname</th>
               <th>Lastname</th>
               <th>Email</th>
               <th>Phone</th>
               <th>Address</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>
                  {localStorage.getItem('first_name') && (
                  <div>
                     {localStorage.getItem('first_name')} 
                  </div>
                  )}
               </td>
               <td>
                  {localStorage.getItem('last_name') && (
                  <div>
                     {localStorage.getItem('last_name')} 
                  </div>
                  )}
               </td>
               <td>
                  {localStorage.getItem('email') && (
                  <div>
                     {localStorage.getItem('email')} 
                  </div>
                  )}
               </td>
               <td>
                  {localStorage.getItem('phone') && (
                  <div>
                     {localStorage.getItem('phone')} 
                  </div>
                  )}
               </td>
               <td>
                  {localStorage.getItem('address') && (
                  <div>
                     {localStorage.getItem('address')} 
                  </div>
                  )}
               </td>
            </tr>
         </tbody>
      </table>
   </div>
    );
}
export default Profile;
