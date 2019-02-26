import { combineReducers } from 'redux';
import update from 'immutability-helper';

const INITIAL_STATE = {
  currentClassIndex: 0,
  classes: [
    {
        name: "Monday Class ICOE",
        imageId: 1,
        students: [
          {
            name: "Ahmed Reducer",
            avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            assignment: "Al-Nahl page 5",
            attendanceHistory: [
              {
                date: "02-23-2019",
                isHere: true
              }
            ]
          },
          {
            name: "Amina Khan",
            avatar: "https://randomuser.me/api/portraits/thumb/women/42.jpg",
            assignment: "An-Naze'aat",
            attendanceHistory: [
              {
                date: "02-23-2019",
                isHere: true
              }
            ]
          },
          {
            name: "Ayoub Barrak",
            avatar: "https://randomuser.me/api/portraits/thumb/men/43.jpg",
            assignment: "Aal-Imran",
            attendanceHistory: [
              {
                date: "02-23-2019",
                isHere: false
              }
            ]
          },
          {
            name: "Khaled Kwick",
            avatar: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
            assignment: "Al-Toor pages 2,3",
            attendanceHistory: [
              {
                date: "02-23-2019",
                isHere: true
              }
            ]
          },
          {
            name: "Yassine Lightening",
            avatar: "https://randomuser.me/api/portraits/thumb/men/22.jpg",
            assignment: "Al-An'aam",
            attendanceHistory: [
              {
                date: "02-23-2019",
                isHere: true
              }
            ]
          },
          {
            name: "Yusuf Awesome",
            avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg",
            assignment: "Huud, pages 3 and 4",
            attendanceHistory: [
              {
                date: "02-23-2019",
                isHere: false
              }
            ]
          }
        ],
    }

  ]

};

const classReducer = (state = INITIAL_STATE, action) => {
  // pulls list of current student in current state
  const {
    classes
  } = state;

  switch (action.type) {
    case 'ADD_STUDENT':
      let classIndex = action.studentInfo.classIndex
      const baseState= {...state};
      const newState = update(baseState, {classes: {[classIndex]: {students: {$push: [action.studentInfo.studentInfo]}}}});
      return newState;

    case 'DELETE_STUDENT':
      let studentsList = state.classes[action.studentIndex.classIndex].students;
      studentsList.splice(action.studentIndex.studentIndex, 1);

      // Finally, update our redux state
      updatedClass = {
        ...classes[classIndex],
        students: studentsList
      } 

      return {
        ...state,
        classes: [updatedClass]
      }
    case 'ADD_CLASS':
      return { 
        ...state,
        classes: state.classes.concat(action.classInfo)
      }
    case 'ADD_ATTENDANCE':
      //Fetches the current list of students
      let studentslist = state.classes[action.classIndex].students;
      
      //Concatenates the new attendance info of each student to the old info
      //assuming that the order of the students in the state are in the same
      //order that they are displayed. 
      for(i = 0; i < studentslist.length; i++) {
        studentslist[i].attendanceHistory.push(action.attendanceInfo[i]);
      }

      //Updates the redux state with the new list of students
      updatedClass = {
        ...classes[action.classIndex],
        students: studentslist
      }

      return {
        ...state,
        classes: [updatedClass]
      }
    default:
      return state
  }
};

export default combineReducers({
  classrooms: classReducer,
});