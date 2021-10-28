
//------------------------------------
//-------------------------------------------------
//import './Home_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";


import Login_comp from '../Login_comp/Login_comp';
import Task_comp from '../Task_comp/Task_comp';

import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj } from '../store/actions';

 class Home_comp extends React.Component {
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
   // console.log(this.props.state.history);
  //  console.log(this.props);
    this.RecordHistory();

  }

  RecordHistory()
  {
    if (!this.props.state.history) {
      
      this.props.setHistoryObj(this.props.history)
    }
    else{
      
     // console.log(this.props);
    }
    this.props.setMatchObj(this.props.match)
  }


  render() {
    return (
      <>
      
      <Login_comp />

     
      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj})(Home_comp);





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