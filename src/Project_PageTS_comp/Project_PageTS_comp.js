
//------------------------------------
//-------------------------------------------------
import './Project_PageTS_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';
import Project_TeamCard_comp from '../Project_TeamCard_comp/Project_TeamCard_comp';
import Member_card_comp from '../Member_card_comp/Member_card_comp';
import Member_card_Modal_comp from '../Member_card_Modal_comp/Member_card_Modal_comp';

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData ,setNewTeamName} from '../store/actions';

 class Project_PageTS_comp extends React.Component {
  state = {
    UpdateCounter:0,
leaderName:"",
leaderDep:"",
leaderID:"",
leaderDepColor:"",
leaderImg:"",
leaderAllData:"",
totalW:"",
totalO:"",
projectTeamCards:[],
Member_card_Modal:[],
Member_card_Modal2:[],
teamName : "",
newTeamCounter : 0
    
  };
  constructor(props)
  {
   
    super(props);
    this.Rerenderer = this.Rerenderer.bind(this)

  }
  Rerenderer()
  {
    var S = Math.random() ;
   // console.log(S);
    this.setState({UpdateCounter : S})
  }
  componentDidMount()
  {
    if (!this.props.state.userData._id) 
    {
      window.location.pathname = "/"
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
    var config = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/GetUserData?id=${this.props.state.ProjectObj.GeneralLeader}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
     // console.log(response.data);
      setLeaderData(response.data);
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
var addTo_projectTeamCards = (data) => {

    this.setState({
        projectTeamCards : [...this.state.projectTeamCards, <Project_TeamCard_comp team={data} P_Leader={this.state.leaderID} />]
    });

}

    var data = JSON.stringify({
        "TeamsIDs": this.props.state.ProjectObj.ProjectManPower
      });
      
      var config2 = {
        method: 'post',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/GetTeams',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config2)
      .then(function (response) {
       // console.log(response.data);
        var S_W = 0;
        var S_O = 0;
        for (let i = 0; i < response.data.length; i++) {
            S_W += response.data[i].W;
            S_O += response.data[i].O;
            addTo_projectTeamCards(response.data[i]);
        }
        setTotalHrs(S_W,S_O);

      })
      .catch(function (error) {
       // console.log(error);
      });
      



var set_Member_card_Modal = (data) => {

  this.setState({
    Member_card_Modal : [...this.state.Member_card_Modal, <Member_card_Modal_comp ParentRerenderer={this.Rerenderer} userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo} func={0}  />]
  });

} 

var set_Member_card_Modal_newTeam = (data) => {

  this.setState({
    Member_card_Modal2 : [...this.state.Member_card_Modal2, <Member_card_Modal_comp userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo} func={1} TeamName={this.state.teamName} />]
  });

} 

var AsyncLoopToSet_Member_card_Modal2 = (CounterMax,data,lastIndex) => 
{
  if (this.state.newTeamCounter != lastIndex) {
    
  
  var projectTeams = this.props.state.ProjectObj.ProjectManPower;
  //newTeamCounter
  var getCurrentCounter = () => {
    return this.state.newTeamCounter ;
  }
  var setCurrentCounter = (n) => {
    this.setState({
      newTeamCounter : n
    });
  }
  

  var config = {
    method: 'get',
    url: `https://time-sheet-teaserv.herokuapp.com/api/allUserTeams?id=${data[this.state.newTeamCounter]._id}`,
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
      set_Member_card_Modal_newTeam(data[C])
    }
  
    setCurrentCounter(C + 1);
    if (C + 1 < CounterMax) {
      AsyncLoopToSet_Member_card_Modal2(CounterMax,data,C);
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

      var config3 = {
        method: 'get',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/AllUsers?sort=d&sortBy=DepartmentName',
        headers: { }
      };
      
      axios(config3)
      .then(function (response) {
       // console.log(response.data);
for (let i = 0; i < response.data.length; i++) {
  set_Member_card_Modal(response.data[i]);
  //set_Member_card_Modal_newTeam(response.data[i]);
  
}
AsyncLoopToSet_Member_card_Modal2(response.data.length,response.data,-1);
      })
      .catch(function (error) {
       // console.log(error);
      });
      















  }
  updateTeamName(e)
  {
    //console.log(e.target.value);
    this.props.setNewTeamName(e.target.value);
    this.setState({
      teamName : e.target.value
    });
  }



  render() {
    return (
      <>
      <Header_comp />



  <div class="projRippon" style={{backgroundImage: `url("${this.props.state.ProjectObj.img}")`}}>
            
        

            </div>
            
            <div class="container profileContainer">
                <div class="row">
                    <div class="col-md-6 leftProfile">
                        <div class="leftContentContainer">
                            
                            <h1 class="ProfileUserName">{this.props.state.ProjectObj.Name}</h1>

            
                        </div>
            
                        
                    </div>
                    {this.props.state.userData.DepartmentName == "Admin" ?(
                    <div class="col-md-6 rightProfileSec">
                        <div class="rightContentContainer">
                            <h3>Working: <span> <span class="greenHours">{this.state.totalW}</span> Hrs</span></h3>
                            <hr/>
                            <h3>OverTime: <span> <span class="greenHours">{this.state.totalO}</span>  Hrs</span></h3>

                        </div>
                    </div>
                      
                    ):(
                      <div class="col-md-6 rightProfileSec">
                      <div class="rightContentContainer">
                          <h3>Working: <span> <span class="greenHours">N/A</span> Hrs</span></h3>
                          <hr/>
                          <h3>OverTime: <span> <span class="greenHours">N/A</span>  Hrs</span></h3>

                      </div>
                  </div>
                    )}

                </div>
            
            
            

            
            
            
            
            
            
            
                  {this.props.state.userData.DepartmentName == "Admin"? (
                    <>
                    <hr/>
                <h1><span class="newPhase">
                    <i class="fas fa-edit" data-toggle="modal" data-target="#myModal"></i>
                    </span> Leader:</h1>
                  <Member_card_comp userAllData={this.state.leaderAllData} userID={this.state.leaderID} DepColor={this.state.leaderDepColor} Name={this.state.leaderName} Dep={this.state.leaderDep} Img={this.state.leaderImg}  />
</>
                  ):("")}

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
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modalCloseNewPLeader">Close</button>
        </div>
        
      </div>
    </div>
  </div>

















                <hr/>
                <h1><span class="newPhase">
                {this.props.state.userData._id == this.state.leaderID || this.props.state.userData.DepartmentName == "Admin"? (
                    
                    <i class="fas fa-plus-circle" data-toggle="modal" data-target="#myModall"></i>

                  ):("")}
                </span> Teams:</h1><br/>
                {this.state.projectTeamCards}
                {/* <!-- Button to Open the Modal --> */}

  {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModall">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">New Team</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="teamNameInMainCont">
        <div class="teamNameInCont">

        <div class="form-group">
  <label for="usr">Name:</label>
  <input type="text" class="form-control" id="usr" placeholder="Enter Team Name" onChange={(e) => {this.updateTeamName(e);}} />
  </div></div>


</div>
<div class="modalSepCont">
<div class="modalSep"></div>

</div>
<label class="leaderHdr">Team Leader:</label>
        <div class="modal-body modalStaticBdy">
        {/* <Member_card_Modal_comp DepColor={this.state.leaderDepColor} Name={this.state.leaderName} Dep={this.state.leaderDep} Img={this.state.leaderImg}  /> */}
        {this.state.Member_card_Modal2}
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeNewTeamModal">Close</button>
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

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setNewTeamName})(Project_PageTS_comp);





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