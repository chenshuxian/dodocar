import Immutable from 'immutable';

// initstate model
export const UiState = Immutable.fromJS({
  spinnerVisible: false,
  checked: false,
  isEdit: false,
  workpage: '/'
});

export const RecipeState = Immutable.fromJS({
  recipes: [],  
  recipe: {
    id: '',
    name: '', 
    description: '', 
    imagePath: '',     
  } 
});

export const UserState = Immutable.fromJS({
  username: '',
  userNum: '',
  password: '',
  isAuthorized: false,
});

export const ExamState = Immutable.fromJS({
  questionID: 1,
  getExam: false,
  exam: [],
  answer: [],
  examLen: '',
  time: 1800,
  startExam: false,
  finishExam: false,
  score:'',
  modal: false,
  modalMsg: '是否提前結束考試',
  modalTitle: '提示'
});

