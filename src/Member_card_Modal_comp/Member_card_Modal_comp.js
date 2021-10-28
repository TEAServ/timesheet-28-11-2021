
//------------------------------------
//-------------------------------------------------
import './Member_card_Modal_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData,setProjectObj,setTeamObj } from '../store/actions';

 class Member_card_Modal_comp extends React.Component {
  state = {

    
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

  }

  GoToUserPage () 
  {

    //alert(this.props.Name)
    if (this.props.func == 0) {
      this.ChangeProjectLeader();
    }else if (this.props.func == 1) {
      if (this.props.state.newTeamName.length > 0) {
        
        this.AddNewTeam();
      }
      }else if (this.props.func == 2) {
        this.ChangeTeamLeader();
        
      }else if (this.props.func == 3) {
        this.AddTeamMember();
        //alert("3");
      }

  }
  AddTeamMember()
  {
    var _setTeamObj = (data) => 
    {
      this.props.setTeamObj(data);
    }
    var reloadPage = () => 
    {
      this.props.state.history.push('/profile');
      this.props.state.history.push('/team');
    }
    var data = JSON.stringify({
      "Tid":  this.props.state.TeamObj._id,
      "Mid": this.props.userID,
      "members": this.props.state.TeamObj.Members
    });
    
    var config = {
      method: 'put',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AddTeamMember',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      //console.log(response.data);
      _setTeamObj(response.data);
      document.getElementById("closeModalNewTM").click();
      reloadPage();

    })
    .catch(function (error) {
      //console.log(error);
    });
  }



  ChangeTeamLeader()
  {
    var _setTeamObj = (data) => 
    {
      this.props.setTeamObj(data);
    }
    var reloadPage = () => 
    {
      this.props.state.history.push('/profile');
      this.props.state.history.push('/team');
    }
    var data = JSON.stringify({
      "Tid": this.props.state.TeamObj._id,
      "Lid": this.props.userID

    });
    
    var config = {
      method: 'put',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/ChangeTeamLeader',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
     //console.log(JSON.stringify(response.data));
     _setTeamObj(response.data);
     document.getElementById("closeModalNewTL").click();
     reloadPage();

    })
    .catch(function (error) {
     // console.log(error);
    });
    
  }

  ChangeProjectLeader()
  {
    var NLid = this.props.userID;
    var reloadPage = () => 
    {
      this.props.state.history.push('/profile');
      this.props.state.history.push('/project');
    }
    var resetTheprojectObj = (data) =>
    {
      this.props.setProjectObj(data);
    }
    var data = JSON.stringify({
      "data": {
        "Pid": this.props.state.ProjectObj._id,
        "Lid": this.props.userID
      }
    });
    
    var config = {
      method: 'put',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/UpdateProjectLeader',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
     // console.log(response.data);
      var qqq = {...response.data};
      qqq.GeneralLeader = NLid;
      resetTheprojectObj(qqq);
      document.getElementById("modalCloseNewPLeader").click();
      reloadPage();
    })
    .catch(function (error) {
     // console.log(error);
    });

  }

  AddNewTeam()
  {

    var updateProjectObj = (data) => 
    {
      
      this.props.setProjectObj(data);

    }
    var updateTeamObj = (data) => 
    {
      
      this.props.setTeamObj(data);

    }
    var goToTeamPage = () => 
    {
      
      
      this.props.state.history.push('/team');

    }

    var currentProj = this.props.state.ProjectObj;
    var data = JSON.stringify({
      "data": {
        "Name": this.props.state.newTeamName,
        "ProjectID": this.props.state.ProjectObj._id,
        "Leader": this.props.userID
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AddTeamm',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
   // console.log(this.props.userID);
   // console.log(data);
    axios(config)
    .then(function (response) {


      //console.log(response.data);


var dataa = JSON.stringify({
  "data": {
    "Pid": currentProj._id,
    "Tid": response.data._id
  }
});

var configg = {
  method: 'put',
  url: 'https://time-sheet-teaserv.herokuapp.com/api/UpdateProjectTeams',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : dataa
};

axios(configg)
.then(function (responsse) {
  //console.log(responsse.data);


  updateProjectObj(responsse.data._doc);
  updateTeamObj(response.data);
  document.getElementById("closeNewTeamModal").click();
  goToTeamPage();
  






})
.catch(function (error) {
 // console.log(error);
});

    })
    .catch(function (error) {
     // console.log(error);
    });
  }


  // deleteBtn
  render() {
    return (
      <>

                  <div class="userCard">
                <div class={`container-fluid userCardBdy userCardBdy2 ${this.props.DepColor}Dep`}  onClick={(e) => {this.GoToUserPage(e)}}>
                    <div class="row">
            
                        <div class="col-md-9">
                            <h1>{this.props.Name}</h1>
                            <h3>Department: <span>{this.props.Dep}</span></h3>
                        </div>
                        <div class="col-md-3 imgContt">
                            <img class="cardImg" src={this.props.Img} alt=""/>
                        </div>
            
                    </div>
            
                </div>
            
            </div>
  



      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setProjectObj,setTeamObj})(Member_card_Modal_comp);