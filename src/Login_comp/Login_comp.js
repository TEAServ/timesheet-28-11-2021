
//------------------------------------
//-------------------------------------------------
import './Login_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';

import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserData } from '../store/actions';
import { setCurrentWeeks } from '../store/actions';



 class Login_comp extends React.Component {
  state = {
    loginError : false

  };

  componentDidMount()
  {
    //console.log(this.props);
    var setTheCurrentWeeks =(weeks) => {this.props.setCurrentWeeks(weeks)}
    var config = {
      method: 'get',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/GetCurrentWeeks',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
     // console.log(response.data);
      setTheCurrentWeeks(response.data);
      

    })
    .catch(function (error) {
     // console.log(error);
    });


  }
  // constructor(props)
  // {
   
  //   super(props);
  //   this.state={
  //     complete : ""
  //   };
  // }

   checkk2 = (e) => {
    

    var form2 = document.getElementById("formm2");
    var uname = document.getElementById("uname");
    var pass = document.getElementById("p1");
    
 
 
    if (form2.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      form2.classList.add('was-validated');
      
    }else
    {
      //userTest
      //123456789
      //
      //omaramen741
      //123654789
      //{"UserName":"omaramen741","Password":"123654789"}
      //fetch the login process
     // console.log(this.props.state.history);
     // console.log(uname.value);
     // console.log(pass.value);
      //  alert("processing...");
        var redirectToProfile = () => {this.props.state.history.push("/profile")}
      var loginErrorTrue = () => {this.setState({
        loginError : true
      });}
      var loginErrorFalse = () => {this.setState({
        loginError : false
      });}
      var saveToStore = (data) => 
      {
       this.props.setUserData(data);

      }

        var data = JSON.stringify({
          "UserName": uname.value,
          "Password": pass.value
        });
        var config = {
          method: 'post',
          url: 'https://time-sheet-teaserv.herokuapp.com/api/Login',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
//console.log(response.data);
          //alert("aaa");
          if (response.data == "") {
            loginErrorTrue()
          }
          else
          {
            loginErrorFalse();
            saveToStore(response.data);
            ///////////////////////////////////REDIRECT TO PROFILE PAGE
            redirectToProfile();

          }
        })
        .catch(function (error) {
         // console.log(error);
            loginErrorTrue()
          
        });
    }
  }

  loginByKey = (e) => 
  {
    if (e.keyCode === 13) {
      // Cancel the default action, if needed
      e.preventDefault();
      // Trigger the button element with a click
      document.getElementById("aawfadg").click();
    }
  }

  render() {


    return (
      <>
        <div class="cccont"></div>
        <div class="ccont">
            <div class="myBody">
                <div class="container">




                    <h2 class="centerText" >Time Sheet</h2><br/>
                    {this.state.loginError?(
                      <div class=" alert-danger">Username or Password incorrect!</div>
                    
                    ):("")}
                    <form id="formm2" class="needs-validation" novalidate>

                        <div class="form-group">
                          <label for="uname">username:</label>
                          <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" onKeyUp={(e) => {this.loginByKey(e);}}  required/>
                          <div class="valid-feedback">Valid.</div>
                          <div class="invalid-feedback alert alert-danger">Please fill out this field.</div>
                        </div>

                        <div class="form-group">
                            <label for="p1">password:</label>
                            <input type="password" class="form-control" id="p1" placeholder="Enter your password" name="unamee" onKeyUp={(e) => {this.loginByKey(e);}}   required/>
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback alert alert-danger">Please fill out this field.</div>
                          </div><br/>


                        <div class="loginBtnCont" >
                            <button   type="button" id="aawfadg" onClick={(e) => this.checkk2(e)} class="btn btn-primary loginBtn">LogIn</button>
                        </div>



                        
                      </form>






                  </div>










            </div>

        </div>
 

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setUserData,setCurrentWeeks})(Login_comp);





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

  
// }