
//------------------------------------
//-------------------------------------------------
import './Team_PageTS_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';
import Project_TeamCard_comp from '../Project_TeamCard_comp/Project_TeamCard_comp';
import Member_card_comp from '../Member_card_comp/Member_card_comp';
import Member_card_Modal_comp from '../Member_card_Modal_comp/Member_card_Modal_comp';

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData } from '../store/actions';

 class Team_PageTS_comp extends React.Component {
  state = {
leaderName:"",
leaderDep:"",
leaderDepColor:"",
leaderID:"",
leaderImg:"",
leaderAllData:"",
totalW:"",
totalO:"",
TeamMemberCards:[],
Member_card_Modal:[],
Member_card_Modal2:[],
AllInOneCounter:0,
PL:""
    
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
    //console.log(this.props);
var SetPL = (data) => 
{
  this.setState({
PL : data
  });
}
    var data = '';

    var configgg = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/GetProject?id=${this.props.state.TeamObj.ProjectID}`,
      headers: { },
      data : data
    };
    
    axios(configgg)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
      //console.log();
      SetPL(response.data.GeneralLeader)
    })
    .catch(function (error) {
     // console.log(error);
    });




var setTotalHrs = (data_W,data_O) => {
    this.setState({
        totalW : data_W,
        totalO : data_O
    });
}




var setLeaderData = (data) => {
  this.setState({leaderName:data.Name,
    leaderDep:data.DepartmentName,
    leaderDepColor:data.DepartmentColor,
    leaderImg:data.Photo,
    leaderID:data._id,
    leaderAllData:data

  })
    
  }
  var config3 = {
    method: 'get',
    url: `https://time-sheet-teaserv.herokuapp.com/api/GetUserData?id=${this.props.state.TeamObj.Leader}`,
    headers: { }
  };
  
  axios(config3)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
   // console.log(response.data);
    setLeaderData(response.data);
  })
  .catch(function (error) {
   // console.log(error);
      });
      
      
      var addTo_TeamMemberCards = (data,key) => {
     // alert(key);
if (this.props.state.userData._id == this.props.state.TeamObj.Leader || this.props.state.userData.DepartmentName == "Admin") {
  this.setState({
    TeamMemberCards : [...this.state.TeamMemberCards, <Member_card_comp key={`${key}`} userAllData={data} userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo} deleteBtn={1}  />]
  });
  
}else
{
  this.setState({
    TeamMemberCards : [...this.state.TeamMemberCards, <Member_card_comp key={`${key}`} userAllData={data} userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo} deleteBtn={0}  />]
  });
}
      
      
      }

      
      
      var dataa = JSON.stringify({
        "UsersIDs": this.props.state.TeamObj.Members
      });
      
      var config4 = {
        method: 'post',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/GetUsers',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : dataa
      };
      
      axios(config4)
      .then(function (response) {
      //  console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          addTo_TeamMemberCards(response.data[i],i);
          
        }
      })
      .catch(function (error) {
      //  console.log(error);
      });







      

var set_Member_card_Modal = (data) => {

  this.setState({
    Member_card_Modal : [...this.state.Member_card_Modal, <Member_card_Modal_comp userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo} func={2}  />]
  });
}
var set_Member_card_Modal2 = (data) => {

  this.setState({
    Member_card_Modal2 : [...this.state.Member_card_Modal2, <Member_card_Modal_comp userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo}  func={3}  />]
  });
}


var AsyncLoopToSet_Member_card_Modal = (CounterMax,data,lastIndex) => 
{
  if (this.state.AllInOneCounter != lastIndex) {
    
  
  var projectTeams = this.props.state.ProjectObj.ProjectManPower;
  //newTeamCounter
  var getCurrentCounter = () => {
    return this.state.AllInOneCounter ;
  }
  var setCurrentCounter = (n) => {
    this.setState({
      AllInOneCounter : n
    });
  }
  

  var config = {
    method: 'get',
    url: `https://time-sheet-teaserv.herokuapp.com/api/allUserTeams?id=${data[this.state.AllInOneCounter]._id}`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
   // console.log(response.data);
   // console.log(getCurrentCounter());
    var teams = response.data.teams;
    var flag = false;
    for (let i = 0; i < projectTeams.length; i++) {
      for (let ii = 0; ii < teams.length; ii++) {
        if (teams[ii] == projectTeams[i]) {
          flag = true;
          break;

        }
        
      }
      if (flag) {
        break;
      }
      
    }
    var C = getCurrentCounter();
    if (!flag) {
      set_Member_card_Modal(data[C]);
      set_Member_card_Modal2(data[C]);
    }
  
    setCurrentCounter(C + 1);
    if (C + 1 < CounterMax) {
      AsyncLoopToSet_Member_card_Modal(CounterMax,data,C);
    }else
    {
      setCurrentCounter(0);
    }



  })
  .catch(function (error) {
   // console.log(error);
  });
  

}
  
}











      var config5 = {
        method: 'get',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/AllUsers?sort=d&sortBy=DepartmentName',
        headers: { }
      };
      
      axios(config5)
      .then(function (response) {
       // console.log(response.data);
// for (let i = 0; i < response.data.length; i++) {
//   set_Member_card_Modal(response.data[i]);
//   //set_Member_card_Modal2(response.data[i]);
  
// }
AsyncLoopToSet_Member_card_Modal(response.data.length,response.data,-1);
      })
      .catch(function (error) {
       // console.log(error);
      });
      













  }

  GoToProject()
  {
    this.props.state.history.push('/project');
  }

  DeleteTeam()
  {
    var goToProject = () => 
    {this.props.state.history.push('/project');

    }
    var Tid =this.props.state.TeamObj._id;
    var data1 = JSON.stringify({
      "id": Tid
    });
    
    var config1 = {
      method: 'delete',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/deleteTeam',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data1
    };
    
    axios(config1)
    .then(function (response) {
     // console.log(response.data);
      document.getElementById("dltBtnCancel").click();
      goToProject();
    })
    .catch(function (error) {
     // console.log(error);
    });

  }

  render() {
    return (
      <>
      <Header_comp />


<div class="TEAM_projRippon_cont" onClick={(e) => this.GoToProject(e)}>

  <div class="TEAM_projRippon" style={{backgroundImage: `url("${this.props.state.ProjectObj.img}")`}}> </div>
<div class="projNameRippon">{this.props.state.ProjectObj.Name}

</div>
</div>
            
            <div class="container profileContainer">
                <div class="row">
                    <div class="col-md-6 leftProfile">
                        <div class="leftContentContainer">
                            
                            <h1 class="ProfileUserName">{this.props.state.TeamObj.Name}</h1>
                            {this.props.state.userData._id == this.state.PL || this.props.state.userData.DepartmentName == "Admin"? (

                    <button type="button" class="btn btn-danger"   data-toggle="modal" data-target="#myModalll">Remove Team <i class="fas fa-trash"></i></button>
  
                    ):("")}
                                           

  {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModalll">
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">

        {/* <!-- Modal body --> */}
        <div class="modal-body ">
          <h3>Do you want to delete this team ?</h3>
        
        <br></br>
        <div class="deleteTeamBtnsCont">
        <button type="button" class="btn btn-danger dltBtn" onClick={() => {this.DeleteTeam()}}>Delete <i class="fas fa-trash"></i></button>
        <button type="button" class="btn btn-secondary dltBtn" data-dismiss="modal" id="dltBtnCancel">Cancel</button>

        </div>
        </div>
      </div>
    </div>
  </div>
                        </div>
            
                        
                    </div>
                    <div class="col-md-6 rightProfileSec">
                    {this.props.state.userData.DepartmentName == "Admin" ?(
                        <div class="rightContentContainer">
                            <h3>Working: <span> <span class="greenHours">{this.props.state.TeamObj.W}</span> Hrs</span></h3>
                            <hr/>
                            <h3>OverTime: <span> <span class="greenHours">{this.props.state.TeamObj.O}</span>  Hrs</span></h3>

            
            
                        </div>

              ):(
                <div class="rightContentContainer">
                <h3>Working: <span> <span class="greenHours">N/A</span> Hrs</span></h3>
                <hr/>
                <h3>OverTime: <span> <span class="greenHours">N/A</span>  Hrs</span></h3>



            </div>
              )}
            
                    </div>
                </div>
            
            
            

            
            
            
            
            
            
            
                <hr/>
                <h1><span class="newPhase">
                {this.props.state.userData._id == this.state.PL || this.props.state.userData.DepartmentName == "Admin"? (
                    
                  <i class="fas fa-edit"  data-toggle="modal" data-target="#myModal"></i>
                    

                  ):("")}

                </span> Team Leader:</h1><br></br>
                <Member_card_comp userAllData={this.state.leaderAllData} userID={this.state.leaderID} DepColor={this.state.leaderDepColor} Name={this.state.leaderName} Dep={this.state.leaderDep} Img={this.state.leaderImg}  />

                                {/* <!-- Button to Open the Modal --> */}

  {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Select User</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body modalStaticBdy">
        {/* <Member_card_Modal_comp DepColor={this.state.leaderDepColor} Name={this.state.leaderName} Dep={this.state.leaderDep} Img={this.state.leaderImg}  /> */}
        {this.state.Member_card_Modal}
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModalNewTL">Close</button>
        </div>
        
      </div>
    </div>
  </div>







                <hr/>
                <h1><span class="newPhase">
                {this.props.state.userData._id == this.state.leaderID || this.props.state.userData.DepartmentName == "Admin"? (
                    
                   
                  <i class="fas fa-plus-circle"  data-toggle="modal" data-target="#myModall"></i>
                      
  
                    ):("")}
                </span> Team Members:</h1><br/>
                {this.state.TeamMemberCards}
                


                                {/* <!-- Button to Open the Modal --> */}

  {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModall">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Select User</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body modalStaticBdy">
        {/* <Member_card_Modal_comp DepColor={this.state.leaderDepColor} Name={this.state.leaderName} Dep={this.state.leaderDep} Img={this.state.leaderImg}  /> */}
        {this.state.Member_card_Modal2}
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModalNewTM">Close</button>
        </div>
        
      </div>
    </div>
  </div>
            
            
            
            
            </div>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData})(Team_PageTS_comp);





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