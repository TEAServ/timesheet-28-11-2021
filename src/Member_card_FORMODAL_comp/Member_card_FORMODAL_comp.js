
//------------------------------------
//-------------------------------------------------
import './Member_card_FORMODAL_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData ,setTeamObj} from '../store/actions';

 class Member_card_FORMODAL_comp extends React.Component {
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
    //  console.log(JSON.stringify(response.data));
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


      var reloadPage = () => 
      {
        this.props.state.history.push('/profile');
        this.props.state.history.push('/projects');
      }
      var ProjectName = document.getElementById("usrr").value;
      if (ProjectName.length > 0) {
        
        // alert(this.props.Name);
        //alert("ssss");
        //console.log(this.props);
        //alert(this.props.userID);
        //alert(document.getElementById("usrr").value)
        
         //CREATE NEW PROJECT LOGIC
         var data = JSON.stringify({
          "data": {
            "Name": ProjectName,
            "GeneralLeader": this.props.userID
          }
        });
        
        var config = {
          method: 'post',
          url: 'https://time-sheet-teaserv.herokuapp.com/api/AddProject',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
         // console.log(JSON.stringify(response.data));
          document.getElementById("modalCloseNewPLeaderrr").click();
          reloadPage();
        })
        .catch(function (error) {
        //  console.log(error);
        });
  
  
  
      }

    
  }

  // deleteBtn={1}

  render() {
    return (
      <>
                  <div class="userCard">

                <div class={`container-fluid userCardBdy userrCardBdy ${this.props.DepColor}Dep`} onClick={() => {this.GoToUser()}}>
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

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setTeamObj})(Member_card_FORMODAL_comp);





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