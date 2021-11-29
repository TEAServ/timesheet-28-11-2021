
//------------------------------------
//-------------------------------------------------
import './User_Profile_Page_comp.css'; 
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';

import ProjectCard_comp from '../ProjectCard_comp/ProjectCard_comp';
import {Helmet} from "react-helmet";
import Task_comp from '../Task_comp/Task_comp';
import Task_HISTORY_comp from '../Task_HISTORY_comp/Task_HISTORY_comp';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData } from '../store/actions';

 class User_Profile_Page_comp extends React.Component {
  state = {
    userProjects:[],
    userProjectsToModal:[],
    ProjectsData:[],
    tableA : "",
    tableB : "",
    userPhoto:"",
    departmentsData:[],
    departments:[],
    taskHistory:""
    
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
    
    if (!this.props.state.user_Data._id || this.props.state.user_Data._id==this.props.state.userData._id) 
    {
      //window.location.pathname = "/profile"
      this.props.state.history.push('/profile');
    }

    this.setState({
      userPhoto:this.props.state.user_Data.Photo
    })




























    var assignToUserProjects = (data,teams,leaders) => {
      for (let i = 0; i < data.length; i++) {
        
       // console.log("00000000000000000000000000000000000000000000000000000000");
       // console.log(data);
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
      tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />,
      tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />
    })
    }
    var setToStateB = () => 
    {
      this.setState({
      tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />
      
    })
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
           // console.log(error);
          });


    //   this.setState({
    //   tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />,
    //   tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />
    // })
  }
    var config1 = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/allTeamss?id=${this.props.state.user_Data._id}`,
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

       // console.log(responsee.data);
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
      
     // console.log(newpswd);
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
      //  console.log(error);
      });
    }

  }

   change() {
    var fileInput = document.getElementById('myFile');
    fileInput.click();
    
}
 uploadPhoto(params) {



  
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
             // console.log(response.data);


              
                         alert("Added sucessfully!")
                         closeBtn.click();
                         document.getElementById("usr").value = "";
                         document.getElementById("usrname").value = "";
                         document.getElementById("pswd").value = "";

            })
            .catch(function (error) {
            //  console.log(error);
            });



          })
          .catch(function (error) {
           // console.log(error);
          });


          





        }
        
      }
      
    }
    
  }
  


 // console.log(name);
 // console.log(username);
 // console.log(password);
}
getMAX()
{
  var aaa = new Date(this.props.state.currentWeeks.current.start).getMonth()+1
  var aaaa = "";
if (aaa < 10) {
  aaaa = `0${aaa}` ;
}else
{
  aaaa = `${aaa}` ;
}

return aaaa ;
}
max()
{
  return `${new Date(this.props.state.currentWeeks.current.start).getFullYear()}-${this.getMAX()}-${new Date(this.props.state.currentWeeks.current.start).getDate()}T00:00`;
}
getWeekHistory()
{
  var ddd = document.getElementById("meeting-time");
  var dddd = new Date(ddd.value);

  //console.log(dddd.getMonth()+1);
  //console.log(new Date(this.props.state.currentWeeks.current.start).toISOString());
  var resetHistoryTask = () =>
  {
  this.setState({taskHistory :  ""})
  }
  var updateHistoryTask = (weekID,date) =>
  {
  this.setState({taskHistory :  < Task_HISTORY_comp id={weekID} date={date}  userID={this.props.state.user_Data._id} />})
  }

  var config = {
    method: 'get',
    url: 'https://time-sheet-teaserv.herokuapp.com/api/allWeeks?sort=d',
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    //console.log(response.data);
   // var datee = new Date(response.data[0].Start_Fri);
   // console.log(datee.getDate());
    
    //{date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`}
for (let i = 0; i < response.data.length; i++) {
  var dateee = new Date(response.data[i].Start_Fri);
  if ((dateee.getDate()) == (dddd.getDate()) && (dateee.getMonth()+1) == (dddd.getMonth()+1) && (dateee.getFullYear()) == (dddd.getFullYear())) {


    // console.log(dateee);
    // console.log(i);
    resetHistoryTask();
    updateHistoryTask(response.data[i]._id,response.data[i].Start_Fri);
    window.scrollTo(0,document.body.scrollHeight);

    break;
  }
  
}



  })
  .catch(function (error) {
    console.log(error);
  });
  
}



  render() {
    return (
      <>
      <Header_comp />
  <div  className={`depRippon ${this.props.state.user_Data.DepartmentColor}${this.props.state.user_Data.DepartmentColor}`}>
            <div class="cc">{this.props.state.user_Data.DepartmentName}</div>
        
        <div class="avatarContainer">
        <img id="ss" src={this.state.userPhoto} alt=""/>

    </div>
</div>

<div class="container profileContainer">
    <div class="row">
        <div class="col-md-6 leftProfile">
            <div class="leftContentContainer">
                
                <h1 class="ProfileUserName">{this.props.state.user_Data.Name}</h1>
                <h5 class="ProfileUserDep">Department: <span class={`depName ${this.props.state.user_Data.DepartmentColor}` }>{this.props.state.user_Data.DepartmentName}</span></h5>
                    {/* <!-- <button type="button" class="btn btn-danger vacationBtn" disabled="true">Request Vacation</button> --> */}

            </div>

            
        </div>
        <div class="col-md-6 rightProfileSec">
        {this.props.state.userData.DepartmentName == "Admin"?(
      
      <div class="rightContentContainer">
      <h3>Worked: <span> <span class="greenHours">{this.props.state.user_Data.WorkedHours + this.props.state.user_Data.TotWorkedHours}</span> Hrs</span></h3>

      <hr/>
      <h3>OverTime: <span> <span class="greenHours">{this.props.state.user_Data.OverTimeHours}</span>  Hrs</span></h3>
      <hr/>
      <h5 class="lastUpdate">**Updating in Tuesday</h5>


  </div>
    ):(
      <div class="rightContentContainer">
      <h3>Worked: <span> <span class="greenHours">N/A</span> Hrs</span></h3>

      <hr/>
      <h3>OverTime: <span> <span class="greenHours">N/A</span>  Hrs</span></h3>
      <hr/>
      <h5 class="lastUpdate">**Updating in Tuesday</h5>


  </div>
    )}


        </div>
    </div>
    <div class="profileBtns" >
      

    </div>







     



    {this.props.state.userData.DepartmentName == "Admin"?(
      
      <>
      
      <hr/>
      <h1>Applied on:</h1>
      {this.state.userProjects}
      
      </>
    ):(
    ""
    )}

    
        




















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
      {this.props.state.userData.DepartmentName == "Admin" ? (
        <>
        <h3>history</h3>
        <input type="datetime-local" id="meeting-time"
         name="meeting-time" 
         min="2021-10-22T00:00" max={ this.max()   } />
         {/* max="2018-06-14T00:00" */}
        <button type="button" class="btn btn-info" onClick={()=>{this.getWeekHistory()}}>Info</button>
        {this.state.taskHistory}
        
        </>
      ):("")}
</div>



      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData})(User_Profile_Page_comp);





// //------------------------------------((dateee.getDate()) == "5" && (dateee.getMonth()+1) == "11" && (dateee.getFullYear()) == "2021") {
// //-------------------------------------------------this.props.state.currentWeeks.current.start
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