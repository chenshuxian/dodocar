import Immutable from 'immutable';

let today = new Date();
let year = today.getFullYear();
today = `${today.getFullYear()}-${
  today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
}-${today.getDate() < 9 ? '0' + today.getDate() : today.getDate()}`;
// initstate model
export const UiState = Immutable.fromJS({
  checked: false,
  isEdit: false,
  workpage: '/',
  login: false,
  formState: 'insert',
  mCarState: 'insert',
});

export const RecipeState = Immutable.fromJS({
  recipes: [],
  recipe: {
    id: '',
    name: '',
    description: '',
    imagePath: '',
  },
});

export const UserState = Immutable.fromJS({
  userName: '',
  userNum: '',
  password: '',
  isAuthorized: 0,
  dgData: '',
  formData: {
    stuNum: '',
    passwd: '',
    name: '',
    gender: '',
    born: '',
    addr: '',
    tel: '',
    mobile: '',
    teacherId: '',
    source: '',
    carType: '',
    trainScore: '',
    examScore: '',
    roadScore: '',
    seasonType: '',
    memo: '',
    id: '',
    addrNum: '',
    payment: '',
    payDate: today,
    yearType: '',
  },
  teachers: [],
  trainTime: [],
  classType: [],
  seasonType: [],
  selected: [],
  classTypeIndex: 0,
  teacherIndex: 0,
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
  score: '',
  modal: false,
  modalMsg: '是否提前結束考試',
  modalTitle: '提示',
  finishData: [],
});

//car
export const CarState = Immutable.fromJS({
  formData: {
    car_number: '',
    car_maker: '',
    engin_id: '',
    born_date: '',
    ins_date: '',
    cc: '',
    color: '',
    lic_status: '',
    hand_auto: '',
    road_car: '',
  },
  detailFormData: {
    car_id: '',
    teacher_id: '',
    fix_date: today,
    fix_store: '',
    device: '',
    num: '0',
    price: '0',
    salary: '0',
    totalPrice: '0',
    year: '1',
    month: '0',
  },
  carNum: [],
  fixStore: [],
});
