
//------------------------------------
//-------------------------------------------------
import './Departments_ALL_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';

import Member_card_comp from '../Member_card_FORMODAL_comp/Member_card_FORMODAL_comp';
import DepartmentCard_comp from '../DepartmentCard_comp/DepartmentCard_comp';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData } from '../store/actions';

 class Departments_ALL_comp extends React.Component {
  state = {
    Member_card_Modal:[],
    departmentsCard:[],
    depColor:"red",
    V_r : "checkMarkVisible",
    V_o : "checkMarkHidden",
    V_y : "checkMarkHidden",
    V_g : "checkMarkHidden",
    V_b : "checkMarkHidden",
    V_l : "checkMarkHidden",
    V_p : "checkMarkHidden",
    V_bl : "checkMarkHidden"

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
    var assignTodepartmentsCard = (data) => 
    {
      var arr = []
      for (let i = 0; i < data.length; i++) {
        arr = [...arr, <DepartmentCard_comp key={i} data={data[i]}/>]
        
      }
      this.setState({
        departmentsCard : arr
      })
    }
    
    var config = {
      method: 'get',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AllDepartments',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(response.data);
      assignTodepartmentsCard(response.data);
    })
    .catch(function (error) {
      //console.log(error);
    });










    var set_Member_card_Modal = (data,key) => {
      
      this.setState({
        Member_card_Modal : [...this.state.Member_card_Modal,<Member_card_comp key={`${key}`} userID={data._id} DepColor={data.DepartmentColor} Name={data.Name} Dep={data.DepartmentName} Img={data.Photo} ADDPRT={true}  />]
      });
    
    } 
    var config3 = {
      method: 'get',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AllUsers?sort=d&sortBy=DepartmentName',
      headers: { }
    };
    
    axios(config3)
    .then(function (response) {
      //console.log(response.data);
for (let i = 0; i < response.data.length; i++) {
set_Member_card_Modal(response.data[i],i+100);
//set_Member_card_Modal_newTeam(response.data[i]);

}

    })
    .catch(function (error) {
      //console.log(error);
    });







  }

  SelectColor(color)
  {
    this.setState({
      depColor:color
    });
    this.ResetAllColors();
if (color == "red") {
  this.setState({
    V_r : "checkMarkVisible",
  });
}
else if (color == "orange") {
  this.setState({
    V_o : "checkMarkVisible",
  });
}
else if (color == "yellow") {
  this.setState({
    V_y : "checkMarkVisible",
  });
}
else if (color == "green") {
  this.setState({
    V_g : "checkMarkVisible",
  });
}
else if (color == "blue") {
  this.setState({
    V_b : "checkMarkVisible",
  });
}
else if (color == "lightblue") {
  this.setState({
    V_l : "checkMarkVisible",
  });
}
else if (color == "purple") {
  this.setState({
    V_p : "checkMarkVisible",
  });
}
else if (color == "black") {
  this.setState({
    V_bl : "checkMarkVisible",
  });
}




  }
  ResetAllColors()
  {
    this.setState({
      V_r : "checkMarkHidden",
      V_o : "checkMarkHidden",
      V_y : "checkMarkHidden",
      V_g : "checkMarkHidden",
      V_b : "checkMarkHidden",
      V_l : "checkMarkHidden",
      V_p : "checkMarkHidden",
      V_bl : "checkMarkHidden"

    });
  }

  CreateDep()
  {
    var reloadPage = () => 
    {
      this.props.state.history.push('/profile');
      this.props.state.history.push('/departments');
    }
    var DeptName = document.getElementById("useerr").value;
    if (DeptName.length > 0) {
      
      
      
      var data = JSON.stringify({
        "data": {
          "Name": DeptName,
          "Color":this.state.depColor,
          "GeneralLeader": this.props.state.userData._id
        }
      });
      
      var config = {
        method: 'post',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/AddDepartment',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        document.getElementById("modalCloseNewPLeaderrrrrrr").click();
        reloadPage();
      })
      .catch(function (error) {
        //console.log(error);
      });
      
      
      
      
      
      
      
    }
  }



  render() {
    return (
      <>
      <Header_comp ADDPRT={true} />
        {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal_ADD_Department">
    <div class="modal-dialog modal-dialog-centered modal-lg makeItFront">
      <div class="modal-content ">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Add New Department</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body ">

        <div class="form-group">
          <label for="usrr">Department Name:</label>
          <input type="text" class="form-control" id="useerr" placeholder="Enter Department Name"/>
          </div>
          <hr></hr>


          
        
          <label for="usrr">Department Color:</label>
          <div class="colorBtnsContContCont">
          <div class="colorBtnsContCont">
          <div class="colorBtnsCont">

          <div onClick={()=>{this.SelectColor("red")}} class="ColorBtn ColorBtn-red"><i class={`fas fa-check       ${this.state.V_r}`}></i></div>
          <div onClick={()=>{this.SelectColor("orange")}} class="ColorBtn ColorBtn-orange"><i class={`fas fa-check    ${this.state.V_o}`}></i></div>
          <div onClick={()=>{this.SelectColor("yellow")}} class="ColorBtn ColorBtn-yellow"><i class={`fas fa-check    ${this.state.V_y}`}></i></div>
          <div onClick={()=>{this.SelectColor("green")}} class="ColorBtn ColorBtn-green"><i class={`fas fa-check     ${this.state.V_g}`}></i></div>
          <div onClick={()=>{this.SelectColor("blue")}} class="ColorBtn ColorBtn-blue"><i class={`fas fa-check      ${this.state.V_b}`}></i></div>
          <div onClick={()=>{this.SelectColor("lightblue")}} class="ColorBtn ColorBtn-lightblue"><i class={`fas fa-check ${this.state.V_l}`}></i></div>
          <div onClick={()=>{this.SelectColor("purple")}} class="ColorBtn ColorBtn-purple"><i class={`fas fa-check    ${this.state.V_p}`}></i></div>
          <div onClick={()=>{this.SelectColor("black")}} class="ColorBtn ColorBtn-black"><i class={`fas fa-check     ${this.state.V_bl}`}></i></div>
          {/* checkMarkVisible
          checkMarkHidden */}


          </div></div></div>

          
          
          <hr></hr>
          <div class="createBtnCont">

          <button type="button" class="btn btn-dark createBtn" onClick={()=>{this.CreateDep()}}>Create</button>
          </div>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary " data-dismiss="modal" id="modalCloseNewPLeaderrrrrrr">Close</button>
        </div>
        
      </div>
    </div>
  </div>
  

<h1 class="hhh">Our Departments</h1>
<div class="Container projCardsContainer">
{this.state.departmentsCard}


  </div>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData})(Departments_ALL_comp);





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