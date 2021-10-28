
//------------------------------------
//-------------------------------------------------
import './Task_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import TaskUnit_comp from '../TaskUnit_comp/TaskUnit_comp';
import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserData } from '../store/actions';
import { setCurrentWeeks,setTaskType,setTaskWeekId } from '../store/actions';



 class Task_comp extends React.Component {
  state = {

    tasks : [],
    date:"",
    userProjects:[],
    taskType:"Modeling",
    updateId:"",
    total_D0_w : "0",
    total_D0_o : "0",
    total_D1_w : "0",
    total_D1_o : "0",
    total_D2_w : "0",
    total_D2_o : "0",
    total_D3_w : "0",
    total_D3_o : "0",
    total_D4_w : "0",
    total_D4_o : "0",
    total_D5_o : "0",
    total_D6_o : "0"

  };
  componentDidUpdate()
  {
   // alert("PREVENT THIS");
    // console.log("####################################################################################################################################################");
    // console.log(this.state.updateId );
    // console.log(this.props.state.updateId);
    // if (this.state.updateId != this.props.state.updateId) {
    //   this.setState({
    //     tasks : [],

    //   })
    //   //this.componentDidMountLogic();
    //   this.state.updateId = this.props.state.updateId;
    //   document.getElementById("closeModal").click();

    //   this.props.state.history.push('/projects');


    // }
  }




  componentDidMountLogic()
  {
   // alert("qqqqqq")

    var aa = [];
    this.setState({

      tasks : [...aa],

    });
    var tasksData = []
    var updateTotals = () => {
     var ttotal_D0_w = 0;
     var ttotal_D0_o = 0;
     var ttotal_D1_w = 0;
     var ttotal_D1_o = 0;
     var ttotal_D2_w = 0;
     var ttotal_D2_o = 0;
     var ttotal_D3_w = 0;
     var ttotal_D3_o = 0;
     var ttotal_D4_w = 0;
     var ttotal_D4_o = 0;
     var ttotal_D5_o = 0;
     var ttotal_D6_o = 0;
      for (let i = 0; i < tasksData.length; i++) {
        //WorkingDetails
        ttotal_D0_w += tasksData[i].WorkingDetails.D0.W;
        ttotal_D0_o += tasksData[i].WorkingDetails.D0.O;
        ttotal_D1_w += tasksData[i].WorkingDetails.D1.W;
        ttotal_D1_o += tasksData[i].WorkingDetails.D1.O;
        ttotal_D2_w += tasksData[i].WorkingDetails.D2.W;
        ttotal_D2_o += tasksData[i].WorkingDetails.D2.O;
        ttotal_D3_w += tasksData[i].WorkingDetails.D3.W;
        ttotal_D3_o += tasksData[i].WorkingDetails.D3.O;
        ttotal_D4_w += tasksData[i].WorkingDetails.D4.W;
        ttotal_D4_o += tasksData[i].WorkingDetails.D4.O;
        ttotal_D5_o += tasksData[i].WorkingDetails.D5.O;
        ttotal_D6_o += tasksData[i].WorkingDetails.D6.O;
      }
      this.setState({
        total_D0_w : ttotal_D0_w,
        total_D0_o : ttotal_D0_o,
        total_D1_w : ttotal_D1_w,
        total_D1_o : ttotal_D1_o,
        total_D2_w : ttotal_D2_w,
        total_D2_o : ttotal_D2_o,
        total_D3_w : ttotal_D3_w,
        total_D3_o : ttotal_D3_o,
        total_D4_w : ttotal_D4_w,
        total_D4_o : ttotal_D4_o,
        total_D5_o : ttotal_D5_o,
        total_D6_o : ttotal_D6_o
      });
    }
        var datee = new Date(this.props.date);
        this.setState({date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`})
        var setTheState = (newbie) => {
          this.setState({
            tasks : [...this.state.tasks,newbie ]
          });
        }
        var tasksIDs = [];
        var config1 = {
          method: 'get',
          url: `https://time-sheet-teaserv.herokuapp.com/api/userWeeklyTasksOfWeek?id=${this.props.id}&userID=${this.props.userID}`,
          headers: { }
        };
        
        axios(config1)
        .then(function (response) {
         // console.log(JSON.stringify(response.data));
         // console.log("01010101010101010101010101010101010101010101010101010101011001");
         // console.log(response);
          tasksIDs = [...response.data[0].Tasks]
         // console.log(tasksIDs);
    
        }).then(() => {
    
          var data = JSON.stringify({
            "TasksIDs": tasksIDs
          });
          
          var config2 = {
            method: 'post',
            url: 'https://time-sheet-teaserv.herokuapp.com/api/GetTasks',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config2)
          .then(function (response) {
           // console.log(".........................................................................");
           // console.log(JSON.stringify(response.data));
          //  console.log((response));
            tasksData = response.data;
            updateTotals();
            for (let i = 0; i < tasksIDs.length; i++) {
             // console.log(response.data[i]);
              setTheState(<TaskUnit_comp key={i} _id={response.data[i]._id} WorkingDetails={response.data[i].WorkingDetails} WeekID={response.data[i].WeekID} UserID={response.data[i].UserID} TeamID={response.data[i].TeamID} TaskType={response.data[i].TaskType} ReviewerComment={response.data[i].ReviewerComment} Review={response.data[i].Review} ProjectID={response.data[i].ProjectID} IsApproved={response.data[i].IsApproved}  />)
            }
          })
          .catch(function (error) {
           // console.log(error);
          });
        })
        .catch(function (error) {
         // console.log(error);
        });
  }
  componentDidMount()
  {
   // alert("*****qqqqqq");
    var aa = [];
    this.setState({

      tasks : [...aa],

    });
var tasksData = []
var updateTotals = () => {
 var ttotal_D0_w = 0;
 var ttotal_D0_o = 0;
 var ttotal_D1_w = 0;
 var ttotal_D1_o = 0;
 var ttotal_D2_w = 0;
 var ttotal_D2_o = 0;
 var ttotal_D3_w = 0;
 var ttotal_D3_o = 0;
 var ttotal_D4_w = 0;
 var ttotal_D4_o = 0;
 var ttotal_D5_o = 0;
 var ttotal_D6_o = 0;
  for (let i = 0; i < tasksData.length; i++) {
    //WorkingDetails
    ttotal_D0_w += tasksData[i].WorkingDetails.D0.W;
    ttotal_D0_o += tasksData[i].WorkingDetails.D0.O;
    ttotal_D1_w += tasksData[i].WorkingDetails.D1.W;
    ttotal_D1_o += tasksData[i].WorkingDetails.D1.O;
    ttotal_D2_w += tasksData[i].WorkingDetails.D2.W;
    ttotal_D2_o += tasksData[i].WorkingDetails.D2.O;
    ttotal_D3_w += tasksData[i].WorkingDetails.D3.W;
    ttotal_D3_o += tasksData[i].WorkingDetails.D3.O;
    ttotal_D4_w += tasksData[i].WorkingDetails.D4.W;
    ttotal_D4_o += tasksData[i].WorkingDetails.D4.O;
    ttotal_D5_o += tasksData[i].WorkingDetails.D5.O;
    ttotal_D6_o += tasksData[i].WorkingDetails.D6.O;
  }
  this.setState({
    total_D0_w : ttotal_D0_w,
    total_D0_o : ttotal_D0_o,
    total_D1_w : ttotal_D1_w,
    total_D1_o : ttotal_D1_o,
    total_D2_w : ttotal_D2_w,
    total_D2_o : ttotal_D2_o,
    total_D3_w : ttotal_D3_w,
    total_D3_o : ttotal_D3_o,
    total_D4_w : ttotal_D4_w,
    total_D4_o : ttotal_D4_o,
    total_D5_o : ttotal_D5_o,
    total_D6_o : ttotal_D6_o
  });
}
    var datee = new Date(this.props.date);
    this.setState({date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`})
    var setTheState = (newbie) => {
      this.setState({
        tasks : [...this.state.tasks,newbie ]
      });
    }
    var tasksIDs = [];
    var config1 = {
      method: 'get',
      url: `https://time-sheet-teaserv.herokuapp.com/api/userWeeklyTasksOfWeek?id=${this.props.id}&userID=${this.props.userID}`,
      headers: { }
    };
    
    axios(config1)
    .then(function (response) {
     // console.log(JSON.stringify(response.data));
     // console.log("01010101010101010101010101010101010101010101010101010101011001");
     // console.log(response);
      tasksIDs = [...response.data[0].Tasks]
     // console.log(tasksIDs);

    }).then(() => {

      var data = JSON.stringify({
        "TasksIDs": tasksIDs
      });
      
      var config2 = {
        method: 'post',
        url: 'https://time-sheet-teaserv.herokuapp.com/api/GetTasks',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config2)
      .then(function (response) {
      //  console.log(".........................................................................");
      //  console.log(JSON.stringify(response.data));
      //  console.log((response));
        tasksData = response.data;
        updateTotals();
        for (let i = 0; i < tasksIDs.length; i++) {
         // console.log(response.data[i]);
          setTheState(<TaskUnit_comp key={i} _id={response.data[i]._id} WorkingDetails={response.data[i].WorkingDetails} WeekID={response.data[i].WeekID} UserID={response.data[i].UserID} TeamID={response.data[i].TeamID} TaskType={response.data[i].TaskType} ReviewerComment={response.data[i].ReviewerComment} Review={response.data[i].Review} ProjectID={response.data[i].ProjectID} IsApproved={response.data[i].IsApproved}  />)
        }
      })
      .catch(function (error) {
      //  console.log(error);
      });
    })
    .catch(function (error) {
     // console.log(error);
    });
//60b93cafe3d23520943775cf

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
   // console.log(ele.parentElement.innerText);
      ele.addEventListener("keydown", this.Edit);
  }
  Edit = (e) => 
  {
    var ele =e.target.parentElement.children[0];
    // console.log();
    // console.log(e);
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
         
        // console.log(ele.innerText[ele.innerText.length - 1]);
         
         ele.innerText =ele.innerText.substring(0, ele.innerText.length - 1);
     }
 
  }
  SelectTAskType(typeCode)
  {
    if (typeCode == 0) {
      this.setState({taskType : "Modeling"})
      this.props.setTaskType("Modeling")
      
    }else if (typeCode == 1) {
      this.setState({taskType : "Coordination"})
      this.props.setTaskType("Coordination")
      
    }else if (typeCode == 2) {
      this.setState({taskType : "Site Visiting"})
      this.props.setTaskType("Site Visiting")
      
    }else if (typeCode == 3) {
      this.setState({taskType : "Revision"})
      this.props.setTaskType("Revision")
      
    }else if (typeCode == 4) {
      this.setState({taskType : "Printing / Handover"})
      this.props.setTaskType("Printing / Handover")
      
    }else if (typeCode == 5) {
      this.setState({taskType : "Research"})
      this.props.setTaskType("Research")
      
    }else if (typeCode == 6) {
      this.setState({taskType : "Development"})
      this.props.setTaskType("Development")
      
    }else
    {
      ///add vacation
    }

  }
  setTaskWeekID()
  {
    this.props.setTaskWeekId(this.props.id)
  }

  render() {
  

    return (
      <>
       <div class="container tasksTable">
            <div class="row tasksTableHeader">
                <div class="col-2 taskMainCell"><div class="row"><div class="col-6 taskCell"><h6>{this.state.date}</h6></div><div class="col-6 taskCell"><h6>Task Type</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCell"><h6>Project</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCell"><h6>Team</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><h6>Fri</h6></div><div class="col-3 taskCell"><h6>Sat</h6></div><div class="col-6 taskCell"><h6>Sun</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-6 taskCell"><h6>Mon</h6></div><div class="col-6 taskCell"><h6>Tue</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-6 taskCell"><h6>Wed</h6></div><div class="col-6 taskCell"><h6>Thu</h6></div></div></div>


            </div>



            <div class="row tasksComps">
                {/* <!-- ---------------------------------------- --> */}
                {this.state.tasks}


           



















                {/* <!-- ---------------------------------------- --> */}

        </div>
        <div class="row tasksTableHeader"> 
            <div class="col-12 ">
                <div class="row">
                  {this.props.userID == this.props.state.userData._id && !this.props.state.isUpdating? (
                    <div class="col-4 taskMainCell"><div class="row"><div class="col-12 taskCell"><h2 class="plusBtn" data-toggle="modal" data-target="#myModal" onClick={() => {this.setTaskWeekID()}}><i class="fas fa-plus-square"></i></h2></div></div></div>
                    ):(
                      <div class="col-4 taskMainCell"><div class="row"><div class="col-12 taskCell"></div></div></div>
                      )}
                {/* <!-- ــــــــــــــــــــــــ --> */}
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCell"><h6>Totals:</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell">{this.state.total_D5_o}</div><div class="col-3 taskCell overtimeCell">{this.state.total_D6_o}</div>{this.state.total_D0_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D0_w}</div>):(<div class="col-3 taskCell ">{this.state.total_D0_w}</div>)}  <div class="col-3 taskCell overtimeCell">{this.state.total_D0_o}</div></div></div>
                <div class="col-2 taskMainCell"><div class="row"> {this.state.total_D1_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D1_w}</div> ):(<div class="col-3 taskCell">{this.state.total_D1_w}</div> )}    <div class="col-3 taskCell overtimeCell">{this.state.total_D1_o}</div>{this.state.total_D2_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D2_w}</div>):(<div class="col-3 taskCell">{this.state.total_D2_w}</div>)}        <div class="col-3 taskCell overtimeCell">{this.state.total_D2_o}</div></div></div>
                <div class="col-2 taskMainCell"><div class="row">{this.state.total_D3_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D3_w}</div>):(<div class="col-3 taskCell">{this.state.total_D3_w}</div>)}     <div class="col-3 taskCell overtimeCell">{this.state.total_D3_o}</div>{this.state.total_D4_w > 8.5 ? ( <div class="col-3 taskCell redCell">{this.state.total_D4_w}</div>):( <div class="col-3 taskCell">{this.state.total_D4_w}</div>)}       <div class="col-3 taskCell overtimeCell">{this.state.total_D4_o}</div></div></div>

                </div>
            </div>


        </div>
        <div class="container">


            {/* <!-- The Modal --> */}
            <div class="modal fade" id="myModal">
              <div class="modal-dialog modal-lg  modal-dialog-centered">
                <div class="modal-content">
                
                  {/* <!-- Modal Header --> */}
                  <div class="modal-header">
                    <h4 class="modal-title">New Task</h4>
                    <button id="closeModal" type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  {/* <!-- Modal body --> */}
                  <div class="modal-body newTaskModalBdy">
                      <h3 class="projectTypeTitle qqwes">Task Type: </h3>
                    <div class="dropdown">
                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                          {this.state.taskType}
                        </button>
                        <div class="dropdown-menu menuuu">
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(0)}}>Modeling</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(1)}}>Coordination</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(3)}}>Revision</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(4)}}>Print/Handover</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(2)}}>Site Visiting</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(5)}}>Research</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType(6)}}>Development</a>
    
                          
                        </div>
                      </div> 
                      <div className="sepppp"> 
                      <div class="form-group dsfdsg">
                       <input type="text" class="form-control aasdagg" placeholder="Task short Prief" id="usroo"/>
                      </div></div>

                      <hr/>
                          <h3>Project:</h3>
                      <div class="projectCardsContainer">
                            {/* <!-- ----------------------------------------------------------------------------------------- --> */}

                            {this.props.projects}

                            {/* <!-- ----------------------------------------------------------------------------------------- --> */}

                        </div>

                  </div>
                  
                  {/* <!-- Modal footer --> */}
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>

        </div>

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setUserData,setCurrentWeeks,setTaskType,setTaskWeekId})(Task_comp);





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