
//------------------------------------
//-------------------------------------------------
import './DepartmentCard_comp.css';

//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';


import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedBtn } from '../store/actions';
import { setSkillPageData ,setUpdateId,setProjectObj} from '../store/actions';



 class DepartmentCard_comp extends React.Component {
  state = {


  };

  componentDidMount()
  {

//console.log(this.props.data.Name);


  }
  projectCardFunc()
  {
    //var setUpdateId = () => {this.props.setUpdateId(Math.random().toString())}
    
      //console.log(this.props);
     // alert(`directing to ${this.props.data.Name} ....`)

      // e.preventDefault();
      // e.stopPropagation();
    /////////////////   this.props.setProjectObj({...this.props.data});
    /////////////////   this.props.state.history.push('/project');
     
      
    
  }




  render() {


    return (
      <>
<div class="AAAAAA depCardCont">
<div  class={`ribbons ${this.props.data.Color}ss`}></div>
<div class="DepCard" >
  <h1 class="projNameCard">
    <span class="">
  {this.props.data.Name}
  </span>
  </h1>

  <div class="projCardPanel"><button type="button" class="btn btn-dark btnBorder" onClick={() => {this.projectCardFunc()}}>explore</button></div>
  </div>

</div>

                   

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setSelectedBtn,setSkillPageData,setUpdateId,setProjectObj})(DepartmentCard_comp);





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