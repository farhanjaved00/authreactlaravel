import React from 'react'

function Dashboard(){
    return (
        <div className="container">
       
           {localStorage.getItem('first_name') && (
            <div>
              <h3 className="mt-3">Welcome: {localStorage.getItem('first_name')} {localStorage.getItem('last_name')}</h3>
            </div>
            )}
        </div>
    );
}
export default Dashboard;
