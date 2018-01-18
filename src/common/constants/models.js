import Immutable from 'immutable';

// initstate model
export const UiState = Immutable.fromJS({
  checked: false,
  isEdit: false,
  workpage: '/',
  login: false,
  formState: 'insert'
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
  userName: '',
  userNum: '',
  password: '',
  isAuthorized: 0,
  dgData: [],
  formData: {
    stuNum : '',
    passwd : '',
    name : '',
    gender : '',
    born : '',
    addr : '',
    tel : '',
    mobile : '',
    source : '',
    carType : '',
    trainScore : '',
    examScore : '',
    roadScore : '',
    memo : '',
    id : '',
    addrNum: ''
  },
  teachers: [],
  trainTime: [],
  classType: [],
  classTypeIndex: 0,
  teacherIndex: 0
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

