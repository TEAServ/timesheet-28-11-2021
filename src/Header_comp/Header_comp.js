
//------------------------------------
//-------------------------------------------------
import './Header_comp.css';
import imgSrc from '../media/logoNav.png';
//var imgSrc =  require('../media/logoNav.png').default;
import Member_card_Modal_comp from '../Member_card_Modal_comp/Member_card_Modal_comp';
import ReactDOM from "react-dom";
import React from "react";
import {withRouter, matchPath} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

 class Header_comp extends React.Component {
  state = {
    

  };
  constructor(props)
  {
   
    super(props);
    // this.state={
    //   complete : ""
    // };
  }
  componentDidUpdate()
  {
    

    // //404 handeling
    // var routesArr = ['/','/skill','/project'];
    // var flag = false;
    // const found = routesArr.find(element => element == this.props.state.history.location.pathname);
    // if (!found) {
    //   ///////////////HANDELING HERE:-
      
    //   alert('error 404 page not found')
      
    //   //this.props.state.history.push('/');




    //   /////////////////////////////
    // }
  }
  componentDidMount()
  {


  }


   SkillsScroll = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
   try {
     var ele = document.getElementById('HomeSkills');
     var close = document.getElementById('close');
     close.click();
     ele.scrollIntoView({behavior: 'smooth', block: "center"})
     
   } catch (error) {
    this.props.state.history.push('/')
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
     window.setTimeout(()=>{

       var skilll = document.getElementById('skillsH1');
       skilll.click();

     },1000)



     
   }

 }
 ContactMeScroll = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
    //  var ele = document.getElementById('stayConnected');
    //  var close = document.getElementById('close');
    //  close.click();
    //  ele.scrollIntoView({behavior: 'smooth', block: "center"})
    this.props.state.history.push("/profileee");

 }
 GoToProjects = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
    this.props.state.history.push("/projects");

 }
 GoToDepartments = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
    this.props.state.history.push("/departments");

 }
 GoToUsers = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
    this.props.state.history.push("/users");

 }
 
 AboutScroll = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
   try {
    var ele = document.getElementById('aboutSection');
    var close = document.getElementById('close');
    close.click();
    ele.scrollIntoView({behavior: 'smooth', block: "start"})

     
   } catch (error) {
    this.props.state.history.push('/')
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.setTimeout(()=>{

      var port = document.getElementById('aboutH1');
      port.click();

    },1000)
     
   }


 }
 PortfolioScroll = (e) => 
 {
  
   e.preventDefault();
   e.stopPropagation();
   try {
    var ele = document.getElementById('portfolioSection');
    var close = document.getElementById('close');
    close.click();
    ele.scrollIntoView({behavior: 'smooth', block: "center"})

     
   } catch (error) {
    this.props.state.history.push('/')
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.setTimeout(()=>{

      var port = document.getElementById('portfolioH1');
      port.click();

    },1000)
     
   }


 }
 port = (e) => 
 {
  e.preventDefault();
  e.stopPropagation();
  this.props.state.history.push('/skill')

 }
 HomeRoute = (e) => 
 {
  e.preventDefault();
  e.stopPropagation();
  try {

    var ele = document.getElementById('myName');
    var close = document.getElementById('close');
     close.click();
    ele.scrollIntoView({behavior: 'smooth', block: "center"})

    
  } catch (error) {
    this.props.state.history.push('/')
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var close = document.getElementById('close');
     close.click();
    
  }

 }
 fort = (e) => 
 {
  e.preventDefault();
  e.stopPropagation();
  this.props.state.history.push('/')

 }
 forttt = (e) => 
 {
  e.preventDefault();
  e.stopPropagation();
  //console.log(this.props.state.history);

 }
  
 GoToProfile()
 {
   this.props.state.history.push("/profile");
 }

  render() {

          window.addEventListener('scroll',NavStickyTrigger);
          
          
          function NavStickyTrigger() {
              // var mynav = document.getElementById('mynav');
              // var navBtn = document.getElementById('navBtn');
              
              //   if (mynav.offsetTop != 50) {
              //       mynav.classList.add("sticky");
              //       navBtn.classList.add("navBtnn");
                    
                    
              //   }
              //   else
              //   {
              //       mynav.classList.remove("sticky");
              //       navBtn.classList.remove("navBtnn");
              //   }
                
            }




    return (
      <>
              <nav class="navbar navbar-expand-sm bg-dark  sticky-top defaultnav sticky" id="mynav">
            
            <a class="navbar-brand navbar-brandd" href="#">
              <img  onClick={() => {this.GoToProfile()}} class="logo" src={imgSrc} alt="logo" />
            </a>
            
            
            <ul class="navbar-nav">
              {this.props.state.userData.DepartmentName == "Admin" ?(
                
   
              <li class="nav-item navLinkk">
                <a class="nav-link  navLink" href="#" id='skillsH1' onClick={(e) => {this.GoToProjects(e)}}>Projects</a>
              </li>

              ):("")}
              {this.props.state.userData.DepartmentName == "Admin" ?(
                <>
              <li class="nav-item"><div class="sep"></div></li>
              <li class="nav-item navLinkk">
                <a class="nav-link  navLink" href="#" id="portfolioH1"  onClick={(e) => {this.GoToDepartments(e)}} >Departments</a>
              </li>
</>
              ):("")}
              {this.props.state.userData.DepartmentName == "Admin" ?(
                <>
              <li class="nav-item"><div class="sep"></div></li>
              <li class="nav-item navLinkk">
                <a class="nav-link navLink" id="aboutH1" onClick={(e) => {this.GoToUsers(e)}} href="#">Users</a>
              </li>
                
                </>
              ):("")}
              {this.props.ADDPRJ && this.props.state.userData.DepartmentName == "Admin" ? (<button type="button" class="btn btn-dark"  data-toggle="modal" data-target="#myModal_ADD_PROJECT"><i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp;Add Project</button>):("")}
              {this.props.ADDPRT && this.props.state.userData.DepartmentName == "Admin" ? (<button type="button" class="btn btn-dark"  data-toggle="modal" data-target="#myModal_ADD_Department"><i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp;Add Department</button>):("")}
              
              {/* <li class="nav-item"><div class="sep"></div></li> */}
              {/* <li class="nav-item navLinkk">
                <a class="nav-link navLink" onClick={(e) => {this.ContactMeScroll(e)}} href="#">Contact Me</a>
              </li> */}
            </ul>
            <button id="navBtn" type="button" class="btn btn-info navBtn navBtnn" onClick={() => {this.GoToProfile()}}>My Profile</button>
          </nav>



          {/* <nav class="mobNav">
           <span data-toggle="modal" data-target="#exampleModal" class="bars"><i class="fas fa-bars"></i></span>
            <img onClick={(e) => {this.HomeRoute(e)}}  class="logo" src={imgSrc} alt="logo" />  
          </nav>

          <div class="modal left fade" id="exampleModal" tabindex="" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content modall">
                    <div class="modal-body modalBody">
                        <h1  onClick={(e) => {this.HomeRoute(e)}}  class="namee">Omar Amen</h1>
                        <div class="sep2"></div>
                        <span class="sideContent" onClick={(e) => {this.GoToProjects(e)}}>Projects</span>
                        <div class="sep2"></div>
                        <span class="sideContent"  onClick={(e) => {this.GoToDepartments(e)}}>Departments</span>
                        <div class="sep2"></div>
                        <span class="sideContent" onClick={(e) => {this.GoToUsers(e)}}>Users</span>
                        <div class="sep2"></div>
                        <span class="sideContent" onClick={(e) => {this.ContactMeScroll(e)}}>Contact Me</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="close" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div> */}
        
            
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})
//withRouter(Header_comp);
export default connect(mapStateToProps )(Header_comp);
//connect(mapStateToProps );
//export default withRouter(Header_comp);
// const mapStateToProps = (state) => ({state})
// export default connect(mapStateToProps ,{})(Header_comp);




// //------------------------------------
// //-------------------------------------------------
// import './Header_comp.css';
// //import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
// import ReactDOM from "react-dom";
// import React from "react";

// export default class Header_comp extends React.Component {
//   state = {

//   };
//   // constructor(props)
//   // {
   
//   //   super(props);
//   //   this.state={
//   //     complete : ""
//   //   };
//   // }


//   render() {
//     return (
//       <>

//       </>
//     );
//   }

  
