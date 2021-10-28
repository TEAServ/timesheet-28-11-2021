
//------------------------------------
//-------------------------------------------------
import './Project_TeamCard_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData,setTeamObj,setPLforTeam } from '../store/actions';

 class Project_TeamCard_comp extends React.Component {
  state = {
    leaderName:""
    
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
    var set_leaderName = (data) => {
      this.setState({
        leaderName : data.Name
      });
    }
    var config = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/GetUser?id=${this.props.team.Leader}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      set_leaderName(response.data);
    })
    .catch(function (error) {
     // console.log(error);
    });
  }

  GoToTeam (e) 
  {

    this.props.setTeamObj(this.props.team);
    this.props.setPLforTeam(this.props.P_Leader);
    this.props.state.history.push('/team');

  }


  render() {
    return (
      <>
      
  
      <div class="teamCard" onClick={(e) => {this.GoToTeam(e)}}>
                    <div class="container-fluid teamCardBdy ">
                        <div class="row">
                
                            <div class="col-md-6 infoTeamCard">
                                <h2>{this.props.team.Name}</h2>
                                <div class="sepTeamCard"></div>
                                <h5>[Leader]</h5>
                                <h3>{this.state.leaderName}</h3>
                            </div>
                            {this.props.state.userData.DepartmentName == "Admin" ?(

<div class="col-md-6 hrsTeamCard">
<h3>Working <span class="greenHours">{this.props.team.W}</span> Hrs</h3>

<h3>OverTime <span class="greenHours">{this.props.team.O}</span> Hrs</h3>
</div>
                    ):(
                      <div class="col-md-6 hrsTeamCard">
                      <h3>Working <span class="greenHours">N/A</span> Hrs</h3>
                      
                      <h3>OverTime <span class="greenHours">N/A</span> Hrs</h3>
                  </div>
                    )}

                
                        </div>
            
                
                    </div>
                
                </div>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setTeamObj,setPLforTeam})(Project_TeamCard_comp);





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