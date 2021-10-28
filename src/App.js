
import './App.css';


import Home_comp from './Home_comp/Home_comp';

import Profile_Page_comp from './Profile_Page_comp/Profile_Page_comp';
import User_Profile_Page_comp from './User_Profile_Page_comp/User_Profile_Page_comp';

import Project_PageTS_comp from './Project_PageTS_comp/Project_PageTS_comp';
import Team_PageTS_comp from './Team_PageTS_comp/Team_PageTS_comp';
import Projects_ALL_comp from './Projects_ALL_comp/Projects_ALL_comp';
import Departments_ALL_comp from './Departments_ALL_comp/Departments_ALL_comp';
import Users_ALL_comp from './Users_ALL_comp/Users_ALL_comp';

import Error404_comp from './Error404_comp/Error404_comp';

import {BrowserRouter as Router , Route, Switch, Link, withRouter} from 'react-router-dom';
import history from './history';
import { Suspense } from 'react';
import React from 'react';


// import Books_comp from './Books_comp/Books_comp';
//lazy


function App() {
  
  return (
  
    <>
    {/* <Header_comp /> */}




    <Router history={history}>
      <Suspense fallback="loading...">

      {/* <Link to="/">Home</Link> */}
      {/* <Header_comp  /> */}
     {/* <Route path='/'  component={Header_comp} /> */}

     
     
     <Switch>

    <Route path='/' exact  component={Home_comp}  />
    <Route path='/profile' exact component={Profile_Page_comp} />
    <Route path='/user' exact component={User_Profile_Page_comp} />
    <Route path='/project' exact component={Project_PageTS_comp} />
    <Route path='/team' exact component={Team_PageTS_comp} />
    <Route path='/projects' exact component={Projects_ALL_comp} />
    <Route path='/departments' exact component={Departments_ALL_comp} />
    <Route path='/users' exact component={Users_ALL_comp} />
    
    


    <Route path=''   component={Error404_comp}  />
    </Switch>





    {/* <Route path='/'  component={Footer_comp} /> */}

      </Suspense>
    </Router>





    {/* <Footer_comp /> */}
    </>
  );
}

export default App;
