
//------------------------------------
//-------------------------------------------------
import './Users_ALL_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';

import Member_card_comp from '../Member_card_comp/Member_card_comp';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData } from '../store/actions';

 class Users_ALL_comp extends React.Component {
  state = {
allUsersComp : [],

    
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
   var StoreToallUsersComp = (data) => 
   {
var lastDepName = data[0].DepartmentName;
    for (let i = 0; i < data.length; i++) {
      if (data[i].DepartmentName == lastDepName) {

        this.setState({allUsersComp : [...this.state.allUsersComp, <div class="allUsersContChild"><Member_card_comp key={i} userAllData={data[i]} userID={data[i]._id} DepColor={data[i].DepartmentColor} Name={data[i].Name} Dep={data[i].DepartmentName} Img={data[i].Photo} /></div>]});
        
      }else
      {
        this.setState({allUsersComp : [...this.state.allUsersComp,<><div class="sepsep"></div> <div class="allUsersContChild"><Member_card_comp key={i} userAllData={data[i]} userID={data[i]._id} DepColor={data[i].DepartmentColor} Name={data[i].Name} Dep={data[i].DepartmentName} Img={data[i].Photo} /></div></>]});
         lastDepName = data[i].DepartmentName ;
      }
      
    }

   }

    var config = {
      method: 'get',
      url: 'https://time-sheet-teaserv.herokuapp.com/api/AllUsers?sortBy=DepartmentName',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(response.data);
      StoreToallUsersComp(response.data);

    })
    .catch(function (error) {
      //console.log(error);
    });
    
  }



  render() {
    return (
      <>
      <Header_comp />
  

<h1 class="hhh">Our Users</h1>


<div class="allUsersCont">
  {this.state.allUsersComp}


</div>

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData})(Users_ALL_comp);





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