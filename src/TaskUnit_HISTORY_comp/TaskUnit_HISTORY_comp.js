
//------------------------------------
//-------------------------------------------------
import './TaskUnit_HISTORY_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';

import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserData,setUpdateId,setIsUpdating } from '../store/actions';

import {Helmet} from "react-helmet";
//import { setSkillPageData } from '../store/actions';



 class TaskUnit_HISTORY_comp extends React.Component {
  state = {
    taskMode : 0,
    _id:"",
    WorkingDetails:"",
    WeekID:"",
    UserID:"",
    TeamID:"",
    TaskType:"",
    ReviewerComment:"",
    Review:"",
    ProjectID:"",
    IsApproved:"",
    teamData:"",
    projectData:"",
    projectIMG:"",
    D0_w:"",
    D0_o:"",
    D1_w:"",
    D1_o:"",
    D2_w:"",
    D2_o:"",
    D3_w:"",
    D3_o:"",
    D4_w:"",
    D4_o:"",
    D5_o:"",
    D6_o:"",

  };
componentDidUpdate(){
  //console.log(this.state);
}
  componentDidMount()
  {
    var updateTeamData = (data) => {
      this.setState({
        teamData:data
      })}
      var updateProjectData = (data) => {
     // console.log("/*/**/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/");
     // console.log(data);
      this.setState({
        projectData:data,
        projectIMG:data.img

      })
    }
    this.setState({
      _id:this.props._id,
      WorkingDetails:this.props.WorkingDetails,
      WeekID:this.props.WeekID,
      UserID:this.props.UserID,
      TeamID:this.props.TeamID,
      TaskType:this.props.TaskType,
      ReviewerComment:this.props.ReviewerComment,
      Review:this.props.Review,
      ProjectID:this.props.ProjectID,
      IsApproved:this.props.IsApproved,
      D0_w:this.props.WorkingDetails.D0.W,
      D0_o:this.props.WorkingDetails.D0.O,
      D1_w:this.props.WorkingDetails.D1.W,
      D1_o:this.props.WorkingDetails.D1.O,
      D2_w:this.props.WorkingDetails.D2.W,
      D2_o:this.props.WorkingDetails.D2.O,
      D3_w:this.props.WorkingDetails.D3.W,
      D3_o:this.props.WorkingDetails.D3.O,
      D4_w:this.props.WorkingDetails.D4.W,
      D4_o:this.props.WorkingDetails.D4.O,
      D5_o:this.props.WorkingDetails.D5.O,
      D6_o:this.props.WorkingDetails.D6.O
    });
   // console.log(this.state);
    var config1 = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/GetTeam?id=${this.props.TeamID}`,
      headers: { }
    };
    
    axios(config1)
    .then(function (response) {
     // console.log(response.data);
      updateTeamData(response.data)
      
    })
    .catch(function (error) {
     // console.log(error);
    });


    var config2 = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/GetProject?id=${this.props.ProjectID}`,
      headers: { },
    };
    
    axios(config2)
    .then(function (response) {
     // console.log(response.data);
      updateProjectData(response.data)
      //console.log(this.state.WorkingDetails);
    })
    .catch(function (error) {
     // console.log(error);
    });


// console.log(jquery);

// var jq = new jquery();

//document.getElementById("asd").jquery().tooltip(); 
    
//$('[data-toggle="tooltip"]').tooltip(); 
    // $(document).ready(function(){
    //   $('[data-toggle="tooltip"]').tooltip();  
      // console.log($('[data-toggle="tooltip"]')); 
    // });

  }
  // constructor(props)
  // {
   
  //   super(props);
  //   this.state={
  //     complete : ""
  //   };
  // }

  EditHours = (e) => 
  {
    var ele = e.target;
    //console.log(ele.parentElement.innerText);
      ele.addEventListener("keydown", this.Edit);
  }
  Edit = (e) => 
  {
    var ele =e.target.parentElement.children[0];
    // console.log();
     //console.log(e);
 if (e.key >-1 && e.key <10 ) {
         
         ele.innerText += e.key
         
 }else if (e.key == ".") {
         
         var flag = false;
         for (let i = 0; i < ele.innerText.length; i++) {
         if (ele.innerText[i] == ".") {
         flag = true;
             }
         }
         if (!flag) {
          ele.innerText += e.key
         }
         
 }else if (e.key == "Backspace") {
         
         //console.log(ele.innerText[ele.innerText.length - 1]);
         
         ele.innerText =ele.innerText.substring(0, ele.innerText.length - 1);
     }
 
  }
  EnterNormalMode(mode)
  {
    


      
      var closeUpdating = () => {this.props.setIsUpdating(false)}
      var setUpdateId = () => 
      {
        //this.props.setUpdateId(Math.random().toString())
        var ss = this.props.state.history.location.pathname;
       // alert(`gonna nav from ${ss}`);
        this.props.state.history.push('/projects');
      //  alert(`gonna nav to ${ss}`);
        this.props.state.history.push(ss);
      }

      //delete => 0
      //save => 1 
      var NormalTaskModeFunc =  () => this.setState({taskMode:0});
      //LOGIC HERE .....................................................
      if (mode == 0) {
        //DELETE TASK
        var data = '';
  
        var config = {
          method: 'delete',
          url: `https://time-sheet-teaserv.herokuapp.com/api/justDeleteTask?id=${this.props._id}`,
          headers: { },
          data : data
        };
  
        axios(config)
        .then(function (response) {
        //  console.log(response.data);
  
          closeUpdating();
          NormalTaskModeFunc();
          setUpdateId();
        })
        .catch(function (error) {
          alert("line 224");
        //  console.log(error);
        });
        
      }else if(mode == 1)
      {
        var D5_o = parseFloat(document.getElementById("D5_o").innerText)
        var D6_o = parseFloat(document.getElementById("D6_o").innerText)
        var D0_w = parseFloat(document.getElementById("D0_w").innerText)
        var D0_o = parseFloat(document.getElementById("D0_o").innerText)
        var D1_w = parseFloat(document.getElementById("D1_w").innerText)
        var D1_o = parseFloat(document.getElementById("D1_o").innerText)
        var D2_w = parseFloat(document.getElementById("D2_w").innerText)
        var D2_o = parseFloat(document.getElementById("D2_o").innerText)
        var D3_w = parseFloat(document.getElementById("D3_w").innerText)
        var D3_o = parseFloat(document.getElementById("D3_o").innerText)
        var D4_w = parseFloat(document.getElementById("D4_w").innerText)
        var D4_o = parseFloat(document.getElementById("D4_o").innerText)
        


        var configgg = {
          method: 'get',
          url: `https://time-sheet-teaserv.herokuapp.com/api/GetTeam?id=${this.props.TeamID}`,
          headers: { }
        };
        var userID  = this.props.state.userData._id;
        var taskID = this.props._id;
        axios(configgg)
        .then(function (response) {
         // console.log(JSON.stringify(response.data));
          if (response.data.Leader == userID) {
            var data = JSON.stringify({
              "leaderEdit":"true",
              "WorkingDetails": {
                "D0": {
                  "W": D0_w,
                  "O": D0_o
                },
                "D1": {
                  "W": D1_w,
                  "O": D1_o
                },
                "D2": {
                  "W": D2_w,
                  "O": D2_o
                },
                "D3": {
                  "W": D3_w,
                  "O": D3_o
                },
                "D4": {
                  "W": D4_w,
                  "O": D4_o
                },
                "D5": {
                  "O": D5_o
                },
                "D6": {
                  "O": D6_o
                }
                
              }
            });
            
            var config = {
              method: 'put',
              url: `https://time-sheet-teaserv.herokuapp.com/api/UpdateTaskHours?id=${taskID}`,
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
            //  console.log(response.data);
              closeUpdating();
              NormalTaskModeFunc();
              setUpdateId();
            })
            .catch(function (error) {
             // alert("line 306");
            //  console.log(error);
            });

            
          }else
          {
            var data = JSON.stringify({
              "WorkingDetails": {
                "D0": {
                  "W": D0_w,
                  "O": D0_o
                },
                "D1": {
                  "W": D1_w,
                  "O": D1_o
                },
                "D2": {
                  "W": D2_w,
                  "O": D2_o
                },
                "D3": {
                  "W": D3_w,
                  "O": D3_o
                },
                "D4": {
                  "W": D4_w,
                  "O": D4_o
                },
                "D5": {
                  "O": D5_o
                },
                "D6": {
                  "O": D6_o
                }
              }
            });
            
            var config = {
              method: 'put',
              url: `https://time-sheet-teaserv.herokuapp.com/api/UpdateTaskHours?id=${taskID}`,
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
            //  console.log(response.data);
              closeUpdating();
              NormalTaskModeFunc();
              setUpdateId();
            })
            .catch(function (error) {
             // alert("line 361");
            //  console.log(error);
            });






          }


        })
        .catch(function (error) {
         // alert("line 375");
        //  console.log(error);
        });














  
  
      }else if(mode == 2)
      {
        var data = '';

var config = {
  method: 'put',
  url: `https://time-sheet-teaserv.herokuapp.com/api/ApproveTask?id=${this.props._id}&LeaderId=${this.state.teamData.Leader}`,
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
 // console.log(response.data);
  closeUpdating();
  NormalTaskModeFunc();
  setUpdateId();
})
.catch(function (error) {
  //console.log(error);
  //alert("line 414");
});

      }else if(mode == 3)
      {
        var data = '';

var config = {
  method: 'put',
  url: `https://time-sheet-teaserv.herokuapp.com/api/ApproveTask?id=${this.props._id}&LeaderId=${this.state.teamData.Leader}&approval=false`,
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
 // console.log(response.data);
  closeUpdating();
  NormalTaskModeFunc();
  setUpdateId();
})
.catch(function (error) {
 // console.log(error);
  //alert("line 437");
});
      }


      
    
  }

  CheckEnterMode(){
   // alert("a");
    var EditTaskModeFunc = () => this.setState({taskMode:1});
    var ApprovalTaskModeFunc = () => this.setState({taskMode:2});
    if (!this.props.state.isUpdating) {
      this.props.setIsUpdating(true)
      if (this.props.state.userData._id == this.props.UserID ) {
        //EnterEditMode
        EditTaskModeFunc();
   // alert(1);
      }else if(this.props.state.userData._id== this.state.teamData.Leader){
        //EnterApprovalMode
       // alert(2);
          ApprovalTaskModeFunc();
          
      }else{
        alert("error");
      this.props.setIsUpdating(false)
    //console.log(this.props.UserID);
    //console.log(this.props.state.userData._id);
    //console.log(this.state.teamData.Leader);
    }

      
    }

  }
  render() {


    return (
      <>
      {/* <!-- ---------------------------------------- --> */}
{this.state.taskMode == 0? (

            <div class="col-12 TaskRecord">
                <div class="row">
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell">
                  {!this.state.IsApproved? (
                    
                    <i id="asd" class="fas fa-exclamation-circle" data-toggle="tooltip" title="pending approval"></i>
                  ):(
                    <i class="fas fa-check-circle" data-toggle="tooltip" title="approved"></i>
                  )}
                </div>
                

                    <div class="col-3 taskCell"><i class="fas fa-cog disdis"></i></div>
                  
                
                
                <div class="col-6 taskCell"><span class="taskTypeSpan">{this.state.TaskType.split('^')[0]}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCell ProjectCell" style={{backgroundImage: `url("${this.state.projectIMG}")`}}><span class="ProjectName">{this.state.projectData.Name}</span><button onfocus="" onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCell"><span>{this.state.teamData.Name}</span><button onfocus="" onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell"><span>{this.state.D5_o}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D6_o}</span></div><div class="col-3 taskCell "><span>{this.state.D0_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D0_o}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D1_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D1_o}</span></div><div class="col-3 taskCell"><span>{this.state.D2_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D2_o}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D3_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D3_o}</span></div><div class="col-3 taskCell"><span>{this.state.D4_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D4_o}</span></div></div></div>
               
                {/* <div class="col-4 taskCell"><h6>Rate: <span>{this.state.Review}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>{this.state.ReviewerComment}</span></h6></div> */}
                <div class="col-4 taskCell"><h6><span class="aawerdg">{this.state.TaskType.split('^')[1]}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>N/A</span></h6></div>
                </div>
            </div>
):("")}
                
                {/* <!-- .......................Edit Mode............................... --> */}
                {this.state.taskMode == 1? (
            <div class="col-12 TaskRecordEdit">
                <div class="row">
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell" onClick={(e) => {this.EnterNormalMode(0)}}><i class="fas fa-trash"></i></div><div class="col-3 taskCell" onClick={(e) => {this.EnterNormalMode(1)}}><i class="fas fa-save"></i></div><div class="col-6 taskCellDisabled"></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCellDisabled"></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCellDisabled"></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell"><span id="D5_o">{this.state.D5_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D6_o">{this.state.D6_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell "><span id="D0_w">{this.state.D0_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D0_o">{this.state.D0_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span id="D1_w">{this.state.D1_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D1_o">{this.state.D1_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell"><span id="D2_w">{this.state.D2_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D2_o">{this.state.D2_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span id="D3_w">{this.state.D3_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D3_o">{this.state.D3_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell"><span id="D4_w">{this.state.D4_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D4_o">{this.state.D4_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                {/* <div class="col-4 taskCell"><h6>Rate: <span>{this.state.Review}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>{this.state.ReviewerComment}</span></h6></div> */}
                <div class="col-4 taskCell"><h6><span class="aawerdg">{this.state.TaskType.split('^')[1]}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>N/A</span></h6></div>

                </div>
            </div>


):("")}
{/* <!-- .......................Approval Mode............................... --> */}
                {this.state.taskMode == 2? (
                  
            <div class="col-12 TaskRecordEdit">
              <div class="row">
              <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell" onClick={(e) => {this.EnterNormalMode(3)}}><i class="fas fa-times"></i></div><div class="col-3 taskCell" onClick={(e) => {this.EnterNormalMode(2)}}><i class="fas fa-check"></i></div><div class="col-6 taskCellDisabled"></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCellDisabled"></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCellDisabled"></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell"><span>{this.state.D5_o}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D6_o}</span></div><div class="col-3 taskCell "><span>{this.state.D0_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D0_o}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D1_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D1_o}</span></div><div class="col-3 taskCell"><span>{this.state.D2_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D2_o}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D3_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D3_o}</span></div><div class="col-3 taskCell"><span>{this.state.D4_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D4_o}</span></div></div></div>
               
              {/* <div class="col-4 taskCell"><h6>Rate: <span>{this.state.Review}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtnn"></button></h6></div>
              <div class="col-8 taskCell"><h6 >Comment: <span>{this.state.ReviewerComment}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtnn"></button></h6></div> */}
              <div class="col-4 taskCell"><h6><span class="aawerdg">{this.state.TaskType.split('^')[1]}</span><button  class="EditBtnn"></button></h6></div>
              <div class="col-8 taskCell"><h6 >Comment: <span>N/A</span><button   class="EditBtnn"></button></h6></div>
              </div>
          </div>


):("")}











            























                {/* <!-- ---------------------------------------- --> */}
                <Helmet>
                <script>{`                $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();  
  console.log($('[data-toggle="tooltip"]')); 
});`
                  
                  
                  
                  }


                </script>
                
            </Helmet>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setUserData,setUpdateId,setIsUpdating})(TaskUnit_HISTORY_comp);





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