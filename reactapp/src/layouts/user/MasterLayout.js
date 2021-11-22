import React from 'react';
import {Switch, Route, Redirect  } from 'react-router-dom';
import Navbar from './Navbar';
import routes from '../../routes/routes';
 
const MasterLayout = () => {
  return (
    <>
      <Navbar />
          <Switch>
            {routes.map((route, idx) => {
                      return(
                          route.component && (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => (
                            <route.component {...props} />
                            )}
                          />
                        )
                    )
                  })}
                    <Redirect from ="/user" to="/user/dashboard" /> 
          </Switch>
     
    </>
 );
}

 
export default MasterLayout;