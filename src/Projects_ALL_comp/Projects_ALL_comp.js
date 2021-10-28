
//------------------------------------
//-------------------------------------------------
import './Projects_ALL_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';

import ProjectCard_comp from '../ProjectCard_comp/ProjectCard_comp';

import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData } from '../store/actions';
import Member_card_comp from '../Member_card_FORMODAL_comp/Member_card_FORMODAL_comp';
 class Projects_ALL_comp extends React.Component {
  state = {
    projectsCards:"",
    Member_card_Modal:[]

    
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
    var set_projectsCards = (data) => 
    {
      var dataArr = [];
      for (let i = 0; i < data.length; i++) {
        dataArr = [...dataArr,<div class="AAAAA"><ProjectCard_comp teamLeader={''} team={''} data={data[i]} type={"explore"} /></div> ]
        
      }
      dataArr.reverse();
      this.setState({
        projectsCards : dataArr
      });
    }
    var config = {
      method: 'get',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AllProjects',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
     // console.log(response.data);
      set_projectsCards(response.data)

    })
    .catch(function (error) {
     // console.log(error);
    });




    var set_Member_card_Modal = (data,key) => {
      
      this.setState({
        Member_card_Modal : [...this.state.Member_card_Modal,<Member_card_comp key={`${key}`} userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo}  />]
      });
    
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
set_Member_card_Modal(response.data[i],i);
//set_Member_card_Modal_newTeam(response.data[i]);

}

    })
    .catch(function (error) {
     // console.log(error);
    });


  }



  render() {
    return (
      <>
      <Header_comp ADDPRJ={true}  />


      

     
                              {/* <!-- Button to Open the Modal --> */}

  {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal_ADD_PROJECT">
    <div class="modal-dialog modal-dialog-centered modal-lg makeItFront">
      <div class="modal-content ">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Add New Project</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body ">

        <div class="form-group">
          <label for="usrr">Name:</label>
          <input type="text" class="form-control" id="usrr" placeholder="Enter Project Name"/>
          </div>
          <hr></hr>

        {/* <Member_card_Modal_comp DepColor={this.state.leaderDepColor} Name={this.state.leaderName} Dep={this.state.leaderDep} Img={this.state.leaderImg}  /> */}
        <div class="modalStaticBdy">
        {this.state.Member_card_Modal}

        </div>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="modalCloseNewPLeaderrr">Close</button>
        </div>
        
      </div>
    </div>
  </div>








  <div class="Container projCardsContainer">
{this.state.projectsCards}

{/* {this.state.projectsCards}
{this.state.projectsCards} */}


  </div>

{/* <h1>HI Projects!</h1> */}

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData})(Projects_ALL_comp);





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