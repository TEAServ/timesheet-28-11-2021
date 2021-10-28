
export default (state = {
    count: '0',
    addedProducts : [""],
    booksPage : [],
    productsPage : [],
    selected : "",
    selectedData : {},
    skillPageData : {},
    projectPageData : {},
    history:false,
    match:{},
    userData:{},
    user_Data:{},
    currentWeeks:{},
    userProjectsData:[],
    taskType:"Modeling",
    weekId:"",
    updateId:"",
    isUpdating:false,
    ProjectObj:{},
    TeamObj:{},
    newTeamName: "",
    PL : ""
}, action) => {
    
    switch (action.type) {
        case 'SET_CURRENT_CART':
            
            return {
                ...state,
                count : action.payload,
            };

        case 'SET_CURRENT_CART_PRODUCTS':
                    return {
            ...state,
            addedProducts : action.payload,
        };
        
        case 'SET_CURRENT_BOOKS_PAGE':
            return {
                 ...state,
                 booksPage : action.payload,
            };

        case 'SET_CURRENT_PRODUCTS_PAGE':
        return {
             ...state,
             productsPage : action.payload,
        };
        
        case 'SET_SELECTED_BTN':
            return {
                 ...state,
                 selected : action.payload,
            };
            
        case 'SET_SELECTED_SKILL_DATA':
            return {
                 ...state,
                 selectedData : action.payload,
            };
        case 'SET_SKILL_PAGE_DATA':
        return {
             ...state,
             skillPageData : action.payload,
        };
        case 'SET_PROJECT_PAGE_DATA':
            return {
                 ...state,
                 projectPageData : action.payload,
            };
        case 'SET_HISTORY_OBJ':
            return {
                 ...state,
                 history : action.payload,
            };
        case 'SET_MATCH_OBJ':
        return {
             ...state,
             match : action.payload,
        };
        case 'SET_USER_DATA':
             return {
                  ...state,
                  userData : action.payload,
                };
          case 'SET_CURRENT_WEEKS':
              return {
                   ...state,
                   currentWeeks : action.payload,
          };
          case 'SET_USER_PROJECTS_DATA':
              return {
                   ...state,
                   userProjectsData : action.payload,
          };
          case 'SET_TASK_TYPE':
              return {
                   ...state,
                   taskType : action.payload,
          };
          case 'SET_TASK_WEEK_ID':
              return {
                   ...state,
                   weekId : action.payload,
          }        
          case 'SET_UPDATE_ID':
              return {
                   ...state,
                   updateId : action.payload,
          }; 
          case 'SET_IS_UPDATING':
              return {
                   ...state,
                   isUpdating : action.payload,
          }; 

          case 'SET_PROJECT_OBJ':
               return {
                    ...state,
                    ProjectObj : action.payload,
           }; 

           case 'SET_TEAM_OBJ':
            return {
                 ...state,
                 TeamObj : action.payload,
            }; 

            case 'SET_NEW_TEAM_NAME':
                return {
                     ...state,
                     newTeamName : action.payload,
                }; 
                case 'SET_USER_PROFILE':
                    return {
                         ...state,
                         user_Data : action.payload,
                    }; 
                    case 'SET_PL':
                         return {
                              ...state,
                              PL : action.payload,
                         }; 
        // SET_PL
        
            

        default:
            return state;
    }


}