
//------------------------------------
//-------------------------------------------------
import './Member_card_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData ,setTeamObj,setUserProfile} from '../store/actions';

 class Member_card_comp extends React.Component {
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
  RemoveFromTeam()
  {
    var closeBtnID = `dltBtnCancelll${this.props.userID}`;
    //alert(this.props.userID);
    //console.log(this.props);
    //alert(this.props);
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
      url: 'https://time-sheet-teaserv.herokuapp.com/api/RemoveTeamMember',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
     // console.log(JSON.stringify(response.data));
      _setTeamObj(response.data);
      document.getElementById(closeBtnID).click();
      reloadPage();

    })
    .catch(function (error) {
     // console.log(error);
    });



   
  }
  GoToUser()
  {
   // alert(this.props.Name);
   //alert("ssss");
   //console.log(this.props);
   //console.log(this.props.userAllData);

   if (this.props.state.userData.DepartmentName == "Admin") {
     
if (this.props.userAllData._id == this.props.state.userData._id) {
  this.props.state.history.push('/profile');
}else
{
  this.props.setUserProfile(this.props.userAllData);
  this.props.state.history.push('/user');
}
     
   }else if (this.props.state.TeamObj.Leader == this.props.state.userData._id) {
    if (this.props.userAllData._id == this.props.state.userData._id) {
      this.props.state.history.push('/profile');
    }else
    {
      this.props.setUserProfile(this.props.userAllData);
      this.props.state.history.push('/user');
    }
   }else if (this.props.userAllData._id == this.props.state.userData._id) {
    this.props.state.history.push('/profile');
  }
    //alert(this.props.userID);
    //alert("this.props.userID");
  }

  // deleteBtn={1}

  render() {
    return (
      <>
                  <div class="userCard">
                    <div class="TeamMemeberDelBtnCont">
{this.props.deleteBtn == 1 ? (
<>
      <button type="button" class="btn btn-outline-danger TeamMemeberDelBtn" data-toggle="modal" data-target={`#myModallll${this.props.userID}`}><i class="fas fa-user-minus"></i></button>
        {/* <!-- The Modal --> */}
        <div class="modal fade" id={`myModallll${this.props.userID}`}>
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">

        {/* <!-- Modal body --> */}
        <div class="modal-body ">
          <h3>Do you want to remove this user from the team?</h3>
        
        <br></br>
        <div class="deleteTeamBtnsCont">
        <button type="button" class="btn btn-danger dltBtn" onClick={() => {this.RemoveFromTeam()}}>Remove <i class="fas fa-user-minus"></i></button>
        <button type="button" class="btn btn-secondary dltBtn" data-dismiss="modal" id={`dltBtnCancelll${this.props.userID}`}>Cancel</button>

        </div>
        </div>
      </div>
    </div>
  </div>
</>
):("")}
                    </div>
                <div class={`container-fluid userCardBdy ${this.props.DepColor}Dep`} onClick={() => {this.GoToUser()}}>
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

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setTeamObj,setUserProfile})(Member_card_comp);





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