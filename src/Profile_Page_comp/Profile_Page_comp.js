
//------------------------------------
//-------------------------------------------------
import './Profile_Page_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';

import ProjectCard_comp from '../ProjectCard_comp/ProjectCard_comp';

import Task_comp from '../Task_comp/Task_comp';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData } from '../store/actions';

 class Profile_Page_comp extends React.Component {
  state = {
    userProjects:[],
    userProjectsToModal:[],
    ProjectsData:[],
    tableA : "",
    tableB : "",
    userPhoto:"",
    departmentsData:[],
    departments:[],
    
  };
  // constructor(props)
  // {
   
  //   super(props);
  //   this.state={
  //     complete : ""
  //   };
  // }
  componentDidMount()
  {
    if (!this.props.state.userData._id) 
    {
      window.location.pathname = "/"
    }

    this.setState({
      userPhoto:this.props.state.userData.Photo
    })


    var configDep = {
      method: 'get',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AllDepartments',
      headers: { }
    };
    var setDepartmentsData = (data) => {this.setState({departmentsData:data})}
    var setDepartments = (data) => {
      for (let i = 0; i < data.length; i++) {
        
        this.setState({departments:[...this.state.departments,<option value={data[i].Name}>{data[i].Name}</option>]})
        
      }
    }
    //console.log("99999999999999999999999999999999999999999999999999w9");
    axios(configDep)
    .then(function (response) {
     // console.log(response.data);
      setDepartmentsData(response.data);
      setDepartments(response.data)
    })
    .catch(function (error) {
      //console.log(error);
    });

























    var assignToUserProjects = (data,teams,leaders) => {
      for (let i = 0; i < data.length; i++) {
        
       // console.log("00000000000000000000000000000000000000000000000000000000");
//console.log(data);
       // console.log(teams[i].teamId); 
       // console.log(data[i]);
        this.setState({
          userProjects:[...this.state.userProjects, <ProjectCard_comp teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"explore"} /> ],
          userProjectsToModal:[...this.state.userProjectsToModal, <ProjectCard_comp  teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"select"} /> ],
          ProjectsData:[...this.state.ProjectsData,data[i]]
          
        })
        
      }
    } 
    
    var assignUserProjectToStore = () => {this.props.setUserProjectsData(this.state.ProjectsData)}
    var sendProjectsDataToTables = () => {
 
var setToStateA = () => 
{
  this.setState({
    tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.userData._id} />,
    tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.userData._id}/>
  });
}
var setToStateB = () => 
{
  this.setState({
    tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.userData._id} />,
    
  });
}
      var config = {
        method: 'get',
        url: `https://time-sheet-teaserv.herokuapp.com/api/GetWeek?id=${this.props.state.currentWeeks.last.id}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
       // console.log(response.data);
        if (!response.data.isCalculated) {
          setToStateA()
        }else
        {
          setToStateB()
        }
      })
      .catch(function (error) {
      //  console.log(error);
      });



    //   this.setState({
    //   tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.userData._id} />,
    //   tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.userData._id}/>
    // });
  }
    var config1 = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/allTeamss?id=${this.props.state.userData._id}`,
      headers: { }
    };
    var teamData = [];
    var teamleaders = [];
    axios(config1)
    .then(function (response) {
     // console.log((response.data));
      teamData = [response.data.teams];
      teamleaders = [response.data.teamLeaders];
      
      var data = JSON.stringify({
        "ProjectsIDs": [...response.data.projects]
      });
      
      var config = {
        method: 'post',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/GetProjects',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (responsee) {
       // console.log("///////////////////////////////////////////////////");

      //  console.log(responsee.data);
        assignToUserProjects(responsee.data,teamData[0],teamleaders[0]);
        assignUserProjectToStore();
        sendProjectsDataToTables();
      })
      .catch(function (error) {
       // console.log(error);
      });






    })
    .catch(function (error) {
     // console.log(error);
    });


  }
  ChangePassword()
  {
    var forceLogout = () => {this.logout()}
    var ChangePasswordClose = () => { document.getElementById("ChangePasswordClose").click()}
    var newpswd = document.getElementById("newpswd").value;
    if (newpswd) {
      
      //console.log(newpswd);
      var data = JSON.stringify({
        "Password": newpswd
      });
      
      var config = {
        method: 'put',
        url: `https://time-sheet-teaserv.herokuapp.com/api/EditUserPasswordOrPhoto?id=${this.props.state.userData._id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
      //  console.log(response.data);
        ChangePasswordClose();
        forceLogout();
      })
      .catch(function (error) {
       // console.log(error);
      });
    }

  }

   change() {
    var fileInput = document.getElementById('myFile');
    fileInput.click();
    
}
 uploadPhoto(params) {


  ///////////////////////////////////////////////////
  //var imagee = document.getElementById('ss')
  var oldSrc = this.state.userPhoto;
  //this.props.state.userData.Photo
  this.setState({
    userPhoto:'https://i.ibb.co/Hpcwq8r/sdffi.gif'
  })
  //imagee.src =  'https://i.ibb.co/Hpcwq8r/sdffi.gif'
  //
  ////////////////////////////////////////////////////


  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
          var fileInput = document.getElementById('myFile');
  var formdata = new FormData();
  formdata.append("image", fileInput.files[0]);      
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`https://api.imgbb.com/1/upload?key=d268b013f9da0340ef577dedda98e806&name=sdffi`, requestOptions)
    .then(response => {
      //  console.log(response);
       return response.text()
      })
    .then(result => {
        //console.log(JSON.parse(result));


        //change in my DB too///


        //imagee.src = JSON.parse(result).data.url;
        this.setState({
          userPhoto: JSON.parse(result).data.url
        })

        var data = JSON.stringify({
          "Photo": JSON.parse(result).data.url

        });
        
        var config = {
          method: 'put',
          url: `https://time-sheet-teaserv.herokuapp.com/api/EditUserPasswordOrPhoto?id=${this.props.state.userData._id}`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
       //   console.log(response.data);
        })
        .catch(function (error) {
        //  console.log(error);
          this.setState({
            userPhoto:oldSrc
          })
        });

  })
    .catch(error => {
        //console.log('error', error)
        this.setState({
          userPhoto:oldSrc
        })
        //imagee.src =  oldSrc
      });


  
}
logout()
{
  window.location.reload();

}
addNewUser()
{
  var currentWeekId = this.props.state.currentWeeks.current.id;
  var closeBtn = document.getElementById("modalclosebutton");
  var name = document.getElementById("usr").value;
  var username = document.getElementById("usrname").value;
  var password = document.getElementById("pswd").value;
  var dep = document.getElementById("selection");
  var depName = dep.value;
  var depID ="" ;
  var depColor = "";
  var userRole = "";
  if (name) {
    if (username) {
      if (password) {
        if (depName) {
          if (depName == "Admin") {
            userRole = "Admin"
          }else{userRole = "Engineer"}
          for (let i = 0; i < this.state.departmentsData.length; i++) {
            if (depName == this.state.departmentsData[i].Name) {
              depID = this.state.departmentsData[i]._id;
              depColor = this.state.departmentsData[i].Color;
            }
            
          }
          //REQUEST
          
          var data = JSON.stringify({
            "Name": name,
            "UserName": username,
            "Password": password,
            "Department": depID,
            "DepartmentName": depName,
            "DepartmentColor": depColor,
            "Role": userRole
          });
          
          var config = {
            method: 'post',
            url: 'https://time-sheet-teaserv.herokuapp.com/api/AddNewUser',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          //  console.log(response.data);


            var dataa = JSON.stringify({
              "WeekID": currentWeekId,
              "UserID": response.data._id,
              "DepartmentName": depName
            });
            
            var configf = {
              method: 'post',
              url: 'https://time-sheet-teaserv.herokuapp.com/api/CreateNewWeeklyTask',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : dataa
            };
            
            axios(configf)
            .then(function (response) {
            //  console.log(response.data);


              
                         alert("Added sucessfully!")
                         closeBtn.click();
                         document.getElementById("usr").value = "";
                         document.getElementById("usrname").value = "";
                         document.getElementById("pswd").value = "";

            })
            .catch(function (error) {
             // console.log(error);
            });



          })
          .catch(function (error) {
           // console.log(error);
          });


          





        }
        
      }
      
    }
    
  }
  


  //console.log(name);
  //console.log(username);
  //console.log(password);
}




  render() {
    return (
      <>
      <Header_comp />
  <div  className={`depRippon ${this.props.state.userData.DepartmentColor}${this.props.state.userData.DepartmentColor}`}>
            <div class="cc">{this.props.state.userData.DepartmentName}</div>
        
        <div class="avatarContainer">
        <img id="ss" src={this.state.userPhoto} alt=""/>
        <div class="changePhoto"><button type="button" class="btn btn-info" onClick={() => this.change()}>Upload <i class="fas fa-upload"></i></button></div>
        <form class="pickerForm"  action="/action_page.php"><input type="file" accept="image/*" id="myFile" onChange={() =>  this.uploadPhoto()} name="filename"/></form>
    </div>
</div>

<div class="container profileContainer">
    <div class="row">
        <div class="col-md-6 leftProfile">
            <div class="leftContentContainer">
                
                <h1 class="ProfileUserName">{this.props.state.userData.Name}</h1>
                <h5 class="ProfileUserDep">Department: <span class={`depName ${this.props.state.userData.DepartmentColor}` }>{this.props.state.userData.DepartmentName}</span></h5>
                    {/* <!-- <button type="button" class="btn btn-danger vacationBtn" disabled="true">Request Vacation</button> --> */}

            </div>

            
        </div>
        <div class="col-md-6 rightProfileSec">
            <div class="rightContentContainer">
                <h3>Worked: <span> <span class="greenHours">{this.props.state.userData.WorkedHours + this.props.state.userData.TotWorkedHours}</span> Hrs</span></h3>

                <hr/>
                <h3>OverTime: <span> <span class="greenHours">{this.props.state.userData.OverTimeHours}</span>  Hrs</span></h3>
                <hr/>
                <h5 class="lastUpdate">**Updating in Tuesday</h5>


            </div>

        </div>
    </div>
    <div class="profileBtns" >
      {this.props.state.userData.Role == "Admin"? (<button type="button" class="btn btn-outline-dark vacationBtn" data-toggle="modal" data-target="#myModal2" >Add User <i class="fas fa-user-plus"></i></button>):("")}
    
    <button type="button" class="btn btn-outline-warning vacationBtn" data-toggle="modal" data-target="#myModal3" >Change Password <i class="fas fa-unlock-alt"></i></button>
    <button type="button" class="btn btn-outline-danger vacationBtn" onClick={() => {this.logout()}} >Log Out <i class="fas fa-sign-out-alt"></i></button>
    </div>



          {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal3">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Change Password</h4>
          <button type="button" class="close" data-dismiss="modal" id="ChangePasswordClose">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body">
            <form>
                <div class="container">
                    

                    <div class="row">

                        
                        <div class="col-sm-3"><label for="newpswd">New password:</label></div>
                        <div class="col-sm-9">
                            <input type="password" class="form-control" id="newpswd"/>

                        </div>

                    </div>
                    



                </div>

              </form>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">

              <button type="button" class="btn btn-warning" onClick={() => {this.ChangePassword()}}>Change</button>
        </div>
        
      </div>
    </div>
  </div>






      {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal2">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Add New User</h4>
          <button type="button" class="close" data-dismiss="modal" id="modalclosebutton">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body">
            <form>
                <div class="container">
                    <div class="row">

                        
                        <div class="col-sm-3"><label for="usr">Name:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="usr"/>

                        </div>

                    </div>
                    <hr/>
                    <div class="row">

                        
                        <div class="col-sm-3"><label for="usrname">username:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="usrname"/>

                        </div>

                    </div>
                    <hr/>
                    <div class="row">

                        
                        <div class="col-sm-3"><label for="pswd">password:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="pswd"/>

                        </div>

                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-sm-3">Select Department</div>
                        <div class="col-sm-9">
                            <select id="selection" name="dep" class="custom-select">
                              {this.state.departments}
                              {/* <option value="volvo">Volvo</option>
                              <option value="fiat">Fiat</option>
                              <option value="audi">Audi</option> */}
                            </select>

                        </div>

                    </div>


                </div>

              </form>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">

              <button type="button" class="btn btn-dark" onClick={() => {this.addNewUser()}}>ADD</button>
        </div>
        
      </div>
    </div>
  </div>




     



    <hr/>
    <h1>Applied on:</h1>
{this.state.userProjects}
    
        




















    <hr/>
    <h1>Tasks</h1>
    <br/>
    <h3>Current Week</h3>
    
     
{this.state.tableA}
     <br/>
     {this.state.tableB == "" ? (""):(
       <h3>Last Week</h3>

     )}
     
     {this.state.tableB}
      <br />
</div>



      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData})(Profile_Page_comp);





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